import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AKP_FILMS } from '../../data/films.data';
import { AKP_TALKIES_VIDEOS } from '../../data/talkies.data';
import { Film, FilmGalleryItem, TalkiesVideo } from '../../models/film.model';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="film-detail-page" *ngIf="film">
      <!-- 01: CINEMATIC FILM HERO (Dark, Atmospheric, Editorial) -->
      <section class="film-hero" aria-labelledby="film-title">
        <div class="hero-bg-overlay"></div>
        <img [src]="film.poster" alt="" class="hero-ambient-poster" aria-hidden="true" />

        <div class="hero-container">
          <!-- Breadcrumb -->
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a routerLink="/films" class="crumb-link">← All films</a>
            <span class="crumb-sep">/</span>
            <span class="crumb-active">{{ film.title }}</span>
          </nav>

          <div class="hero-main-row">
            <div class="hero-headline-col">
              <div class="eyebrow eyebrow-hero">
                <span>AKP FEATURE FILM · {{ film.year }}</span>
              </div>
              <h1 id="film-title" class="film-headline">
                {{ film.title }}<span class="red-dot">.</span>
              </h1>
              <p class="film-subtitle" *ngIf="film.subtitle">{{ film.subtitle }}</p>
              <p class="film-tagline font-serif" *ngIf="film.tagline">"{{ film.tagline }}"</p>

              <!-- Quick Action Buttons -->
              <div class="hero-actions">
                <button class="cta-pill" (click)="openTrailerModal()">
                  <span>▶ Watch trailer</span>
                </button>
                <a href="#synopsis" class="akp-link dark-link" (click)="scrollToSection('synopsis', $event)">
                  <span>Explore chapters</span>
                  <span class="arrow" aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <!-- Authentic Vertical Poster Showcase -->
            <div class="hero-poster-col">
              <div class="hero-poster-card" (click)="openPosterZoom(film.poster)">
                <img [src]="film.poster" [alt]="film.title + ' key visual'" class="hero-poster-img" />
                <span class="poster-zoom-tip">Click to zoom 🔍</span>
              </div>
            </div>
          </div>

          <!-- Compact Metadata Ribbon -->
          <div class="film-meta-ribbon">
            <div class="meta-item">
              <span class="meta-label">RELEASE YEAR</span>
              <span class="meta-val">{{ film.year }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">RUNTIME</span>
              <span class="meta-val">{{ film.runtimeDisplay }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">GENRE</span>
              <span class="meta-val">{{ film.tag }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">DIRECTED BY</span>
              <span class="meta-val">{{ film.director.join(', ') }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">LANGUAGE</span>
              <span class="meta-val">{{ film.language }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- STICKY CHAPTER NAVIGATION (Synopsis | Trailers | Gallery | BTS | Credits | Posters) -->
      <nav class="sticky-chapters-nav" aria-label="Film Chapters">
        <div class="chapters-inner">
          <a 
            href="#synopsis" 
            [class.active]="activeChapter === 'synopsis'"
            (click)="scrollToSection('synopsis', $event)">
            01. Synopsis
          </a>
          <a 
            href="#trailers" 
            [class.active]="activeChapter === 'trailers'"
            (click)="scrollToSection('trailers', $event)">
            02. Trailers
          </a>
          <a 
            href="#gallery" 
            [class.active]="activeChapter === 'gallery'"
            (click)="scrollToSection('gallery', $event)">
            03. Gallery
          </a>
          <a 
            href="#bts" 
            [class.active]="activeChapter === 'bts'"
            (click)="scrollToSection('bts', $event)">
            04. Behind the Scenes
          </a>
          <a 
            href="#credits" 
            [class.active]="activeChapter === 'credits'"
            (click)="scrollToSection('credits', $event)">
            05. Credits
          </a>
          <a 
            href="#posters" 
            [class.active]="activeChapter === 'posters'"
            (click)="scrollToSection('posters', $event)">
            06. Posters
          </a>
          <a 
            *ngIf="talkiesVideos.length > 0"
            href="#talkies" 
            [class.active]="activeChapter === 'talkies'"
            (click)="scrollToSection('talkies', $event)">
            07. Beyond the Frame
          </a>
        </div>
      </nav>

      <!-- CHAPTER 01: SYNOPSIS -->
      <section id="synopsis" class="chapter-section chapter-synopsis">
        <div class="chapter-container">
          <div class="chapter-header">
            <span class="chapter-num">CHAPTER 01</span>
            <h2 class="chapter-title">The Narrative Synopsis<span class="red-dot">.</span></h2>
          </div>

          <div class="synopsis-layout">
            <div class="synopsis-prose">
              <p *ngFor="let para of film.synopsisLong" class="synopsis-para">
                {{ para }}
              </p>
              
              <!-- Pull Quote -->
              <div class="synopsis-pullquote" *ngIf="film.quote">
                <span class="quote-sign">“</span>
                <p class="quote-text font-serif">{{ film.quote }}</p>
                <cite class="quote-cite">— Key Film Dialogue</cite>
              </div>

              <!-- Accolades / Oscars -->
              <div class="accolades-box" *ngIf="film.accolades?.length">
                <span class="accolades-title">RECOGNITION & HONORS</span>
                <ul class="accolades-list">
                  <li *ngFor="let acc of film.accolades">★ {{ acc }}</li>
                </ul>
              </div>
            </div>

            <!-- Cast & Key Roles Sidebar -->
            <aside class="synopsis-sidebar">
              <div class="cast-card">
                <span class="sidebar-title">PRIMARY CAST</span>
                <ul class="cast-list">
                  <li *ngFor="let actor of film.cast">
                    <span class="cast-bullet">▪</span>
                    <span>{{ actor }}</span>
                  </li>
                </ul>
              </div>

              <div class="specs-card">
                <span class="sidebar-title">PRODUCTION CONTEXT</span>
                <dl class="specs-dl">
                  <div>
                    <dt>Producers</dt>
                    <dd>{{ film.producers.join(', ') }}</dd>
                  </div>
                  <div>
                    <dt>Screenplay</dt>
                    <dd>{{ film.writer.join(', ') }}</dd>
                  </div>
                  <div>
                    <dt>Theatrical Release</dt>
                    <dd>{{ film.releaseDate }}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- CHAPTER 02: TRAILERS & PROMOTIONAL VIDEO -->
      <section id="trailers" class="chapter-section chapter-trailers">
        <div class="chapter-container">
          <div class="chapter-header">
            <span class="chapter-num">CHAPTER 02</span>
            <h2 class="chapter-title">Official Trailers & Motion<span class="red-dot">.</span></h2>
          </div>

          <div class="trailer-showcase">
            <div class="trailer-player-card" (click)="openTrailerModal()">
              <img [src]="film.heroStill || film.poster" alt="" class="trailer-backdrop" />
              <div class="player-overlay">
                <button class="big-play-btn" aria-label="Play official trailer">
                  <span class="play-triangle">▶</span>
                </button>
                <div class="trailer-info-chip">
                  <span class="chip-title">{{ film.title }} — Official Theatrical Preview</span>
                  <span class="chip-runtime">1080p HD · 5.1 Surround Sound</span>
                </div>
              </div>
            </div>
            <p class="trailer-note">
              Click to launch full interactive video preview in high-definition widescreen.
            </p>
          </div>
        </div>
      </section>

      <!-- CHAPTER 03: GALLERY & LIGHTBOX -->
      <section id="gallery" class="chapter-section chapter-gallery">
        <div class="chapter-container">
          <div class="chapter-header">
            <span class="chapter-num">CHAPTER 03</span>
            <h2 class="chapter-title">Curated Film Stills<span class="red-dot">.</span></h2>
          </div>

          <div class="gallery-grid">
            <div 
              *ngFor="let item of film.gallery; let i = index" 
              class="gallery-item"
              (click)="openLightbox(film.gallery, i)">
              <div class="still-frame">
                <img [src]="item.src" [alt]="item.alt" class="still-img" loading="lazy" />
                <div class="still-overlay">
                  <span class="zoom-badge">VIEW FULLSCREEN ⤢</span>
                </div>
              </div>
              <p class="still-caption" *ngIf="item.caption">{{ item.caption }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CHAPTER 04: BEHIND THE SCENES -->
      <section id="bts" class="chapter-section chapter-bts">
        <div class="chapter-container">
          <div class="chapter-header">
            <span class="chapter-num">CHAPTER 04</span>
            <h2 class="chapter-title">Behind the Scenes & Craft<span class="red-dot">.</span></h2>
          </div>

          <div class="bts-grid">
            <article *ngFor="let bts of film.behindScenes" class="bts-card">
              <div class="bts-img-container" (click)="openLightbox(film.behindScenes, 0)">
                <img [src]="bts.src" [alt]="bts.alt" class="bts-img" loading="lazy" />
              </div>
              <div class="bts-caption">
                <span class="bts-tag">PRODUCTION JOURNAL</span>
                <p>{{ bts.caption }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- CHAPTER 05: COMPLETE PRODUCTION CREDITS -->
      <section id="credits" class="chapter-section chapter-credits">
        <div class="chapter-container">
          <div class="chapter-header">
            <span class="chapter-num">CHAPTER 05</span>
            <h2 class="chapter-title">Complete Film Credits<span class="red-dot">.</span></h2>
          </div>

          <div class="credits-table">
            <div *ngFor="let cred of film.credits" class="credits-row">
              <div class="credit-role">{{ cred.role }}</div>
              <div class="credit-names">
                <span *ngFor="let name of cred.names; let last = last">
                  {{ name }}<span *ngIf="!last">, </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CHAPTER 06: ORIGINAL POSTERS -->
      <section id="posters" class="chapter-section chapter-posters">
        <div class="chapter-container">
          <div class="chapter-header">
            <span class="chapter-num">CHAPTER 06</span>
            <h2 class="chapter-title">Theatrical Artwork & Posters<span class="red-dot">.</span></h2>
          </div>

          <div class="posters-archive-row">
            <div class="poster-inspect-card" (click)="openPosterZoom(film.poster)">
              <div class="inspect-frame">
                <img [src]="film.poster" [alt]="film.title + ' original portrait poster'" class="inspect-img" />
              </div>
              <div class="inspect-info">
                <span class="inspect-label">PRIMARY THEATRICAL KEY VISUAL</span>
                <p class="inspect-specs">Original Unaltered Portrait Aspect Ratio · Click to inspect high-resolution print</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CHAPTER 07: FROM BEYOND THE FRAME (Only when matching official Talkies content exists) -->
      <section id="talkies" class="chapter-section chapter-talkies" *ngIf="talkiesVideos.length > 0">
        <div class="chapter-container">
          <div class="chapter-header">
            <span class="chapter-num">CHAPTER 07</span>
            <h2 class="chapter-title">From Beyond the Frame<span class="red-dot">.</span></h2>
            <p class="chapter-sublead">
              Verified conversations, director commentaries and behind-the-scenes footage from Aamir Khan Talkies for {{ film.title }}.
            </p>
          </div>

          <div class="talkies-detail-grid">
            <article *ngFor="let vid of talkiesVideos" class="talkies-detail-card">
              <div 
                class="talkies-detail-thumb" 
                (click)="openVideoPlayback(vid.youtubeId, vid.title)"
                tabindex="0"
                role="button"
                [attr.aria-label]="'Play video: ' + vid.title"
                (keydown.enter)="openVideoPlayback(vid.youtubeId, vid.title)"
                (keydown.space)="openVideoPlayback(vid.youtubeId, vid.title); $event.preventDefault()"
              >
                <img [src]="vid.thumbnailUrl" [alt]="vid.title + ' thumbnail'" class="talkies-thumb-img" loading="lazy" />
                <div class="talkies-thumb-overlay" aria-hidden="true">
                  <div class="talkies-play-orb">
                    <span class="play-arrow">▶</span>
                  </div>
                </div>
                <span class="talkies-dur" *ngIf="vid.duration">{{ vid.duration }}</span>
              </div>

              <div class="talkies-detail-info">
                <div class="talkies-tag-row">
                  <span class="talkies-cat">{{ vid.category }}</span>
                  <span class="talkies-channel">Aamir Khan Talkies</span>
                </div>
                <h3 class="talkies-card-title">
                  <button type="button" class="title-btn" (click)="openVideoPlayback(vid.youtubeId, vid.title)">
                    {{ vid.title }}
                  </button>
                </h3>
                <p class="talkies-card-desc">{{ vid.description }}</p>
                <div class="talkies-card-footer">
                  <button type="button" class="btn-play-sm" (click)="openVideoPlayback(vid.youtubeId, vid.title)">
                    <span>▶ Play episode</span>
                  </button>
                  <a [href]="'https://www.youtube.com/watch?v=' + vid.youtubeId" target="_blank" rel="noopener noreferrer" class="link-yt-sm">
                    <span>Watch on YouTube</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div class="talkies-explore-more">
            <div class="explore-more-inner">
              <div>
                <span class="eyebrow">AAMIR KHAN TALKIES ARCHIVE</span>
                <h3 class="explore-more-title">Explore more behind the camera stories.</h3>
              </div>
              <a routerLink="/beyond-the-frame" class="btn-visit-archive">
                <span>View Full Video Library</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 08: NEXT FILM TRANSITION FOOTER -->
      <section class="next-film-section" *ngIf="nextFilm">
        <div class="chapter-container">
          <div class="next-film-box">
            <div class="next-meta">
              <span class="eyebrow">CONTINUE EXPLORING</span>
              <span class="next-label">NEXT FILM IN ARCHIVE</span>
            </div>
            <a [routerLink]="['/films', nextFilm.slug]" class="next-link">
              <h3 class="next-title">{{ nextFilm.title }}</h3>
              <span class="next-arrow">↗</span>
            </a>
            <p class="next-tag">{{ nextFilm.year }} · {{ nextFilm.tag }}</p>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE TRAILER MODAL -->
      <div 
        class="modal-backdrop" 
        *ngIf="trailerModalOpen" 
        (click)="closeTrailerModal()"
        role="dialog" 
        aria-modal="true" 
        aria-label="Film Trailer Preview">
        <div class="modal-card video-card" (click)="$event.stopPropagation()">
          <div class="modal-top">
            <span class="modal-title">{{ film.title }} — Official Preview</span>
            <button class="modal-close" (click)="closeTrailerModal()" aria-label="Close trailer">✕</button>
          </div>
          <div class="video-aspect">
            <iframe 
              *ngIf="sanitizedVideoUrl"
              [src]="sanitizedVideoUrl" 
              title="Official Trailer" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>

      <!-- INTERACTIVE LIGHTBOX MODAL -->
      <div 
        class="modal-backdrop" 
        *ngIf="lightboxOpen" 
        (click)="closeLightbox()"
        role="dialog" 
        aria-modal="true" 
        aria-label="Image Lightbox">
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="lightbox-close" (click)="closeLightbox()" aria-label="Close lightbox">✕</button>
          
          <button 
            class="lightbox-nav prev" 
            (click)="prevLightbox()" 
            *ngIf="activeGalleryList.length > 1"
            aria-label="Previous image">
            ‹
          </button>
          
          <div class="lightbox-img-wrap">
            <img [src]="activeGalleryList[activeLightboxIdx].src" [alt]="activeGalleryList[activeLightboxIdx].alt" class="lightbox-img" />
            <p class="lightbox-caption" *ngIf="activeGalleryList[activeLightboxIdx].caption">
              {{ activeGalleryList[activeLightboxIdx].caption }}
            </p>
          </div>

          <button 
            class="lightbox-nav next" 
            (click)="nextLightbox()" 
            *ngIf="activeGalleryList.length > 1"
            aria-label="Next image">
            ›
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .film-detail-page {
      background-color: var(--paper);
    }

    /* 01: CINEMATIC FILM HERO */
    .film-hero {
      position: relative;
      background-color: var(--hero-bg);
      color: var(--hero-ivory);
      padding: 60px var(--gutter) 80px;
      overflow: hidden;
      border-bottom: 1px solid var(--hero-line);
    }

    .hero-bg-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 80% 30%, rgba(197, 168, 69, 0.15) 0%, transparent 60%),
                  linear-gradient(180deg, rgba(8, 9, 10, 0.8) 0%, #08090A 100%);
      z-index: 1;
    }

    .hero-ambient-poster {
      position: absolute;
      right: -10%;
      top: -10%;
      width: 70%;
      height: 120%;
      object-fit: cover;
      opacity: 0.12;
      filter: blur(40px);
      pointer-events: none;
      z-index: 0;
    }

    .hero-container {
      position: relative;
      z-index: 2;
      max-width: var(--max-content);
      margin: 0 auto;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 11px;
      letter-spacing: 0.12em;
      color: var(--hero-muted);
      margin-bottom: 40px;
    }

    .crumb-link {
      color: var(--hero-ivory);
      transition: color 0.2s;
    }

    .crumb-link:hover {
      color: var(--red);
    }

    .crumb-sep {
      opacity: 0.4;
    }

    .hero-main-row {
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
      gap: 60px;
      align-items: center;
      margin-bottom: 60px;
    }

    .film-headline {
      font-size: clamp(52px, 7vw, 108px);
      line-height: 0.92;
      letter-spacing: -0.06em;
      margin: 20px 0 10px;
    }

    .red-dot {
      color: var(--red);
    }

    .film-subtitle {
      font-size: 20px;
      color: var(--hero-muted);
      letter-spacing: 0.04em;
      margin-bottom: 16px;
    }

    .film-tagline {
      font-size: 20px;
      font-style: italic;
      color: #E8D0B0;
      margin-bottom: 36px;
      max-width: 580px;
      line-height: 1.4;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 32px;
      flex-wrap: wrap;
    }

    .dark-link {
      color: var(--hero-ivory);
      border-color: rgba(243, 241, 234, 0.4);
    }

    .dark-link:hover {
      border-color: var(--red);
    }

    /* Poster Card in Hero */
    .hero-poster-card {
      position: relative;
      max-width: 380px;
      aspect-ratio: 2 / 3;
      margin: 0 auto;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #000;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
      cursor: zoom-in;
      overflow: hidden;
    }

    .hero-poster-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }

    .hero-poster-card:hover .hero-poster-img {
      transform: scale(1.03);
    }

    .poster-zoom-tip {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.75);
      color: #FFFFFF;
      font-size: 10px;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: 12px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .hero-poster-card:hover .poster-zoom-tip {
      opacity: 1;
    }

    /* Metadata Ribbon */
    .film-meta-ribbon {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 30px;
      padding-top: 36px;
      border-top: 1px solid var(--hero-line);
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-label {
      font-size: 10px;
      letter-spacing: 0.18em;
      color: var(--red);
      font-weight: 600;
    }

    .meta-val {
      font-size: 14px;
      color: var(--hero-ivory);
      font-weight: 500;
    }

    /* STICKY CHAPTER NAVIGATION */
    .sticky-chapters-nav {
      position: sticky;
      top: var(--header-height);
      z-index: 90;
      background: var(--paper);
      border-bottom: 1px solid var(--line);
      box-shadow: 0 4px 16px rgba(16, 22, 27, 0.05);
    }

    .chapters-inner {
      max-width: var(--max-content);
      margin: 0 auto;
      padding: 0 var(--gutter);
      display: flex;
      gap: 32px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .chapters-inner::-webkit-scrollbar {
      display: none;
    }

    .chapters-inner a {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 18px 0;
      color: var(--ink-secondary);
      white-space: nowrap;
      position: relative;
      transition: color 0.2s;
    }

    .chapters-inner a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0%;
      height: 2px;
      background-color: var(--red);
      transition: width 0.25s ease;
    }

    .chapters-inner a:hover,
    .chapters-inner a.active {
      color: var(--red);
    }

    .chapters-inner a.active::after {
      width: 100%;
    }

    /* CHAPTER SECTIONS */
    .chapter-section {
      padding: 90px var(--gutter);
      border-bottom: 1px solid var(--line);
      scroll-margin-top: calc(var(--header-height) + 60px);
    }

    .chapter-container {
      max-width: var(--max-content);
      margin: 0 auto;
    }

    .chapter-header {
      margin-bottom: 50px;
    }

    .chapter-num {
      font-size: 11px;
      letter-spacing: 0.18em;
      color: var(--red);
      font-weight: 700;
      display: block;
      margin-bottom: 8px;
    }

    .chapter-title {
      font-size: clamp(34px, 4.4vw, 56px);
      letter-spacing: -0.04em;
    }

    /* CHAPTER 01: SYNOPSIS */
    .synopsis-layout {
      display: grid;
      grid-template-columns: 1.4fr 0.6fr;
      gap: 70px;
    }

    .synopsis-para {
      font-size: 18px;
      line-height: 1.75;
      color: var(--ink-secondary);
      margin-bottom: 24px;
    }

    .synopsis-pullquote {
      position: relative;
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 36px 40px;
      margin: 40px 0;
    }

    .quote-sign {
      font-family: var(--font-serif);
      font-size: 52px;
      line-height: 0.8;
      color: var(--amber);
      display: block;
      margin-bottom: 12px;
    }

    .quote-text {
      font-size: 22px;
      font-style: italic;
      line-height: 1.4;
      color: var(--ink);
      margin-bottom: 16px;
    }

    .quote-cite {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: var(--red);
    }

    .accolades-box {
      background: #F4EFEB;
      padding: 30px;
      border: 1px solid var(--line);
      margin-top: 36px;
    }

    .accolades-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: var(--red);
      display: block;
      margin-bottom: 14px;
    }

    .accolades-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 14px;
      font-weight: 500;
    }

    /* Sidebar */
    .synopsis-sidebar {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .sidebar-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: var(--ink);
      border-bottom: 1px solid var(--line);
      padding-bottom: 10px;
      display: block;
      margin-bottom: 18px;
    }

    .cast-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 14px;
      color: var(--ink-secondary);
    }

    .cast-bullet {
      color: var(--red);
      margin-right: 8px;
    }

    .specs-dl {
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-size: 13px;
    }

    .specs-dl dt {
      font-size: 10px;
      letter-spacing: 0.14em;
      color: var(--ink-light);
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .specs-dl dd {
      font-weight: 500;
      color: var(--ink);
    }

    /* CHAPTER 02: TRAILERS */
    .trailer-player-card {
      position: relative;
      aspect-ratio: 16 / 9;
      max-width: 1000px;
      background: #000;
      cursor: pointer;
      overflow: hidden;
      border: 1px solid var(--line);
    }

    .trailer-backdrop {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: transform 0.4s ease;
    }

    .trailer-player-card:hover .trailer-backdrop {
      transform: scale(1.03);
    }

    .player-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }

    .big-play-btn {
      width: 84px;
      height: 84px;
      background: var(--red);
      color: #FFFFFF;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 28px;
      box-shadow: 0 10px 30px rgba(187, 73, 65, 0.5);
      transition: transform 0.25s ease, background-color 0.25s ease;
    }

    .trailer-player-card:hover .big-play-btn {
      transform: scale(1.1);
      background-color: var(--red-hover);
    }

    .play-triangle {
      margin-left: 4px;
    }

    .trailer-info-chip {
      background: rgba(14, 18, 22, 0.75);
      backdrop-filter: blur(8px);
      padding: 8px 18px;
      border-radius: 20px;
      color: #FFFFFF;
      font-size: 12px;
      display: flex;
      gap: 12px;
    }

    .chip-runtime {
      color: var(--amber);
    }

    .trailer-note {
      font-size: 12px;
      color: var(--ink-light);
      margin-top: 14px;
    }

    /* CHAPTER 03: GALLERY */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;
    }

    .gallery-item {
      cursor: pointer;
    }

    .still-frame {
      position: relative;
      aspect-ratio: 16 / 10;
      background: #0E1216;
      overflow: hidden;
      border: 1px solid var(--line);
    }

    .still-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .gallery-item:hover .still-img {
      transform: scale(1.04);
    }

    .still-overlay {
      position: absolute;
      inset: 0;
      background: rgba(16, 22, 27, 0.45);
      display: grid;
      place-items: center;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .gallery-item:hover .still-overlay {
      opacity: 1;
    }

    .zoom-badge {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: #FFFFFF;
      padding: 8px 14px;
      border: 1px solid #FFFFFF;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 20px;
    }

    .still-caption {
      font-size: 12px;
      color: var(--ink-secondary);
      margin-top: 8px;
    }

    /* CHAPTER 04: BEHIND THE SCENES */
    .bts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
    }

    .bts-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      overflow: hidden;
    }

    .bts-img-container {
      aspect-ratio: 16 / 9;
      background: #000;
      cursor: pointer;
    }

    .bts-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .bts-caption {
      padding: 24px;
    }

    .bts-tag {
      font-size: 9px;
      letter-spacing: 0.16em;
      color: var(--red);
      font-weight: 700;
      display: block;
      margin-bottom: 8px;
    }

    .bts-caption p {
      font-size: 14px;
      color: var(--ink-secondary);
      line-height: 1.6;
    }

    /* CHAPTER 05: CREDITS */
    .credits-table {
      background: #FFFFFF;
      border: 1px solid var(--line);
      max-width: 900px;
    }

    .credits-row {
      display: grid;
      grid-template-columns: 240px 1fr;
      padding: 18px 28px;
      border-bottom: 1px solid var(--line-light);
      font-size: 14px;
    }

    .credits-row:last-child {
      border-bottom: none;
    }

    .credit-role {
      font-size: 11px;
      letter-spacing: 0.14em;
      color: var(--ink-light);
      font-weight: 600;
      text-transform: uppercase;
    }

    .credit-names {
      color: var(--ink);
      font-weight: 500;
    }

    /* CHAPTER 06: POSTERS */
    .posters-archive-row {
      display: flex;
      justify-content: center;
    }

    .poster-inspect-card {
      max-width: 440px;
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 24px;
      cursor: zoom-in;
      text-align: center;
    }

    .inspect-frame {
      aspect-ratio: 2 / 3;
      background: #0B0E11;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .inspect-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .inspect-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--red);
      display: block;
      margin-bottom: 4px;
    }

    .inspect-specs {
      font-size: 12px;
      color: var(--ink-muted);
    }

    /* 07: NEXT FILM */
    .next-film-section {
      background: #F4EFEB;
      padding: 80px var(--gutter);
      border-top: 1px solid var(--line);
    }

    .next-film-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 24px;
    }

    .next-label {
      font-size: 11px;
      letter-spacing: 0.14em;
      color: var(--ink-light);
      display: block;
      margin-top: 4px;
    }

    .next-link {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .next-title {
      font-size: clamp(32px, 4vw, 52px);
      letter-spacing: -0.04em;
      transition: color 0.2s;
    }

    .next-link:hover .next-title {
      color: var(--red);
    }

    .next-arrow {
      font-size: 32px;
      transition: transform 0.25s ease;
    }

    .next-link:hover .next-arrow {
      transform: translate(6px, -6px);
      color: var(--red);
    }

    .next-tag {
      font-size: 13px;
      color: var(--ink-muted);
      letter-spacing: 0.08em;
    }

    /* MODALS */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(8, 9, 10, 0.92);
      backdrop-filter: blur(12px);
      display: grid;
      place-items: center;
      padding: 30px;
    }

    .modal-card {
      background: #10161B;
      color: #FFFFFF;
      width: 100%;
      max-width: 960px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      overflow: hidden;
    }

    .modal-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-title {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.1em;
    }

    .modal-close {
      color: #FFFFFF;
      font-size: 18px;
    }

    .video-aspect {
      position: relative;
      aspect-ratio: 16 / 9;
      width: 100%;
    }

    .video-aspect iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    /* Lightbox */
    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      color: #FFFFFF;
      font-size: 24px;
    }

    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      font-size: 36px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      transition: background 0.2s;
    }

    .lightbox-nav:hover {
      background: var(--red);
    }

    .lightbox-nav.prev {
      left: -70px;
    }

    .lightbox-nav.next {
      right: -70px;
    }

    .lightbox-img-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .lightbox-img {
      max-width: 85vw;
      max-height: 80vh;
      object-fit: contain;
    }

    .lightbox-caption {
      color: #FFFFFF;
      font-size: 13px;
      margin-top: 14px;
      letter-spacing: 0.04em;
    }

    /* CHAPTER 07: FROM BEYOND THE FRAME */
    .chapter-talkies {
      background-color: #0E1012;
      color: #F7F3ED;
      border-top: 1px solid rgba(247, 243, 237, 0.1);
      border-bottom: 1px solid rgba(247, 243, 237, 0.1);
    }

    .chapter-sublead {
      font-size: 15px;
      color: #8E9194;
      line-height: 1.5;
      margin: 8px 0 36px;
      max-width: 650px;
    }

    .talkies-detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      margin-bottom: 48px;
    }

    .talkies-detail-card {
      background: #15181B;
      border: 1px solid rgba(247, 243, 237, 0.1);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, border-color 0.25s ease;
    }

    .talkies-detail-card:hover {
      transform: translateY(-4px);
      border-color: rgba(247, 243, 237, 0.25);
    }

    .talkies-detail-thumb {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000000;
      cursor: pointer;
      overflow: hidden;
      outline: none;
    }

    .talkies-detail-thumb:focus-visible {
      outline: 2px solid #F7F3ED;
      outline-offset: -2px;
    }

    .talkies-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .talkies-detail-card:hover .talkies-thumb-img {
      transform: scale(1.04);
    }

    .talkies-thumb-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease;
    }

    .talkies-detail-card:hover .talkies-thumb-overlay {
      background: rgba(0, 0, 0, 0.5);
    }

    .talkies-play-orb {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(247, 243, 237, 0.95);
      color: #0B0D0E;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, background 0.2s ease;
    }

    .talkies-detail-card:hover .talkies-play-orb {
      transform: scale(1.12);
      background: #FFFFFF;
    }

    .talkies-dur {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(14, 16, 18, 0.85);
      border: 1px solid rgba(247, 243, 237, 0.15);
      padding: 3px 6px;
      font-size: 10px;
      font-weight: 600;
      color: #F7F3ED;
      border-radius: 2px;
    }

    .talkies-detail-info {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .talkies-tag-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .talkies-cat {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--red);
    }

    .talkies-channel {
      font-size: 11px;
      color: #8E9194;
    }

    .talkies-card-title {
      font-size: 17px;
      font-weight: 500;
      line-height: 1.35;
      margin: 0 0 10px;
    }

    .talkies-card-desc {
      font-size: 13px;
      line-height: 1.6;
      color: #8E9194;
      margin: 0 0 20px;
      flex: 1;
    }

    .talkies-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid rgba(247, 243, 237, 0.1);
      margin-top: auto;
    }

    .btn-play-sm {
      background: none;
      border: none;
      color: #F7F3ED;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .btn-play-sm:hover {
      color: var(--red);
    }

    .link-yt-sm {
      color: #8E9194;
      font-size: 11px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .link-yt-sm:hover {
      color: #F7F3ED;
    }

    .talkies-explore-more {
      background: #15181B;
      border: 1px solid rgba(247, 243, 237, 0.1);
      border-radius: 4px;
      padding: 32px 40px;
    }

    .explore-more-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .explore-more-title {
      font-size: 20px;
      font-weight: 400;
      color: #F7F3ED;
      margin: 6px 0 0;
    }

    .btn-visit-archive {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #F7F3ED;
      color: #0B0D0E;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .btn-visit-archive:hover {
      background: #FFFFFF;
      transform: translateY(-2px);
    }

    @media (max-width: 900px) {
      .talkies-detail-grid {
        grid-template-columns: 1fr;
      }
      .explore-more-inner {
        flex-direction: column;
        align-items: flex-start;
      }
      .hero-main-row {
        grid-template-columns: 1fr;
      }
      .synopsis-layout {
        grid-template-columns: 1fr;
      }
      .bts-grid {
        grid-template-columns: 1fr;
      }
      .credits-row {
        grid-template-columns: 140px 1fr;
      }
      .lightbox-nav.prev {
        left: 10px;
      }
      .lightbox-nav.next {
        right: 10px;
      }
    }
  `]
})
export class FilmDetailComponent implements OnInit {
  film: Film | null = null;
  nextFilm: Film | null = null;
  talkiesVideos: TalkiesVideo[] = [];
  activeChapter = 'synopsis';

  // Modal States
  trailerModalOpen = false;
  lightboxOpen = false;
  activeGalleryList: FilmGalleryItem[] = [];
  activeLightboxIdx = 0;
  sanitizedVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || 'lagaan';
      this.loadFilm(slug);
    });
  }

  loadFilm(slug: string): void {
    const foundIndex = AKP_FILMS.findIndex(f => f.slug === slug || f.id === slug);
    if (foundIndex !== -1) {
      this.film = AKP_FILMS[foundIndex];
      this.nextFilm = AKP_FILMS[(foundIndex + 1) % AKP_FILMS.length];
      this.talkiesVideos = AKP_TALKIES_VIDEOS.filter(v => v.relatedFilmSlug === slug);

      if (this.film.youtubeId) {
        this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube-nocookie.com/embed/${this.film.youtubeId}?autoplay=1&rel=0`
        );
      } else {
        this.sanitizedVideoUrl = null;
      }
      window.scrollTo(0, 0);
    } else {
      // Fallback to Lagaan
      this.router.navigate(['/films', 'lagaan']);
    }
  }

  @HostListener('window:scroll')
  onScrollSpy(): void {
    const sections = this.talkiesVideos.length > 0 
      ? ['talkies', 'posters', 'credits', 'bts', 'gallery', 'trailers', 'synopsis']
      : ['posters', 'credits', 'bts', 'gallery', 'trailers', 'synopsis'];
    const threshold = 180;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > threshold) {
          this.activeChapter = id;
          return;
        }
      }
    }
  }

  scrollToSection(id: string, event: Event): void {
    event.preventDefault();
    this.activeChapter = id;
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 96 + 56 + 10;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  openVideoPlayback(youtubeId: string, title: string): void {
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`
    );
    this.trailerModalOpen = true;
  }

  openTrailerModal(): void {
    this.trailerModalOpen = true;
  }

  closeTrailerModal(): void {
    this.trailerModalOpen = false;
  }

  openLightbox(items: FilmGalleryItem[], index: number): void {
    this.activeGalleryList = items;
    this.activeLightboxIdx = index;
    this.lightboxOpen = true;
  }

  openPosterZoom(posterSrc: string): void {
    this.activeGalleryList = [{ src: posterSrc, alt: 'High resolution poster artwork', caption: 'Full theatrical key visual' }];
    this.activeLightboxIdx = 0;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  prevLightbox(): void {
    if (this.activeLightboxIdx > 0) {
      this.activeLightboxIdx--;
    } else {
      this.activeLightboxIdx = this.activeGalleryList.length - 1;
    }
  }

  nextLightbox(): void {
    if (this.activeLightboxIdx < this.activeGalleryList.length - 1) {
      this.activeLightboxIdx++;
    } else {
      this.activeLightboxIdx = 0;
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeTrailerModal();
    this.closeLightbox();
  }

  @HostListener('window:keydown.arrowleft')
  onArrowLeft(): void {
    if (this.lightboxOpen) this.prevLightbox();
  }

  @HostListener('window:keydown.arrowright')
  onArrowRight(): void {
    if (this.lightboxOpen) this.nextLightbox();
  }
}
