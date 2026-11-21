import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AKP_TALKIES_VIDEOS } from '../../data/talkies.data';
import { TalkiesVideo, TalkiesCategory } from '../../models/film.model';

@Component({
  selector: 'app-beyond-the-frame',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="beyond-page" id="main-content">
      
      <!-- 01: EDITORIAL INTRO HERO -->
      <section class="btf-hero" aria-labelledby="btf-hero-title">
        <div class="btf-container">
          <div class="btf-hero-content">
            <div class="eyebrow eyebrow-btf">
              <span class="eyebrow-accent">●</span>
              <span>AAMIR KHAN TALKIES / THE VIDEO ARCHIVE</span>
            </div>

            <h1 id="btf-hero-title" class="btf-headline">
              Beyond the Frame<span class="dot-accent">.</span>
            </h1>

            <p class="btf-subtitle">
              The conversations, craft and moments behind the stories we love.
            </p>
          </div>
        </div>
      </section>

      <!-- 02: FEATURED WELCOME SPOTLIGHT (Click-to-load) -->
      <section class="btf-featured-section" aria-labelledby="featured-video-title">
        <div class="btf-container">
          <div class="featured-card-wrapper">
            <div class="featured-grid">
              
              <!-- Left Column: Editorial & Context -->
              <div class="featured-copy-col">
                <div class="featured-badge">
                  <span class="badge-dot">●</span>
                  <span>FEATURED ARCHIVE · START HERE</span>
                </div>

                <h2 id="featured-video-title" class="featured-video-title">
                  Welcome to Aamir Khan Talkies
                </h2>

                <p class="featured-description">
                  Step inside the conversations, craft and experiences behind the films. Discover the world of filmmaking with Aamir Khan Talkies.
                </p>

                <div class="featured-actions">
                  <button 
                    type="button" 
                    class="btn-play-primary" 
                    (click)="playFeaturedVideo()"
                    [attr.aria-expanded]="isFeaturedPlaying"
                    aria-controls="featured-player-viewport"
                  >
                    <span class="play-orb-icon" aria-hidden="true">▶</span>
                    <span>{{ isFeaturedPlaying ? 'Playing Welcome Video' : 'Watch the introduction' }}</span>
                  </button>

                  <a 
                    href="https://www.youtube.com/watch?v=iIUCuQ3V96U" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn-yt-fallback"
                    aria-label="Watch Welcome to Aamir Khan Talkies on YouTube (opens new tab)"
                  >
                    <span>Watch on YouTube</span>
                    <span class="ext-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>

                <div class="featured-meta-strip">
                  <div class="meta-item">
                    <span class="meta-label">CHANNEL</span>
                    <span class="meta-val">Aamir Khan Talkies Official</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">RUNTIME</span>
                    <span class="meta-val">02:15 · Full HD</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">FOCUS</span>
                    <span class="meta-val">Filmmaking & Archives</span>
                  </div>
                </div>
              </div>

              <!-- Right Column: 16:9 Video Viewport (Click-to-load) -->
              <div class="featured-video-col">
                <div 
                  id="featured-player-viewport"
                  class="video-aspect-frame" 
                  [class.is-playing]="isFeaturedPlaying"
                >
                  <!-- Lightweight Thumbnail & Accessible Play Trigger (Default State) -->
                  <div 
                    *ngIf="!isFeaturedPlaying" 
                    class="thumbnail-trigger"
                    (click)="playFeaturedVideo()"
                    (keydown.enter)="playFeaturedVideo()"
                    (keydown.space)="playFeaturedVideo(); $event.preventDefault()"
                    tabindex="0"
                    role="button"
                    aria-label="Click to play Welcome to Aamir Khan Talkies video"
                  >
                    <img 
                      src="assets/media/talkies/iIUCuQ3V96U.jpg" 
                      alt="Aamir Khan Talkies official welcome video thumbnail" 
                      class="preview-thumb-img"
                      loading="eager"
                    />
                    
                    <div class="thumb-overlay">
                      <div class="big-play-disc" aria-hidden="true">
                        <span class="play-arrow">▶</span>
                      </div>
                      <span class="play-prompt">CLICK TO WATCH INTRODUCTION</span>
                    </div>

                    <div class="thumb-duration-badge">02:15</div>
                  </div>

                  <!-- Privacy-Enhanced YouTube Embed (Loaded only upon explicit interaction) -->
                  <iframe 
                    *ngIf="isFeaturedPlaying && sanitizedFeaturedUrl"
                    [src]="sanitizedFeaturedUrl"
                    class="youtube-iframe"
                    title="Welcome to Aamir Khan Talkies! Channel Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- 03: ARCHIVE CATALOGUE & FILTER BAR -->
      <section class="btf-archive-section" aria-labelledby="archive-heading">
        <div class="btf-container">
          
          <div class="archive-header-row">
            <div>
              <div class="eyebrow eyebrow-archive">CURATED COLLECTIONS</div>
              <h2 id="archive-heading" class="archive-title">Explore the archive<span class="dot-accent">.</span></h2>
            </div>
            
            <p class="archive-summary">
              Showing {{ filteredVideos.length }} {{ filteredVideos.length === 1 ? 'verified video' : 'verified videos' }} from Aamir Khan Talkies.
            </p>
          </div>

          <!-- Category Filter Bar (WCAG Accessible Chips) -->
          <div class="filter-bar" role="tablist" aria-label="Video category filters">
            <button 
              *ngFor="let cat of categories" 
              type="button"
              role="tab"
              class="filter-pill"
              [class.active]="selectedCategory === cat"
              [attr.aria-selected]="selectedCategory === cat"
              (click)="selectCategory(cat)"
            >
              <span>{{ cat }}</span>
              <span class="pill-count" aria-hidden="true">{{ getCategoryCount(cat) }}</span>
            </button>
          </div>

          <!-- Video Grid (Responsive 1/2/3 columns) -->
          <div class="video-grid" *ngIf="filteredVideos.length > 0">
            <article 
              *ngFor="let video of filteredVideos; trackBy: trackByVideoId" 
              class="video-card"
            >
              <!-- 16:9 Thumbnail Card with Play Overlay -->
              <div 
                class="card-media"
                (click)="openVideoModal(video)"
                (keydown.enter)="openVideoModal(video)"
                (keydown.space)="openVideoModal(video); $event.preventDefault()"
                tabindex="0"
                role="button"
                [attr.aria-label]="'Play video: ' + video.title"
              >
                <div class="thumb-frame">
                  <img 
                    [src]="video.thumbnailUrl" 
                    [alt]="video.title + ' thumbnail'" 
                    class="card-thumb-img"
                    loading="lazy"
                  />
                  
                  <div class="card-play-overlay" aria-hidden="true">
                    <div class="card-play-orb">
                      <span class="play-icon">▶</span>
                    </div>
                  </div>

                  <span class="card-duration" *ngIf="video.duration">
                    {{ video.duration }}
                  </span>
                </div>
              </div>

              <!-- Card Metadata -->
              <div class="card-body">
                <div class="card-tag-row">
                  <span class="cat-tag">{{ video.category }}</span>
                  
                  <!-- Film Cross-Link if associated -->
                  <a 
                    *ngIf="video.relatedFilmSlug && video.relatedFilmTitle"
                    [routerLink]="['/films', video.relatedFilmSlug]" 
                    class="film-link-chip"
                    [attr.aria-label]="'View ' + video.relatedFilmTitle + ' film details'"
                  >
                    <span>{{ video.relatedFilmTitle }}</span>
                    <span class="film-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>

                <h3 class="card-title">
                  <button 
                    type="button" 
                    class="title-btn" 
                    (click)="openVideoModal(video)"
                  >
                    {{ video.title }}
                  </button>
                </h3>

                <p class="card-desc">
                  {{ video.description }}
                </p>

                <div class="card-footer">
                  <button 
                    type="button" 
                    class="card-play-link" 
                    (click)="openVideoModal(video)"
                  >
                    <span class="play-dot">▶</span>
                    <span>Watch video</span>
                  </button>

                  <a 
                    [href]="'https://www.youtube.com/watch?v=' + video.youtubeId" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="card-yt-link"
                    [attr.aria-label]="'Watch ' + video.title + ' on YouTube (opens new tab)'"
                  >
                    <span>YouTube</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty State (Graceful fallback) -->
          <div class="empty-state" *ngIf="filteredVideos.length === 0">
            <p class="empty-title">No videos found under {{ selectedCategory }}.</p>
            <p class="empty-subtitle">More curated Talkies footage is being digitized from the studio negative archives.</p>
            <button type="button" class="empty-btn" (click)="selectCategory('All Videos')">
              Return to All Videos
            </button>
          </div>

        </div>
      </section>

      <!-- 04: EDITORIAL SPOTLIGHT STORY -->
      <section class="btf-spotlight-section" aria-labelledby="spotlight-heading">
        <div class="btf-container">
          <div class="spotlight-card">
            <div class="spotlight-inner">
              <div class="spotlight-content">
                <div class="spotlight-eyebrow">
                  <span>CINEMA PERSPECTIVE · DIRECTOR'S COMMENTARY</span>
                </div>
                <h2 id="spotlight-heading" class="spotlight-title">
                  The Language of Silence in Taare Zameen Par
                </h2>
                <p class="spotlight-desc">
                  In this masterclass retrospective, Aamir Khan shares the delicate decision-making behind Ishaan’s dyslexia scene: how music was removed to allow raw human expression to speak louder than dialogue.
                </p>
                <div class="spotlight-actions">
                  <button 
                    type="button" 
                    class="btn-play-primary"
                    (click)="openSpotlightVideo('QW6Kb-2hBZc', 'Aamir’s Director Commentary — The Dyslexia Scene')"
                  >
                    <span class="play-orb-icon" aria-hidden="true">▶</span>
                    <span>Play Director's Commentary</span>
                  </button>
                  <a routerLink="/films/taare-zameen-par" class="btn-film-link">
                    <span>Explore Taare Zameen Par Film Page</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <div class="spotlight-visual">
                <img 
                  src="assets/media/talkies/QW6Kb-2hBZc.jpg" 
                  alt="Aamir Khan discussing Taare Zameen Par" 
                  class="spotlight-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05: END-OF-PAGE TRANSITION TO FILMS -->
      <section class="btf-end-cta">
        <div class="btf-container">
          <div class="end-cta-card">
            <span class="end-eyebrow">AAMIR KHAN PRODUCTIONS</span>
            <h2 class="end-title">Experience the complete film archive.</h2>
            <p class="end-desc">Explore the award-winning feature films, production chronicles, and festival releases produced since 1999.</p>
            <a routerLink="/films" class="end-link-btn">
              <span>EXPLORE ALL FILMS</span>
              <span class="end-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <!-- ACCESSIBLE VIDEO DIALOG MODAL -->
      <div 
        class="video-modal-backdrop" 
        *ngIf="modalVideo" 
        (click)="closeVideoModal()"
        role="dialog" 
        aria-modal="true" 
        [attr.aria-label]="modalVideo.title"
      >
        <div class="video-modal-dialog" (click)="$event.stopPropagation()">
          
          <div class="video-modal-header">
            <div class="modal-title-wrap">
              <span class="modal-category">{{ modalVideo.category }}</span>
              <h3 class="modal-video-title">{{ modalVideo.title }}</h3>
            </div>
            
            <button 
              type="button" 
              class="modal-close-btn" 
              (click)="closeVideoModal()"
              aria-label="Close video player"
            >
              ✕
            </button>
          </div>

          <!-- 16:9 Modal Video Player -->
          <div class="modal-video-aspect">
            <iframe 
              *ngIf="sanitizedModalUrl"
              [src]="sanitizedModalUrl" 
              [title]="modalVideo.title" 
              class="modal-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
            ></iframe>
          </div>

          <div class="modal-footer-info">
            <p class="modal-desc">{{ modalVideo.description }}</p>
            <div class="modal-links">
              <a 
                *ngIf="modalVideo.relatedFilmSlug"
                [routerLink]="['/films', modalVideo.relatedFilmSlug]" 
                (click)="closeVideoModal()"
                class="modal-film-btn"
              >
                <span>Go to {{ modalVideo.relatedFilmTitle }} Film Page</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a 
                [href]="'https://www.youtube.com/watch?v=' + modalVideo.youtubeId" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="modal-yt-btn"
              >
                <span>Watch on YouTube</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #0B0D0E;
      color: #F7F3ED;
      min-height: 100vh;
      --btf-bg: #0B0D0E;
      --btf-card-bg: #141719;
      --btf-card-hover: #1A1E22;
      --btf-ivory: #F7F3ED;
      --btf-muted: #8E9194;
      --btf-line: rgba(247, 243, 237, 0.1);
      --btf-line-highlight: rgba(247, 243, 237, 0.25);
      --btf-red: #B83A2E;
      --btf-red-glow: rgba(184, 58, 46, 0.25);
    }

    .beyond-page {
      background-color: var(--btf-bg);
      color: var(--btf-ivory);
      position: relative;
    }

    .btf-container {
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 40px;
    }

    /* 01: HERO */
    .btf-hero {
      padding: 120px 0 60px;
      border-bottom: 1px solid var(--btf-line);
      background: radial-gradient(circle at 10% 20%, rgba(184, 58, 46, 0.08) 0%, transparent 60%);
    }

    .btf-hero-content {
      max-width: 860px;
    }

    .eyebrow-btf {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--btf-muted);
      margin-bottom: 24px;
    }

    .eyebrow-accent {
      color: var(--btf-red);
      font-size: 8px;
    }

    .btf-headline {
      font-size: clamp(40px, 6vw, 76px);
      font-weight: 300;
      letter-spacing: -0.03em;
      line-height: 1.05;
      color: var(--btf-ivory);
      margin: 0 0 24px;
      font-family: 'Cinzel Decorative', Georgia, serif;
    }

    .dot-accent {
      color: var(--btf-red);
    }

    .btf-subtitle {
      font-size: clamp(16px, 1.8vw, 22px);
      line-height: 1.5;
      color: var(--btf-muted);
      margin: 0;
      font-weight: 300;
      max-width: 680px;
    }

    /* 02: FEATURED SECTION */
    .btf-featured-section {
      padding: 80px 0;
      border-bottom: 1px solid var(--btf-line);
    }

    .featured-card-wrapper {
      background-color: var(--btf-card-bg);
      border: 1px solid var(--btf-line);
      border-radius: 4px;
      padding: 48px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
      transition: border-color 0.3s ease;
    }

    .featured-card-wrapper:hover {
      border-color: var(--btf-line-highlight);
    }

    .featured-grid {
      display: grid;
      grid-template-columns: 1.1fr 1.3fr;
      gap: 56px;
      align-items: center;
    }

    .featured-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--btf-red);
      margin-bottom: 20px;
      background: rgba(184, 58, 46, 0.12);
      padding: 5px 12px;
      border-radius: 20px;
      border: 1px solid rgba(184, 58, 46, 0.25);
    }

    .badge-dot {
      font-size: 8px;
    }

    .featured-video-title {
      font-size: clamp(26px, 3vw, 38px);
      font-weight: 400;
      line-height: 1.2;
      color: var(--btf-ivory);
      margin: 0 0 18px;
      letter-spacing: -0.01em;
    }

    .featured-description {
      font-size: 15px;
      line-height: 1.65;
      color: var(--btf-muted);
      margin: 0 0 32px;
    }

    .featured-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
      margin-bottom: 36px;
    }

    .btn-play-primary {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background-color: var(--btf-ivory);
      color: #0B0D0E;
      border: none;
      padding: 14px 26px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 2px;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }

    .btn-play-primary:hover {
      background-color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(247, 243, 237, 0.25);
    }

    .play-orb-icon {
      font-size: 12px;
      color: var(--btf-red);
    }

    .btn-yt-fallback {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--btf-muted);
      text-decoration: none;
      padding: 12px 18px;
      border: 1px solid var(--btf-line);
      border-radius: 2px;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .btn-yt-fallback:hover {
      color: var(--btf-ivory);
      border-color: var(--btf-line-highlight);
    }

    .ext-arrow {
      font-size: 11px;
    }

    .featured-meta-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding-top: 24px;
      border-top: 1px solid var(--btf-line);
    }

    .meta-label {
      display: block;
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--btf-muted);
      margin-bottom: 4px;
      text-transform: uppercase;
    }

    .meta-val {
      display: block;
      font-size: 12px;
      color: var(--btf-ivory);
      font-weight: 500;
    }

    /* 16:9 Aspect Video Frame */
    .video-aspect-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background-color: #000000;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--btf-line);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    }

    .thumbnail-trigger {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;
      outline: none;
    }

    .thumbnail-trigger:focus-visible {
      outline: 2px solid var(--btf-ivory);
      outline-offset: 2px;
    }

    .preview-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .thumbnail-trigger:hover .preview-thumb-img {
      transform: scale(1.03);
    }

    .thumb-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(11, 13, 14, 0.2) 0%, rgba(11, 13, 14, 0.65) 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      transition: background 0.3s ease;
    }

    .thumbnail-trigger:hover .thumb-overlay {
      background: radial-gradient(circle at center, rgba(184, 58, 46, 0.2) 0%, rgba(11, 13, 14, 0.75) 100%);
    }

    .big-play-disc {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: rgba(247, 243, 237, 0.95);
      color: #0B0D0E;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.3, 1.5, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    }

    .thumbnail-trigger:hover .big-play-disc {
      transform: scale(1.12);
      background: #FFFFFF;
      box-shadow: 0 0 30px rgba(247, 243, 237, 0.5);
    }

    .play-arrow {
      font-size: 24px;
      margin-left: 4px;
      color: var(--btf-red);
    }

    .play-prompt {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: var(--btf-ivory);
      text-transform: uppercase;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
    }

    .thumb-duration-badge {
      position: absolute;
      bottom: 14px;
      right: 14px;
      background: rgba(11, 13, 14, 0.85);
      border: 1px solid var(--btf-line);
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 600;
      color: var(--btf-ivory);
      border-radius: 2px;
      letter-spacing: 0.05em;
    }

    .youtube-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    /* 03: ARCHIVE CATALOGUE */
    .btf-archive-section {
      padding: 90px 0;
      border-bottom: 1px solid var(--btf-line);
    }

    .archive-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 36px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .eyebrow-archive {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--btf-red);
      margin-bottom: 8px;
    }

    .archive-title {
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 300;
      letter-spacing: -0.02em;
      color: var(--btf-ivory);
      margin: 0;
      font-family: 'Cinzel Decorative', Georgia, serif;
    }

    .archive-summary {
      font-size: 14px;
      color: var(--btf-muted);
      margin: 0;
    }

    /* FILTER TABS */
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 48px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--btf-line);
    }

    .filter-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--btf-card-bg);
      border: 1px solid var(--btf-line);
      color: var(--btf-muted);
      padding: 10px 18px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.04em;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
    }

    .filter-pill:hover {
      color: var(--btf-ivory);
      border-color: var(--btf-line-highlight);
      background: var(--btf-card-hover);
    }

    .filter-pill.active {
      background: var(--btf-ivory);
      color: #0B0D0E;
      border-color: var(--btf-ivory);
      font-weight: 600;
    }

    .filter-pill:focus-visible {
      outline: 2px solid var(--btf-red);
      outline-offset: 2px;
    }

    .pill-count {
      font-size: 10px;
      background: rgba(247, 243, 237, 0.12);
      color: inherit;
      padding: 2px 7px;
      border-radius: 10px;
      transition: background 0.2s ease;
    }

    .filter-pill.active .pill-count {
      background: rgba(11, 13, 14, 0.15);
    }

    /* VIDEO GRID */
    .video-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 36px 28px;
    }

    .video-card {
      background: var(--btf-card-bg);
      border: 1px solid var(--btf-line);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .video-card:hover {
      transform: translateY(-4px);
      border-color: var(--btf-line-highlight);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
    }

    .card-media {
      position: relative;
      cursor: pointer;
      outline: none;
    }

    .card-media:focus-visible {
      outline: 2px solid var(--btf-ivory);
      outline-offset: -2px;
    }

    .thumb-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      overflow: hidden;
    }

    .card-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .video-card:hover .card-thumb-img {
      transform: scale(1.04);
    }

    .card-play-overlay {
      position: absolute;
      inset: 0;
      background: rgba(11, 13, 14, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.85;
      transition: opacity 0.3s ease, background 0.3s ease;
    }

    .video-card:hover .card-play-overlay {
      opacity: 1;
      background: rgba(11, 13, 14, 0.5);
    }

    .card-play-orb {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(247, 243, 237, 0.95);
      color: #0B0D0E;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.3, 1.5, 0.3, 1), background 0.3s ease;
    }

    .video-card:hover .card-play-orb {
      transform: scale(1.15);
      background: #FFFFFF;
    }

    .play-icon {
      font-size: 14px;
      margin-left: 2px;
      color: var(--btf-red);
    }

    .card-duration {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(11, 13, 14, 0.85);
      border: 1px solid var(--btf-line);
      padding: 3px 6px;
      font-size: 10px;
      font-weight: 600;
      color: var(--btf-ivory);
      border-radius: 2px;
      letter-spacing: 0.05em;
    }

    /* CARD BODY */
    .card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .card-tag-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }

    .cat-tag {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--btf-red);
    }

    .film-link-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 500;
      color: var(--btf-muted);
      text-decoration: none;
      padding: 2px 8px;
      background: rgba(247, 243, 237, 0.06);
      border-radius: 2px;
      transition: color 0.2s ease, background 0.2s ease;
    }

    .film-link-chip:hover {
      color: var(--btf-ivory);
      background: rgba(247, 243, 237, 0.12);
    }

    .film-arrow {
      font-size: 9px;
    }

    .card-title {
      font-size: 17px;
      font-weight: 500;
      line-height: 1.35;
      margin: 0 0 10px;
    }

    .title-btn {
      background: none;
      border: none;
      color: var(--btf-ivory);
      text-align: left;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      padding: 0;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .title-btn:hover {
      color: #FFFFFF;
    }

    .card-desc {
      font-size: 13px;
      line-height: 1.6;
      color: var(--btf-muted);
      margin: 0 0 20px;
      flex: 1;
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 16px;
      border-top: 1px solid var(--btf-line);
      margin-top: auto;
    }

    .card-play-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: var(--btf-ivory);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 0;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .card-play-link:hover {
      color: var(--btf-red);
    }

    .play-dot {
      color: var(--btf-red);
      font-size: 10px;
    }

    .card-yt-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: var(--btf-muted);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .card-yt-link:hover {
      color: var(--btf-ivory);
    }

    /* EMPTY STATE */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: var(--btf-card-bg);
      border: 1px dashed var(--btf-line);
      border-radius: 4px;
    }

    .empty-title {
      font-size: 18px;
      color: var(--btf-ivory);
      margin: 0 0 8px;
    }

    .empty-subtitle {
      font-size: 14px;
      color: var(--btf-muted);
      margin: 0 0 24px;
    }

    .empty-btn {
      background: var(--btf-ivory);
      color: #0B0D0E;
      border: none;
      padding: 10px 20px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 2px;
      cursor: pointer;
    }

    /* 04: SPOTLIGHT */
    .btf-spotlight-section {
      padding: 80px 0;
      border-bottom: 1px solid var(--btf-line);
    }

    .spotlight-card {
      background: radial-gradient(circle at 100% 50%, rgba(184, 58, 46, 0.15) 0%, transparent 70%), var(--btf-card-bg);
      border: 1px solid var(--btf-line);
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }

    .spotlight-inner {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .spotlight-content {
      padding: 56px 48px;
    }

    .spotlight-eyebrow {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--btf-red);
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .spotlight-title {
      font-size: clamp(24px, 2.5vw, 34px);
      font-weight: 400;
      line-height: 1.25;
      color: var(--btf-ivory);
      margin: 0 0 16px;
    }

    .spotlight-desc {
      font-size: 14px;
      line-height: 1.65;
      color: var(--btf-muted);
      margin: 0 0 28px;
    }

    .spotlight-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
    }

    .btn-film-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--btf-muted);
      font-size: 13px;
      text-decoration: none;
      padding: 12px 18px;
      border: 1px solid var(--btf-line);
      border-radius: 2px;
      transition: all 0.2s ease;
    }

    .btn-film-link:hover {
      color: var(--btf-ivory);
      border-color: var(--btf-line-highlight);
    }

    .spotlight-visual {
      position: relative;
      height: 100%;
      min-height: 320px;
      overflow: hidden;
    }

    .spotlight-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* 05: END CTA */
    .btf-end-cta {
      padding: 100px 0;
      text-align: center;
    }

    .end-cta-card {
      max-width: 640px;
      margin: 0 auto;
    }

    .end-eyebrow {
      display: block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: var(--btf-muted);
      margin-bottom: 16px;
    }

    .end-title {
      font-size: clamp(28px, 3.5vw, 42px);
      font-weight: 300;
      letter-spacing: -0.02em;
      color: var(--btf-ivory);
      margin: 0 0 16px;
      font-family: 'Cinzel Decorative', Georgia, serif;
    }

    .end-desc {
      font-size: 15px;
      line-height: 1.6;
      color: var(--btf-muted);
      margin: 0 0 32px;
    }

    .end-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--btf-ivory);
      color: #0B0D0E;
      text-decoration: none;
      padding: 14px 28px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      border-radius: 2px;
      transition: all 0.2s ease;
    }

    .end-link-btn:hover {
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(247, 243, 237, 0.3);
    }

    .end-arrow {
      font-size: 12px;
    }

    /* ACCESSIBLE MODAL */
    .video-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
      animation: modalFadeIn 0.25s ease forwards;
    }

    .video-modal-dialog {
      background: #141719;
      border: 1px solid var(--btf-line-highlight);
      border-radius: 6px;
      max-width: 900px;
      width: 100%;
      overflow: hidden;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.9);
      animation: modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .video-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 20px 24px;
      border-bottom: 1px solid var(--btf-line);
      gap: 16px;
    }

    .modal-category {
      display: block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--btf-red);
      margin-bottom: 4px;
    }

    .modal-video-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--btf-ivory);
      margin: 0;
      line-height: 1.3;
    }

    .modal-close-btn {
      background: none;
      border: 1px solid var(--btf-line);
      color: var(--btf-muted);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .modal-close-btn:hover {
      color: var(--btf-ivory);
      border-color: var(--btf-ivory);
      background: rgba(247, 243, 237, 0.1);
    }

    .modal-video-aspect {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
    }

    .modal-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .modal-footer-info {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      border-top: 1px solid var(--btf-line);
    }

    .modal-desc {
      font-size: 13px;
      line-height: 1.6;
      color: var(--btf-muted);
      margin: 0;
    }

    .modal-links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px;
    }

    .modal-film-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(247, 243, 237, 0.1);
      color: var(--btf-ivory);
      text-decoration: none;
      padding: 8px 14px;
      font-size: 12px;
      border-radius: 2px;
      transition: background 0.2s ease;
    }

    .modal-film-btn:hover {
      background: rgba(247, 243, 237, 0.2);
    }

    .modal-yt-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--btf-muted);
      text-decoration: none;
      font-size: 12px;
      transition: color 0.2s ease;
    }

    .modal-yt-btn:hover {
      color: var(--btf-ivory);
    }

    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes modalScaleUp {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    /* RESPONSIVE DESIGN */
    @media (max-width: 1100px) {
      .featured-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .video-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .spotlight-inner {
        grid-template-columns: 1fr;
      }
      .spotlight-visual {
        min-height: 240px;
      }
    }

    @media (max-width: 768px) {
      .btf-container {
        padding: 0 20px;
      }
      .btf-hero {
        padding: 100px 0 40px;
      }
      .featured-card-wrapper {
        padding: 24px;
      }
      .featured-meta-strip {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .video-grid {
        grid-template-columns: 1fr;
      }
      .spotlight-content {
        padding: 32px 24px;
      }
      .filter-bar {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 12px;
        scrollbar-width: thin;
      }
      .filter-pill {
        white-space: nowrap;
      }
    }

    /* REDUCED MOTION */
    @media (prefers-reduced-motion: reduce) {
      .video-card,
      .preview-thumb-img,
      .card-thumb-img,
      .big-play-disc,
      .card-play-orb,
      .video-modal-backdrop,
      .video-modal-dialog {
        transition: none !important;
        animation: none !important;
        transform: none !important;
      }
    }
  `]
})
export class BeyondTheFrameComponent implements OnInit {
  allVideos: TalkiesVideo[] = AKP_TALKIES_VIDEOS;
  filteredVideos: TalkiesVideo[] = [];
  
  categories: TalkiesCategory[] = [
    'All Videos',
    'Behind the Scenes',
    'Director\'s Commentary',
    'Conversations',
    'Special Features'
  ];
  selectedCategory: TalkiesCategory = 'All Videos';

  // Featured welcome video state
  isFeaturedPlaying = false;
  sanitizedFeaturedUrl: SafeResourceUrl | null = null;

  // Modal video state
  modalVideo: TalkiesVideo | null = null;
  sanitizedModalUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.filterVideos();
  }

  selectCategory(category: TalkiesCategory): void {
    this.selectedCategory = category;
    this.filterVideos();
  }

  filterVideos(): void {
    if (this.selectedCategory === 'All Videos') {
      this.filteredVideos = [...this.allVideos];
    } else {
      this.filteredVideos = this.allVideos.filter(v => v.category === this.selectedCategory);
    }
  }

  getCategoryCount(category: TalkiesCategory): number {
    if (category === 'All Videos') return this.allVideos.length;
    return this.allVideos.filter(v => v.category === category).length;
  }

  trackByVideoId(index: number, video: TalkiesVideo): string {
    return video.id;
  }

  playFeaturedVideo(): void {
    this.isFeaturedPlaying = true;
    this.sanitizedFeaturedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube-nocookie.com/embed/iIUCuQ3V96U?autoplay=1&playsinline=1&controls=1'
    );
  }

  openVideoModal(video: TalkiesVideo): void {
    this.modalVideo = video;
    this.sanitizedModalUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&controls=1`
    );
  }

  openSpotlightVideo(youtubeId: string, title: string): void {
    const video = this.allVideos.find(v => v.youtubeId === youtubeId) || {
      id: 'spotlight',
      youtubeId,
      title,
      description: 'Masterclass retrospective by Aamir Khan.',
      category: 'Director\'s Commentary' as const,
      thumbnailUrl: `assets/media/talkies/${youtubeId}.jpg`,
      sortOrder: 99
    };
    this.openVideoModal(video);
  }

  closeVideoModal(): void {
    this.modalVideo = null;
    this.sanitizedModalUrl = null;
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    if (this.modalVideo) {
      this.closeVideoModal();
    }
  }
}
