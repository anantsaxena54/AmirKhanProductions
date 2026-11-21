# Aamir Khan Productions (AKP) — Website Redesign & Production Build

A cinema-first, editorial, and interactive website redesign for **Aamir Khan Productions Pvt. Ltd. (AKP)**, engineered with **Angular 20**, **TypeScript**, **CSS Custom Properties & Radial Gradient Masks**, and **Three.js**.

---

## 1. Project Overview & Creative Philosophy

This implementation fulfills all design and technical specifications:
- **Interactive Spotlight Theatre Hero (1440 × 900 px):** Featuring a dual-layer CSS mask title wall (`--bg: #040404`). The dim base title layer receives clicks and focus, while the lit layer reveals warm ivory titles through an interactive spotlight mask. Moving the light highlights titles in AKP Red (`#E5262C`) with active tooltips (`[Title] · [Year] → View film`). Includes an idle Lissajous autopilot after 2.5s, session-scoped intro lighting, and keyboard accessibility.
- **Preserved Hero Variations:** In `src/app/components/home/home.component.ts`, previous hero implementations (the **35mm Vintage Projector** with interactive light cone, and the **Editorial 6-Poster Collage**) are preserved in cleanly commented blocks for quick restoration.
- **Dedicated Beyond the Frame Hub (`/beyond-the-frame`):** Complete Aamir Khan Talkies archive with a click-to-load YouTube facade, category filters (*All Videos*, *Behind the Scenes*, *Director's Commentary*, *Conversations*, *Special Features*), and integrated video modal playback.
- **Lumbre-Inspired Editorial Discipline:** Crisp warm-ivory (`#FAF8F5`) and charcoal (`#10161B`) sections with generous negative space, fine hairline dividers, and restrained typography (*Anton*, *Instrument Serif*, *Bodoni Moda*, *Inter*).
- **AKP Brand Identity:** Preserves the distinctive lowercase serif **`a`** mark and `AAMIR KHAN PRODUCTIONS PVT. LTD.` lockup with discreet red accents (`#E5262C`).
- **Real Film Artwork:** Authentic vertical film posters (*Lagaan*, *Dangal*, *Laapataa Ladies*, *Taare Zameen Par*, *Sitaare Zameen Par*, *Secret Superstar*, *Laal Singh Chaddha*, *Jaane Tu... Ya Jaane Na*, *Peepli Live*, *Dhobi Ghat*, *Delhi Belly*) rendered in portrait ratio (2:3) with `object-fit: contain`.

---

## 2. Information Architecture (Eight Core Views)

1. **01 — Home (`/`):**
   - Viewport-filling Spotlight Film-Title Wall Hero with interactive CSS mask and autopilot.
   - Headline: *"Stories that stay with us."* with primary CTA *"EXPLORE THE FILMS ↗"*.
   - Curated Filmography with featured AKP productions.
   - Studio Philosophy & Three Craft Pillars (Thoughtful Stories, Distinctive Voices, Lasting Impact).
   - "Beyond the Frame" editorial teaser linking to the dedicated video archive.
   - Studio Journal spotlight and Contact invitation.

2. **02 — Film Archive (`/films`):**
   - Warm ivory editorial gallery with live search and filter pills (*All Films*, *Recent Work*, *Historic Archive*, *Oscar Entries*).
   - Dual-view switcher: **Poster Grid View** (2:3 portrait cards) and **Living Editorial List View** (interactive rows with floating hover preview stills).

3. **03 — Beyond the Frame (`/beyond-the-frame`):**
   - Official Aamir Khan Talkies video hub with featured welcome video and category-filtered video library.

4. **04 — Film Detail: Lagaan (`/films/lagaan`):**
   - Dynamic chapter exhibition with sticky chapter navigation: `01. Synopsis` · `02. Trailers` · `03. Gallery` · `04. Behind the Scenes` · `05. Credits` · `06. Posters` · `07. Beyond the Frame`.
   - Interactive 16:9 widescreen video trailer modal with 1080p playback.
   - Full-screen gallery lightbox modal with keyboard navigation.

5. **05 — Film Detail: Taare Zameen Par (`/films/taare-zameen-par`):**
   - Complete film chapter exploration with high-definition gallery and production context.

6. **06 — The Studio (`/studio`):**
   - Editorial manifesto: *"Crafting stories that mean something."*
   - Verified Chronological Milestones Timeline (1999–2025) reflecting historical facts.
   - The AKP Discipline: Script development, cultural realism, and diverse voices.

7. **07 — Editorial Journal (`/journal`):**
   - Studio notes, archival restoration essays, and cinema craft discussions.
   - Interactive full-page Article Reader modal tuned for long-form reading.

8. **08 — Contact & Inquiries (`/contact`):**
   - Professional enquiry form with classification selector, live character counter, and client-side validation.
   - Studio headquarters address (Bandra West, Mumbai) and unsolicited material protocols.

---

## 3. Mockup & Presentation Suite

```text
├── AKP_Device_Mockup_Showcase.jpg    # MacBook Pro + iPhone 15 Pro 3D showcase
├── Desktop_Collage.jpg               # Eight-screen desktop overview (1440 × 900)
├── Mobile_Collage.jpg                # Eight-screen mobile responsive suite (390 × 844)
├── 1 - Desktop View/                 # High-resolution desktop fold & full-page captures
└── 2 - Mobile View/                  # High-resolution mobile fold & full-page captures
```

---

## 4. Development & Build Instructions

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Start Development Server
```bash
npm start
# Accessible at http://localhost:4200/
```

### Production Build
```bash
npm run build
# Generates static bundle in dist/AKP/browser/
```

### Capture Screenshots & Generate Mockups
```bash
node scripts/generate_all_mockups.js
```

---

© 2026 Aamir Khan Productions Pvt. Ltd. Concept Website & Pitch Redesign.