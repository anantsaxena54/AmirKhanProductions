import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AKP_FILMS, AKP_ARTICLES } from '../../data/films.data';
import { Film, JournalArticle } from '../../models/film.model';
import { SpotlightHeroComponent } from '../spotlight-hero/spotlight-hero.component';
import { WavingHeroComponent } from '../waving-hero/waving-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, WavingHeroComponent],
  template: `
    <!-- =========================================================================
         01 — WAVING POSTER LANDING HERO (CURRENT ACTIVE HERO)
         Red-on-paper poster landing with letter reel slot motion, interactive
         waving character, dice rolls, letter bursts, and signature badge.
    ========================================================================= -->
    <app-waving-hero></app-waving-hero>

    <!-- =========================================================================
         HERO ARCHIVE & STASH (PRESERVED FOR QUICK TOGGLE / RESTORATION):

         STASH: Spotlight Film-Title Wall Hero
         Spec: AKP_SPOTLIGHT_HERO_AGENT_SPEC.md
         To activate: uncomment <app-spotlight-hero> below and comment out <app-waving-hero>
    =========================================================================
    <app-spotlight-hero></app-spotlight-hero>
    ========================================================================= -->

    <!-- =========================================================================
         VARIANT A: 35MM CINEMA PROJECTOR HERO (Dark Theme with Light Cone & Beam)
         To activate: uncomment the section below and comment out <app-waving-hero>
    =========================================================================
    <section 
      class="hero hero-v2 projector-hero" 
      aria-labelledby="hero-title"
      (mousemove)="onMouseMove($event)" 
      (mouseleave)="onMouseLeave()"
    >
      <div class="projector-beam" [style.transform]="beamTransform" aria-hidden="true"></div>

      <img 
        class="projector-visual" 
        src="assets/media/projector-visual.webp" 
        alt="Simplex 35mm Cinema Projector"
        [style.transform]="projectorTransform"
      />

      <div class="hero-frame" aria-hidden="true">
        <span>WEBSITE DESIGN CONCEPT · 2026</span>
        <span>01 — 06</span>
      </div>

      <div class="hero-inner">
        <div class="eyebrow eyebrow-hero">
          <span>INDEPENDENT CINEMA · AAMIR KHAN PRODUCTIONS</span>
        </div>

        <h1 id="hero-title">
          <span>Stories</span>
          <span>that stay</span>
          <em>with us.</em>
        </h1>

        <div class="hero-subrow">
          <p class="hero-desc">
            Films that stay with you long after the credits roll.
          </p>

          <a routerLink="/films" class="hero-cta" aria-label="Explore our films">
            <span class="cta-orb" aria-hidden="true">↗</span>
            <span>EXPLORE OUR FILMS</span>
          </a>
        </div>
      </div>

      <div class="hero-bottom">
        <span class="hero-index">AAMIR KHAN PRODUCTIONS <b>—</b> CINEMA & STORIES</span>

        <a href="#featured-films" class="scroll-cue" (click)="scrollToFeatured($event)">
          <span>SCROLL TO EXPLORE</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
    ========================================================================= -->

    <!-- =========================================================================
         VARIANT B: EDITORIAL 6-POSTER COLLAGE HERO (Warm Ivory Minimalist Theme)
         To activate: uncomment the section below and comment out <app-spotlight-hero>
    =========================================================================
    <section 
      class="hero collage-hero" 
      aria-labelledby="hero-title"
      (mousemove)="onHeroMouseMove($event)"
      (mouseleave)="onHeroMouseLeave()"
    >
      <div class="collage-hero-container">
        
        <div class="collage-hero-left">
          <h1 id="hero-title" class="collage-hero-headline">
            <span class="headline-serif">Stories that</span>
            <em class="headline-italic font-serif">stay with us<span class="dot-red">.</span></em>
          </h1>

          <div class="hero-red-divider" aria-hidden="true"></div>

          <div class="hero-action-row">
            <a routerLink="/films" class="hero-cta-btn" aria-label="Explore Our Films">
              <span>Explore Our Films</span>
              <span class="arrow-glyph" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div class="collage-hero-right" [style.transform]="collageTransform">
          <div class="collage-visual-frame">
            <img 
              src="assets/media/hero-posters-cutout.png" 
              alt="Aamir Khan Productions notable cinema collection: Laal Singh Chaddha, Secret Superstar, Sitaare Zameen Par, Taare Zameen Par, Dangal, and Laapataa Ladies" 
              class="collage-visual-img"
              loading="eager"
            />

            <a routerLink="/films/laal-singh-chaddha" class="poster-hotspot hotspot-lsc" aria-label="View Laal Singh Chaddha details" title="Laal Singh Chaddha"></a>
            <a routerLink="/films/secret-superstar" class="poster-hotspot hotspot-ss" aria-label="View Secret Superstar details" title="Secret Superstar"></a>
            <a routerLink="/films/sitaare-zameen-par" class="poster-hotspot hotspot-szp" aria-label="View Sitaare Zameen Par details" title="Sitaare Zameen Par"></a>
            <a routerLink="/films/taare-zameen-par" class="poster-hotspot hotspot-tzp" aria-label="View Taare Zameen Par details" title="Taare Zameen Par"></a>
            <a routerLink="/films/dangal" class="poster-hotspot hotspot-dangal" aria-label="View Dangal details" title="Dangal"></a>
            <a routerLink="/films/laapataa-ladies" class="poster-hotspot hotspot-ll" aria-label="View Laapataa Ladies details" title="Laapataa Ladies"></a>
          </div>
        </div>

      </div>

      <div class="hero-bottom-cue">
        <a href="#featured-films" class="scroll-link" (click)="scrollToFeatured($event)">
          <span>SCROLL TO EXPLORE</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
    ========================================================================= -->

    <!-- 02 — CURATED FILMOGRAPHY SECTION (Warm Ivory Editorial) -->
    <section id="featured-films" class="featured-section" aria-labelledby="featured-heading">
      <div class="section-container">
        <div class="section-header">
          <div>
            <div class="eyebrow">CURATED FILMOGRAPHY</div>
            <h2 id="featured-heading" class="section-title">Stories from the studio.</h2>
          </div>
          <a routerLink="/films" class="akp-link">
            <span>View all films</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="featured-grid">
          <article *ngFor="let film of featuredFilms; let idx = index" class="featured-card">
            <a [routerLink]="['/films', film.slug]" class="card-inner">
              <div class="poster-frame">
                <img 
                  [src]="film.poster" 
                  [alt]="film.title + ' official movie poster'" 
                  class="portrait-poster"
                  loading="lazy"
                />
                <span class="oscar-badge" *ngIf="film.oscarSelection">ACADEMY AWARDS RECOGNITION</span>
              </div>
              
              <div class="card-meta">
                <div class="meta-top">
                  <span class="film-year">{{ film.year }}</span>
                  <span class="film-tag">{{ film.tag }}</span>
                </div>
                <h3 class="film-title">{{ film.title }}</h3>
                <p class="film-synopsis">{{ film.synopsis }}</p>
                <div class="card-footer-cta">
                  <span>Explore film chapters</span>
                  <span class="arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- 02.5 — BEYOND THE FRAME / AAMIR KHAN TALKIES SECTION -->
    <section id="beyond-the-frame" class="talkies-section" aria-labelledby="talkies-heading">
      <div class="talkies-container">
        <div class="talkies-grid">
          
          <!-- Left Column: Editorial & Manifesto -->
          <div class="talkies-left">
            <div class="eyebrow eyebrow-talkies">
              <span>BEYOND THE FRAME / AAMIR KHAN TALKIES</span>
            </div>

            <h2 id="talkies-heading" class="talkies-headline">
              Every film has a story<br>
              <em class="font-serif">beyond the screen.</em>
            </h2>

            <p class="talkies-desc">
              Step inside the conversations, craft and experiences behind the films. Discover the world of filmmaking with Aamir Khan Talkies.
            </p>

            <div class="talkies-actions">
              <a 
                routerLink="/beyond-the-frame" 
                class="talkies-primary-btn"
                aria-label="Explore the dedicated Beyond the Frame video archive"
              >
                <span>Explore Beyond the Frame</span>
                <span class="btn-arrow" aria-hidden="true">↗</span>
              </a>

              <button 
                type="button" 
                class="talkies-secondary-btn" 
                (click)="playVideo()"
                [attr.aria-expanded]="isVideoPlaying"
                aria-controls="talkies-video-viewport"
                aria-label="Play welcome video introduction"
              >
                <span class="cta-play-orb" aria-hidden="true">▶</span>
                <span class="cta-label">{{ isVideoPlaying ? 'Playing intro' : 'Play introduction' }}</span>
              </button>

              <a 
                href="https://www.youtube.com/watch?v=iIUCuQ3V96U" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="talkies-fallback-link"
                aria-label="Watch on YouTube (opens in new tab)"
              >
                <span>YouTube</span>
                <span class="arrow-ext" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <!-- Right Column: Cinematic 16:9 Video Showcase -->
          <div class="talkies-right">
            <div 
              id="talkies-video-viewport" 
              class="video-preview-frame" 
              [class.is-playing]="isVideoPlaying"
            >
              <!-- Static high-res thumbnail before interaction -->
              <ng-container *ngIf="!isVideoPlaying">
                <img 
                  src="assets/media/aamir-khan-talkies-thumb.jpg" 
                  alt="Aamir Khan Talkies Official Welcome Video Preview" 
                  class="video-thumb"
                  loading="lazy"
                />
                
                <div class="video-overlay-scrim" aria-hidden="true"></div>

                <button 
                  type="button" 
                  class="central-play-button" 
                  (click)="playVideo()"
                  aria-label="Play Aamir Khan Talkies welcome video"
                >
                  <span class="play-icon-glyph" aria-hidden="true">▶</span>
                  <span class="pulse-ring" aria-hidden="true"></span>
                </button>

                <div class="video-badge" aria-hidden="true">
                  <span class="badge-dot"></span>
                  <span>AAMIR KHAN TALKIES · WELCOME</span>
                </div>
              </ng-container>

              <!-- Active iframe player on interaction -->
              <iframe 
                *ngIf="isVideoPlaying && videoEmbedUrl"
                [src]="videoEmbedUrl"
                title="Welcome to Aamir Khan Talkies! Channel Trailer"
                class="video-iframe"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>

            <!-- Video Metadata Caption Bar -->
            <div class="video-caption-bar">
              <div class="caption-info">
                <span class="caption-tag">// OFFICIAL CHANNEL INTRODUCTION</span>
                <h3 class="caption-title">Welcome to Aamir Khan Talkies!</h3>
              </div>
              <div class="caption-meta">
                <span class="duration-badge">01:42</span>
                <span class="format-badge">1080p HD · SYNC-SOUND</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 03 — STUDIO PHILOSOPHY SECTION (Editorial Grid) -->
    <section class="philosophy-section" aria-labelledby="philosophy-heading">
      <div class="section-container">
        <div class="philosophy-grid">
          <div class="philosophy-left">
            <div class="eyebrow">THE PRODUCTION HOUSE</div>
            <h2 id="philosophy-heading" class="philosophy-headline">
              For stories that<br>
              <em class="font-serif">mean something.</em>
            </h2>
            <p class="philosophy-text">
              Aamir Khan Productions creates films that reach beyond the screen — work shaped by human experience, empathy, and an enduring belief in thoughtful storytelling.
            </p>
            <div class="philosophy-cta">
              <a routerLink="/studio" class="akp-link">
                <span>Explore the studio</span>
                <span class="arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div class="philosophy-right">
            <div class="quote-card">
              <div class="quote-marker">“</div>
              <blockquote class="quote-body">
                Every great film begins with a question worth asking. When you respect the audience's intelligence, cinema becomes a lasting cultural memory.
              </blockquote>
              <cite class="quote-author">— Aamir Khan Productions Ethos</cite>
            </div>
          </div>
        </div>

        <!-- 3 Pillars Band -->
        <div class="pillars-band">
          <div class="pillar-item">
            <span class="pillar-num">01 /</span>
            <h3 class="pillar-title">Thoughtful<br>Stories</h3>
            <p class="pillar-desc">Screenplays rigorously tested over years to reflect emotional truth and narrative depth.</p>
          </div>
          <div class="pillar-item">
            <span class="pillar-num">02 /</span>
            <h3 class="pillar-title">Distinctive<br>Voices</h3>
            <p class="pillar-desc">Empowering writers and directors with creative freedom to tackle unprecedented themes.</p>
          </div>
          <div class="pillar-item">
            <span class="pillar-num">03 /</span>
            <h3 class="pillar-title">Lasting<br>Impact</h3>
            <p class="pillar-desc">Works that spark national conversations, educational reforms, and global critical acclaim.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 — NOTES FROM THE STUDIO (Journal Highlight) -->
    <section class="journal-highlight-section" aria-labelledby="journal-heading">
      <div class="section-container">
        <div class="section-header">
          <div>
            <div class="eyebrow">NOTES FROM THE STUDIO</div>
            <h2 id="journal-heading" class="section-title">The Journal.</h2>
          </div>
          <a routerLink="/journal" class="akp-link">
            <span>Read all notes</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="journal-teaser-grid">
          <article *ngFor="let article of recentArticles" class="journal-teaser-card">
            <a [routerLink]="['/journal']" class="teaser-inner">
              <div class="teaser-img-frame">
                <img [src]="article.image" [alt]="article.imageAlt" class="teaser-img" loading="lazy" />
                <span class="teaser-cat">{{ article.category }}</span>
              </div>
              <div class="teaser-body">
                <div class="teaser-meta">
                  <span>{{ article.date }}</span>
                  <span>·</span>
                  <span>{{ article.readTime }}</span>
                </div>
                <h3 class="teaser-title">{{ article.title }}</h3>
                <p class="teaser-excerpt">{{ article.excerpt }}</p>
                <span class="teaser-link">Read essay ↗</span>
              </div>
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- 05 — CONTACT TEASER (Editorial Invitation) -->
    <section class="contact-teaser-section">
      <div class="section-container">
        <div class="contact-teaser-box">
          <div class="teaser-left">
            <div class="eyebrow">BEGIN A CONVERSATION</div>
            <h2 class="teaser-headline">
              Let's make space<br>for stories<span class="accent-red">.</span>
            </h2>
            <p class="teaser-sub">
              For professional inquiries, press communications, and festival collaborations, reach out to our Mumbai studio.
            </p>
          </div>
          <div class="teaser-right">
            <a routerLink="/contact" class="cta-pill">
              <span>Get in touch</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* =========================================================================
       01 — NEW COLLAGE HERO SECTION (Warm Ivory Editorial 6-Poster Composition)
       Directly implementing the approved design reference
    ========================================================================= */
    .collage-hero {
      box-sizing: border-box;
      position: relative;
      background-color: #F7E3CD;
      background: radial-gradient(circle at 35% 45%, #FBF1E6 0%, #F7E2CC 60%, #F2D5BA 100%);
      color: #24201D;
      min-height: 820px;
      height: 100svh;
      max-height: 1050px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0;
      overflow: hidden;
      isolation: isolate;
    }

    .collage-hero-container {
      max-width: 1440px;
      margin: 0 auto;
      width: 100%;
      padding: 100px clamp(24px, 5.5vw, 80px) 40px;
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      align-items: center;
      gap: clamp(24px, 4vw, 60px);
      box-sizing: border-box;
    }

    /* Left Column: Typography & Action */
    .collage-hero-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 2;
    }

    .collage-hero-headline {
      font-family: Georgia, 'Playfair Display', serif;
      font-size: clamp(48px, 5.8vw, 84px);
      font-weight: 400;
      line-height: 1.08;
      letter-spacing: -0.025em;
      color: #24201D;
      margin: 0;
    }

    .headline-serif {
      display: block;
    }

    .headline-italic {
      display: block;
      font-style: italic;
      color: #24201D;
      font-weight: 400;
    }

    .dot-red {
      color: #A91B19;
    }

    .hero-red-divider {
      width: 76px;
      height: 3.5px;
      background-color: #A91B19;
      margin: 28px 0 36px;
      border-radius: 2px;
    }

    .hero-action-row {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .hero-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background-color: #9E231D;
      color: #FFFFFF;
      text-decoration: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.02em;
      padding: 15px 32px;
      border-radius: 6px;
      box-shadow: 0 8px 24px rgba(158, 35, 29, 0.28);
      transition: all 0.25s cubic-bezier(0.2, 0, 0.2, 1);
      cursor: pointer;
    }

    .hero-cta-btn:hover {
      background-color: #B52822;
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(158, 35, 29, 0.38);
      color: #FFFFFF;
    }

    .arrow-glyph {
      font-size: 18px;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    .hero-cta-btn:hover .arrow-glyph {
      transform: translateX(4px);
    }

    .hero-cta-btn:focus-visible {
      outline: 3px solid #A91B19;
      outline-offset: 4px;
    }

    /* Right Column: 6-Poster Collage Showcase */
    .collage-hero-right {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      will-change: transform;
    }

    .collage-visual-frame {
      position: relative;
      width: 100%;
      max-width: 840px;
    }

    .collage-visual-img {
      width: 100%;
      height: auto;
      display: block;
      pointer-events: none;
      filter: contrast(1.02);
    }

    /* Interactive Poster Hotspots */
    .poster-hotspot {
      position: absolute;
      border-radius: 4px;
      cursor: pointer;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      outline: none;
      background: transparent;
    }

    .poster-hotspot:hover {
      box-shadow: 0 0 0 3px rgba(169, 27, 25, 0.45);
      transform: scale(1.02);
      z-index: 10 !important;
    }

    .poster-hotspot:focus-visible {
      outline: 3px solid #A91B19;
      outline-offset: 2px;
      z-index: 10 !important;
    }

    /* Hotspot positions calibrated to the 6 poster locations */
    .hotspot-lsc {
      left: 13%;
      top: 4%;
      width: 25%;
      height: 48%;
      transform: rotate(-5deg);
    }

    .hotspot-ss {
      left: 36%;
      top: 7%;
      width: 25%;
      height: 47%;
      transform: rotate(1deg);
    }

    .hotspot-szp {
      left: 60%;
      top: 8%;
      width: 25%;
      height: 47%;
      transform: rotate(4deg);
    }

    .hotspot-tzp {
      left: 11%;
      top: 49%;
      width: 26%;
      height: 48%;
      transform: rotate(-3deg);
    }

    .hotspot-dangal {
      left: 36%;
      top: 47%;
      width: 27%;
      height: 52%;
      transform: rotate(-1deg);
      z-index: 3;
    }

    .hotspot-ll {
      left: 61%;
      top: 49%;
      width: 26%;
      height: 48%;
      transform: rotate(3deg);
    }

    /* Bottom Status Cue */
    .hero-bottom-cue {
      position: absolute;
      bottom: 24px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      z-index: 3;
    }

    .scroll-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #6E6862;
      text-decoration: none;
      transition: color 0.2s ease, transform 0.2s ease;
    }

    .scroll-link:hover {
      color: #A91B19;
      transform: translateY(2px);
    }

    /* Responsive Breakdown for Collage Hero */
    @media (max-width: 1024px) {
      .collage-hero {
        height: auto;
        min-height: auto;
        padding-top: 100px;
        padding-bottom: 60px;
      }
      .collage-hero-container {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
        padding-top: 40px;
      }
      .collage-hero-left {
        align-items: center;
      }
      .hero-red-divider {
        margin: 20px 0 28px;
      }
      .collage-visual-frame {
        max-width: 650px;
        margin: 0 auto;
      }
      .hero-bottom-cue {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .collage-hero-headline {
        font-size: clamp(38px, 11vw, 52px);
      }
      .hero-action-row {
        width: 100%;
      }
      .hero-cta-btn {
        width: 100%;
        justify-content: center;
      }
      .collage-visual-frame {
        max-width: 100%;
      }
    }

    /* =========================================================================
       PREVIOUS 35MM PROJECTOR HERO STYLES (COMMENTED OUT AS PER USER REQUEST)
       To restore this hero, simply uncomment this block.
    =========================================================================
    /* 01 — PROJECTOR HERO (Exact 1440x900 Reference Concept) * /
    .projector-hero {
      box-sizing: border-box;
      position: relative;
      background: #080C0E;
      color: #F8F5EE;
      min-height: 900px;
      height: 100svh;
      max-height: 1100px;
      padding: 0;
      display: block;
      overflow: hidden;
      isolation: isolate;
    }

    .projector-hero:before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
      background: radial-gradient(ellipse 50% 42% at 35% 49%, rgba(98, 54, 27, 0.12), transparent 80%),
                  radial-gradient(ellipse 60% 50% at 75% 50%, rgba(212, 127, 39, 0.16), transparent 70%),
                  linear-gradient(90deg, #080C0E 0%, #090D0F 61%, #0B0E10 100%);
    }

    .projector-hero:after {
      display: none;
    }

    .projector-hero .projector-visual {
      position: absolute;
      z-index: 2;
      right: 0;
      top: 16.8%;
      width: 57.3%;
      height: auto;
      max-width: none;
      pointer-events: none;
      filter: brightness(1.02);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }

    .projector-hero .projector-beam {
      position: absolute;
      z-index: 1;
      pointer-events: none;
      left: 7%;
      top: 26%;
      width: 57%;
      height: 46%;
      opacity: 0.85;
      background: radial-gradient(ellipse 70% 50% at 75% 50%, rgba(251, 164, 72, 0.35) 2%, rgba(163, 80, 29, 0.18) 45%, transparent 83%);
      filter: blur(27px);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }

    .projector-hero .hero-inner {
      position: absolute;
      z-index: 4;
      left: clamp(24px, 5.7vw, 85px);
      top: 23.5%;
      padding: 0;
      width: 610px;
      max-width: 51vw;
    }

    .projector-hero .eyebrow {
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 11px;
      line-height: 1.5;
      letter-spacing: 0.19em;
      color: #E7E2DB;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .projector-hero .eyebrow:before {
      content: '';
      width: 8px;
      height: 8px;
      background: #BE423D;
      display: inline-block;
      flex-shrink: 0;
    }

    .projector-hero h1 {
      font-family: var(--font-display);
      font-size: clamp(77px, 8.7vw, 126px);
      font-weight: 550;
      letter-spacing: -0.087em;
      line-height: 0.93;
      margin: 36px 0 0;
      max-width: none;
      color: #F8F6F2;
    }

    .projector-hero h1 span,
    .projector-hero h1 em {
      display: block;
      white-space: nowrap;
    }

    .projector-hero h1 span:nth-child(2) {
      margin-left: 4.2vw;
    }

    .projector-hero h1 em {
      font-family: var(--font-serif);
      font-style: italic;
      font-weight: 400;
      font-size: 0.96em;
      line-height: 0.92;
      letter-spacing: -0.052em;
      margin: 7px 0 0 5.8vw;
      color: #F7EBDD;
      text-shadow: 0 0 35px rgba(251, 164, 72, 0.5), 0 0 70px rgba(251, 164, 72, 0.28);
    }

    .projector-hero .hero-subrow {
      margin: 46px 0 0 4.7vw;
      display: flex;
      align-items: center;
      gap: 58px;
      max-width: 680px;
    }

    .projector-hero .hero-desc {
      font-family: var(--font-body);
      font-weight: 400;
      font-size: 16px;
      line-height: 1.6;
      width: 255px;
      max-width: 255px;
      color: #E0DEDA;
      flex: none;
      margin: 0;
    }

    .projector-hero .hero-cta {
      display: flex;
      gap: 14px;
      align-items: center;
      color: #FFFFFF;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 11px;
      line-height: 1.4;
      letter-spacing: 0.14em;
      white-space: nowrap;
      min-height: 54px;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.25s ease, color 0.25s ease;
    }

    .projector-hero .hero-cta:hover {
      color: #FFAA55;
      transform: translateX(4px);
    }

    .projector-hero .cta-orb {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.7);
      font-size: 23px;
      display: grid;
      place-items: center;
      transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
      background: rgba(14, 18, 22, 0.4);
    }

    .projector-hero .hero-cta:hover .cta-orb {
      background: #BD4641;
      border-color: #BD4641;
      color: #FFFFFF;
      transform: rotate(45deg);
    }

    .projector-hero .hero-frame {
      position: absolute;
      z-index: 4;
      right: clamp(24px, 5.6vw, 88px);
      top: 13.6%;
      display: flex;
      align-items: flex-end;
      gap: 13px;
      color: #E6E2DC;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 10px;
      line-height: 1.1;
      letter-spacing: 0.15em;
    }

    .projector-hero .hero-bottom {
      position: absolute;
      bottom: 37px;
      left: clamp(24px, 5.7vw, 85px);
      right: clamp(24px, 5.7vw, 85px);
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding-top: 24px;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 10px;
      line-height: 1.4;
      letter-spacing: 0.15em;
      color: #ECE8E0;
    }

    .projector-hero .scroll-cue {
      display: flex;
      align-items: center;
      gap: 18px;
      min-height: 44px;
      color: #ECE8E0;
      text-decoration: none;
      transition: color 0.2s ease;
      cursor: pointer;
    }

    .projector-hero .scroll-cue:hover {
      color: #FFAA55;
    }

    .projector-hero .scroll-cue span {
      font-size: 22px;
      display: inline-block;
      transition: transform 0.2s ease;
    }

    .projector-hero .scroll-cue:hover span {
      transform: translateY(3px);
    }

    .projector-hero .hero-index b {
      font-weight: 400;
      color: #EEE;
      margin: 0 4px;
    }

    @media (min-width: 700px) and (max-width: 1400px) {
      .projector-hero .hero-subrow {
        gap: 25px;
        margin-left: 3vw;
      }
      .projector-hero .hero-inner {
        max-width: 57vw;
      }
      .projector-hero h1 {
        font-size: 8.5vw;
      }
    }

    ========================================================================= */

    /* Common Section Styles */
    .section-container {
      max-width: var(--max-content);
      margin: 0 auto;
      padding: 100px var(--gutter);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 60px;
      gap: 30px;
      flex-wrap: wrap;
    }

    .section-title {
      font-size: clamp(38px, 4.8vw, 68px);
      letter-spacing: -0.045em;
      margin-top: 14px;
    }

    /* 02 — CURATED FILMOGRAPHY */
    .featured-section {
      background-color: var(--paper);
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 40px;
    }

    .featured-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .featured-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(16, 22, 27, 0.08);
    }

    .card-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .poster-frame {
      position: relative;
      aspect-ratio: 2 / 3;
      background-color: #0E1216;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Critical Requirement: Portrait posters preserved fully without stretching or cropping */
    .portrait-poster {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.4s ease;
    }

    .featured-card:hover .portrait-poster {
      transform: scale(1.03);
    }

    .oscar-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: var(--red);
      color: #FFFFFF;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.12em;
      padding: 5px 10px;
      border-radius: 2px;
    }

    .card-meta {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .meta-top {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      letter-spacing: 0.1em;
      color: var(--ink-secondary);
      margin-bottom: 10px;
      font-weight: 600;
    }

    .film-tag {
      color: var(--red);
    }

    .film-title {
      font-size: 24px;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }

    .film-synopsis {
      font-size: 13px;
      color: var(--ink-muted);
      line-height: 1.6;
      margin-bottom: 20px;
      flex: 1;
    }

    .card-footer-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--ink);
      border-top: 1px solid var(--line-light);
      padding-top: 14px;
      transition: color 0.2s ease;
    }

    .featured-card:hover .card-footer-cta {
      color: var(--red);
    }

    /* 02.5 — BEYOND THE FRAME (AAMIR KHAN TALKIES) */
    .talkies-section {
      background-color: #0B0D0E;
      color: #F7F3ED;
      padding: clamp(90px, 9vw, 150px) var(--gutter);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }

    .talkies-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 85% 30%, rgba(190, 66, 61, 0.08) 0%, transparent 60%),
                  radial-gradient(circle at 15% 75%, rgba(197, 168, 69, 0.05) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    .talkies-container {
      max-width: 1280px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .talkies-grid {
      display: grid;
      grid-template-columns: 1.05fr 1.25fr;
      gap: clamp(48px, 6vw, 84px);
      align-items: center;
    }

    /* Left Column */
    .talkies-left {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .eyebrow-talkies {
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 0.19em;
      color: #A8A6A0;
      display: flex;
      align-items: center;
      gap: 12px;
      text-transform: uppercase;
    }

    .eyebrow-talkies::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #BE423D;
      display: inline-block;
      flex-shrink: 0;
    }

    .talkies-headline {
      font-family: var(--font-display);
      font-size: clamp(38px, 4.4vw, 56px);
      line-height: 1.08;
      letter-spacing: -0.04em;
      font-weight: 500;
      color: #F7F3ED;
      margin: 0;
    }

    .talkies-headline em {
      font-family: var(--font-serif);
      font-style: italic;
      color: #F8EFE4;
      font-weight: 400;
    }

    .talkies-desc {
      font-family: var(--font-body);
      font-size: clamp(15px, 1.2vw, 17px);
      line-height: 1.65;
      color: #B5B2AC;
      max-width: 480px;
      margin: 0;
    }

    .talkies-actions {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .talkies-primary-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #F7F3ED;
      color: #0B0D0E;
      text-decoration: none;
      padding: 13px 24px;
      border-radius: 40px;
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: all 0.25s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }

    .talkies-primary-btn:hover {
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(247, 243, 237, 0.25);
    }

    .talkies-primary-btn .btn-arrow {
      font-size: 13px;
      transition: transform 0.2s ease;
    }

    .talkies-primary-btn:hover .btn-arrow {
      transform: translate(2px, -2px);
    }

    .talkies-secondary-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 40px;
      padding: 10px 22px 10px 14px;
      color: #F7F3ED;
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.2, 0, 0.2, 1);
    }

    .talkies-secondary-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: #BE423D;
      transform: translateY(-2px);
      color: #FFFFFF;
    }

    .talkies-secondary-btn:hover .cta-play-orb {
      transform: scale(1.1);
      background-color: #D94B46;
    }

    .talkies-secondary-btn:focus-visible,
    .talkies-primary-btn:focus-visible {
      outline: 3px solid #DE6158 !important;
      outline-offset: 4px;
    }

    .cta-play-orb {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #BE423D;
      color: #FFFFFF;
      display: grid;
      place-items: center;
      font-size: 14px;
      padding-left: 2px;
      transition: transform 0.25s ease, background-color 0.25s ease;
    }

    .talkies-cta-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: #BE423D;
      transform: translateY(-2px);
      color: #FFFFFF;
    }

    .talkies-cta-btn:hover .cta-play-orb {
      transform: scale(1.1);
      background-color: #D94B46;
    }

    .talkies-cta-btn:focus-visible {
      outline: 3px solid #DE6158 !important;
      outline-offset: 4px;
    }

    .talkies-fallback-link {
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      color: #8F8C85;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 0.04em;
      transition: color 0.2s ease;
    }

    .talkies-fallback-link:hover {
      color: #F7F3ED;
    }

    .talkies-fallback-link .arrow-ext {
      transition: transform 0.2s ease;
    }

    .talkies-fallback-link:hover .arrow-ext {
      transform: translate(2px, -2px);
    }

    /* Right Column (Video Player Preview) */
    .talkies-right {
      display: flex;
      flex-direction: column;
    }

    .video-preview-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000000;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 4px 16px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .video-preview-frame:hover {
      border-color: rgba(190, 66, 61, 0.5);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.75), 0 0 30px rgba(190, 66, 61, 0.15);
    }

    .video-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-preview-frame:hover .video-thumb {
      transform: scale(1.025);
    }

    .video-overlay-scrim {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(11, 13, 14, 0.2) 0%, rgba(11, 13, 14, 0.6) 100%);
      pointer-events: none;
    }

    .central-play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: rgba(11, 13, 14, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: #FFFFFF;
      display: grid;
      place-items: center;
      cursor: pointer;
      z-index: 2;
      transition: all 0.3s cubic-bezier(0.2, 0, 0.2, 1);
    }

    .play-icon-glyph {
      font-size: 24px;
      padding-left: 4px;
      transition: transform 0.2s ease;
    }

    .central-play-button:hover {
      background: #BE423D;
      border-color: #BE423D;
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 35px rgba(190, 66, 61, 0.7);
    }

    .central-play-button:hover .play-icon-glyph {
      transform: scale(1.08);
    }

    .central-play-button:focus-visible {
      outline: 3px solid #DE6158 !important;
      outline-offset: 4px;
    }

    .pulse-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      pointer-events: none;
      animation: pulsePlay 3s infinite ease-out;
    }

    @keyframes pulsePlay {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.15); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }

    .video-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(11, 13, 14, 0.75);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 6px 12px;
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: #E7E2DB;
      z-index: 2;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #BE423D;
      display: inline-block;
    }

    .video-iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
      z-index: 3;
    }

    .video-caption-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
      margin-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      gap: 16px;
      flex-wrap: wrap;
    }

    .caption-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .caption-tag {
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: #A8A6A0;
    }

    .caption-title {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 500;
      color: #F7F3ED;
      margin: 0;
    }

    .caption-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-body);
      font-size: 11px;
      color: #8F8C85;
      letter-spacing: 0.08em;
    }

    .duration-badge {
      background: rgba(255, 255, 255, 0.08);
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      color: #E7E2DB;
    }

    .format-badge {
      font-size: 10px;
      letter-spacing: 0.12em;
    }

    /* 03 — PHILOSOPHY SECTION */
    .philosophy-section {
      background-color: #F4F1EC;
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }

    .philosophy-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 60px;
      align-items: center;
      margin-bottom: 80px;
    }

    .philosophy-headline {
      font-size: clamp(40px, 5.2vw, 76px);
      letter-spacing: -0.05em;
      margin: 20px 0 28px;
    }

    .philosophy-headline em {
      color: var(--red);
      font-weight: 400;
    }

    .philosophy-text {
      font-size: 18px;
      line-height: 1.65;
      color: var(--ink-secondary);
      max-width: 560px;
      margin-bottom: 32px;
    }

    .quote-card {
      background: #FFFFFF;
      padding: 40px;
      border: 1px solid var(--line);
      position: relative;
    }

    .quote-marker {
      font-family: var(--font-serif);
      font-size: 64px;
      line-height: 0.8;
      color: var(--amber);
      margin-bottom: 16px;
    }

    .quote-body {
      font-family: var(--font-body);
      font-size: 16px;
      line-height: 1.65;
      color: var(--ink);
      font-style: italic;
      margin-bottom: 20px;
    }

    .quote-author {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: var(--red);
      display: block;
    }

    /* Pillars */
    .pillars-band {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      padding-top: 60px;
      border-top: 1px solid var(--line);
    }

    .pillar-num {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--red);
      display: block;
      margin-bottom: 12px;
    }

    .pillar-title {
      font-size: 26px;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }

    .pillar-desc {
      font-size: 14px;
      color: var(--ink-muted);
      line-height: 1.6;
    }

    /* 04 — JOURNAL TEASER */
    .journal-highlight-section {
      background-color: var(--paper);
    }

    .journal-teaser-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 36px;
    }

    .journal-teaser-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      transition: transform 0.25s ease;
    }

    .journal-teaser-card:hover {
      transform: translateY(-6px);
    }

    .teaser-img-frame {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      background: #10161B;
    }

    .teaser-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .journal-teaser-card:hover .teaser-img {
      transform: scale(1.05);
    }

    .teaser-cat {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(16, 22, 27, 0.85);
      color: #FFFFFF;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.14em;
      padding: 4px 10px;
      border-radius: 2px;
    }

    .teaser-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
    }

    .teaser-meta {
      font-size: 11px;
      color: var(--ink-light);
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }

    .teaser-title {
      font-size: 20px;
      letter-spacing: -0.025em;
      margin-bottom: 12px;
      line-height: 1.3;
    }

    .teaser-excerpt {
      font-size: 13px;
      color: var(--ink-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .teaser-link {
      font-size: 12px;
      font-weight: 600;
      color: var(--red);
    }

    /* 05 — CONTACT TEASER */
    .contact-teaser-section {
      background-color: var(--hero-bg);
      color: var(--hero-ivory);
      border-top: 1px solid var(--hero-line);
    }

    .contact-teaser-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
    }

    .teaser-headline {
      font-size: clamp(36px, 4.8vw, 64px);
      letter-spacing: -0.05em;
      margin: 16px 0 16px;
    }

    .accent-red {
      color: var(--red);
    }

    .teaser-sub {
      font-size: 16px;
      color: var(--hero-muted);
      max-width: 520px;
      line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 990px) {
      .philosophy-grid {
        grid-template-columns: 1fr;
      }
      .pillars-band {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .journal-teaser-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 700px) {
      .projector-hero {
        height: 850px;
        min-height: 850px;
        max-height: none;
        padding: 0;
      }
      .projector-hero .hero-inner {
        left: 22px;
        right: 22px;
        top: 140px;
        width: auto;
        max-width: calc(100% - 44px);
      }
      .projector-hero .eyebrow {
        font-size: 9px;
        letter-spacing: 0.12em;
        white-space: normal;
        max-width: 320px;
      }
      .projector-hero h1 {
        font-size: clamp(58px, 14vw, 79px);
        line-height: 0.95;
        margin: 26px 0 0;
        letter-spacing: -0.09em;
      }
      .projector-hero h1 span:nth-child(2) {
        margin-left: 4px;
      }
      .projector-hero h1 em {
        font-size: 1.0em;
        line-height: 1;
        margin-left: 26px;
        margin-top: 2px;
      }
      .projector-hero .projector-visual {
        width: 620px;
        right: -215px;
        top: 330px;
        opacity: 0.94;
        max-width: none;
      }
      .projector-hero .projector-beam {
        left: 0%;
        top: 380px;
        width: 85%;
        height: 190px;
        opacity: 0.5;
        filter: blur(15px);
      }
      .projector-hero .hero-subrow {
        position: relative;
        z-index: 4;
        margin: 26px 0 0 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 13px;
      }
      .projector-hero .hero-desc {
        max-width: 275px;
        width: auto;
        font-size: 13.5px;
        line-height: 1.45;
        color: #EEE7DD;
      }
      .projector-hero .hero-cta {
        position: absolute;
        top: 338px;
        left: 0;
        min-height: 50px;
        font-size: 10px;
        letter-spacing: 0.12em;
      }
      .projector-hero .cta-orb {
        width: 49px;
        height: 49px;
        font-size: 20px;
      }
      .projector-hero .hero-frame {
        top: 97px;
        right: 22px;
        font-size: 9px;
      }
      .projector-hero .hero-frame span:first-child {
        display: none;
      }
      .projector-hero .hero-bottom {
        left: 22px;
        right: 22px;
        bottom: 21px;
        font-size: 8px;
        gap: 12px;
        letter-spacing: 0.07em;
      }
      .projector-hero .hero-index {
        max-width: 165px;
      }
      .projector-hero .scroll-cue {
        gap: 5px;
        white-space: nowrap;
        font-size: 8px;
      }
    }

    @media (max-width: 820px) {
      .talkies-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .talkies-desc {
        max-width: 100%;
      }
      .central-play-button {
        width: 64px;
        height: 64px;
      }
      .play-icon-glyph {
        font-size: 20px;
      }
      .video-caption-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }

    @media (max-width: 370px) {
      .projector-hero h1 {
        font-size: 13.5vw;
      }
      .projector-hero .projector-visual {
        width: 590px;
        right: -228px;
      }
      .projector-hero .hero-cta {
        top: 324px;
      }
      .talkies-actions {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .video-thumb,
      .central-play-button,
      .talkies-cta-btn,
      .pulse-ring,
      .talkies-fallback-link .arrow-ext,
      .projector-visual,
      .projector-beam {
        transition: none !important;
        animation: none !important;
        transform: none !important;
      }
    }
  `]
})
export class HomeComponent {
  // New Collage Hero Properties & Methods
  collageTransform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';

  onHeroMouseMove(e: MouseEvent): void {
    if (typeof window === 'undefined' || window.innerWidth < 800) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    this.collageTransform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translate3d(${x * -6}px, ${y * -4}px, 0)`;
  }

  onHeroMouseLeave(): void {
    this.collageTransform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  }

  featuredFilms: Film[] = AKP_FILMS.filter(f => f.featured).slice(0, 4);
  recentArticles: JournalArticle[] = AKP_ARTICLES.slice(0, 3);

  projectorTransform = 'translate3d(0, 0, 0)';
  beamTransform = 'translate3d(0, 0, 0)';

  isVideoPlaying = false;
  videoEmbedUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  playVideo(): void {
    this.isVideoPlaying = true;
    this.videoEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube-nocookie.com/embed/iIUCuQ3V96U?autoplay=1&playsinline=1&controls=1'
    );
    const player = document.getElementById('talkies-video-viewport');
    if (player && typeof window !== 'undefined' && window.innerWidth < 820) {
      player.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (typeof window === 'undefined' || window.innerWidth < 800) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    this.projectorTransform = `translate3d(${x * -10}px, ${y * -7}px, 0)`;
    this.beamTransform = `translate3d(${x * 8}px, ${y * 5}px, 0)`;
  }

  onMouseLeave(): void {
    this.projectorTransform = 'translate3d(0, 0, 0)';
    this.beamTransform = 'translate3d(0, 0, 0)';
  }

  scrollToFeatured(event: Event): void {
    event.preventDefault();
    const target = document.getElementById('featured-films');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
