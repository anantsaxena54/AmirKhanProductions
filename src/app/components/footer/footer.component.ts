import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer" [class.dark-footer]="isDark">
      <div class="footer-top">
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <img 
              src="assets/brand/Aamir_khan_productions.png" 
              alt="AKP Mark" 
              class="footer-logo"
              width="36"
              height="44"
            />
            <div>
              <span class="footer-brand-title">AAMIR KHAN PRODUCTIONS</span>
              <span class="footer-brand-sub">PVT. LTD.</span>
            </div>
          </div>
          <p class="footer-motto">
            Stories that stay with us. Dedicated to independent, thought-provoking cinema that touches human experience across generations.
          </p>
          <div class="footer-address">
            <span>Bandra West, Mumbai 400 050</span>
            <span>Maharashtra, India</span>
          </div>
        </div>

        <div class="footer-col nav-col">
          <span class="col-title">NAVIGATION</span>
          <ul class="footer-links">
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/films">Film Archive</a></li>
            <li><a routerLink="/beyond-the-frame">Beyond the Frame</a></li>
            <li><a routerLink="/studio">The Studio</a></li>
            <li><a routerLink="/journal">Editorial Journal</a></li>
            <li><a routerLink="/contact">Contact & Inquiries</a></li>
          </ul>
        </div>

        <div class="footer-col films-col">
          <span class="col-title">NOTABLE CINEMA</span>
          <ul class="footer-links">
            <li><a routerLink="/films/lagaan">Lagaan (2001)</a></li>
            <li><a routerLink="/films/taare-zameen-par">Taare Zameen Par (2007)</a></li>
            <li><a routerLink="/films/dangal">Dangal (2016)</a></li>
            <li><a routerLink="/films/laapataa-ladies">Laapataa Ladies (2024)</a></li>
            <li><a routerLink="/films/sitaare-zameen-par">Sitaare Zameen Par (2025)</a></li>
          </ul>
        </div>

        <div class="footer-col archive-col">
          <span class="col-title">CINEMA ARCHIVE</span>
          <p class="archive-note">
            Preserving 35mm negative prints, original audio master tapes, and collaborative screenplay records since 1999.
          </p>
          <div class="format-tags">
            <span>35MM CELLULOID</span>
            <span>4K DIGITAL MASTERS</span>
            <span>DOLBY ATMOS</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="bottom-left">
          <span>© {{ currentYear }} Aamir Khan Productions Pvt. Ltd. All rights reserved.</span>
          <span class="disclaimer-tag">Concept Website Presentation · Agency Pitch</span>
        </div>
        <div class="bottom-right">
          <span>Designed with Lumbre-inspired editorial discipline & 35mm craft.</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background-color: var(--paper);
      border-top: 1px solid var(--line);
      color: var(--ink);
      padding: 80px var(--gutter) 40px;
      margin-top: auto;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .site-footer.dark-footer {
      background-color: var(--hero-bg);
      border-color: var(--hero-line);
      color: var(--hero-ivory);
    }

    .footer-top {
      max-width: var(--max-content);
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 60px;
      padding-bottom: 60px;
      border-bottom: 1px solid var(--line);
    }

    .dark-footer .footer-top {
      border-color: var(--hero-line);
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 20px;
    }

    .footer-logo {
      height: 44px;
      width: auto;
      object-fit: contain;
    }

    .footer-brand-title {
      font-family: var(--font-display);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.18em;
      display: block;
    }

    .footer-brand-sub {
      font-size: 9px;
      letter-spacing: 0.22em;
      color: var(--red);
      font-weight: 500;
    }

    .footer-motto {
      font-size: 14px;
      color: var(--ink-muted);
      line-height: 1.6;
      max-width: 380px;
      margin-bottom: 20px;
    }

    .dark-footer .footer-motto {
      color: var(--hero-muted);
    }

    .footer-address {
      font-size: 12px;
      color: var(--ink-secondary);
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .dark-footer .footer-address {
      color: var(--hero-muted);
    }

    .col-title {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.18em;
      color: var(--red);
      margin-bottom: 24px;
      display: block;
    }

    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .footer-links a {
      font-size: 13px;
      color: var(--ink-secondary);
      transition: color 0.2s ease, transform 0.2s ease;
      display: inline-block;
    }

    .dark-footer .footer-links a {
      color: #C7C6C0;
    }

    .footer-links a:hover {
      color: var(--red);
      transform: translateX(4px);
    }

    .archive-note {
      font-size: 13px;
      color: var(--ink-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .dark-footer .archive-note {
      color: var(--hero-muted);
    }

    .format-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .format-tags span {
      font-size: 9px;
      letter-spacing: 0.12em;
      padding: 6px 12px;
      border: 1px solid var(--line);
      border-radius: 20px;
      color: var(--ink-muted);
    }

    .dark-footer .format-tags span {
      border-color: var(--hero-line);
      color: var(--hero-muted);
    }

    /* Footer Bottom */
    .footer-bottom {
      max-width: var(--max-content);
      margin: 0 auto;
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: var(--ink-light);
      letter-spacing: 0.04em;
      flex-wrap: wrap;
      gap: 16px;
    }

    .bottom-left {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }

    .disclaimer-tag {
      color: var(--red);
      font-weight: 500;
    }

    @media (max-width: 990px) {
      .footer-top {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
      }
    }

    @media (max-width: 600px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class FooterComponent {
  @Input() isDark = false;
  currentYear = 2026;
}
