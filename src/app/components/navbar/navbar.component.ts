import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header" [class.dark-header]="isActuallyDark" [class.scrolled]="isScrolled">
      <div class="header-inner">
        <!-- AKP Brand Lockup -->
        <a routerLink="/" class="brand-link" aria-label="Aamir Khan Productions Home">
          <img 
            src="assets/brand/Aamir_khan_productions.png" 
            alt="Aamir Khan Productions Logo" 
            class="brand-icon"
            width="42"
            height="52"
          />
          <div class="brand-divider" aria-hidden="true"></div>
          <div class="brand-text">
            <span class="brand-title">AAMIR KHAN PRODUCTIONS</span>
            <span class="brand-subtitle">PVT. LTD.</span>
          </div>
        </a>

        <!-- Desktop Navigation (BUCK-inspired refined hover indicator) -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <a 
            routerLink="/" 
            routerLinkActive="active-nav" 
            [routerLinkActiveOptions]="{ exact: true }"
            class="nav-item">
            <span>Home</span>
          </a>
          <a 
            routerLink="/films" 
            routerLinkActive="active-nav" 
            class="nav-item">
            <span>Films</span>
          </a>
          <a 
            routerLink="/beyond-the-frame" 
            routerLinkActive="active-nav" 
            class="nav-item">
            <span>Beyond the Frame</span>
          </a>
          <a 
            routerLink="/studio" 
            routerLinkActive="active-nav" 
            class="nav-item">
            <span>Studio</span>
          </a>
          <a 
            routerLink="/journal" 
            routerLinkActive="active-nav" 
            class="nav-item">
            <span>Journal</span>
          </a>
          <a 
            routerLink="/contact" 
            routerLinkActive="active-nav" 
            class="nav-item">
            <span>Contact</span>
          </a>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button 
          class="menu-toggle-btn" 
          (click)="toggleMobileMenu()" 
          [attr.aria-expanded]="mobileMenuOpen"
          aria-controls="mobile-overlay"
          aria-label="Toggle navigation menu">
          <span class="menu-label">{{ mobileMenuOpen ? 'CLOSE' : 'MENU' }}</span>
          <span class="menu-icon" aria-hidden="true">{{ mobileMenuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </header>

    <!-- Ordinary Folk-inspired Full-Screen Mobile Menu Overlay -->
    <div 
      id="mobile-overlay" 
      class="mobile-menu-overlay" 
      [class.open]="mobileMenuOpen"
      role="dialog" 
      aria-modal="true" 
      aria-label="Mobile Navigation">
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <span class="eyebrow eyebrow-hero">AAMIR KHAN PRODUCTIONS</span>
          <button class="mobile-close-btn" (click)="closeMobileMenu()" aria-label="Close menu">✕</button>
        </div>

        <nav class="mobile-nav-links">
          <a routerLink="/" (click)="closeMobileMenu()" class="mobile-link" [class.active]="currentUrl === '/'">
            <span class="mobile-link-num">01</span>
            <span class="mobile-link-title">Home</span>
            <span class="mobile-arrow">↗</span>
          </a>
          <a routerLink="/films" (click)="closeMobileMenu()" class="mobile-link" [class.active]="currentUrl.startsWith('/films')">
            <span class="mobile-link-num">02</span>
            <span class="mobile-link-title">Films</span>
            <span class="mobile-arrow">↗</span>
          </a>
          <a routerLink="/beyond-the-frame" (click)="closeMobileMenu()" class="mobile-link" [class.active]="currentUrl.startsWith('/beyond-the-frame')">
            <span class="mobile-link-num">03</span>
            <span class="mobile-link-title">Beyond the Frame</span>
            <span class="mobile-arrow">↗</span>
          </a>
          <a routerLink="/studio" (click)="closeMobileMenu()" class="mobile-link" [class.active]="currentUrl === '/studio'">
            <span class="mobile-link-num">04</span>
            <span class="mobile-link-title">Studio</span>
            <span class="mobile-arrow">↗</span>
          </a>
          <a routerLink="/journal" (click)="closeMobileMenu()" class="mobile-link" [class.active]="currentUrl === '/journal'">
            <span class="mobile-link-num">05</span>
            <span class="mobile-link-title">Journal</span>
            <span class="mobile-arrow">↗</span>
          </a>
          <a routerLink="/contact" (click)="closeMobileMenu()" class="mobile-link" [class.active]="currentUrl === '/contact'">
            <span class="mobile-link-num">06</span>
            <span class="mobile-link-title">Contact</span>
            <span class="mobile-arrow">↗</span>
          </a>
        </nav>

        <div class="mobile-menu-footer">
          <p class="mobile-tagline">Stories that stay with us.</p>
          <span class="mobile-meta">EST. 1999 · MUMBAI, INDIA</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
    }

    .site-header {
      width: 100%;
      height: var(--header-height);
      background-color: var(--paper);
      border-bottom: 1px solid var(--line);
      transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
    }

    .site-header.dark-header {
      background-color: #080C0E;
      border-bottom: 1px solid rgba(255, 255, 255, 0.17);
      color: var(--hero-ivory);
    }

    .dark-header .brand-icon {
      filter: brightness(0) invert(1);
    }

    .dark-header .brand-divider {
      background-color: #777779;
    }

    .dark-header .brand-title {
      color: #F8F6F0;
    }

    .dark-header .brand-subtitle {
      color: #A8A6A0;
    }

    .site-header.scrolled {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    }

    .header-inner {
      max-width: var(--max-content);
      height: 100%;
      margin: 0 auto;
      padding: 0 var(--gutter);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Brand */
    .brand-link {
      display: flex;
      align-items: center;
      gap: 14px;
      user-select: none;
    }

    .brand-icon {
      height: 48px;
      width: auto;
      object-fit: contain;
      filter: contrast(1.1);
    }

    .brand-divider {
      width: 1px;
      height: 34px;
      background-color: var(--red);
      opacity: 0.8;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .brand-title {
      font-family: var(--font-display);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.18em;
      line-height: 1.2;
    }

    .brand-subtitle {
      font-family: var(--font-body);
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 0.24em;
      color: var(--red);
      line-height: 1;
    }

    /* Desktop Navigation with BUCK-style sliding hover */
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 36px;
    }

    .nav-item {
      position: relative;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.06em;
      padding: 10px 0;
      transition: color 0.25s ease;
    }

    .nav-item span {
      position: relative;
      z-index: 1;
    }

    .nav-item::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 0%;
      height: 2px;
      background-color: var(--red);
      transition: width 0.28s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .nav-item:hover::after,
    .nav-item.active-nav::after {
      width: 100%;
    }

    .nav-item.active-nav {
      font-weight: 600;
    }

    .dark-header .nav-item {
      color: #E2E0D8;
    }

    .dark-header .nav-item:hover,
    .dark-header .nav-item.active-nav {
      color: #FFFFFF;
    }

    /* Mobile Menu Button */
    .menu-toggle-btn {
      display: none;
      align-items: center;
      gap: 10px;
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.14em;
      padding: 8px 14px;
      border: 1px solid var(--line);
      border-radius: 20px;
    }

    .dark-header .menu-toggle-btn {
      border-color: var(--hero-line);
      color: var(--hero-ivory);
    }

    /* Ordinary Folk Overlay */
    .mobile-menu-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(8, 9, 10, 0.98);
      backdrop-filter: blur(16px);
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mobile-menu-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .mobile-menu-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 32px 28px;
      max-width: 500px;
      margin: 0 auto;
      width: 100%;
    }

    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(250, 248, 245, 0.12);
      padding-bottom: 20px;
    }

    .mobile-close-btn {
      font-size: 20px;
      color: #FFFFFF;
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(250, 248, 245, 0.2);
      border-radius: 50%;
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 40px 0;
    }

    .mobile-link {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid rgba(250, 248, 245, 0.08);
      color: #FFFFFF;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .mobile-link:hover,
    .mobile-link.active {
      color: var(--red);
      transform: translateX(6px);
    }

    .mobile-link-num {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.15em;
      color: var(--hero-muted);
      width: 30px;
    }

    .mobile-link-title {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 500;
      letter-spacing: -0.03em;
      flex: 1;
    }

    .mobile-arrow {
      font-size: 22px;
      opacity: 0.6;
    }

    .mobile-menu-footer {
      border-top: 1px solid rgba(250, 248, 245, 0.12);
      padding-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .mobile-tagline {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 18px;
      color: #FFFFFF;
    }

    .mobile-meta {
      font-size: 10px;
      letter-spacing: 0.18em;
      color: var(--hero-muted);
    }

    @media (max-width: 820px) {
      .desktop-nav {
        display: none;
      }
      .menu-toggle-btn {
        display: flex;
      }
    }
  `]
})
export class NavbarComponent {
  @Input() isDarkTheme = false;
  isScrolled = false;
  isScrolledPastHero = false;
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  get currentUrl(): string {
    return this.router.url;
  }

  get isActuallyDark(): boolean {
    if (!this.isDarkTheme) return false;
    return !this.isScrolledPastHero;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 20;
    this.isScrolledPastHero = scrollY > 700;
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
