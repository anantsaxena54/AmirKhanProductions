import { 
  Component, 
  ElementRef, 
  OnInit, 
  OnDestroy, 
  ViewChild, 
  HostListener, 
  NgZone, 
  PLATFORM_ID, 
  Inject 
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-hero-scene',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-scene-container" #container>
      <!-- Fallback static graphic if WebGL unavailable or reduced motion -->
      <div class="static-fallback" *ngIf="useFallback">
        <div class="fallback-glow"></div>
        <img 
          src="assets/media/vintage-projector.jpg" 
          alt="Vintage 35mm Projector and Film Craft" 
          class="fallback-img"
        />
      </div>

      <!-- Live Three.js WebGL Canvas -->
      <canvas #canvas class="webgl-canvas" [class.hidden]="useFallback"></canvas>

      <!-- Interactive Badge / Film Format Meta -->
      <div class="scene-meta-badge">
        <span class="live-dot" aria-hidden="true"></span>
        <span class="format-txt">35MM CELLULOID · 24 FPS · ANAMORPHIC</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 2;
    }

    .hero-scene-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .webgl-canvas {
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: auto;
    }

    .webgl-canvas.hidden {
      display: none;
    }

    .static-fallback {
      position: absolute;
      right: 0;
      top: 0;
      width: 55%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .fallback-img {
      max-width: 80%;
      max-height: 80%;
      object-fit: contain;
      opacity: 0.85;
      filter: contrast(1.15) brightness(1.1);
      mask-image: radial-gradient(circle at center, black 50%, transparent 85%);
      -webkit-mask-image: radial-gradient(circle at center, black 50%, transparent 85%);
    }

    .fallback-glow {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(197, 168, 69, 0.28) 0%, transparent 70%);
      filter: blur(50px);
    }

    .scene-meta-badge {
      position: absolute;
      bottom: 74px;
      right: var(--gutter);
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 10px;
      letter-spacing: 0.16em;
      color: rgba(243, 241, 234, 0.7);
      background: rgba(14, 18, 22, 0.65);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(243, 241, 234, 0.12);
      padding: 6px 14px;
      border-radius: 20px;
      z-index: 10;
      pointer-events: auto;
    }

    .live-dot {
      width: 6px;
      height: 6px;
      background-color: var(--red);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--red);
      animation: pulse 2s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    @media (max-width: 900px) {
      .scene-meta-badge {
        display: none;
      }
    }
  `]
})
export class HeroSceneComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  useFallback = false;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cameraGroup!: THREE.Group;
  private filmRibbonMesh!: THREE.Mesh;
  private beamMesh!: THREE.Mesh;
  private animationFrameId: number | null = null;

  // Mouse Parallax coordinates
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;

  // Scroll rotation
  private scrollProgress = 0;

  // Time
  private clock = new THREE.Clock();

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.useFallback = true;
      return;
    }

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.useFallback = true;
      return;
    }

    this.initThree();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.renderer || !this.camera || !this.containerRef) return;
    const width = this.containerRef.nativeElement.clientWidth;
    const height = this.containerRef.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Responsive repositioning
    if (width < 900) {
      this.cameraGroup.position.set(0.6, -0.4, 0);
      this.cameraGroup.scale.set(0.72, 0.72, 0.72);
    } else {
      this.cameraGroup.position.set(2.4, 0.1, 0);
      this.cameraGroup.scale.set(1.1, 1.1, 1.1);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    this.targetX = (event.clientX - halfWidth) / halfWidth;
    this.targetY = (event.clientY - halfHeight) / halfHeight;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollY = window.scrollY;
    this.scrollProgress = Math.min(scrollY / 700, 1.5);
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 750;

    try {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 7.8);

      this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;

      // Lighting: Warm amber spotlight & subtle fill
      const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.6);
      this.scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffecd2, 2.4);
      mainLight.position.set(5, 4, 6);
      this.scene.add(mainLight);

      const amberRimLight = new THREE.DirectionalLight(0xbf6d15, 3.2);
      amberRimLight.position.set(-6, 2, -2);
      this.scene.add(amberRimLight);

      const goldBacklight = new THREE.PointLight(0xc5a845, 2.0, 15);
      goldBacklight.position.set(2.5, 2, -3);
      this.scene.add(goldBacklight);

      // Build 35mm Vintage Camera and Ribbon Rig
      this.buildCameraRig();
      this.buildProjectorBeam();
      this.buildFilmRibbon();

      this.onResize();

      // Run render loop outside Angular zone to optimize change detection performance
      this.ngZone.runOutsideAngular(() => {
        this.animate();
      });
    } catch (e) {
      console.warn('WebGL initialization fallback triggered:', e);
      this.useFallback = true;
    }
  }

  private buildCameraRig(): void {
    this.cameraGroup = new THREE.Group();

    // Materials
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x14181c,
      metalness: 0.88,
      roughness: 0.28
    });

    const brassGold = new THREE.MeshStandardMaterial({
      color: 0xb59544,
      metalness: 0.95,
      roughness: 0.22
    });

    const matteBlack = new THREE.MeshStandardMaterial({
      color: 0x090b0d,
      metalness: 0.35,
      roughness: 0.75
    });

    const lensGlass = new THREE.MeshPhysicalMaterial({
      color: 0x1a2634,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.8,
      ior: 1.52,
      reflectivity: 0.9
    });

    // 1. Camera Body (Main Housing)
    const bodyGeo = new THREE.BoxGeometry(1.6, 1.2, 1.4);
    const bodyMesh = new THREE.Mesh(bodyGeo, darkMetal);
    this.cameraGroup.add(bodyMesh);

    // Subtle chamfer side plates
    const sidePlateGeo = new THREE.BoxGeometry(1.64, 0.95, 1.25);
    const sidePlateMesh = new THREE.Mesh(sidePlateGeo, matteBlack);
    this.cameraGroup.add(sidePlateMesh);

    // 2. Dual Top 35mm Film Magazines (The Classic Double Canister)
    const magR = 0.52;
    const magGeo = new THREE.CylinderGeometry(magR, magR, 0.5, 32);

    const magLeft = new THREE.Mesh(magGeo, darkMetal);
    magLeft.rotation.z = Math.PI / 2;
    magLeft.position.set(-0.35, 0.92, -0.15);
    this.cameraGroup.add(magLeft);

    const magRight = new THREE.Mesh(magGeo, darkMetal);
    magRight.rotation.z = Math.PI / 2;
    magRight.position.set(0.35, 0.92, -0.15);
    this.cameraGroup.add(magRight);

    // Brass Magazine Caps & Latches
    const capGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.52, 24);
    const capLeft = new THREE.Mesh(capGeo, brassGold);
    capLeft.rotation.z = Math.PI / 2;
    capLeft.position.set(-0.35, 0.92, -0.15);
    this.cameraGroup.add(capLeft);

    const capRight = new THREE.Mesh(capGeo, brassGold);
    capRight.rotation.z = Math.PI / 2;
    capRight.position.set(0.35, 0.92, -0.15);
    this.cameraGroup.add(capRight);

    // 3. Heavy 35mm Prime Lens (Pointing Leftward toward the headline)
    const lensGroup = new THREE.Group();
    lensGroup.position.set(-0.8, 0.05, 0);
    lensGroup.rotation.z = Math.PI / 2;

    const baseLensGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.4, 32);
    const baseLens = new THREE.Mesh(baseLensGeo, darkMetal);
    lensGroup.add(baseLens);

    // Brass Aperture & Focus Knurled Rings
    const ringGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.12, 32);
    const ringMesh1 = new THREE.Mesh(ringGeo, brassGold);
    ringMesh1.position.y = 0.22;
    lensGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, darkMetal);
    ringMesh2.position.y = 0.35;
    lensGroup.add(ringMesh2);

    // Front Barrel & Sunshade Hood
    const hoodGeo = new THREE.ConeGeometry(0.58, 0.35, 32, 1, true);
    const hoodMesh = new THREE.Mesh(hoodGeo, matteBlack);
    hoodMesh.rotation.x = Math.PI;
    hoodMesh.position.y = 0.55;
    lensGroup.add(hoodMesh);

    // Front Glass Element
    const glassGeo = new THREE.CircleGeometry(0.38, 32);
    const glassMesh = new THREE.Mesh(glassGeo, lensGlass);
    glassMesh.rotation.x = -Math.PI / 2;
    glassMesh.position.y = 0.45;
    lensGroup.add(glassMesh);

    this.cameraGroup.add(lensGroup);

    // 4. Optical Viewfinder Tube (Mounted on Top Side)
    const finderGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.3, 20);
    const finderMesh = new THREE.Mesh(finderGeo, darkMetal);
    finderMesh.rotation.x = Math.PI / 2;
    finderMesh.position.set(0.2, 0.65, 0.75);
    this.cameraGroup.add(finderMesh);

    const eyepieceGeo = new THREE.CylinderGeometry(0.16, 0.13, 0.18, 20);
    const eyepiece = new THREE.Mesh(eyepieceGeo, brassGold);
    eyepiece.rotation.x = Math.PI / 2;
    eyepiece.position.set(0.2, 0.65, 1.4);
    this.cameraGroup.add(eyepiece);

    // 5. Motor Crank / Hand Drive Handle on right
    const handleGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 16);
    const handleMesh = new THREE.Mesh(handleGeo, brassGold);
    handleMesh.position.set(0.85, 0.1, 0.2);
    this.cameraGroup.add(handleMesh);

    // 6. Camera Base Mount Plate with Red Accent Mark
    const baseGeo = new THREE.BoxGeometry(1.4, 0.12, 1.2);
    const basePlate = new THREE.Mesh(baseGeo, matteBlack);
    basePlate.position.y = -0.65;
    this.cameraGroup.add(basePlate);

    const redDotGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const redDotMat = new THREE.MeshBasicMaterial({ color: 0xbb4941 });
    const redDot = new THREE.Mesh(redDotGeo, redDotMat);
    redDot.position.set(-0.82, 0.45, 0.55);
    this.cameraGroup.add(redDot);

    // Initial orientation: slightly turned so lens points toward headline
    this.cameraGroup.rotation.set(0.12, -0.45, 0.04);
    this.scene.add(this.cameraGroup);
  }

  private buildProjectorBeam(): void {
    // Volumetric warm projector beam casting light from lens leftward
    const beamGeo = new THREE.ConeGeometry(2.8, 6.5, 32, 1, true);
    
    // Custom gradient shader or transparent amber material
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffd285,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.beamMesh = new THREE.Mesh(beamGeo, beamMat);
    this.beamMesh.rotation.z = Math.PI / 2;
    this.beamMesh.position.set(-3.8, 0.05, 0);
    this.cameraGroup.add(this.beamMesh);
  }

  private buildFilmRibbon(): void {
    // Create an evocative amber 3D filmstrip ribbon twisting around the camera
    const curvePoints = [
      new THREE.Vector3(2.5, -1.8, -1.2),
      new THREE.Vector3(1.2, -1.2, 0.8),
      new THREE.Vector3(-0.6, -0.6, 1.4),
      new THREE.Vector3(-1.8, 0.4, 0.6),
      new THREE.Vector3(-0.9, 1.5, -0.8),
      new THREE.Vector3(0.8, 1.8, -1.5),
      new THREE.Vector3(2.2, 0.9, -0.5),
      new THREE.Vector3(2.6, -0.4, 0.9),
      new THREE.Vector3(1.1, -1.5, 1.6)
    ];

    const curve = new THREE.CatmullRomCurve3(curvePoints, true);

    // Create a procedural filmstrip texture with sprocket holes and frames
    const filmTexture = this.generateFilmstripTexture();
    filmTexture.wrapS = THREE.RepeatWrapping;
    filmTexture.wrapT = THREE.ClampToEdgeWrapping;
    filmTexture.repeat.set(16, 1);

    const tubeGeo = new THREE.TubeGeometry(curve, 180, 0.28, 6, true);
    
    // Stretch to create ribbon profile
    tubeGeo.scale(1.0, 0.12, 1.0);

    const ribbonMat = new THREE.MeshStandardMaterial({
      map: filmTexture,
      color: 0xffa438,
      emissive: 0x5a2d04,
      emissiveIntensity: 0.45,
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });

    this.filmRibbonMesh = new THREE.Mesh(tubeGeo, ribbonMat);
    this.cameraGroup.add(this.filmRibbonMesh);
  }

  private generateFilmstripTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Amber film base
    ctx.fillStyle = '#1c1005';
    ctx.fillRect(0, 0, 512, 128);

    // Transparent amber center track
    ctx.fillStyle = '#b56d1c';
    ctx.fillRect(0, 24, 512, 80);

    // 35mm Frame Dividers
    ctx.strokeStyle = '#0e0701';
    ctx.lineWidth = 4;
    for (let x = 0; x < 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 24);
      ctx.lineTo(x, 104);
      ctx.stroke();

      // Film frame thumbnail tone
      ctx.fillStyle = 'rgba(255, 215, 140, 0.25)';
      ctx.fillRect(x + 6, 28, 52, 72);
    }

    // Sprocket holes (Top & Bottom tracks)
    ctx.fillStyle = '#08090a';
    for (let x = 12; x < 512; x += 32) {
      // Top sprocket
      ctx.beginPath();
      ctx.roundRect(x, 6, 14, 12, 3);
      ctx.fill();

      // Bottom sprocket
      ctx.beginPath();
      ctx.roundRect(x, 110, 14, 12, 3);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth mouse parallax damping
    this.currentX += (this.targetX - this.currentX) * 0.05;
    this.currentY += (this.targetY - this.currentY) * 0.05;

    if (this.cameraGroup) {
      // Idle breathing float
      const idleFloatY = Math.sin(elapsedTime * 0.8) * 0.05;
      const idleRotZ = Math.cos(elapsedTime * 0.6) * 0.02;

      // Base orientation + mouse parallax + scroll reaction
      this.cameraGroup.rotation.y = -0.45 + (this.currentX * 0.25) - (this.scrollProgress * 0.6);
      this.cameraGroup.rotation.x = 0.12 + (-this.currentY * 0.2) + (this.scrollProgress * 0.2);
      this.cameraGroup.rotation.z = 0.04 + idleRotZ;
      this.cameraGroup.position.y = (this.containerRef.nativeElement.clientWidth < 900 ? -0.4 : 0.1) + idleFloatY - (this.scrollProgress * 0.5);

      // Light beam subtle flicker & breathing
      if (this.beamMesh) {
        const flicker = 0.13 + Math.sin(elapsedTime * 8) * 0.015 + Math.cos(elapsedTime * 19) * 0.01;
        (this.beamMesh.material as THREE.MeshBasicMaterial).opacity = flicker;
      }

      // Film ribbon rotation and undulation
      if (this.filmRibbonMesh) {
        this.filmRibbonMesh.rotation.y = elapsedTime * 0.2 + this.scrollProgress * 1.5;
        this.filmRibbonMesh.rotation.z = Math.sin(elapsedTime * 0.5) * 0.08;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}
