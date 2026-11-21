# Aamir Khan Productions — Website Redesign
## Complete Conversation Handoff & Website-Building Brief

**Prepared:** 21 November 2026  
**Client:** Aamir Khan Productions Pvt. Ltd. (AKP)  
**Prepared for:** Freelance website designer/developer and AI website-building agent  
**Project status:** Concept and mockup stage. No client-approved final build, production rights, or content sign-off have been established in this conversation.  
**Existing site:** http://akpfilms.com/

> **IMPORTANT FOR THE BUILD AGENT:** This is a consolidated brief spanning many iterations. **Give priority to the latest user instructions** in Sections 1–6. Earlier themes and generated images are included as references, not conflicting instructions. The final ambition is **extraordinary, creative, cinematic, interactive, yet minimalist**—not a generic movie-studio template and not a static screenshot pretending to be an animation.

---

## 1. Project objective and non-negotiable creative direction

The user is a freelance professional who was approached by Aamir Khan Productions to propose an updated website. The purpose of the project is to prepare strong, realistic, agency-quality concepts to help win the client work, followed by a website that can actually be developed and used.

**Primary creative goal:** A distinctive website for a respected film-production company that treats cinema as an art form, celebrates AKP's real films and brand identity, and impresses through purposeful interactions rather than unnecessary decorations.

**Latest approved/desired design language:**

- Minimalist and editorial; excellent grid discipline and generous negative space.
- **Dark, immersive, near-black homepage hero** with warm cinematic gold/amber light.
- Light warm-ivory (`#FAF8F5`) and charcoal (`#10161B`) sections on the other pages, inspired by the Lumbre photography/film theme.
- Original AKP identity: distinctive **lowercase serif `a`** logo, AAMIR KHAN PRODUCTIONS PVT. LTD. lockup, discreet red accents. Do not replace the brand with a generic logo.
- Strong hierarchy: large expressive headlines; editorial mixed typography; small labels and quiet metadata.
- Cinematic imagery from **real AKP films**, not fictional film titles or generated imitation posters.
- Carefully timed 3D and scroll animation; modern interactive navigation, including hover and active states.
- User wants a **real, usable UX-driven site**, with desktop and mobile layouts—not just AI-generated collage art.

**Latest creative upgrade (13:34–13:36 on 21 Nov 2026):** Incorporate an **animated 35mm camera / filmmaking object and floating 3D film reel or filmstrip** into the hero, inspired by <https://lab.chakibmzn.com/35mm/>. Also borrow ideas from:

- **Working Stiff Films:** expressive scroll animation.
- **Ordinary Folk:** navigation design and motion language.
- **BUCK (`https://buck.co/`):** refined navbar hover effects.

**Interpretation of the evolution:** Earlier, the user explicitly replaced a giant 3D `a` with a vintage **projector positioned on the right**, casting a beam **leftward over the hero headline**. A detailed projector hero at **1440 × 900 px** was created and accepted as the homepage direction. Most recently, the user asked to bring in the **35mm camera and film-reel scroll animation**. Therefore, prioritize a cinematic animated camera / filmstrip experience while retaining the earlier composition principles (right-side object, left-side storytelling, golden light, dark hero). **Avoid stacking a giant `a`, giant projector, and giant camera together.** The AKP `a` remains the smaller official brand mark. A projector can serve as a secondary/fallback motif if needed, but the latest animation request takes precedence.

---

## 2. Key visual references (open these before building)

| Reference | URL / asset | What to borrow | What not to copy blindly |
|---|---|---|---|
| Current AKP site | <http://akpfilms.com/> | Existing film information, identity, archive structure | Outdated layout and UX |
| **Lumbre theme** | <https://motionprompts.dev/plantillas/lumbre/index.en.html> | Minimal editorial layout, spacious sections, alternating light/dark, grid, image placement, restrained motion | Photography-services copy, prices, testimonials, studio-rental content |
| **35mm interactive experiment** | <https://lab.chakibmzn.com/35mm/> | Animated/wireframe vintage camera, floating 3D amber filmstrip, cinematic 3D scroll choreography | Canon product-specific narrative, site content, proprietary 3D assets/code |
| Working Stiff Films | <https://www.workingstifffilms.com/> | Expressive scroll-triggered visual transitions | Copying branded visual assets |
| Ordinary Folk | <https://www.ordinaryfolk.co/> | Sophisticated navigation/motion, understated yet delightful interactions | Exact reproduction of brand identity |
| BUCK | <https://buck.co/> | Minimal navigation and refined hover interaction patterns | Exact navbar implementation/branding |
| Annapurna Pictures | <https://annapurnapics.com/> | Film-as-curated-archive approach | Exact layout/artwork |
| A24 | <https://a24films.com/films> | Film-first visual storytelling and gallery | Movie art without permission |
| NEON | <https://www.neonrated.com/films/all> | Distinct film identities within one catalogue | Asset copying |
| Somesuch | <https://somesuch.co/> | Director/editorial storytelling, creative journal | Unrelated agency information |
| Lusion | <https://lusion.co/> | Selective 3D interactive quality | Resource-heavy effects on every page |
| Marcus Vane concept | Uploaded `Pasted text(1).txt` | Spring text reveals, kinetic typography, smooth scroll, motion sequencing | Its invented founder content, full visual identity, giant name hero |

**Original user-uploaded Lumbre source files:** `index.html` and `styles.css` in the conversation assets (from the template/reference). They are for design study and adaptation; **confirm the license** before copying their code into a commercial client project. In the source CSS, the reference uses Space Grotesk, Onest, warm ivory, charcoal and amber.

**Design-reference images available from this conversation:**

- `image(3).png` — 1440 × 900 reference showing dark AKP hero, large metal `a`, left-aligned headline.
- `AKP_Hero_Projector_1440x900.png` — 1440 × 900 dark hero with a vintage projector on the right, beam toward the left headline.
- `stories_that_stay_with_us.png` — latest concept exploration with a large camera and swirling golden filmstrip, near-black background.
- `Screenshot 2026-11-21 at 7.02.19 PM.png` and `Screenshot 2026-11-21 at 7.04.34 PM.png` — user references for the 35mm camera and orange filmstrip interaction.
- `vintage-cinema-magic-stockcake.jpg` — the vintage-projector photograph supplied by user as a reference.
- `AKP_Projector_UX_Desktop_Mobile_Package.zip` — prior functional six-page concept; use as a content/layout baseline, not necessarily final animation.
- `AKP_Lagaan_Film_Detail_Mockup.zip` — detailed Lagaan film page, desktop/mobile, code and screenshots.

**Copyright and identity:** The reference sites are inspiration, not a request for unlicensed code/assets or pixel-for-pixel copying. Use original implementations and client-authorized photos, trailers, film posters and brand files.

---

## 3. Latest homepage / hero requirements — **highest priority**

### Size and composition

- Reference desktop hero: **1440 × 900 px**, edge-to-edge, with a clear first-fold composition; responsive to larger screens.
- Overall background: near black (`#08090A` to `#10161B`) with warm amber highlights, fine hairline borders, subtle grain and bright ivory typography.
- Navigation at top, consistent with whole site.
- Text on **left**; cinematic object on **right**. Preserve readability throughout the animation.
- Strong but uncluttered bottom cues: studio/cinema line, `SCROLL TO EXPLORE` with subtle arrow.
- Small metadata such as `WEBSITE DESIGN CONCEPT · 2026` are **mockup-only**; remove from the live client site or replace with legitimate content.
- Film previews/curated filmography should begin **below the hero or at the next section**, not clutter its main focal composition.

### Existing approved-ish hero copy from iterations

**Eyebrow:** `INDEPENDENT CINEMA · AAMIR KHAN PRODUCTIONS`  
**Headline:**

> Stories  
> that stay  
> *with us.*

**Description:** `Films that stay with you long after the credits roll.`  
**Primary CTA:** `EXPLORE OUR FILMS`  
**Secondary visual cue:** `SCROLL TO EXPLORE`  
**Main navigation:** `Home`, `Films`, `Studio`, `Journal`, `Contact`.

The text is proposed concept copy **not yet signed off by AKP**. Keep it editable.

### Hero animation storyboard (important: implement motion, not merely a still image)

1. **Arrival (0–1 s, illustrative):** Dark hero fades in. Brand/nav and eyebrow appear. Camera/projector object arrives subtly from shadow; no long blocking preloader.
2. **Headline reveal:** `Stories / that stay / with us.` animates in short staggered lines with a natural spring/ease; use a contrasting italic serif for `with us.`.
3. **3D camera/object:** Stylized camera appears on the right, inspired by the 35mm reference: subtle wireframe-to-real-material treatment, gentle rotation/lighting, dimensional depth. Keep the object sufficiently stable to support reading.
4. **Film reel / strip:** A translucent amber 3D filmstrip unfurls or loops around/behind the camera, with tiny photographic frames. When users scroll, the ribbon moves through depth / follows a controlled spiral, leading into the Films section.
5. **Projector-beam influence (earlier approved concept):** Warm light travels from right to left across the hero and brushes the headline. It should be **controlled**, not wash out text or simulate seizure-inducing flashes.
6. **Scroll handoff:** As user moves downward, the camera may rotate slightly, and the strip smoothly transforms into / transitions toward real selected film artwork; then regular editorial content takes over.
7. **Idle/mouse hover:** Very subtle parallax/rotation, gentle lens or material reflections. No excessive movement.
8. **Motion fallback:** `prefers-reduced-motion: reduce`, touch, low-memory/low-performance devices and unsupported WebGL receive a **static high-quality hero** with all essential text and CTAs still accessible.

**Technical recommendation:** Three.js or React Three Fiber for the single hero 3D scene; GSAP ScrollTrigger (or carefully designed native intersection/scroll animation) for cinematic timing; CSS transforms for navigation and text micro-interactions. Use a compressed, optimized GLB/GLTF model the project has rights to use. The goal is *35mm-inspired animation*, not embedding a screenshot of that site.

**Must not:** make the entire site a heavy WebGL experience, place fake reels on every page, hide navigation under visuals, prevent native scroll, or force visitors to endure a long unskippable intro.

---

## 4. Site information architecture — six screens plus reusable film-details template

### Global navigation

**Home / Films / Studio / Journal / Contact.** The Film Details page is entered from the Films archive and has a visible `Back to Films` or breadcrumb link. The navigation/brand and footer should be consistent. Active page is clear. Navbar behavior can be inspired by BUCK and Ordinary Folk, with a clean text underline/indicator or delicate animated marker.

### 01 — Home

**Goal:** An immediate high-end cinematic impression that expresses AKP's brand and directs people into the work.

- Full-screen dark hero above.
- Above-the-fold headline and Explore Films CTA.
- Next section: `Curated Filmography` / `Stories from the studio` with genuine movie imagery.
- 3–4 featured films with metadata and routes to details. Use genuine artwork rather than AI-generated pseudo-posters.
- Short, credible production-house intro leading to Studio page.
- Optional real news highlight and well-defined contact invitation, if approved content exists.

### 02 — Films / Film Archive

**Goal:** Make it easy and enjoyable to discover AKP films.

- **Light ivory editorial page**, large `Our films.` headline, quiet supporting copy.
- Filter/sort options such as `All films`, `Recent work`, `Archive` (functional, not decorative). Category filters only if accurate genre metadata exists.
- Six initial user-supplied posters listed in Section 7, with the possibility of a longer accurate client-approved filmography later.
- Card layout: label/title/year/genre; the whole card is clickable, with clear focus and hover states.
- **Critical correction from conversation:** Posters are portrait artwork and must not be cropped into short landscape rectangles. Use an appropriate portrait aspect ratio (roughly 2:3 or 3:4) with **`object-fit: contain`**; do not stretch, cut off text, faces, studio marks or credits. Use neutral backgrounds/letterboxing if necessary.
- On mobile, 1 or 2 columns depending on width, with large enough touch targets.
- Optional more innovative view: **Living Film Archive**—an editorial list whose hover/focus previews a still; retain usable poster-grid fallback.
- Consider loading 6–12 at once for initial experience. Search/filter only if useful when full filmography is available.

### 03 — Film Details — reusable for every film

**Goal:** Each movie should feel like a **mini digital exhibition** while preserving all content from the current AKP film site.

In earlier discussion, the current `Lagaan` page was shown with a black-and-white movie hero, title, cast/crew metadata, and these sections: **Synopsis, Trailers, Gallery, Behind the Scenes, Credits, Posters**. All six must be accommodated in the redesign.

**Recommended structure — Cinematic Chapters + Editorial Film Journal:**

1. **Cinematic hero** with an authentic film still or approved video (not necessarily the site-wide animated camera hero), film title, optional tagline, breadcrumbs and trailer CTA.
2. **Compact film metadata:** release date/year, runtime, genre/language (if verified), director, writer, producer, starring cast; clear label-value structure.
3. **Sticky chapter navigation** across the content: `Synopsis | Trailers | Gallery | Behind the Scenes | Credits | Posters`. Highlight active section and allow accessible keyboard/touch navigation. Mobile strip should be horizontally scrollable without breaking the page.
4. **Synopsis:** large editorial heading and readable copy with a strong film still.
5. **Trailers:** one large 16:9 preview and explicit play button; load video **only upon click** or when reasonably visible. Accessible video controls/captions where available.
6. **Gallery:** curated stills in a balanced asymmetric/grid layout. Click opens full-screen lightbox; previous/next, Escape to close, keyboard controls, focus management, alt text and captions.
7. **Behind the Scenes:** genuine approved production photos and optional short captions. No invented archival photography disguised as real.
8. **Credits:** grouped, scannable roles and names; handle long lists and empty/missing optional metadata.
9. **Posters:** original unaltered artwork at natural portrait ratio, `object-fit: contain`, click-to-zoom.
10. **Continue exploring:** a large `Discover another film` / `Next film` transition near footer.

**Current Lagaan information shown in user-provided website screenshot:**

- Film: *Lagaan*.
- Starring: Aamir Khan, Gracy Singh, Rachel Shelley.
- Director: Ashutosh Gowariker.
- Writer: Ashutosh Gowariker.
- Runtime: **3 hr 44 min**.
- Existing site screenshot lists release date as **8 May 2002**; this **requires verification** because the film is generally recorded as a **2001 release**. Do not silently publish a contradictory date.
- Current AKP site shows the categories/menu above; preserve their information scope.

**Relevant prior mockup:** `AKP_Lagaan_Film_Detail_Mockup.zip` includes `index.html`, `standalone.html`, desktop and mobile full-page screenshots, film screenshot-derived images. The exploratory illustration used some illustrative imagery. Check content/rights before production.

**Design treatment:** Use **a dark cinematic hero followed by warm-ivory sections**, small red markers, consistent typography and fine dividers. This is distinct from the Home hero and does not need a giant 3D object.

### 04 — Studio / About AKP

**Goal:** Tell the production house's real story credibly and succinctly.

- Editorial brand statement, authentic team/studio/filmmaking photography, AKP philosophy, optionally a fact-checked timeline or notable creative milestones.
- Use negative space, fine lines and a restrained typographic hierarchy.
- Do **not** invent company founding dates, production counts, awards, claims or people; several earlier AI mockups contained placeholder timelines such as `2001`, `2012`, `2016`, `Today`, and an `EST. 1999` footer. These were design placeholders and need client verification.

### 05 — Journal / News & Updates

**Goal:** A polished editorial archive of verifiable client-approved announcements and stories.

- Editorial list or featured-story grid with headline, date, category and suitable authentic image.
- News detail pages if needed, with clean readable article templates.
- Empty state if no approved articles; don't invent project announcements, festival selections or publication dates.
- Earlier mockups contained fictional-looking headline/date combinations; do not carry them into the live site as facts.

### 06 — Contact

**Goal:** A trustworthy, friction-free point of contact.

- Clear `Get in touch` or `Let's talk` heading.
- Fields: Name, Email, Subject/Enquiry Type (if useful), Message; clear required indicators and helpful errors.
- Success state, error state, spam prevention, privacy disclosure, accessible labels and focus treatment.
- Provide official contact email, location and social links **only after verifying with AKP**. `info@akpfilms.com`, Mumbai office references and mockup social icons appeared in exploratory designs and must not be treated as confirmed.
- Working submission endpoint needed for production; previous prototype form was **demo-only**.

---

## 5. User experience, accessibility and performance requirements

Apply practical UX principles throughout, including **consistency, visual hierarchy, recognition over recall, feedback, user control, accessibility and error prevention**.

### Navigation and information architecture
- Same navigation location, active styling, logo behavior and footer on every page.
- On desktop, directly visible links. Mobile: button with an accessible menu that closes on link selection, Escape and route change, with clear focus management.
- No mystery navigation; creative hover interactions must not hide functionality.
- Breadcrumb on film pages and easy return to Films.
- Keep text readable while scrolling or animating; avoid locking scroll unnecessarily.

### Accessibility — target WCAG 2.2 AA
- Sufficient foreground/background contrast; **don't put thin low-contrast text directly over variable footage**.
- Keyboard-accessible links, buttons, tabs, modal/lightbox, film filters and carousel.
- Proper heading order, landmarks, semantic markup, focus-visible states, form labels, alt text for film artwork, meaningful button labels.
- Target ~44×44 CSS px comfortable touch interactions where feasible.
- Respect `prefers-reduced-motion` and offer play/pause or reduced visual motion for major animations when appropriate.
- Avoid auto-playing audio. Autoplay video only silent/muted and with a pause mechanism when motion is substantial.
- Sticky chapter nav should not cover targets; use `scroll-margin-top`.

### Responsive layout
- Desktop reference **1440 × 900** hero; include 1440-wide screenshots and full-page screenshots.
- Mobile reference roughly **390 px width**; test 320/360/375/390/430 px as well as tablets (768/1024 px).
- No horizontal overflow or cut-off controls/posters. The 3D object should reduce/move out of the text's way on smaller screens.
- Paragraphs should have comfortable line length (~45–75 characters on desktop) and type scale that remains readable on mobile.
- Portrait film posters remain fully visible at all breakpoints.

### Performance
- Progressive enhancement: **fast readable page without JS/WebGL**, richer motion where supported.
- Split/reduce large models and texture sizes; optimize GLB, use compressed textures, lazy-load 3D after critical HTML/content if needed.
- Responsive image sizes, WebP/AVIF where appropriate, lazy loading below fold, preserve original film poster clarity.
- Prevent cumulative layout shift by reserving image/video/3D space; optimize fonts and preloading of critical hero assets.
- Target good Core Web Vitals (e.g. LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 where achievable); measure rather than assume.
- Smooth interactions must not come at the cost of low-end mobile performance.

### UX test cases
1. First visit makes AKP identity, purpose and Films CTA obvious within seconds.
2. Film posters are visible **in full** and still readable (including embedded poster text).
3. Filters work correctly and return sensible empty states.
4. Clicking a film loads the matching film's metadata, photos, trailer, sections and poster.
5. All six chapters are discoverable and section links work on desktop/mobile.
6. Gallery/lightbox, video and forms work with mouse, touch and keyboard.
7. Mobile navigation and forms work without overflow.
8. The design is still useful with motion disabled, WebGL unavailable or JS partially disabled.
9. Content and images remain accurate; placeholders are not presented as verified facts.

---

## 6. Navigation and interaction inspiration — detailed specification

### BUCK-inspired navbar hover
- Keep base labels minimal: `Home · Films · Studio · Journal · Contact`.
- On hover/focus, a subtle red underline/animated indicator slides or grows beneath the active link; a tasteful letter/position change can be considered if readability is preserved.
- Active state remains visible even without hover. No rapid jitter or cursor-chasing navigation.

### Ordinary Folk-inspired menu behavior
- Mobile menu can expand into a clean full-screen/large overlay with generous typography and subtle staggered link reveal.
- A clear close button; Escape, proper focus handling, consistent brand lockup.
- Make it delightful but predictable; animation ~250–500ms, reduced-motion fallback.

### Working Stiff-inspired scroll motion
- Use purposeful text entrance, imagery shifts, restrained parallax and section transitions.
- Favor a choreographed hero-to-filmography handoff over constant random movement.
- Use sensible easing and animation in/out of view, not unavoidable scroll hijacking.

### 35mm-inspired 3D scroll sequence
- Camera transitions from a detailed wireframe technical outline to a subtly lit realistic/cinematic model, if feasible.
- A gold/orange film-strip ribbon is the signature depth object. It loops in perspective/spirals with meaningful frame perforations.
- Scroll position changes its orientation and movement to transition into real AKP film imagery. Smooth motion but no need for 1:1 recreation of the reference site.
- Text and buttons remain stable enough to use while 3D moves.
- A lightweight static image / reduced version is acceptable on limited devices.

---

## 7. Actual movie poster images supplied by user — MUST USE THESE

These six original image files were uploaded by the user. **They are the preferred source assets**, rather than generated substitutes. Add them as assets in the actual build and map the filenames accurately.

| Film | Year used in mocks | Original uploaded file | Notes |
|---|---:|---|---|
| *Dangal* | 2016 | `dangal.jpg` | Vertical movie poster, 1168×1752 |
| *Laapataa Ladies* | 2024 | `Laapataa_Ladies_poster.jpg` | Small original file, 282×353; ask for higher-resolution approved artwork before launch |
| *Laal Singh Chaddha* | 2022 | `lal.webp` | Vertical artwork, 600×900 |
| *Sitaare Zameen Par* | 2025 | `poster sitare-zameen-par (1)-58b8fc00-2bf7-11f0-b426-a50671acfc24.webp` | Vertical artwork, 600×800 |
| *Secret Superstar* | 2017 | `MV5BMDNmMDAyZjItYWMzOC00YTBhLWE5ZTAtZGFiZDk3YzFjY2VmXkEyXkFqcGc@.jpg` | Vertical artwork, 1238×1650 |
| *Taare Zameen Par* | 2007 | `taare.jpg` | Vertical artwork, 1039×1500 |

**Also relevant:** *Lagaan* should be featured as a film detail case study, but the user-provided *Lagaan* screenshot/poster assets exist inside the earlier detail mockup package and source-site screenshots, not as one of the six poster uploads above. Seek client-supplied original high-resolution artwork and authoritative film facts.

**Important image behavior:** Poster images should not be cut into horizontal landscape cards with `object-fit: cover`. If the layout calls for landscape tiles, use a separately licensed film still or a blurred/letterboxed background with the intact vertical poster over it. For the main Film Archive, prefer a portrait ratio and `object-fit: contain`.

**Use the actual AKP logo** from supplied `Aamir_khan_productions.png` (231×163 preview), or ask the client for vector brand artwork. Match letterform and proportions; do not replace with arbitrary lowercase serif type if the real logo is available.

---

## 8. Design system and art direction

**Base:** Lumbre's clean editorial structure, adapted to AKP.

| Token | Suggested value / behavior |
|---|---|
| Light paper | `#FAF8F5` |
| Dark ink / content | `#10161B` |
| Near-black hero | `#08090A` / `#0B0D0E` |
| White/ivory on dark | `#F3F1EA` |
| Quiet body grey | `#706B66` or accessible equivalent |
| Hairline borders | `#E4E0DA` on light, semi-transparent ivory on dark |
| Brand red | Muted `#BB4941` in prior working concept (client may approve another exact red) |
| Cinematic highlights | Warm amber/gold from the projected beam and 35mm filmstrip; **not** a second UI accent everywhere |
| Display type | Large clean sans such as Space Grotesk; pair selected hero phrase with refined italic serif |
| Body/interface type | Onest or similarly legible geometric sans |
| Labels | Small uppercase, restrained tracking, accessible contrast |
| Image treatment | Genuine film imagery, sharp poster art, dark/monochrome cinematic imagery where appropriate |
| Cards | Minimal border/rule, low visual noise, no unnecessary shadows or rounded cards |
| White space | Spacious 12-column editorial grid / logical responsive layout |

**Do not:** fill each page with a reel, clapperboard and projector; use glowing neon gradients; make every heading enormous; invent posters or titles; replace substantive content with decorative motion.

**Potential 3D rule:** 3D mostly on the hero and its transition into Films. Other pages prioritize real imagery and information.

---

## 9. Deliverables expected from the development agent

The user repeatedly requested **individual mockup screens AND collages**, separated by desktop and mobile folders. Continue that convention.

```text
AKP_Website_Final/
├── README.md
├── index.html / app source / project files
├── public/
│   ├── brand/
│   ├── films/
│   ├── 3d/
│   └── media/
├── 1 - Desktop View/
│   ├── 01_Home.png
│   ├── 02_Films.png
│   ├── 03_Film_Details.png
│   ├── 04_Studio.png
│   ├── 05_Journal.png
│   ├── 06_Contact.png
│   ├── Desktop_Collage.jpg
│   └── [optional full-page captures]
├── 2 - Mobile View/
│   ├── 01_Home.png
│   ├── 02_Films.png
│   ├── 03_Film_Details.png
│   ├── 04_Studio.png
│   ├── 05_Journal.png
│   ├── 06_Contact.png
│   ├── Mobile_Collage.jpg
│   └── [optional full-page captures]
└── [content notes, rights/licensing checklist, UX acceptance checklist]
```

**Screens:** six desktop + six mobile, two collages, a browsable coded prototype with the actual 3D hero interaction, and ideally a reusable dynamic film-details system for all movies. The six-screens requirement refers to **different pages**, not multiple homepage variations.

**Suggested engineering approach (not an imposed constraint):** Next.js/React, TypeScript, Tailwind or clean CSS, GSAP ScrollTrigger for animation, Three.js/R3F for the 3D hero, data-driven film pages via JSON/CMS. A plain HTML/CSS/JS prototype may be an appropriate initial handoff; a production build should emphasize maintainability and content updates. Avoid adopting a framework only to recreate a still screenshot.

**Recommended film data model:**

```ts
type Film = {
  slug: string;
  title: string;
  year?: number;
  releaseDate?: string;    // confirmed date only
  genres?: string[];
  language?: string;
  runtimeMinutes?: number;
  synopsis?: string;
  director?: string[];
  writer?: string[];
  producers?: string[];
  cast?: string[];
  poster: string;          // licensed original art
  heroStill?: string;      // licensed film still or video poster
  trailerUrl?: string;     // approved official video link
  gallery?: { src: string; alt: string; caption?: string }[];
  behindScenes?: { src: string; alt: string; caption?: string }[];
  credits?: { role: string; names: string[] }[];
  posterVariants?: string[];
};
```

**Important:** No official CMS, form backend, hosting/platform, or production deployment requirements were finalized in this conversation. These decisions remain open. Content should be replaceable without re-editing page markup.

---

## 10. Chronological design decisions and lessons learned

This chronology exists so the agent understands **why the latest design changed** and doesn't regress.

1. **Initial request:** redesign AKP website for a freelance client pitch; minimalist and strongly tied to the logo.
2. **Early proposals:** Editorial House, Cinema in Frame (dark), Archive. User picked **Cinema in Frame** and requested more pages.
3. **Early failure:** User said mockups looked visibly AI-generated. Requirement shifted to **real, professional page layouts**, individual screens and a six-screen collage.
4. **Early 3D exploration:** Reel, filmstrip, projector, clapperboard. User wanted some 3D but repeatedly emphasized **minimalism**.
5. **Six-screen structure settled:** Home, Films, Film Details, Studio/About, Journal/News, Contact.
6. **Filmography authenticity:** User wanted **real film posters** rather than fake/generated artwork. Six genuine poster files were uploaded later.
7. **Theme exploration:** Dark editorial, Swiss minimalism, 3D sculpture, kinetic typography, immersive film-first.
8. **Marcus Vane reference:** Oversized condensed text/spring motion served as a typography/motion reference but not the winning layout.
9. **Lumbre chosen as foundation:** Warm ivory + near-black, editorial minimalism and restrained motion. Source HTML/CSS supplied.
10. **First code-based mockups:** two folders Desktop View and Mobile View, six pages plus collage, HTML prototype. These were repeatedly revised.
11. **Films bug:** User observed actual poster images missing/broken, then later cropped into landscape cards. Fix: bundle supplied originals and **show posters fully**.
12. **Hero redesign:** A giant 3D `a` was tested but not enough; user then preferred **vintage projector at right, light beam projecting to left text**.
13. **Hero format:** User specifically required the **same 1440×900 size and hierarchy** as the reference dark `a` mockup, then required **dark theme ONLY for hero**, with other sections remaining ivory.
14. **Full-page mockups:** requested UX principles across all pages and desktop/mobile renders; previous mockups and code ZIPs prepared.
15. **Film Details expansion:** Current AKP *Lagaan* page provided as evidence; require **Synopsis, Trailers, Gallery, Behind the Scenes, Credits, Posters**, all incorporated into an editorial cinematic-chapters template. A dedicated Lagaan mockup/prototype ZIP was generated.
16. **Further inspiration:** Reviewed exceptional studios/film websites including Annapurna, A24, Lusion, Ordinary Folk, BUCK, Working Stiff, Somesuch and others.
17. **LATEST inspiration:** User supplied screenshots of a wireframe camera and scrolling amber filmstrip from **35mm**. Explicitly requested **Working Stiff scroll animations**, **Ordinary Folk navbar**, **BUCK navbar hover**, and **35mm-style animated camera plus reel in AKP hero**. A **static concept render** of the camera-plus-filmstrip hero was produced, but **working animations have not been implemented/verified in that final concept**.

**Crucial user feedback:**
- “This looks AI generated.” → Use accurate layout, real images, professional UX and working code.
- “All screens are same.” → Every page must be materially distinct.
- “I want design to be minimalistic.” → No visual clutter.
- “This does not look very outstanding.” → Need a distinctive core visual concept and refined art direction.
- “Hero section is not looking like hero section.” → Make it truly cinematic and screen-filling.
- “Use these images.” → Use provided authentic artwork.
- “Make the movie poster fit.” → No cropping/stretching.
- “Hero section should be in dark theme, just the hero section.” → Dark hero, light other sections.
- “I want in this screen size.” → 1440×900 hero reference.
- “Add these things … camera animation and reel animation.” → **Implement real motion**, not merely show a render.

---

## 11. Existing outputs and what they are good for

Use these as references/starting assets (when supplied alongside this handoff):

- **`AKP_Projector_UX_Desktop_Mobile_Package.zip`** — earlier six-page HTML/CSS/JS prototype + desktop and mobile screenshots/full-page images; retains baseline information architecture and real posters. **Its hero is an earlier iteration.**
- **`AKP_Lumbre_All_Screens_Desktop_Mobile.zip`** — earlier Lumbre-based screens; useful for the ivory gallery/details look, but outdated hero.
- **`AKP_Lagaan_Film_Detail_Mockup.zip`** — best dedicated detailed film-page layout and working prototype for the six sections.
- **`AKP_Hero_Projector_1440x900.png`** — best prior approved cinematic composition before the latest camera animation request.
- **`stories_that_stay_with_us.png`** — latest camera / amber filmstrip visual direction, a static concept, not a functional WebGL scene.
- **`image(3).png`** — user's exact dark hero composition / dimensions reference with giant `a` that was subsequently replaced.
- **`dangal.jpg`, `Laapataa_Ladies_poster.jpg`, `lal.webp`, `poster sitare-zameen-par (1)-58b8fc00-2bf7-11f0-b426-a50671acfc24.webp`, `MV5BMDNmMDAyZjItYWMzOC00YTBhLWE5ZTAtZGFiZDk3YzFjY2VmXkEyXkFqcGc@.jpg`, `taare.jpg`** — original posters.
- **`Aamir_khan_productions.png`** — supplied brand mark.

A file path inside this Markdown is a **filename reference**, not a public URL. If the website-building agent runs in a different environment, upload/copy the actual assets and ZIPs into its workspace. The Markdown alone cannot embed all image/code files.

---

## 12. Exact build priorities (execution order)

1. **Read and respect this brief**, the latest user reference screenshots and film files. Do not ask the user to restate decisions already made.
2. Implement the **global design system and shared navbar**; create distinctive but coherent page shells.
3. Build the **1440×900 dark hero** with the animated 35mm-inspired camera, amber scrolling reel/filmstrip and left editorial headline. Provide a fallback static state and reduced-motion support. Keep initial hero performance strong.
4. Build the full **Films** catalogue with genuine original portrait posters **fully visible**; working filters and film-detail navigation.
5. Implement reusable **Film Details** chapters including synopsis, trailers, gallery, behind the scenes, credits and posters. Use Lagaan as the test case, clearly distinguishing client-verified information from placeholders.
6. Complete separate **Studio**, **Journal**, and **Contact** pages using the editorial Lumbre language and accurate content.
7. Implement creative yet accessible navigation and scroll effects (Ordinary Folk / BUCK / Working Stiff inspiration).
8. Test all interactions at 1440px and major mobile sizes; run responsive, accessibility and performance checks.
9. Export **6 distinct desktop screens + 6 distinct mobile screens**, full-page captures and a collage for each folder.
10. Deliver a **working prototype/source**, packaged assets, README, content verification checklist and ZIP; do not claim all content or rights are cleared if they are not.

### Definition of done

- [ ] The site is clearly and recognizably **Aamir Khan Productions**, not a template with substituted words.
- [ ] The first screen is genuinely outstanding, dark and cinematic, with the **actual animated** camera + filmstrip rather than just a still image.
- [ ] The original logo and consistent 5-item navigation are present.
- [ ] Six website pages are distinct and navigable.
- [ ] The Film Archive uses the six supplied movie posters correctly, fully visible, with correct titles and years.
- [ ] A film details page includes all six existing AKP categories and a functional chapter menu.
- [ ] Desktop and mobile UX are complete, with no horizontal overflow.
- [ ] Hover/scroll motion enhances usability and has a reduced-motion fallback.
- [ ] All interactive buttons/filters/forms/lightboxes/video controls work or are explicitly documented as demo-only.
- [ ] Fake news, unverified metadata, made-up contact details and AI-imitation posters do not appear as real client content.
- [ ] Both `1 - Desktop View` and `2 - Mobile View` folders contain individual screenshots and collages.
- [ ] Client-facing mockups and the code are internally consistent.

---

## 13. Unresolved items requiring client approval / additional real assets

- Approval of hero line, brand voice, and final navigation nomenclature.
- Original vector/logo files, brand manual, exact red/primary brand colors.
- Commercial usage and source rights for official posters, film stills, trailers, BTS images and brand footage.
- Higher-resolution Laapataa Ladies poster; full Lagaan poster; approved hero image/still/video for each film.
- Authoritative full AKP film catalogue, release dates, exact cast/crew, runtimes, descriptions and poster credits.
- Actual Studio/About history, any milestones, team, awards, verified facts.
- Verified News/Journal articles, images and publish dates.
- Official contact email, address, social links, privacy policy and form destination.
- Choice of website stack/CMS/hosting/deployment and maintenance workflow.
- Licensing for any purchased 3D camera model and any reused Lumbre/third-party template code.
- Accessibility, privacy, performance and security review before going live.

**Do not silently invent these facts.** Use appropriately labelled placeholders or omit unapproved content in a client-ready prototype.

---

## Final one-paragraph creative brief for the implementation agent

**Build a premium, minimalist, cinematic website for Aamir Khan Productions. The homepage must have a 1440×900-inspired near-black hero with bold left-aligned “Stories that stay with us.” typography and a distinctive animated, 35mm-inspired vintage camera and golden filmstrip/reel on the right, optionally retaining the cinematic right-to-left light-beam idea from the earlier projector concept. Use precise Lumbre-inspired editorial grids and warm-ivory sections for the remaining pages. Create a beautiful, authentic film archive using the actual six movie posters, a rich six-chapter film details template, and separate Studio, Journal and Contact pages. Add refined navbar hover and scroll interactions inspired by BUCK, Ordinary Folk and Working Stiff. Ensure real accessible functionality, responsive mobile UX, performant 3D with fallbacks, and produce individual desktop/mobile screens, two collages, and maintainable working source code. Keep the visual language original to AKP, not a pixel-copy of another studio's site.**
