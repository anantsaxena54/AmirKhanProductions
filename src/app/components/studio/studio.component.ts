import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AKP_MILESTONES } from '../../data/films.data';
import { StudioMilestone } from '../../models/film.model';

@Component({
  selector: 'app-studio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="studio-page">
      <!-- Studio Hero Header -->
      <section class="studio-hero" aria-labelledby="studio-title">
        <div class="studio-container">
          <div class="eyebrow">THE PRODUCTION HOUSE</div>
          <div class="hero-row">
            <h1 id="studio-title" class="studio-headline">
              Crafting stories that<br>
              <em class="font-serif italic-accent">mean something.</em>
            </h1>
            <p class="studio-lead">
              Aamir Khan Productions was founded on a singular conviction: that mainstream Indian cinema can be artistically fearless, socially conscious, and globally resonant.
            </p>
          </div>
        </div>
      </section>

      <!-- Editorial Philosophy Statement & Visual -->
      <section class="studio-ethos-section">
        <div class="studio-container">
          <div class="ethos-grid">
            <div class="ethos-copy">
              <span class="label-kicker">CINEMA AS A SACRED TRUST</span>
              <h2 class="ethos-subhead">
                Respecting the audience is our first and final rule.
              </h2>
              <div class="ethos-prose">
                <p>
                  Since our inception in Mumbai in 1999, AKP has resisted the churn of formulaic film production. We view every screenplay as an exploration into human character — requiring years of script development, dialect preparation, and physical transformation.
                </p>
                <p>
                  From the drought-scorched fields of <em>Lagaan</em> to the childhood struggles of <em>Taare Zameen Par</em>, the wrestling akhadas of <em>Dangal</em>, and the heartfelt journey of <em>Laapataa Ladies</em>, we seek narratives that endure long after the theatrical lights come on.
                </p>
              </div>
            </div>

            <div class="ethos-visual">
              <div class="visual-frame">
                <img 
                  src="assets/media/vintage-projector.jpg" 
                  alt="35mm Cinema Projector Craft at AKP" 
                  class="ethos-img"
                />
                <div class="visual-caption">
                  <span>35MM CELLULOID HERITAGE</span>
                  <span>MUMBAI STUDIO ARCHIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Three Pillars of AKP Filmmaking -->
      <section class="pillars-section">
        <div class="studio-container">
          <div class="eyebrow">OUR CORE PRINCIPLES</div>
          <h2 class="section-title">The AKP Discipline<span class="red-dot">.</span></h2>

          <div class="pillars-grid">
            <div class="pillar-card">
              <span class="pillar-code">01 / DISCIPLINE</span>
              <h3 class="pillar-heading">Uncompromising Script Development</h3>
              <p class="pillar-text">
                We believe no amount of star power or technical spectacle can rescue a deficient script. We commit years to character stress-testing, table reads, and dialogue refinement before production begins.
              </p>
            </div>

            <div class="pillar-card">
              <span class="pillar-code">02 / AUTHENTICITY</span>
              <h3 class="pillar-heading">Location & Cultural Realism</h3>
              <p class="pillar-text">
                Rather than shooting on generic soundstages, our productions immerse themselves in the genuine landscapes of India — from the deserts of Kutch to the rural railway stations of Central India.
              </p>
            </div>

            <div class="pillar-card">
              <span class="pillar-code">03 / INCLUSION</span>
              <h3 class="pillar-heading">Diverse & Meaningful Voices</h3>
              <p class="pillar-text">
                Cinema flourishes when fresh perspectives take the helm. AKP has continually championed debut and emerging writers, women directors, and ensemble casts who reflect true human stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Verified Chronological Milestones -->
      <section class="timeline-section" aria-labelledby="timeline-title">
        <div class="studio-container">
          <div class="timeline-head">
            <div class="eyebrow">HISTORIC TRAJECTORY</div>
            <h2 id="timeline-title" class="section-title">Verified Studio Milestones<span class="red-dot">.</span></h2>
            <p class="timeline-sub">A quarter-century chronicle of key milestones in modern world cinema.</p>
          </div>

          <div class="timeline-list">
            <div *ngFor="let m of milestones" class="timeline-row">
              <div class="col-year">
                <span class="year-num">{{ m.year }}</span>
                <span class="year-line" aria-hidden="true"></span>
              </div>
              <div class="col-content">
                <span class="milestone-sub">{{ m.subtitle }}</span>
                <h3 class="milestone-title">{{ m.title }}</h3>
                <p class="milestone-desc">{{ m.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Studio CTA -->
      <section class="studio-cta-section">
        <div class="studio-container">
          <div class="cta-inner-box">
            <div>
              <span class="eyebrow">DISCOVER THE WORK</span>
              <h2 class="cta-heading">Explore our living film archive<span class="red-dot">.</span></h2>
            </div>
            <a routerLink="/films" class="cta-pill">
              <span>View all films</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .studio-page {
      background-color: var(--paper);
    }

    .studio-container {
      max-width: var(--max-content);
      margin: 0 auto;
      padding: 0 var(--gutter);
    }

    /* Studio Hero */
    .studio-hero {
      background-color: #F6F3EE;
      border-bottom: 1px solid var(--line);
      padding: 80px 0 60px;
    }

    .hero-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 50px;
      margin-top: 24px;
      flex-wrap: wrap;
    }

    .studio-headline {
      font-size: clamp(48px, 6.5vw, 96px);
      letter-spacing: -0.06em;
      line-height: 0.95;
    }

    .italic-accent {
      color: var(--red);
      font-weight: 400;
    }

    .studio-lead {
      font-size: 18px;
      line-height: 1.65;
      color: var(--ink-secondary);
      max-width: 480px;
    }

    /* Ethos Grid */
    .studio-ethos-section {
      padding: 100px 0;
      border-bottom: 1px solid var(--line);
    }

    .ethos-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 70px;
      align-items: center;
    }

    .label-kicker {
      font-size: 11px;
      letter-spacing: 0.16em;
      color: var(--red);
      font-weight: 700;
      display: block;
      margin-bottom: 14px;
    }

    .ethos-subhead {
      font-size: clamp(32px, 3.8vw, 52px);
      letter-spacing: -0.04em;
      line-height: 1.1;
      margin-bottom: 28px;
    }

    .ethos-prose p {
      font-size: 17px;
      line-height: 1.75;
      color: var(--ink-secondary);
      margin-bottom: 20px;
    }

    .visual-frame {
      position: relative;
      background: #0E1216;
      border: 1px solid var(--line);
      box-shadow: 0 20px 50px rgba(16, 22, 27, 0.08);
    }

    .ethos-img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }

    .visual-caption {
      display: flex;
      justify-content: space-between;
      padding: 14px 20px;
      font-size: 10px;
      letter-spacing: 0.16em;
      background: #FFFFFF;
      color: var(--ink-light);
      border-top: 1px solid var(--line);
    }

    /* Pillars */
    .pillars-section {
      padding: 100px 0;
      background: #FAF8F5;
      border-bottom: 1px solid var(--line);
    }

    .section-title {
      font-size: clamp(36px, 4.5vw, 64px);
      letter-spacing: -0.045em;
      margin: 14px 0 50px;
    }

    .red-dot {
      color: var(--red);
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    .pillar-card {
      background: #FFFFFF;
      padding: 36px;
      border: 1px solid var(--line);
      transition: transform 0.25s ease;
    }

    .pillar-card:hover {
      transform: translateY(-6px);
    }

    .pillar-code {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--red);
      display: block;
      margin-bottom: 16px;
    }

    .pillar-heading {
      font-size: 22px;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
      line-height: 1.25;
    }

    .pillar-text {
      font-size: 14px;
      color: var(--ink-muted);
      line-height: 1.65;
    }

    /* Timeline */
    .timeline-section {
      padding: 100px 0;
      background: #F4EFEB;
      border-bottom: 1px solid var(--line);
    }

    .timeline-head {
      margin-bottom: 60px;
    }

    .timeline-sub {
      font-size: 16px;
      color: var(--ink-secondary);
      margin-top: -30px;
    }

    .timeline-list {
      display: flex;
      flex-direction: column;
      max-width: 900px;
    }

    .timeline-row {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 40px;
      padding: 32px 0;
      border-bottom: 1px solid var(--line);
    }

    .col-year {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .year-num {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 600;
      color: var(--ink);
      letter-spacing: -0.04em;
    }

    .year-line {
      width: 40px;
      height: 2px;
      background: var(--red);
    }

    .milestone-sub {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--red);
      display: block;
      margin-bottom: 6px;
    }

    .milestone-title {
      font-size: 24px;
      letter-spacing: -0.03em;
      margin-bottom: 10px;
    }

    .milestone-desc {
      font-size: 15px;
      color: var(--ink-secondary);
      line-height: 1.6;
    }

    /* CTA Section */
    .studio-cta-section {
      padding: 80px 0;
      background: #FFFFFF;
    }

    .cta-inner-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
    }

    .cta-heading {
      font-size: clamp(32px, 3.8vw, 52px);
      letter-spacing: -0.04em;
      margin-top: 8px;
    }

    @media (max-width: 900px) {
      .ethos-grid {
        grid-template-columns: 1fr;
      }
      .pillars-grid {
        grid-template-columns: 1fr;
      }
      .timeline-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `]
})
export class StudioComponent {
  milestones: StudioMilestone[] = AKP_MILESTONES;
}
