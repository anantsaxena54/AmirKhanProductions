import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AKP_FILMS } from '../../data/films.data';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="films-page">
      <!-- Archive Header -->
      <section class="archive-header" aria-labelledby="archive-title">
        <div class="header-inner">
          <div class="eyebrow">THE FILM ARCHIVE · 2001–2025</div>
          <div class="title-row">
            <h1 id="archive-title" class="archive-headline">
              Our films<span class="red-dot">.</span>
            </h1>
            <p class="archive-intro">
              Different voices. Distinctive worlds. Stories with something to say. Exploring the complete catalog of Aamir Khan Productions.
            </p>
          </div>

          <!-- Controls Bar: Filter Pills, Search, & View Toggle -->
          <div class="controls-bar">
            <!-- Filter Pills -->
            <div class="filter-pills" role="tablist" aria-label="Film categories">
              <button 
                class="pill-btn" 
                [class.active]="selectedFilter === 'all'" 
                (click)="setFilter('all')"
                role="tab"
                [attr.aria-selected]="selectedFilter === 'all'">
                All films <span class="count-badge">({{ allFilms.length }})</span>
              </button>
              <button 
                class="pill-btn" 
                [class.active]="selectedFilter === 'recent'" 
                (click)="setFilter('recent')"
                role="tab"
                [attr.aria-selected]="selectedFilter === 'recent'">
                Recent work
              </button>
              <button 
                class="pill-btn" 
                [class.active]="selectedFilter === 'archive'" 
                (click)="setFilter('archive')"
                role="tab"
                [attr.aria-selected]="selectedFilter === 'archive'">
                Historic Archive
              </button>
              <button 
                class="pill-btn" 
                [class.active]="selectedFilter === 'oscar'" 
                (click)="setFilter('oscar')"
                role="tab"
                [attr.aria-selected]="selectedFilter === 'oscar'">
                Oscar Entries 🏆
              </button>
            </div>

            <!-- Search & View Mode Switcher -->
            <div class="secondary-controls">
              <div class="search-wrap">
                <input 
                  type="text" 
                  [(ngModel)]="searchQuery" 
                  placeholder="Search title, director, year..." 
                  class="search-input"
                  aria-label="Search films catalog"
                />
                <span class="search-icon" aria-hidden="true">🔍</span>
              </div>

              <!-- View Mode Switcher: Grid vs Living List -->
              <div class="view-toggle" role="group" aria-label="Catalogue view format">
                <button 
                  class="toggle-btn" 
                  [class.active]="viewMode === 'grid'" 
                  (click)="viewMode = 'grid'"
                  aria-label="Poster Grid View">
                  ⊞ Grid
                </button>
                <button 
                  class="toggle-btn" 
                  [class.active]="viewMode === 'list'" 
                  (click)="viewMode = 'list'"
                  aria-label="Living Editorial List View">
                  ☰ List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Archive Content -->
      <section class="archive-body">
        <div class="body-inner">
          <!-- Active Filter Results Summary -->
          <div class="results-meta">
            <span>Showing {{ filteredFilms.length }} of {{ allFilms.length }} productions</span>
            <span *ngIf="searchQuery"> · Matching "{{ searchQuery }}"</span>
          </div>

          <!-- Empty State -->
          <div class="empty-state" *ngIf="filteredFilms.length === 0">
            <h3>No films found</h3>
            <p>We couldn't find any production matching your criteria.</p>
            <button class="akp-link" (click)="resetFilters()">Reset filters ↗</button>
          </div>

          <!-- 01: POSTER GRID VIEW (Guaranteed 2:3 aspect ratio, object-fit contain, no cropping) -->
          <div class="poster-grid" *ngIf="viewMode === 'grid'">
            <article *ngFor="let film of filteredFilms" class="poster-card">
              <a [routerLink]="['/films', film.slug]" class="card-link">
                <div class="poster-media-container">
                  <img 
                    [src]="film.poster" 
                    [alt]="film.title + ' original vertical poster'" 
                    class="portrait-poster-img"
                    loading="lazy"
                  />
                  <div class="poster-overlay">
                    <span class="view-badge">EXPLORE CHAPTERS ↗</span>
                  </div>
                  <span class="oscar-tag" *ngIf="film.oscarSelection">ACADEMY AWARDS</span>
                </div>

                <div class="poster-info">
                  <div class="info-row">
                    <span class="info-year">{{ film.year }}</span>
                    <span class="info-runtime">{{ film.runtimeDisplay }}</span>
                  </div>
                  <h2 class="info-title">{{ film.title }}</h2>
                  <p class="info-tag">{{ film.tag }}</p>
                  <p class="info-director">Dir. {{ film.director.join(', ') }}</p>
                </div>
              </a>
            </article>
          </div>

          <!-- 02: LIVING EDITORIAL ARCHIVE LIST VIEW (Interactive Hover Preview Still) -->
          <div class="living-list" *ngIf="viewMode === 'list'">
            <div class="list-table">
              <div class="list-header-row">
                <span class="col-yr">YEAR</span>
                <span class="col-title">FILM TITLE</span>
                <span class="col-tag">GENRE & THEME</span>
                <span class="col-dir">DIRECTOR</span>
                <span class="col-link">LINK</span>
              </div>

              <div 
                *ngFor="let film of filteredFilms; let i = index" 
                class="list-row"
                (mouseenter)="activeHoverFilm = film"
                (mouseleave)="activeHoverFilm = null">
                <a [routerLink]="['/films', film.slug]" class="row-link">
                  <span class="col-yr">{{ film.year }}</span>
                  <span class="col-title">
                    <strong>{{ film.title }}</strong>
                    <span class="oscar-mini-badge" *ngIf="film.oscarSelection">OSCAR</span>
                  </span>
                  <span class="col-tag">{{ film.tag }}</span>
                  <span class="col-dir">{{ film.director.join(', ') }}</span>
                  <span class="col-link">
                    <span class="row-arrow">↗</span>
                  </span>
                </a>
              </div>
            </div>

            <!-- Floating Hover Preview Still -->
            <div class="hover-preview-box" *ngIf="activeHoverFilm" aria-hidden="true">
              <div class="preview-inner">
                <img [src]="activeHoverFilm.poster" [alt]="activeHoverFilm.title" class="preview-img" />
                <div class="preview-caption">
                  <span>{{ activeHoverFilm.title }}</span>
                  <span>{{ activeHoverFilm.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .films-page {
      background-color: var(--paper);
      min-height: calc(100vh - var(--header-height));
    }

    /* Archive Header */
    .archive-header {
      background-color: #F6F3EE;
      border-bottom: 1px solid var(--line);
      padding: 70px var(--gutter) 40px;
    }

    .header-inner {
      max-width: var(--max-content);
      margin: 0 auto;
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 40px;
      margin: 20px 0 45px;
      flex-wrap: wrap;
    }

    .archive-headline {
      font-size: clamp(52px, 7vw, 104px);
      letter-spacing: -0.065em;
      line-height: 0.94;
    }

    .red-dot {
      color: var(--red);
    }

    .archive-intro {
      font-size: 16px;
      color: var(--ink-secondary);
      max-width: 440px;
      line-height: 1.6;
    }

    /* Controls Bar */
    .controls-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      padding-top: 24px;
      border-top: 1px solid var(--line);
    }

    .filter-pills {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .pill-btn {
      padding: 9px 18px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.04em;
      border: 1px solid var(--line);
      border-radius: 30px;
      background: var(--paper);
      color: var(--ink-secondary);
      transition: all 0.2s ease;
    }

    .pill-btn:hover {
      background: #FFFFFF;
      color: var(--ink);
      border-color: var(--ink);
    }

    .pill-btn.active {
      background: var(--ink);
      color: #FFFFFF;
      border-color: var(--ink);
    }

    .count-badge {
      font-size: 10px;
      opacity: 0.7;
    }

    .secondary-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .search-wrap {
      position: relative;
    }

    .search-input {
      padding: 9px 36px 9px 16px;
      font-size: 12px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: #FFFFFF;
      width: 220px;
      outline: none;
      transition: border-color 0.2s ease, width 0.2s ease;
    }

    .search-input:focus {
      border-color: var(--red);
      width: 260px;
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      pointer-events: none;
      opacity: 0.5;
    }

    .view-toggle {
      display: flex;
      border: 1px solid var(--line);
      border-radius: 20px;
      overflow: hidden;
      background: #FFFFFF;
    }

    .toggle-btn {
      padding: 8px 14px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .toggle-btn.active {
      background: var(--ink);
      color: #FFFFFF;
    }

    /* Archive Body */
    .archive-body {
      padding: 60px var(--gutter) 100px;
    }

    .body-inner {
      max-width: var(--max-content);
      margin: 0 auto;
    }

    .results-meta {
      font-size: 12px;
      color: var(--ink-light);
      margin-bottom: 36px;
      letter-spacing: 0.04em;
    }

    .empty-state {
      text-align: center;
      padding: 80px 20px;
      border: 1px dashed var(--line);
      background: #FFFFFF;
      margin: 40px 0;
    }

    .empty-state h3 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .empty-state p {
      color: var(--ink-muted);
      margin-bottom: 20px;
    }

    /* 01: POSTER GRID VIEW */
    .poster-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 40px;
    }

    .poster-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }

    .poster-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 36px rgba(16, 22, 27, 0.08);
    }

    .card-link {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    /* CRITICAL REQUIREMENT: 2:3 ratio with object-fit: contain to show full artwork unaltered */
    .poster-media-container {
      position: relative;
      aspect-ratio: 2 / 3;
      background: #0B0E11;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .portrait-poster-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.4s ease;
    }

    .poster-card:hover .portrait-poster-img {
      transform: scale(1.02);
    }

    .poster-overlay {
      position: absolute;
      inset: 0;
      background: rgba(16, 22, 27, 0.5);
      backdrop-filter: blur(4px);
      display: grid;
      place-items: center;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .poster-card:hover .poster-overlay {
      opacity: 1;
    }

    .view-badge {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: #FFFFFF;
      padding: 10px 18px;
      border: 1px solid #FFFFFF;
      border-radius: 30px;
      background: rgba(8, 9, 10, 0.6);
    }

    .oscar-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: var(--red);
      color: #FFFFFF;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.12em;
      padding: 4px 8px;
    }

    .poster-info {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--ink-secondary);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .info-title {
      font-size: 22px;
      letter-spacing: -0.025em;
      margin-bottom: 6px;
    }

    .info-tag {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--red);
      margin-bottom: 10px;
    }

    .info-director {
      font-size: 12px;
      color: var(--ink-muted);
      margin-top: auto;
      border-top: 1px solid var(--line-light);
      padding-top: 12px;
    }

    /* 02: LIVING EDITORIAL ARCHIVE LIST */
    .living-list {
      position: relative;
      background: #FFFFFF;
      border: 1px solid var(--line);
    }

    .list-table {
      width: 100%;
    }

    .list-header-row {
      display: grid;
      grid-template-columns: 80px 2.5fr 2fr 1.5fr 60px;
      padding: 16px 28px;
      border-bottom: 1px solid var(--line);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: var(--ink-light);
    }

    .list-row {
      border-bottom: 1px solid var(--line-light);
      transition: background 0.2s ease;
    }

    .list-row:hover {
      background: #FAF8F5;
    }

    .row-link {
      display: grid;
      grid-template-columns: 80px 2.5fr 2fr 1.5fr 60px;
      padding: 24px 28px;
      align-items: center;
      color: inherit;
    }

    .col-yr {
      font-size: 13px;
      font-weight: 600;
      color: var(--ink-secondary);
    }

    .col-title {
      font-size: 20px;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .oscar-mini-badge {
      font-size: 9px;
      background: var(--red);
      color: #FFFFFF;
      padding: 2px 6px;
      border-radius: 2px;
      font-weight: 700;
    }

    .col-tag {
      font-size: 12px;
      color: var(--red);
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .col-dir {
      font-size: 13px;
      color: var(--ink-muted);
    }

    .col-link {
      text-align: right;
    }

    .row-arrow {
      font-size: 18px;
      color: var(--ink-light);
      transition: color 0.2s, transform 0.2s;
    }

    .list-row:hover .row-arrow {
      color: var(--red);
      transform: translate(3px, -3px);
    }

    /* Floating Hover Preview Box */
    .hover-preview-box {
      position: fixed;
      right: 40px;
      bottom: 40px;
      width: 220px;
      z-index: 100;
      background: #10161B;
      padding: 8px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.15);
      pointer-events: none;
      animation: fadeIn 0.2s ease;
    }

    .preview-inner {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .preview-img {
      width: 100%;
      aspect-ratio: 2 / 3;
      object-fit: contain;
      background: #000;
    }

    .preview-caption {
      display: flex;
      justify-content: space-between;
      color: #FFFFFF;
      font-size: 11px;
      padding: 0 4px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    @media (max-width: 900px) {
      .list-header-row,
      .row-link {
        grid-template-columns: 60px 1fr 1fr;
      }
      .col-dir, .col-link {
        display: none;
      }
      .hover-preview-box {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .list-header-row,
      .row-link {
        grid-template-columns: 50px 1fr;
      }
      .col-tag {
        display: none;
      }
    }
  `]
})
export class FilmsComponent {
  allFilms: Film[] = AKP_FILMS;
  selectedFilter: 'all' | 'recent' | 'archive' | 'oscar' = 'all';
  searchQuery = '';
  viewMode: 'grid' | 'list' = 'grid';
  activeHoverFilm: Film | null = null;

  get filteredFilms(): Film[] {
    return this.allFilms.filter(film => {
      // Category filter
      if (this.selectedFilter === 'recent' && film.kind !== 'recent') return false;
      if (this.selectedFilter === 'archive' && film.kind !== 'archive') return false;
      if (this.selectedFilter === 'oscar' && !film.oscarSelection) return false;

      // Search query
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        const matchesTitle = film.title.toLowerCase().includes(q);
        const matchesDirector = film.director.some(d => d.toLowerCase().includes(q));
        const matchesYear = film.year.toString().includes(q);
        const matchesCast = film.cast.some(c => c.toLowerCase().includes(q));
        return matchesTitle || matchesDirector || matchesYear || matchesCast;
      }

      return true;
    });
  }

  setFilter(filter: 'all' | 'recent' | 'archive' | 'oscar'): void {
    this.selectedFilter = filter;
  }

  resetFilters(): void {
    this.selectedFilter = 'all';
    this.searchQuery = '';
  }
}
