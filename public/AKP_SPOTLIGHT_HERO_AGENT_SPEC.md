# AKP Website — Spotlight Film-Title Wall Hero

**Developer / AI-agent implementation handoff**  
**Source:** 30 images inside `New Folder With Items.zip`, all showing portions of a document titled `SPOTLIGHT-HERO-GUIDE.md`.  
**Scope:** Replace or prototype the **homepage hero only**. Preserve the website's other approved pages and components unless a necessary shared integration is listed below.  
**Status:** Specification reconstructed from photographed screenshots; not a verbatim export of the original document.

> **Important source limitation:** The ZIP contains 30 JPEG photos of the guide on a laptop screen, **not** the underlying Markdown source, `03-spotlight-wall.png` visual mockup, or the HTML prototype it mentions. Many images overlap, and a few code lines extend beyond photographed screen edges. Values transcribed below are based on legible material. Treat any illustrative code added in this handoff as an implementation suggestion, not original source code. Compare against the missing mockup/prototype if the client supplies them.

---

## 0. Copy-paste task for the implementation agent

> Build an Angular homepage hero component named `<app-spotlight-hero>` for **Aamir Khan Productions**, based on the requirements in this handoff. The hero fills the viewport with an edge-to-edge wall of the studio's film titles in mixed typography. Titles are dim and nearly invisible until a warm spotlight reveals them. On desktop, a small cursor ring tracks the pointer immediately, while the actual spotlight follows smoothly with cinematic damping. The title under the spotlight's center becomes AKP-red, shows its name/year, and links to the corresponding film page. Without pointer movement—especially on touch devices—the spotlight drifts automatically. At the bottom, show the line **“Stories that stay with us.”** and the **“EXPLORE THE FILMS”** CTA. Implement the effect with **CSS masks, CSS custom properties and an animation loop outside Angular's NgZone**. **No canvas, WebGL, Three.js, GSAP or new animation libraries.** It must work with SSR, touch, keyboard navigation, screen readers and reduced-motion preferences, while targeting 60 fps. Follow the acceptance checklist below and preserve the rest of the website.

## 1. Concept and visual intent

- The screen is a dark theatre wall filled with AKP film titles, overflowing beyond the viewport on both sides.
- The visitor metaphorically holds the only light. Moving the pointer “plays” a soft warm spotlight over **25+ years of cinema**, illuminating film titles as it passes.
- Title directly beneath the spotlight center becomes highlighted and selectable.
- Mood: **quiet, cinematic, premium, typographic and classic**; spotlight movement must feel slow and damped, like an actual follow-spot operator, never twitchy.
- Distinctive quality comes from typography and interaction **without a 3D object**.
- The guide calls for a **full-viewport black background**, not the earlier camera, projector or film-poster-collage hero designs. Treat this as a new hero alternative; do not merge it with those earlier visuals without explicit direction.

## 2. Design tokens transcribed from the screenshots

### 2.1 Colours and measurements

```scss
:root {
  --bg: #040404;
  --wall-dim: #151311;
  --wall-outline: #1d1a17;
  --lit: #F8ECD8;
  --accent: #E5262C;
  --glow: rgba(255, 196, 120, .20);
  --text: #F6EAD6;
  --text-muted: rgba(246, 234, 214, .60);

  --spot-r: 23vw;        // desktop spotlight radius
  --spot-ease: 0.12;     // approximate easing per frame at 60 fps
  --pad-x: 56px;
  --nav-h: 110px;
}
```

### 2.2 Font roles

| Role | Typeface | Spec |
|---|---|---|
| Condensed movie titles | **Anton** | 400; uppercase, no letter-spacing |
| Italic movie titles and tagline | **Instrument Serif** | 400 italic |
| Elegant Didone film titles | **Bodoni Moda** | 600 |
| Nav, labels, CTA, metadata | **Inter** | 500, 700, 800 |

Use Google Fonts with `display=swap` or self-host; preload Anton and Instrument Serif because they make the biggest visual impact.

## 3. Desktop composition — reference size 1440 × 900

The source describes the following arrangement:

1. **Top overlay/navigation:** Left studio mark `a`, a vertical divider, `AAMIR KHAN`, smaller `PRODUCTIONS PVT. LTD.`. Right: Home, Films, Studio, Journal, Beyond the Frame / other current navigation as appropriate. Active item gets a thin red underline.
2. **Wall:** Dense, mixed-font titles repeated and arranged across the entire hero, intentionally oversized and bleeding horizontally. Initial colour so dim it nearly blends into the black background.
3. **Spotlight:** A soft, circular illuminated area, default center around **36% across / 45% down**. A faint warm halo follows it.
4. **Active movie:** A title caught in the spotlight becomes red and offers navigation.
5. **Bottom-left:** Large tagline **“Stories that stay with us.”** Set in Instrument Serif italic; the words **“with us.”** are upright (non-italic) and red, according to the screenshot specification.
6. **Bottom-left sub-line:** Small uppercase studio/brand descriptor below the tagline.
7. **Bottom-right:** Circular outlined-arrow CTA labelled **“EXPLORE THE FILMS”**. Always visible.
8. **Film grain:** Extremely subtle static full-screen overlay.

### Exact layout notes recorded in the guide

| Element | Specification |
|---|---|
| Hero | `height: 100svh; min-height: 640px; overflow: hidden; position: relative; background: var(--bg)` |
| Nav | Positioned absolute at top; `padding: 28px 56px`; gradient from `var(--bg)` into transparency |
| Brand mark | Letter `a` in Instrument Serif, **44px**; **1px** divider |
| Studio wordmark | “AAMIR KHAN” in Inter 800, **14px**, letter spacing `.16em`; smaller “PRODUCTIONS PVT. LTD.” **9px** |
| Nav links | Inter 700 **14px**, gap about **40px**; active link **3px red underline** |
| Wall | Absolute; `top: 70px; left: -6vw; right: -6vw; font-size: 7vw; line-height: .94; letter-spacing: -.02em; text-align: justify; text-align-last: justify` |
| Footer | Positioned absolute at bottom; `padding: 70px 56px 42px`; gradient from transparent to black at approx **55%**; display flex, space-between, align end |
| Tagline | Instrument Serif italic, **64px**, line-height `1`; “with us.” normal/upright and accent red |
| Sub-line | Inter 800, **12px**, letter spacing `.26em`, uppercase, muted; top margin **14px** |
| CTA | Inter 800, **13px**, letter spacing `.2em`, **64px** circular arrow ring with **1.5px** border |
| CTA hover | Circular ring fills warm ivory; arrow rotates approximately **45°** |
| Grain | Full-screen, `opacity: .07`, static SVG `feTurbulence` noise, high overlay z-index, `pointer-events: none` |

**Layering priority:** The dim wall and the masked bright wall should sit behind navigation and footer, which stay legible even when the light is elsewhere.

## 4. Film title data — single shared source of truth

The guide explicitly requests a `films.ts` module holding canonical film information. The following **11 movie titles and slug spellings** are legible in its screenshot, in this order:

| Order | Slug | Displayed title |
|---:|---|---|
| 1 | `lagaan` | Lagaan |
| 2 | `taare-zameen-par` | Taare Zameen Par |
| 3 | `jaane-tu-ya-jaane-na` | Jaane Tu... Ya Jaane Na |
| 4 | `peepli-live` | Peepli Live |
| 5 | `dhobi-ghat` | Dhobi Ghat |
| 6 | `delhi-belly` | Delhi Belly |
| 7 | `dangal` | Dangal |
| 8 | `secret-superstar` | Secret Superstar |
| 9 | `laal-singh-chaddha` | Laal Singh Chaddha |
| 10 | `laapataa-ladies` | Laapataa Ladies |
| 11 | `sitaare-zameen-par` | Sitaare Zameen Par |

The screenshot shows a TypeScript union: `TitleStyle = 'condensed' | 'serif' | 'didone' | 'outline'`, and a `Film` data shape containing at least `slug`, `title`, `year`, and `style`. **The individual `year` and `style` values are outside the legible photographed crop**; do not guess them from the screenshot. Populate and verify those values from the current site's canonical film metadata / client-approved filmography. The guide specifically says to confirm film list, spellings and years against AKP's official filmography before launch.

### Styles per title

- `condensed`: Anton, uppercase, letter-spacing `0`.
- `serif`: Instrument Serif italic.
- `didone`: Bodoni Moda 600.
- `outline`: Anton uppercase with transparent fill and `-webkit-text-stroke: 1.5px var(--wall-outline)`; in the lit layer, outline stroke switches to the lit colour.
- Every title should be `inline-block`, `white-space: nowrap`, with `margin-right: .22em`: **never wrap one title across two lines**.
- Mix styles so adjacent titles are not all alike. A simple rotation of the style assignments between passes is acceptable.

### Filling the wall

- **Pass 1:** the canonical `FILMS` array in order, rendered as real `<a [routerLink]>` links. It is the only interactive/readable pass.
- **Pass 2 onward:** repeat the list, rotated by **3 films** per pass. Repeats are decorative: `aria-hidden="true"` and `tabindex="-1"`.
- Add passes until the title wall extends below the usable hero height (including the footer overlap); **cap at 4 passes**.
- Recalculate after `document.fonts.ready` and on resize via `ResizeObserver`.
- On an SSR/no-JS render, the first pass must still be present and visible in the intended visual style.

## 5. Spotlight rendering technique

**Critical:** The screenshots call for **two pixel-identical layers of the title wall, plus CSS masks**, NOT canvas, WebGL or an animation library.

```text
.hero
  ├─ .glow          warm radial halo positioned around light centre
  ├─ .wall.base     dim film-title links; handles hover/click/focus
  ├─ .wall.lit      identical title layout, warm ivory, circular mask;
  │                 pointer-events: none; aria-hidden: true
  ├─ .ring          34px cursor ring + initial "MOVE THE LIGHT" hint
  ├─ navigation
  ├─ footer/tagline/CTA
  └─ static grain overlay
```

The bright layer must share **the exact same film order, typography, positions and markup geometry** as the base layer. Render it through the same Angular template twice (e.g., a reused `ng-template`), **not through manual DOM `cloneNode()`**.

Three values are updated over time:

- `--x` and `--y`: spotlight centre **relative to the wall** (which starts at `left:-6vw`), in pixels.
- `--gx` and `--gy`: halo and cursor decoration centre **relative to the hero**, in pixels.
- `--r`: spotlight radius, using responsive `--spot-r`.

The photographed guide illustrates a CSS mask with an opaque core, a transitional edge and a transparent outside:

```scss
.wall.lit {
  color: var(--lit);
  text-shadow: 0 0 30px rgba(255, 196, 110, .35);
  pointer-events: none;
  -webkit-mask-image: radial-gradient(
    circle var(--r) at var(--x) var(--y),
    #000 38%, rgba(0,0,0,.6) 58%, transparent 74%
  );
  mask-image: radial-gradient(
    circle var(--r) at var(--x) var(--y),
    #000 38%, rgba(0,0,0,.6) 58%, transparent 74%
  );
}

.glow {
  position: absolute;
  width: 56vw;
  height: 56vw;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow), transparent 62%);
  transform: translate3d(
    calc(var(--gx) - 50%), calc(var(--gy) - 50%), 0
  );
  will-change: transform;
  pointer-events: none;
}
```

> The screenshot shows the `--x/--y` and `--gx/--gy` distinction clearly. Adapt the code above to whichever containing-block positioning makes those coordinates correct; do not blindly paste if the DOM geometry differs.

## 6. Motion & interaction requirements

### 6.1 Pointer follow, desktop

- Listen for `pointermove` on the hero with `{ passive: true }`; record the target position only.
- Perform animation through a single `requestAnimationFrame` loop **outside Angular `NgZone`**.
- Use frame-rate-independent damping:

```ts
const k = 1 - Math.exp(-dt * 7.5);
currentX += (targetX - currentX) * k;
currentY += (targetY - currentY) * k;
```

- Around 60 fps this corresponds to about `0.12` easing per frame.
- Stop or sleep the loop when motion has settled (distance under about **0.3px**) and autopilot is off. Resume on further input.
- **Ring tracks the pointer immediately**, while light follows the eased position with noticeable inertial lag. This distinction creates the 'follow-spot operator' feel.

### 6.2 Active title under the light

- At most approximately every **100ms**, or once the spotlight has settled, use `document.elementFromPoint(cx, cy)` at its centre and locate the nearest `[data-slug]` **on the base wall**.
- Set Angular `activeSlug` signal; highlight that title in both layers (`.is-active`).
- The lit title should turn `var(--accent)` red. For outline titles, the stroke turns red instead.
- Place a small tooltip near the ring such as `Dangal · 2016 → View film`, with Inter 700, about **11px**, letter-spacing `.2em`.
- Click/Enter on active film navigates to `/films/:slug` (Angular router). Ordinary links should also remain directly operable by keyboard.
- The wall uses `cursor: none` when interactive ring is active. Restore standard cursor over nav, footer and CTA.

### 6.3 “MOVE THE LIGHT” hint

- Display beside the cursor ring on first load.
- Once pointer has moved a cumulative **120px**, fade it away over **300ms**.
- Do not show it again within the same session (`sessionStorage`).
- Prevent the hint from permanently obscuring a film title; this is called out as a defect in the source mockup.

### 6.4 First-load intro (~1.8s)

| Time | Required effect |
|---|---|
| 0–0.4s | Wall is dim, light radius `--r: 0` |
| 0.4–1.4s | Light “strikes”; radius grows from zero to full using `cubic-bezier(.2,.7,.1,1)`; three small opacity flickers suggesting a stage lamp warming (`1 → .55 → 1 → .8 → 1`) |
| 1.4–1.8s | Tagline rises about **12px** and fades in; CTA fades in |
| After | Follow pointer, or switch to autopilot if no pointer movement occurs within 2.5s |

Run this first-load intro **only once per session**. The screenshots show this in the acceptance criteria, although the storage key name is not legible; choose a clear session-scoped key.

### 6.5 Autopilot — touch devices and idle

- After **2.5s without pointer input**, drift the spotlight around the wall using a slow Lissajous-like path.
- Formula transcribed from image:

```ts
const xPercent = 50 + 30 * Math.sin(t * 0.21);
const yPercent = 45 + 22 * Math.sin(t * 0.33 + 1.3);
```

- Blend from the current light location into autopilot smoothly; **no jumps**.
- Any pointer input cancels autopilot immediately, returning control to the visitor.

### 6.6 Touch

- Use `pointerType === 'touch'`.
- Allow touch drag to steer the light, but preserve vertical page scrolling (`touch-action: pan-y`); use primarily horizontal drags or a **150ms press-and-hold** to enter light-control mode.
- Tap title once to illuminate/activate; tap the same title again to navigate.
- Do not require hover to access any film.

### 6.7 Keyboard

- Pass-1 links are real keyboard-focusable Angular `<a [routerLink]>` elements in reading order.
- When a title receives focus, move the light towards that title's centre, activate it, and show a visible focus indication: the spotlight plus a **2px red underline**.
- `Enter` opens the film page. Screen-reader users hear each unique film once.

### 6.8 Reduced motion (`prefers-reduced-motion: reduce`)

- Disable intro flicker, drifting/autopilot and easing lag.
- The light may snap to the pointer/focused title without delayed motion.
- Keep grain static.
- Default spotlight centre remains **36% / 45%**.
- Make interaction and navigation fully usable with motion turned off.

## 7. Angular architecture

Source guide proposed this folder structure:

```text
src/app/home/spotlight-hero/
├── spotlight-hero.component.ts
├── spotlight-hero.component.html
├── spotlight-hero.component.scss
├── spotlight.controller.ts  # framework-agnostic rAF / easing / autopilot
└── films.ts                 # or import canonical data module
```

Source architecture details:

- Standalone Angular component: selector **`app-spotlight-hero`**.
- Import `RouterLink` and use `ChangeDetectionStrategy.OnPush`.
- Use Angular signals including `passes`, `activeSlug`, `showHint`.
- References to hero and wall elements through `ViewChild`.
- `NgZone.runOutsideAngular` for the animation loop.
- `isPlatformBrowser(inject(PLATFORM_ID))` guards browser-only setup.
- After view init (in browser), measure wall and viewport, create controller, register pointer handlers, perform intro if appropriate, manage idle/autopilot.
- On destroy cancel animation frame, unsubscribe observers/listeners and clean up.

**Template principles (from source):**

- Two separate `.wall` containers (`base`, `lit`) must share one title-list template, rendered twice via Angular template control flow (`@for` and `ng-template` or equivalent).
- Base layer has real links; lit duplicate is decorative and not in accessibility tree.
- Nav and footer are above both walls. Tooltip and `MOVE THE LIGHT` hint are decorations unless their contents also need to be announced as meaningful information.
- Do not manipulate Angular's rendered DOM by cloning nodes.

## 8. Responsive behaviour

| Width | Wall font | Spotlight radius | Behaviour |
|---|---:|---:|---|
| **≥1200px** | `7vw` | `23vw` | Pointer-follow, full navigation |
| **768–1199px** | `9vw` | `30vw` | Pointer-follow where available; nav may collapse to menu |
| **<768px** | `13vw` | `42vw` | Autopilot initially; drag to steer; tagline **40px**; CTA stacks beneath tagline; footer horizontal padding **24px** |

At **every size** the wall must overfill horizontally and vertically behind the footer fade; titles must not wrap, and the page must not have horizontal scrolling.

### Test width list

`375px`, `768px`, `1024px`, `1440px`, `1920px`, `2560px`.

## 9. Accessibility requirements

- Real semantic **`<h1>` is the tagline**, not the decorative wall.
- Wall is a paragraph/region of film links in **pass 1**; screen readers encounter every film **once**. Repeated passes and the lit layer are `aria-hidden`.
- All interactive controls can be reached by Tab and activated by Enter. Visible focus is required.
- Tagline, CTA and nav contrast should be **≥4.5:1** against `#040404`; unlit wall text can be low-contrast only because it is decorative.
- Users do not need the spotlight to find essential information: **“EXPLORE THE FILMS” remains visible**.
- Do not convey important information only through light or red colour.
- Respect `prefers-reduced-motion: reduce` as above.
- The spotlight feature must not trap keyboard focus or prevent scrolling on touch.

## 10. Performance budget

- Target **60fps on mid-range laptop**, scripting approximately **≤2ms per frame**.
- Per frame, write only CSS variables and a transform; **do not perform layout reads inside the animation loop**.
- `will-change: transform` on moving glow and ring. Mask position changes through variables; avoid unnecessary `will-change: mask-position`.
- If mask repaint is expensive on large monitors, consider `font-size: clamp(48px, 7vw, 132px)` on wall and/or `contain: paint` on the lit wall, after profiling.
- Font strategy: preload Anton and Instrument Serif; `font-display: swap`; measure again after `document.fonts.ready`.
- Do not add GSAP, Three.js or other animation dependencies for this hero.
- Pause the animation when the hero is off-screen, e.g. with `IntersectionObserver`, and when the tab is hidden.

## 11. SSR / JavaScript-disabled fallback

- Render a static default spotlight at `--x:36%; --y:45%` in the fallback layout, with the visible lit layer but **no ring or cursor hint**.
- The screenshot explicitly says to guard `window`, `document`, `matchMedia` and `sessionStorage` with `isPlatformBrowser`.
- With scripts disabled, the hero should still display its title wall, tagline and film CTA and allow basic navigation.
- Avoid hydration errors and console errors.

## 12. Source acceptance checklist — treat each as required

- [ ] Visual match to referenced **`03-spotlight-wall.png` at 1440×900** (fonts, sizes, colours, placement). **That PNG was not included in this ZIP; obtain it before promising pixel-perfect parity.**
- [ ] No film title ever wraps onto two lines.
- [ ] Spotlight tracks pointer with smooth, damped lag; ring tracks pointer immediately.
- [ ] Title under the centre highlights red; tooltip displays `Title · Year → View film`; clicking goes to `/films/:slug`.
- [ ] Intro sequence: dark wall → flickering light strike → tagline / CTA, about 1.8s, once per session.
- [ ] `MOVE THE LIGHT` hint disappears after the first meaningful movement and stays gone for the session.
- [ ] Autopilot begins after ~2.5s of idle time; pointer returns smoothly with no jump.
- [ ] Touch controls work without stealing vertical scroll; tap/tap opens the selected film.
- [ ] Keyboard Tab cycles through film titles; light moves to focused title; Enter opens it.
- [ ] Reduced-motion disables flicker, autopilot and lag.
- [ ] Works at 375 / 768 / 1024 / 1440 / 1920 / 2560 widths.
- [ ] 60fps target in Chrome Performance; pause loop when hero off-screen.
- [ ] SSR has no errors and the console contains no errors.
- [ ] Lighthouse Accessibility **≥95** (target in the photographed source; verify in final build).

## 13. Optional phase-two enhancements (source section 13)

These are specifically marked **nice-to-have**, not required for phase one:

- [ ] Fine projector flicker on the lit text: about **±3% opacity at 24fps**, implemented with CSS only.
- [ ] Soft shutter click sound on hover/focus **off by default**. Avoid autoplay audio; user must opt in.
- [ ] When a title becomes active, the dim background still of that film may appear behind the wall at roughly **8% opacity** (requires approved/licensed film stills).
- [ ] Very subtle “breathing” of the light radius during idle, around **±2%**.

## 14. Development sequence recommended for the agent

This is an **implementation plan added for clarity**, not a verbatim section from the source screenshots:

1. Verify the Angular project structure, router paths and existing film data. Confirm whether the hero is to replace the current collage or be implemented behind a feature flag for client comparison.
2. Create the shared `Film[]` model and correct title metadata; verify spellings and film years with AKP.
3. Build a static responsive hero: dark full-viewport background, nav, dim typographic wall, tagline, CTA and grain. Check at 1440×900.
4. Render two identical wall layers; introduce CSS radial mask and default spotlight without motion.
5. Add pointer tracking, inertial easing, ring, title activation and tooltip.
6. Add intro timeline, one-per-session hint and autopilot. Test no jumps and no title overlap.
7. Implement touch gestures, keyboard focus/light-follow and reduced motion.
8. Add SSR safeguards, observer lifecycle cleanup, accessibility and 60fps profiling.
9. Test all listed breakpoints; inspect movie links; deliver desktop/mobile captures and a brief QA report.

## 15. Decisions, unknowns and integration notes

### Explicitly specified in the photographed source

- Angular component selector, CSS-masked two-layer approach, exact design tokens, major layout sizes, behaviour, responsive thresholds, performance targets and acceptance checks.
- Film titles and slugs listed above.

### Not present/fully legible in the uploaded archive

- The actual original `SPOTLIGHT-HERO-GUIDE.md` file.
- The referenced **`03-spotlight-wall.png`** visual source and HTML prototype.
- Complete data row values for movie year / title style (horizontal portions of code are cut off).
- Exact original implementation of every class, controller method, and CSS statement.

### Preserve the broader approved AKP website

- Existing Filmography (real uncropped film posters), Film Details, Studio, Journal, Contact and the dedicated **Beyond the Frame** / Aamir Khan Talkies page are unaffected by this component brief.
- Do not remove existing UX/accessibility features from elsewhere in the project.
- The earlier conversation includes several alternate hero visual directions (3D `a`, projector, 35mm camera, editorial poster collage). **This screenshot guide describes a different concept: the spotlight film-title wall.** Do not combine all ideas into one congested hero. Present this as the proposed new variant or get final hero selection approved before replacing production work.
- Movie click behaviour and navigation must use the application's real routes and canonical movie records.

---

## Appendix A — Coverage of the provided photos

All **30 JPEG photos** in the ZIP were inspected as a collection. They are overlapping fragments of the same guide, not thirty independent hero concepts. The guide's sections visible across the images are:

`0. Brief to paste to your agent`; `1. Concept`; `2. Design tokens`; `3. Layout (desktop 1440×900 reference)`; `4. The wall content` (data, styles, filling the wall); `5. How the spotlight works`; `6. Motion & interaction spec` (pointer, active title, hint, intro, autopilot, touch, keyboard, reduced motion); `7. Angular structure`; `8. Responsive`; `9. Accessibility`; `10. Performance budget`; `11. SSR / no-JS fallback`; `12. Acceptance checklist`; `13. Nice-to-have (phase 2)`.

The Markdown above captures the substantive legible requirements from these images, with duplicate screens consolidated. Source photos remain in the original ZIP and should accompany this file if the implementing agent needs to check a particular detail.
