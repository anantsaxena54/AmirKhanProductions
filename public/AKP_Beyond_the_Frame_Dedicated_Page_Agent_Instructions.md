# AKP Website — Agent Change Request: Dedicated “Beyond the Frame” Video Library

## Task
Implement a **new, dedicated “Beyond the Frame” page** for Aamir Khan Productions (AKP), featuring official **Aamir Khan Talkies** videos. The page must feel like a premium, cinematic video archive, not a generic YouTube playlist. **Build it in the existing website codebase**, integrate it into navigation and relevant film-detail pages, and retain a small teaser on the homepage. Deliver working features, not just images/mockups.

## Important change from the earlier brief
The earlier plan described a large **Beyond the Frame homepage section**. **That is superseded.** The homepage should now have only a concise, visually impactful teaser that links to the **full dedicated Beyond the Frame page**. Do **not** put the full video catalogue on the homepage.

## Preserve the current approved site design
- Keep the existing AKP identity, minimal Lumbre-inspired editorial layout, dark hero and light/ivory content sections.
- Do **not** redesign the existing homepage hero. Keep its 35mm-inspired animated camera/reel concept with oversized text behind the camera, subject to existing approved implementation.
- Follow the site's current typography, spacing, colours, responsive breakpoints, motion style and component conventions; do not bolt on a different visual language.
- Use subtle red/warm-ivory highlights and near-black surfaces, high-quality official thumbnails and deliberate whitespace.
- Keep the filmography, film-detail sections (Synopsis, Trailers, Gallery, Behind the Scenes, Credits, Posters), Studio, Journal and Contact intact.

## Site architecture and navigation
Add a top-level item **Beyond the Frame**, with a route appropriate to the current project, preferably `/beyond-the-frame`.

Main navigation:
**Home · Films · Beyond the Frame · Studio · Journal · Contact**

- Desktop: visible nav labels, elegant hover effect inspired by BUCK / Ordinary Folk, visible focus states, clear active-page indicator.
- Mobile: accessible menu with the same links, correct expanded/collapsed state, keyboard support and no accidental horizontal overflow.
- Add the page to the footer navigation and sitemap/SEO where applicable.
- If the existing site uses client-side routing, integrate into it rather than creating a disconnected standalone page.

## Page concept: “The stories behind the stories”
The page should communicate that AKP's films are the beginning of a larger creative journey: conversations, filmmaking craft, retrospective moments and on-set experiences. The experience should be **video-led, editorial and cinematic**.

### Proposed page copy (not an official AKP tagline)
- Eyebrow: `AAMIR KHAN TALKIES / THE VIDEO ARCHIVE`
- H1: `Beyond the Frame.`
- Subtitle: `The conversations, craft and moments behind the stories we love.`
- Featured video label: `START HERE`
- Featured title: `Welcome to Aamir Khan Talkies`
- Primary CTA: `Watch the introduction`
- Archive heading: `Explore the archive`
- Homepage teaser heading: `Every film has a story beyond the screen.`
- Homepage teaser CTA: `Explore Beyond the Frame`

All marketing copy is **proposed**, for client approval. Do not present it as AKP's officially adopted tagline.

## Dedicated page layout (desktop)
1. **Intro / editorial hero:** near-black background, restrained eyebrow, expressive large headline and short descriptive sentence. Establish hierarchy and whitespace; don't repeat the 3D camera scene from Home.
2. **Featured film / welcome video:** a dominant 16:9 official YouTube thumbnail, clear play icon and concise metadata; can be an asymmetrical two-column treatment (copy left, video right) at desktop widths.
3. **Archive header + filtering:** tabs/chips `All Videos`, `Behind the Scenes`, `Director's Commentary`, `Conversations`, `Special Features`; include simple search only if useful and properly functional. Add a film filter if metadata supports it.
4. **Video collection:** responsive 2–3-column cards using consistent 16:9 thumbnails. Each displays an intelligible title, category, film association (if applicable), and optional verified publication date. No fabricated dates, durations, episodes or view counts. Clear focus, hover and loading states.
5. **Editorial feature / spotlight:** optionally elevate one video story (e.g. a director's commentary, a retrospective) with a large cinematic layout. Use official imagery only.
6. **Film cross-links:** video cards related to a movie should link to its film-detail page; on the film-detail page, add a contextual `From Beyond the Frame` or `Related videos` group only if matching official content exists.
7. **End-of-page navigation:** a quiet CTA back to `Explore the Films`, plus existing footer.

## Homepage teaser (not the full library)
Add one concise full-width feature **after Curated Filmography** and before Studio/Journal. Keep the teaser dark to contrast against the light filmography section:
- Eyebrow and strong editorial headline.
- One official thumbnail / preview of the welcome video.
- One short paragraph explaining Aamir Khan Talkies.
- Primary `Explore Beyond the Frame` CTA -> `/beyond-the-frame`.
- Optional `Play introduction` control -> click-to-load YouTube player.
- Do not list the full archive, filters or multiple rows of video cards here.

## Videos / initial content
Populate with **verified official Aamir Khan Talkies videos**, beginning with the links already identified in the project discussion:

| Intended entry | URL | Notes |
|---|---|---|
| Welcome to Aamir Khan Talkies | https://www.youtube.com/watch?v=iIUCuQ3V96U | Required featured introduction |
| Taare Zameen Par scene / director's commentary | https://www.youtube.com/watch?v=QW6Kb-2hBZc | Verify official title, channel, thumbnail, category and film association |
| Lagaan anniversary table read | https://www.youtube.com/watch?v=tEx-6DtUbEo | Verify title, channel and metadata; classify as a retrospective/special feature as appropriate |
| Sitaare Zameen Par behind the scenes | https://www.youtube.com/watch?v=8lLaUFAEpl8 | Verify title, channel, thumbnail and relevance |

These are **candidate links drawn from our planning discussion**. **Verify each video is available, authentic and appropriate before displaying it.** Never invent videos, metadata, quotes, or timestamps to fill a layout. If verification is impossible, include only the confirmed welcome video and make other cards data-ready placeholders clearly marked for later CMS entry; do not present placeholders as real videos.

Use official thumbnails returned by YouTube or supplied by AKP. Avoid AI-generated images masquerading as real video thumbnails.

## Video interaction: exact UX requirements
- By default show a lightweight thumbnail and accessible Play button; **do not load the YouTube iframe on initial page load for every card**.
- Only instantiate the player on explicit user action. Prefer YouTube privacy-enhanced embed host: `https://www.youtube-nocookie.com/embed/VIDEO_ID?autoplay=1&playsinline=1&controls=1`.
- Keep player **16:9** with native controls, fullscreen, sensible focus handling and appropriate `title`.
- Choose either **inline playback in featured/card area** or an accessible video dialog. Be consistent. For a dialog, support Escape, focus trap, focus restoration and stopping playback on close.
- Never autoplay with sound while scrolling and never hijack scroll to trigger playback.
- Supply `Watch on YouTube` fallback in case embedding is blocked or disabled.
- Provide loading, failure and empty-content states. A video's unavailability should not break the page.
- If using YouTube API or CMS sync, honour quotas, caching, privacy and consent requirements. Hardcoded vetted initial entries are acceptable for a concept build; keep data modular so they can be CMS-managed later.

## Motion and interactions
Use the site's existing GSAP/Lenis-style motion patterns as appropriate:
- Section enters: subtle fade + ~12–24px rise, ~450–700ms.
- Main headline: restrained line reveal; avoid long waits before content becomes usable.
- Thumbnail hover: slight scale (1.01–1.03), restrained play-button transition.
- Navigation: elegant underline/indicator transition inspired by the BUCK and Ordinary Folk reference; do not copy their code or brand-specific animation verbatim.
- Video list filters: quick, non-jarring transition, with immediately perceivable results.
- No extra heavy 3D objects on this page; the home camera/reel is the signature experience.
- Respect `prefers-reduced-motion`; use opacity-only or no motion in that mode.

## Mobile and tablet behaviour
- Mobile layout: editorial text then 16:9 featured video, then horizontal-scrollable filter pills (with accessible navigation), then 1-column video cards.
- Tablet: 2-column cards where practical; desktop: 2–3 columns.
- Maintain a readable title/copy scale, 44x44-ish touch targets, clear tap feedback, no text/image clipping, no hover-only actions, and no horizontal page overflow.
- Do not force heavy 3D or expensive scroll animations on small devices.

## Accessibility / UX
- Target WCAG 2.2 AA: sufficient contrast, visible focus, full keyboard operation, semantic headings, meaningful buttons/links, alt text for thumbnails, accessible responsive menu and media controls.
- Avoid duplicate H1s, inaccessible carousels and scroll-jacking.
- Filtering must use labelled controls and have announced/visible results; convey active filters beyond colour alone.
- Include captions/subtitles when provided by the official video; do not manufacture transcripts. Provide a link to YouTube for available captions if necessary.
- Make every video title, card action and film association unambiguous.
- Meet reasonable performance targets: reserve aspect-ratio boxes to avoid layout shift; lazy-load offscreen thumbnails; fetch/load YouTube player on demand; compress imagery and avoid unnecessary third-party scripts.

## Content management
Use a simple extensible content model:
`id`, `youtubeId`, `title`, `description?`, `category`, `relatedFilmSlug?`, `thumbnailUrl?`, `publishedAt?`, `featured`, `sortOrder`.

Prefer the existing CMS/data source if present. If there is no CMS, use a clearly separated local data module to enable later content updates. Only fill fields from verified sources; don't invent values.

## What NOT to do
- Don't replace the current Home hero with the video page's hero.
- Don't turn the homepage teaser into the entire archive.
- Don't load many video iframes at once.
- Don't add fabricated comments, fake thumbnails, invented stats or unrelated stock photos labelled as official AKP footage.
- Don't remove existing Films, Studio, Journal or Contact functionality.
- Don't copy other studios' proprietary animations or assets; use them only as visual/interaction references.

## Deliverables / Acceptance criteria
1. Working new page `/beyond-the-frame` with coherent AKP styling.
2. Homepage teaser links correctly to that page.
3. Nav and footer include the new page; active states are correct.
4. Welcome video `iIUCuQ3V96U` can play via click-to-load, with fallback link.
5. Category filters work against real video data; categories with no entries show a graceful empty state.
6. Related videos appear on correct film-detail pages **only** when mapped.
7. Desktop (1440px), tablet (~768px), mobile (~390px / ~360px) checked for visual consistency and overflow.
8. Keyboard, focus, reduced motion, media failure and browser back/forward tested.
9. Deliver screenshots for desktop and mobile, plus the implemented code and a brief verification log (what was tested; what still needs client approval).
10. Clearly flag client approvals needed for final copy, video/channel association, embeds/licensing and official imagery.

## Direct instruction to the development agent
**Implement the dedicated Beyond the Frame page in the existing AKP website now. Preserve the approved hero and current pages, make the homepage teaser minimal, verify real video content, wire working interactions, and return the updated site and review screenshots. Do not provide only a concept image.**
