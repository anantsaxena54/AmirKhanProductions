import { SpotlightFilm, SPOTLIGHT_FILMS } from './spotlight-films.data';

export interface SpotlightControllerCallbacks {
  onActiveFilmChange: (slug: string | null, film: SpotlightFilm | null) => void;
  onDismissHint: () => void;
  onIntroComplete: () => void;
}

export class SpotlightController {
  private heroEl: HTMLElement;
  private wallEl: HTMLElement;
  private glowEl: HTMLElement | null = null;
  private ringWrapEl: HTMLElement | null = null;
  private litWallEl: HTMLElement | null = null;
  private callbacks: SpotlightControllerCallbacks;

  // Coordinate tracking
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private ringX = 0;
  private ringY = 0;

  // Motion & Damping
  private lastTime = 0;
  private animFrameId: number | null = null;
  private isDestroyed = false;
  private isPaused = false;
  private reducedMotion = false;

  // Autopilot
  private lastPointerTime = 0;
  private inAutopilot = false;
  private autopilotStartTime = 0;

  // Hit testing
  private lastHitTestTime = 0;
  private activeSlug: string | null = null;

  // Hint tracking
  private cumulativeDistance = 0;
  private lastPointerPos = { x: 0, y: 0 };
  private hintDismissed = false;

  // Intro sequence
  private isIntroActive = false;
  private introStartTime = 0;
  private baseRadius = 320; // default px radius

  private intersectionObserver: IntersectionObserver | null = null;

  constructor(
    heroEl: HTMLElement,
    wallEl: HTMLElement,
    callbacks: SpotlightControllerCallbacks
  ) {
    this.heroEl = heroEl;
    this.wallEl = wallEl;
    this.callbacks = callbacks;

    if (typeof window !== 'undefined') {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.hintDismissed = sessionStorage.getItem('akp_spotlight_hint_dismissed') === 'true';
      if (this.hintDismissed) {
        this.callbacks.onDismissHint();
      }
    }
  }

  public init(): void {
    if (typeof window === 'undefined') return;

    this.glowEl = this.heroEl.querySelector('.spot-glow');
    this.ringWrapEl = this.heroEl.querySelector('.spot-ring-wrap');
    this.litWallEl = this.heroEl.querySelector('.wall-lit');

    this.measureAndSetRadius();

    // Default starting center around 36% across / 45% down
    const heroRect = this.heroEl.getBoundingClientRect();
    const defaultX = heroRect.width * 0.36;
    const defaultY = heroRect.height * 0.45;

    this.targetX = defaultX;
    this.targetY = defaultY;
    this.currentX = defaultX;
    this.currentY = defaultY;
    this.ringX = defaultX;
    this.ringY = defaultY;
    this.lastPointerPos = { x: defaultX, y: defaultY };
    this.lastPointerTime = performance.now();

    // Check if intro is needed this session
    const introDone = sessionStorage.getItem('akp_spotlight_intro_done') === 'true';
    if (!introDone && !this.reducedMotion) {
      this.startIntro();
    } else {
      this.callbacks.onIntroComplete();
    }

    // Pause loop when hero is off-screen
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? true;
        this.isPaused = !isVisible;
        if (isVisible && !this.animFrameId && !this.isDestroyed) {
          this.lastTime = performance.now();
          this.animFrameId = requestAnimationFrame(this.renderLoop);
        }
      },
      { threshold: 0.1 }
    );
    this.intersectionObserver.observe(this.heroEl);

    // Initial variable flush
    this.updateDomProperties(this.currentX, this.currentY, this.ringX, this.ringY, this.baseRadius, 1);

    // Start loop
    this.lastTime = performance.now();
    this.animFrameId = requestAnimationFrame(this.renderLoop);
  }

  private measureAndSetRadius(): void {
    const w = window.innerWidth;
    if (w >= 1200) {
      this.baseRadius = w * 0.23;
    } else if (w >= 768) {
      this.baseRadius = w * 0.30;
    } else {
      this.baseRadius = w * 0.42;
    }
  }

  public onResize(): void {
    this.measureAndSetRadius();
  }

  public handlePointerMove(clientX: number, clientY: number): void {
    this.inAutopilot = false;
    this.lastPointerTime = performance.now();

    const heroRect = this.heroEl.getBoundingClientRect();
    const px = clientX - heroRect.left;
    const py = clientY - heroRect.top;

    this.targetX = px;
    this.targetY = py;
    this.ringX = px;
    this.ringY = py;

    // Track cumulative movement for hint dismissal
    if (!this.hintDismissed) {
      const dx = px - this.lastPointerPos.x;
      const dy = py - this.lastPointerPos.y;
      this.cumulativeDistance += Math.sqrt(dx * dx + dy * dy);
      this.lastPointerPos = { x: px, y: py };

      if (this.cumulativeDistance >= 120) {
        this.hintDismissed = true;
        sessionStorage.setItem('akp_spotlight_hint_dismissed', 'true');
        this.callbacks.onDismissHint();
      }
    }

    // Wake up loop if settled
    if (this.isPaused) {
      this.isPaused = false;
      this.lastTime = performance.now();
      if (!this.animFrameId && !this.isDestroyed) {
        this.animFrameId = requestAnimationFrame(this.renderLoop);
      }
    }
  }

  public focusElement(el: HTMLElement): void {
    this.inAutopilot = false;
    this.lastPointerTime = performance.now();

    const heroRect = this.heroEl.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const cx = elRect.left + elRect.width / 2 - heroRect.left;
    const cy = elRect.top + elRect.height / 2 - heroRect.top;

    this.targetX = cx;
    this.targetY = cy;
    this.ringX = cx;
    this.ringY = cy;

    if (this.reducedMotion) {
      this.currentX = cx;
      this.currentY = cy;
    }

    const slug = el.getAttribute('data-slug');
    if (slug) {
      this.setActiveSlug(slug);
    }
  }

  private startIntro(): void {
    this.isIntroActive = true;
    this.introStartTime = performance.now();
  }

  private renderLoop = (timestamp: number): void => {
    if (this.isDestroyed) return;

    if (this.isPaused) {
      this.animFrameId = null;
      return;
    }

    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05); // cap at 50ms
    this.lastTime = timestamp;

    let currentRadius = this.baseRadius;
    let currentOpacity = 1;

    // Handle First-Load Intro Timeline (0 - 1.8s)
    if (this.isIntroActive) {
      const elapsed = (timestamp - this.introStartTime) / 1000;
      if (elapsed < 0.4) {
        currentRadius = 0;
        currentOpacity = 0;
      } else if (elapsed < 1.4) {
        // Radius expands with cubic-bezier(.2, .7, .1, 1) approx
        const progress = (elapsed - 0.4) / 1.0;
        const ease = 1 - Math.pow(1 - progress, 3);
        currentRadius = this.baseRadius * ease;

        // Stage lamp flickers: 1 -> .55 -> 1 -> .8 -> 1
        if (progress < 0.25) currentOpacity = 0.9;
        else if (progress < 0.45) currentOpacity = 0.55;
        else if (progress < 0.65) currentOpacity = 1.0;
        else if (progress < 0.8) currentOpacity = 0.78;
        else currentOpacity = 1.0;
      } else if (elapsed < 1.8) {
        currentRadius = this.baseRadius;
        currentOpacity = 1;
        this.callbacks.onIntroComplete();
      } else {
        this.isIntroActive = false;
        this.callbacks.onIntroComplete();
        sessionStorage.setItem('akp_spotlight_intro_done', 'true');
      }
    }

    // Handle Autopilot after 2.5s of no pointer movement
    if (!this.isIntroActive && !this.reducedMotion) {
      const idle = timestamp - this.lastPointerTime;
      if (idle >= 2500) {
        if (!this.inAutopilot) {
          this.inAutopilot = true;
          this.autopilotStartTime = timestamp;
        }

        const t = (timestamp - this.autopilotStartTime) / 1000;
        const heroRect = this.heroEl.getBoundingClientRect();
        
        // Lissajous curve from spec:
        // xPercent = 50 + 30 * Math.sin(t * 0.21);
        // yPercent = 45 + 22 * Math.sin(t * 0.33 + 1.3);
        const xPercent = 50 + 30 * Math.sin(t * 0.21);
        const yPercent = 45 + 22 * Math.sin(t * 0.33 + 1.3);

        this.targetX = (heroRect.width * xPercent) / 100;
        this.targetY = (heroRect.height * yPercent) / 100;
        this.ringX = this.targetX;
        this.ringY = this.targetY;
      }
    }

    // Frame-rate independent damping:
    // k = 1 - Math.exp(-dt * 7.5);
    if (this.reducedMotion) {
      this.currentX = this.targetX;
      this.currentY = this.targetY;
    } else {
      const k = 1 - Math.exp(-dt * 7.5);
      this.currentX += (this.targetX - this.currentX) * k;
      this.currentY += (this.targetY - this.currentY) * k;
    }

    // Flush CSS variables to DOM
    this.updateDomProperties(
      this.currentX,
      this.currentY,
      this.ringX,
      this.ringY,
      currentRadius,
      currentOpacity
    );

    // Hit-testing nearest film title every ~80ms
    if (timestamp - this.lastHitTestTime > 80 && currentRadius > 50) {
      this.lastHitTestTime = timestamp;
      this.hitTestActiveTitle(this.currentX, this.currentY);
    }

    this.animFrameId = requestAnimationFrame(this.renderLoop);
  };

  private updateDomProperties(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    radius: number,
    opacity: number
  ): void {
    // Relative to Wall (which starts at top: 70px, left: -6vw)
    const wallRect = this.wallEl.getBoundingClientRect();
    const heroRect = this.heroEl.getBoundingClientRect();

    const wallRelX = cx - (wallRect.left - heroRect.left);
    const wallRelY = cy - (wallRect.top - heroRect.top);

    // Write CSS variables on hero element
    this.heroEl.style.setProperty('--r', `${Math.round(radius)}px`);
    this.heroEl.style.setProperty('--x', `${Math.round(wallRelX)}px`);
    this.heroEl.style.setProperty('--y', `${Math.round(wallRelY)}px`);
    this.heroEl.style.setProperty('--gx', `${Math.round(cx)}px`);
    this.heroEl.style.setProperty('--gy', `${Math.round(cy)}px`);
    this.heroEl.style.setProperty('--spot-opacity', `${opacity.toFixed(2)}`);

    // Hardware accelerated transforms for moving ring and glow
    if (this.ringWrapEl) {
      this.ringWrapEl.style.transform = `translate3d(${Math.round(rx)}px, ${Math.round(ry)}px, 0)`;
    }
    if (this.glowEl) {
      this.glowEl.style.transform = `translate3d(calc(${Math.round(cx)}px - 50%), calc(${Math.round(cy)}px - 50%), 0)`;
      this.glowEl.style.opacity = `${(opacity * 0.85).toFixed(2)}`;
    }
  }

  private hitTestActiveTitle(heroX: number, heroY: number): void {
    const heroRect = this.heroEl.getBoundingClientRect();
    const screenX = heroRect.left + heroX;
    const screenY = heroRect.top + heroY;

    // Fast bounding box distance hit testing on pass-1 titles
    const items = this.wallEl.querySelectorAll<HTMLElement>('.wall-pass:first-child [data-slug]');
    let closestSlug: string | null = null;
    let closestDist = Infinity;
    const maxActivationDist = this.baseRadius * 0.45; // inner active radius

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const itemCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(screenX - itemCenterX, screenY - itemCenterY);
      if (dist < closestDist && dist <= maxActivationDist) {
        closestDist = dist;
        closestSlug = item.getAttribute('data-slug');
      }
    });

    if (closestSlug !== this.activeSlug) {
      this.setActiveSlug(closestSlug);
    }
  }

  private setActiveSlug(slug: string | null): void {
    this.activeSlug = slug;
    const film = slug ? SPOTLIGHT_FILMS.find((f) => f.slug === slug) ?? null : null;
    this.callbacks.onActiveFilmChange(slug, film);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }
}
