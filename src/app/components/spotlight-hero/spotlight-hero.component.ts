import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  signal,
  inject,
  PLATFORM_ID,
  HostListener,
  NgZone
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  SpotlightFilm,
  SpotlightPass,
  generateSpotlightPasses
} from './spotlight-films.data';
import { SpotlightController } from './spotlight.controller';

@Component({
  selector: 'app-spotlight-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section 
      class="spotlight-hero" 
      #heroRef
      aria-label="Aamir Khan Productions Cinema Wall"
      (pointermove)="onPointerMove($event)"
      (pointerdown)="onPointerDown($event)"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
      tabindex="-1"
    >
      <!-- Warm radial halo glow -->
      <div class="spot-glow" aria-hidden="true"></div>

      <!-- Wall Base Layer: dim film-title links; handles hover/click/focus -->
      <div class="title-wall wall-base" #wallRef>
        <ng-container *ngTemplateOutlet="titleWallTemplate; context: { isLit: false }"></ng-container>
      </div>

      <!-- Wall Lit Layer: identical titles, warm ivory, circular mask -->
      <div class="title-wall wall-lit" aria-hidden="true">
        <ng-container *ngTemplateOutlet="titleWallTemplate; context: { isLit: true }"></ng-container>
      </div>

      <!-- Reusable Angular Template for both base and lit layers -->
      <ng-template #titleWallTemplate let-isLit="isLit">
        <div 
          *ngFor="let pass of passes(); let passIdx = index" 
          class="wall-pass"
          [attr.aria-hidden]="passIdx > 0 || isLit ? 'true' : null"
        >
          <ng-container *ngFor="let film of pass.films">
            <!-- Pass 1 on Base Layer: Real interactive semantic links -->
            <a 
              *ngIf="passIdx === 0 && !isLit"
              [routerLink]="['/films', film.slug]"
              class="film-title-item"
              [class]="'style-' + film.style"
              [class.is-active]="activeSlug() === film.slug"
              [attr.data-slug]="film.slug"
              (focus)="onFilmFocus(film, $event)"
              (click)="onFilmClick(film, $event)"
            >
              {{ film.title }}
            </a>

            <!-- Decorative repeats & Lit layer duplicates: non-focusable -->
            <span 
              *ngIf="passIdx > 0 || isLit"
              class="film-title-item"
              [class]="'style-' + film.style"
              [class.is-active]="activeSlug() === film.slug"
              [attr.data-slug]="film.slug"
              aria-hidden="true"
              tabindex="-1"
            >
              {{ film.title }}
            </span>
          </ng-container>
        </div>
      </ng-template>

      <!-- Desktop Cursor Ring & Tooltip -->
      <div class="spot-ring-wrap" aria-hidden="true">
        <div class="spot-cursor-ring"></div>
        
        <!-- Active Film Info Tooltip -->
        <div class="active-film-tooltip" *ngIf="activeFilm()">
          <span class="tooltip-text">{{ activeFilm()?.title }} · {{ activeFilm()?.year }} → View film</span>
        </div>

        <!-- Initial "MOVE THE LIGHT" Hint -->
        <div class="move-light-hint" *ngIf="showHint()">
          <span class="hint-dot">●</span>
          <span>MOVE THE LIGHT</span>
        </div>
      </div>

      <!-- Bottom Overlay: Tagline & CTA -->
      <div class="hero-bottom-overlay">
        <div class="bottom-left-group" [class.visible]="introDone()">
          <h1 class="hero-tagline font-serif">
            <span>Stories that stay </span>
            <span class="tagline-with-us">with us.</span>
          </h1>
          <p class="hero-subline">INDEPENDENT CINEMA · AAMIR KHAN PRODUCTIONS</p>
        </div>

        <div class="bottom-right-group" [class.visible]="introDone()">
          <a routerLink="/films" class="hero-explore-cta" aria-label="Explore the films">
            <span class="cta-label">EXPLORE THE FILMS</span>
            <span class="cta-circle-arrow" aria-hidden="true">
              <span class="arrow-glyph">↗</span>
            </span>
          </a>
        </div>
      </div>

      <!-- Static SVG Film Grain Overlay -->
      <div class="film-grain-overlay" aria-hidden="true"></div>

    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      background: #040404;
    }

    .spotlight-hero {
      --bg: #040404;
      --wall-dim: #151311;
      --wall-outline: #1d1a17;
      --lit: #F8ECD8;
      --accent: #E5262C;
      --glow: rgba(255, 196, 120, 0.20);
      --text: #F6EAD6;
      --text-muted: rgba(246, 234, 214, 0.60);
      --spot-r: 23vw;
      --pad-x: 56px;
      --nav-h: 110px;

      position: relative;
      width: 100%;
      height: 100svh;
      min-height: 640px;
      overflow: hidden;
      background: var(--bg);
      color: var(--text);
      cursor: none; /* Interactive ring replaces native cursor on desktop */
      user-select: none;
      -webkit-user-select: none;
      touch-action: pan-y;
      isolation: isolate;
    }

    /* Restore default pointer cursor over interactive controls */
    .hero-bottom-overlay a,
    .hero-bottom-overlay button {
      cursor: pointer;
    }

    /* 01 — WARM RADIAL HALO GLOW */
    .spot-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 56vw;
      height: 56vw;
      border-radius: 50%;
      background: radial-gradient(circle, var(--glow) 0%, transparent 62%);
      pointer-events: none;
      will-change: transform, opacity;
      z-index: 1;
      transition: opacity 0.3s ease;
    }

    /* 02 — THE TITLE WALLS */
    .title-wall {
      position: absolute;
      top: 70px;
      left: -6vw;
      right: -6vw;
      font-size: 7vw;
      line-height: 0.94;
      letter-spacing: -0.02em;
      text-align: justify;
      text-align-last: justify;
      white-space: normal;
      pointer-events: auto;
      z-index: 2;
    }

    .wall-pass {
      margin-bottom: 0.15em;
    }

    .film-title-item {
      display: inline-block;
      white-space: nowrap;
      margin-right: 0.22em;
      text-decoration: none;
      transition: color 0.18s ease, -webkit-text-stroke-color 0.18s ease, transform 0.18s ease;
      vertical-align: baseline;
      outline: none;
    }

    /* Pass-1 Focus State */
    .film-title-item:focus-visible {
      text-decoration: underline;
      text-decoration-color: var(--accent);
      text-underline-offset: 6px;
      text-decoration-thickness: 2px;
    }

    /* Font Roles as Specified */
    .style-condensed {
      font-family: 'Anton', Impact, sans-serif;
      text-transform: uppercase;
      letter-spacing: 0;
      font-weight: 400;
    }

    .style-serif {
      font-family: 'Instrument Serif', Georgia, serif;
      font-style: italic;
      font-weight: 400;
    }

    .style-didone {
      font-family: 'Bodoni Moda', Didot, serif;
      font-weight: 600;
    }

    .style-outline {
      font-family: 'Anton', Impact, sans-serif;
      text-transform: uppercase;
      letter-spacing: 0;
      font-weight: 400;
      color: transparent !important;
      -webkit-text-stroke: 1.5px var(--wall-outline);
    }

    /* BASE DIM WALL LAYER */
    .wall-base {
      color: var(--wall-dim);
    }

    .wall-base .film-title-item {
      color: var(--wall-dim);
    }

    .wall-base .film-title-item.is-active {
      color: var(--accent);
    }

    .wall-base .style-outline.is-active {
      -webkit-text-stroke-color: var(--accent);
    }

    /* LIT WALL LAYER (Identical structure, warm ivory, circular mask) */
    .wall-lit {
      color: var(--lit);
      text-shadow: 0 0 30px rgba(255, 196, 110, 0.35);
      pointer-events: none;
      z-index: 3;
      will-change: mask-image, -webkit-mask-image;
      -webkit-mask-image: radial-gradient(
        circle var(--r, 23vw) at var(--x, 36%) var(--y, 45%),
        #000 38%,
        rgba(0, 0, 0, 0.6) 58%,
        transparent 74%
      );
      mask-image: radial-gradient(
        circle var(--r, 23vw) at var(--x, 36%) var(--y, 45%),
        #000 38%,
        rgba(0, 0, 0, 0.6) 58%,
        transparent 74%
      );
    }

    .wall-lit .film-title-item {
      color: var(--lit);
    }

    .wall-lit .style-outline {
      -webkit-text-stroke-color: var(--lit);
    }

    .wall-lit .film-title-item.is-active {
      color: var(--accent);
      text-shadow: 0 0 36px rgba(229, 38, 44, 0.6);
    }

    .wall-lit .style-outline.is-active {
      -webkit-text-stroke-color: var(--accent);
    }

    /* 03 — CURSOR RING, TOOLTIP & HINT */
    .spot-ring-wrap {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 5;
      will-change: transform;
    }

    .spot-cursor-ring {
      width: 34px;
      height: 34px;
      border: 1.5px solid rgba(248, 236, 216, 0.7);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 16px rgba(255, 196, 120, 0.3);
      transition: border-color 0.2s ease, transform 0.15s ease;
    }

    .active-film-tooltip {
      position: absolute;
      left: 28px;
      top: -12px;
      white-space: nowrap;
      background: rgba(4, 4, 4, 0.88);
      border: 1px solid rgba(248, 236, 216, 0.25);
      border-radius: 3px;
      padding: 6px 12px;
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--lit);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
      animation: tooltipPop 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes tooltipPop {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .move-light-hint {
      position: absolute;
      left: 28px;
      top: 14px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: rgba(246, 234, 214, 0.7);
      animation: hintPulse 2s infinite ease-in-out;
    }

    .hint-dot {
      color: var(--accent);
      font-size: 7px;
    }

    @keyframes hintPulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 0.4; }
    }

    /* 04 — BOTTOM OVERLAY (Tagline & CTA) */
    .hero-bottom-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 70px var(--pad-x) 42px;
      background: linear-gradient(to top, #040404 0%, rgba(4, 4, 4, 0.85) 55%, transparent 100%);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 30px;
      z-index: 4;
      pointer-events: auto;
    }

    .bottom-left-group {
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .bottom-left-group.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .hero-tagline {
      font-family: 'Instrument Serif', Georgia, serif;
      font-style: italic;
      font-size: clamp(38px, 4.4vw, 64px);
      line-height: 1;
      letter-spacing: -0.01em;
      color: var(--text);
      margin: 0;
      font-weight: 400;
    }

    .tagline-with-us {
      font-style: normal;
      color: var(--accent);
    }

    .hero-subline {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin: 14px 0 0;
    }

    .bottom-right-group {
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
    }

    .bottom-right-group.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* CIRCULAR OUTLINED CTA */
    .hero-explore-cta {
      display: inline-flex;
      align-items: center;
      gap: 18px;
      text-decoration: none;
      color: var(--lit);
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      transition: color 0.25s ease;
    }

    .cta-circle-arrow {
      width: 64px;
      height: 64px;
      border: 1.5px solid rgba(248, 236, 216, 0.5);
      border-radius: 50%;
      display: grid;
      place-items: center;
      transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
    }

    .arrow-glyph {
      font-size: 20px;
      color: inherit;
      transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.25s ease;
    }

    .hero-explore-cta:hover .cta-circle-arrow {
      background-color: var(--lit);
      border-color: var(--lit);
      transform: scale(1.06);
    }

    .hero-explore-cta:hover .arrow-glyph {
      color: #040404;
      transform: rotate(45deg);
    }

    .hero-explore-cta:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 4px;
    }

    /* 05 — STATIC SVG FILM GRAIN OVERLAY */
    .film-grain-overlay {
      position: absolute;
      inset: 0;
      opacity: 0.07;
      pointer-events: none;
      z-index: 6;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* 06 — RESPONSIVE BEHAVIOURS */
    @media (max-width: 1199px) {
      .spotlight-hero {
        --spot-r: 30vw;
        --pad-x: 36px;
      }
      .title-wall {
        font-size: 9vw;
      }
    }

    @media (max-width: 768px) {
      .spotlight-hero {
        --spot-r: 42vw;
        --pad-x: 24px;
        cursor: auto; /* restore touch cursor on mobile */
      }
      .title-wall {
        font-size: 13vw;
        top: 80px;
      }
      .spot-ring-wrap {
        display: none; /* Hide cursor ring on mobile */
      }
      .hero-bottom-overlay {
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        padding: 50px var(--pad-x) 32px;
      }
      .hero-tagline {
        font-size: 40px;
      }
      .cta-circle-arrow {
        width: 48px;
        height: 48px;
      }
      .arrow-glyph {
        font-size: 16px;
      }
    }

    /* 07 — REDUCED MOTION SUPPORT */
    @media (prefers-reduced-motion: reduce) {
      .spot-glow,
      .spot-cursor-ring,
      .bottom-left-group,
      .bottom-right-group,
      .hero-explore-cta,
      .cta-circle-arrow,
      .arrow-glyph {
        transition: none !important;
        animation: none !important;
      }
      .bottom-left-group,
      .bottom-right-group {
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `]
})
export class SpotlightHeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroRef', { static: false }) heroRef!: ElementRef<HTMLElement>;
  @ViewChild('wallRef', { static: false }) wallRef!: ElementRef<HTMLElement>;

  passes = signal<SpotlightPass[]>(generateSpotlightPasses(4));
  activeSlug = signal<string | null>(null);
  activeFilm = signal<SpotlightFilm | null>(null);
  showHint = signal<boolean>(true);
  introDone = signal<boolean>(false);

  private controller: SpotlightController | null = null;
  private isBrowser: boolean;
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  // Touch tracking
  private lastTouchTapSlug: string | null = null;
  private lastTouchTapTime = 0;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const hintDismissed = sessionStorage.getItem('akp_spotlight_hint_dismissed') === 'true';
      if (hintDismissed) {
        this.showHint.set(false);
      }
      const introDone = sessionStorage.getItem('akp_spotlight_intro_done') === 'true';
      if (introDone) {
        this.introDone.set(true);
      }
    } else {
      this.introDone.set(true);
      this.showHint.set(false);
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Run animation controller outside Angular zone for true 60fps performance
    this.ngZone.runOutsideAngular(() => {
      this.controller = new SpotlightController(
        this.heroRef.nativeElement,
        this.wallRef.nativeElement,
        {
          onActiveFilmChange: (slug, film) => {
            this.ngZone.run(() => {
              this.activeSlug.set(slug);
              this.activeFilm.set(film);
            });
          },
          onDismissHint: () => {
            this.ngZone.run(() => {
              this.showHint.set(false);
            });
          },
          onIntroComplete: () => {
            this.ngZone.run(() => {
              this.introDone.set(true);
            });
          }
        }
      );

      this.controller.init();
    });
  }

  onPointerMove(event: PointerEvent): void {
    if (this.controller && event.pointerType !== 'touch') {
      this.controller.handlePointerMove(event.clientX, event.clientY);
    }
  }

  onPointerDown(event: PointerEvent): void {
    if (this.controller) {
      this.controller.handlePointerMove(event.clientX, event.clientY);
    }
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length > 0 && this.controller) {
      const touch = event.touches[0];
      this.controller.handlePointerMove(touch.clientX, touch.clientY);
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0 && this.controller) {
      const touch = event.touches[0];
      this.controller.handlePointerMove(touch.clientX, touch.clientY);
    }
  }

  onFilmFocus(film: SpotlightFilm, event: FocusEvent): void {
    if (this.controller) {
      const target = event.target as HTMLElement;
      this.controller.focusElement(target);
    }
  }

  onFilmBlur(): void {
    // Keep film illuminated or let controller handle
  }

  onFilmClick(film: SpotlightFilm, event: MouseEvent): void {
    // Touch behavior: tap once to illuminate, tap again to navigate
    if (typeof window !== 'undefined' && 'ontouchstart' in window && window.innerWidth < 768) {
      const now = performance.now();
      if (this.lastTouchTapSlug !== film.slug || now - this.lastTouchTapTime > 3000) {
        event.preventDefault();
        this.lastTouchTapSlug = film.slug;
        this.lastTouchTapTime = now;
        this.activeSlug.set(film.slug);
        this.activeFilm.set(film);
        return;
      }
    }
    // Otherwise standard router navigation handles it
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.controller) {
      this.controller.onResize();
    }
  }

  ngOnDestroy(): void {
    if (this.controller) {
      this.controller.destroy();
      this.controller = null;
    }
  }
}
