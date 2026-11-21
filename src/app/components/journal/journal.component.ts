import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AKP_ARTICLES } from '../../data/films.data';
import { JournalArticle } from '../../models/film.model';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="journal-page">
      <!-- Journal Intro -->
      <section class="journal-intro" aria-labelledby="journal-title">
        <div class="journal-container">
          <div class="eyebrow">NOTES FROM THE STUDIO</div>
          <div class="intro-row">
            <h1 id="journal-title" class="journal-headline">
              Journal<span class="red-dot">.</span>
            </h1>
            <p class="journal-sub">
              A quieter space for film spotlights, studio updates, archival notes, and the craft behind the screen.
            </p>
          </div>

          <!-- Category Filter Bar -->
          <div class="category-filter-bar">
            <button 
              class="cat-btn" 
              [class.active]="selectedCategory === 'ALL'" 
              (click)="selectedCategory = 'ALL'">
              All Notes
            </button>
            <button 
              class="cat-btn" 
              [class.active]="selectedCategory === 'STUDIO NOTES'" 
              (click)="selectedCategory = 'STUDIO NOTES'">
              Studio Notes
            </button>
            <button 
              class="cat-btn" 
              [class.active]="selectedCategory === 'ARCHIVE'" 
              (click)="selectedCategory = 'ARCHIVE'">
              Archive & Preservation
            </button>
            <button 
              class="cat-btn" 
              [class.active]="selectedCategory === 'CINEMA ESSAY'" 
              (click)="selectedCategory = 'CINEMA ESSAY'">
              Cinema Essays
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Article Spotlight (Hero Article) -->
      <section class="spotlight-section" *ngIf="featuredArticle && selectedCategory === 'ALL'">
        <div class="journal-container">
          <article class="spotlight-card" (click)="openArticleReader(featuredArticle)">
            <div class="spotlight-img-col">
              <img [src]="featuredArticle.image" [alt]="featuredArticle.imageAlt" class="spotlight-img" />
              <span class="spotlight-badge">FEATURED ESSAY</span>
            </div>
            <div class="spotlight-body-col">
              <div class="spotlight-meta">
                <span class="cat-tag">{{ featuredArticle.category }}</span>
                <span>·</span>
                <span>{{ featuredArticle.date }}</span>
                <span>·</span>
                <span>{{ featuredArticle.readTime }}</span>
              </div>
              <h2 class="spotlight-title">{{ featuredArticle.title }}</h2>
              <p class="spotlight-subtitle">{{ featuredArticle.subtitle }}</p>
              <p class="spotlight-excerpt">{{ featuredArticle.excerpt }}</p>
              <div class="spotlight-footer">
                <span class="read-btn">Read full essay ↗</span>
                <span class="author-tag">By {{ featuredArticle.author }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Articles Grid -->
      <section class="articles-grid-section">
        <div class="journal-container">
          <div class="articles-grid">
            <article 
              *ngFor="let article of filteredArticles" 
              class="article-card"
              (click)="openArticleReader(article)">
              <div class="card-img-wrap">
                <img [src]="article.image" [alt]="article.imageAlt" class="card-img" loading="lazy" />
                <span class="cat-chip">{{ article.category }}</span>
              </div>
              <div class="card-content">
                <div class="card-meta">
                  <span>{{ article.date }}</span>
                  <span>·</span>
                  <span>{{ article.readTime }}</span>
                </div>
                <h3 class="card-title">{{ article.title }}</h3>
                <p class="card-excerpt">{{ article.excerpt }}</p>
                <div class="card-footer">
                  <span class="read-cta">Read entry ↗</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- FULL ARTICLE READER MODAL -->
      <div 
        class="reader-backdrop" 
        *ngIf="activeReaderArticle" 
        (click)="closeArticleReader()"
        role="dialog" 
        aria-modal="true" 
        aria-label="Editorial Article Reader">
        <div class="reader-modal" (click)="$event.stopPropagation()">
          <div class="reader-top-bar">
            <span class="eyebrow">{{ activeReaderArticle.category }}</span>
            <button class="reader-close" (click)="closeArticleReader()" aria-label="Close reader">✕</button>
          </div>

          <div class="reader-scrollable-body">
            <div class="reader-header">
              <span class="reader-date">{{ activeReaderArticle.date }} · {{ activeReaderArticle.readTime }}</span>
              <h2 class="reader-title">{{ activeReaderArticle.title }}</h2>
              <p class="reader-subtitle font-serif">{{ activeReaderArticle.subtitle }}</p>
              <div class="reader-byline">Written by {{ activeReaderArticle.author }}</div>
            </div>

            <div class="reader-hero-img-wrap">
              <img [src]="activeReaderArticle.image" [alt]="activeReaderArticle.imageAlt" class="reader-hero-img" />
            </div>

            <div class="reader-prose">
              <p *ngFor="let p of activeReaderArticle.content" class="reader-para">
                {{ p }}
              </p>
            </div>

            <div class="reader-footer">
              <div class="reader-signoff">
                <img src="assets/brand/Aamir_khan_productions.png" alt="" class="reader-logo" />
                <div>
                  <span class="signoff-brand">AAMIR KHAN PRODUCTIONS</span>
                  <span class="signoff-dept">Archive & Storytelling Desk</span>
                </div>
              </div>
              <button class="cta-pill" (click)="closeArticleReader()">
                <span>Back to Journal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .journal-page {
      background-color: var(--paper);
      min-height: calc(100vh - var(--header-height));
    }

    .journal-container {
      max-width: var(--max-content);
      margin: 0 auto;
      padding: 0 var(--gutter);
    }

    /* Intro */
    .journal-intro {
      background-color: #F6F3EE;
      border-bottom: 1px solid var(--line);
      padding: 70px 0 40px;
    }

    .intro-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 40px;
      margin: 20px 0 45px;
      flex-wrap: wrap;
    }

    .journal-headline {
      font-size: clamp(52px, 7vw, 104px);
      letter-spacing: -0.065em;
      line-height: 0.94;
    }

    .red-dot {
      color: var(--red);
    }

    .journal-sub {
      font-size: 16px;
      color: var(--ink-secondary);
      max-width: 440px;
      line-height: 1.6;
    }

    .category-filter-bar {
      display: flex;
      gap: 12px;
      padding-top: 24px;
      border-top: 1px solid var(--line);
      flex-wrap: wrap;
    }

    .cat-btn {
      padding: 8px 18px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.04em;
      border: 1px solid var(--line);
      border-radius: 30px;
      background: var(--paper);
      color: var(--ink-secondary);
      transition: all 0.2s;
    }

    .cat-btn:hover {
      background: #FFFFFF;
      border-color: var(--ink);
      color: var(--ink);
    }

    .cat-btn.active {
      background: var(--ink);
      color: #FFFFFF;
      border-color: var(--ink);
    }

    /* Spotlight Section */
    .spotlight-section {
      padding: 60px 0 30px;
    }

    .spotlight-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      display: grid;
      grid-template-columns: 1fr 1fr;
      cursor: pointer;
      transition: transform 0.25s, box-shadow 0.25s;
    }

    .spotlight-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(16, 22, 27, 0.08);
    }

    .spotlight-img-col {
      position: relative;
      background: #0E1216;
      aspect-ratio: 16 / 11;
      overflow: hidden;
    }

    .spotlight-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.35s ease;
    }

    .spotlight-card:hover .spotlight-img {
      transform: scale(1.03);
    }

    .spotlight-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: var(--red);
      color: #FFFFFF;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.14em;
      padding: 4px 10px;
    }

    .spotlight-body-col {
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .spotlight-meta {
      display: flex;
      gap: 10px;
      font-size: 11px;
      color: var(--ink-light);
      margin-bottom: 16px;
    }

    .cat-tag {
      color: var(--red);
      font-weight: 600;
    }

    .spotlight-title {
      font-size: clamp(28px, 3.2vw, 42px);
      letter-spacing: -0.04em;
      line-height: 1.15;
      margin-bottom: 14px;
    }

    .spotlight-subtitle {
      font-size: 16px;
      font-style: italic;
      color: var(--ink-secondary);
      margin-bottom: 18px;
      line-height: 1.5;
    }

    .spotlight-excerpt {
      font-size: 14px;
      color: var(--ink-muted);
      line-height: 1.65;
      margin-bottom: 28px;
    }

    .spotlight-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--line-light);
      padding-top: 18px;
    }

    .read-btn {
      font-size: 12px;
      font-weight: 600;
      color: var(--red);
    }

    .author-tag {
      font-size: 11px;
      color: var(--ink-light);
    }

    /* Articles Grid */
    .articles-grid-section {
      padding: 50px 0 100px;
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 36px;
    }

    .article-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease;
    }

    .article-card:hover {
      transform: translateY(-6px);
    }

    .card-img-wrap {
      position: relative;
      aspect-ratio: 16 / 10;
      background: #0E1216;
      overflow: hidden;
    }

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .article-card:hover .card-img {
      transform: scale(1.04);
    }

    .cat-chip {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(16, 22, 27, 0.85);
      color: #FFFFFF;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.12em;
      padding: 4px 10px;
    }

    .card-content {
      padding: 28px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .card-meta {
      font-size: 11px;
      color: var(--ink-light);
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .card-title {
      font-size: 22px;
      letter-spacing: -0.03em;
      line-height: 1.25;
      margin-bottom: 12px;
    }

    .card-excerpt {
      font-size: 13px;
      color: var(--ink-muted);
      line-height: 1.6;
      margin-bottom: 20px;
      flex: 1;
    }

    .card-footer {
      border-top: 1px solid var(--line-light);
      padding-top: 14px;
    }

    .read-cta {
      font-size: 12px;
      font-weight: 600;
      color: var(--red);
    }

    /* READER MODAL */
    .reader-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(8, 9, 10, 0.9);
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }

    .reader-modal {
      background: var(--paper);
      color: var(--ink);
      width: 100%;
      max-width: 820px;
      max-height: 90vh;
      border: 1px solid var(--line);
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
    }

    .reader-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 32px;
      border-bottom: 1px solid var(--line);
      background: #FFFFFF;
    }

    .reader-close {
      font-size: 20px;
      color: var(--ink);
    }

    .reader-scrollable-body {
      overflow-y: auto;
      padding: 40px 48px;
    }

    .reader-date {
      font-size: 12px;
      color: var(--ink-light);
      letter-spacing: 0.08em;
    }

    .reader-title {
      font-size: clamp(32px, 4vw, 48px);
      letter-spacing: -0.04em;
      margin: 14px 0 10px;
      line-height: 1.15;
    }

    .reader-subtitle {
      font-size: 20px;
      font-style: italic;
      color: var(--ink-secondary);
      margin-bottom: 14px;
    }

    .reader-byline {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--red);
      margin-bottom: 30px;
    }

    .reader-hero-img-wrap {
      aspect-ratio: 16 / 9;
      background: #0E1216;
      margin-bottom: 36px;
      overflow: hidden;
      border: 1px solid var(--line);
    }

    .reader-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .reader-prose p {
      font-size: 18px;
      line-height: 1.8;
      color: #2D3339;
      margin-bottom: 24px;
    }

    .reader-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--line);
      padding-top: 36px;
      margin-top: 40px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .reader-signoff {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .reader-logo {
      height: 38px;
      width: auto;
    }

    .signoff-brand {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.14em;
      display: block;
    }

    .signoff-dept {
      font-size: 10px;
      color: var(--ink-light);
    }

    @media (max-width: 900px) {
      .spotlight-card {
        grid-template-columns: 1fr;
      }
      .spotlight-body-col {
        padding: 30px;
      }
      .reader-scrollable-body {
        padding: 24px;
      }
    }
  `]
})
export class JournalComponent {
  articles: JournalArticle[] = AKP_ARTICLES;
  selectedCategory = 'ALL';
  featuredArticle: JournalArticle | undefined = AKP_ARTICLES.find(a => a.featured);
  activeReaderArticle: JournalArticle | null = null;

  get filteredArticles(): JournalArticle[] {
    if (this.selectedCategory === 'ALL') {
      return this.articles;
    }
    return this.articles.filter(a => a.category === this.selectedCategory);
  }

  openArticleReader(article: JournalArticle): void {
    this.activeReaderArticle = article;
  }

  closeArticleReader(): void {
    this.activeReaderArticle = null;
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.activeReaderArticle) {
      this.closeArticleReader();
    }
  }
}
