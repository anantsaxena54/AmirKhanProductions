const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT_DIR = '/Users/akshatsaxena/Desktop/AmirKhanProduction';
const AKP_DIR = path.resolve(__dirname, '..');
const mockupsDir = path.join(ROOT_DIR, 'Mockups');
const akpMockupsDir = path.join(AKP_DIR, 'Mockups');
const brainDir = '/Users/akshatsaxena/.gemini/antigravity/brain/a1decb08-5093-46f2-8654-d21d847de9d9';
const desktopDir = path.join(ROOT_DIR, '1 - Desktop View');
const mobileDir = path.join(ROOT_DIR, '2 - Mobile View');

[mockupsDir, akpMockupsDir, brainDir, desktopDir, mobileDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function run() {
  console.log('Launching Headless Chrome for Fresh Mockup Suite...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  // 1. Capture specific UI sections from the live site (http://localhost:4200)
  console.log('\n--- Capturing Target Section Frames ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // Home Hero Desktop (with light and tooltip)
  console.log('Capturing Home Hero with active spotlight...');
  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2200));
  await page.mouse.move(720, 360, { steps: 20 });
  await new Promise(r => setTimeout(r, 700));
  const heroScreenBuffer = await page.screenshot({ fullPage: false });
  const heroScreenB64 = heroScreenBuffer.toString('base64');

  // Home Curated Filmography Section ("Stories from the studio.")
  console.log('Capturing Curated Filmography with real Lagaan poster...');
  await page.evaluate(() => {
    const el = document.getElementById('featured-films');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  const filmographyBuffer = await page.screenshot({ fullPage: false });
  const filmographyB64 = filmographyBuffer.toString('base64');

  // Beyond the Frame Hub
  console.log('Capturing Beyond the Frame video hub...');
  await page.goto('http://localhost:4200/beyond-the-frame', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const btfBuffer = await page.screenshot({ fullPage: false });
  const btfB64 = btfBuffer.toString('base64');

  // Film Detail Lagaan
  console.log('Capturing Film Detail Lagaan exhibition...');
  await page.goto('http://localhost:4200/films/lagaan', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const lagaanBuffer = await page.screenshot({ fullPage: false });
  const lagaanB64 = lagaanBuffer.toString('base64');

  // Mobile Captures
  console.log('Capturing Mobile frames...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  const mobHomeB64 = (await page.screenshot({ fullPage: false })).toString('base64');

  // Mobile Filmography
  await page.evaluate(() => {
    const el = document.getElementById('featured-films');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  const mobFilmsB64 = (await page.screenshot({ fullPage: false })).toString('base64');

  await page.goto('http://localhost:4200/beyond-the-frame', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const mobBtfB64 = (await page.screenshot({ fullPage: false })).toString('base64');

  // Tablet Capture (1024x768)
  console.log('Capturing Tablet frame...');
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4200/films', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const tabFilmsB64 = (await page.screenshot({ fullPage: false })).toString('base64');

  // ---------------------------------------------------------------------------
  // GENERATE MOCKUP 01: HERO & BRAND EXPERIENCE (MacBook Pro + iPhone 15 Pro)
  // ---------------------------------------------------------------------------
  console.log('\n--- Generating Mockup 01: Hero & Brand Experience ---');
  const mockup01Html = createMockup01Html(heroScreenB64, mobHomeB64);
  await page.setViewport({ width: 2880, height: 1620, deviceScaleFactor: 1 });
  await page.setContent(mockup01Html, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));
  await saveMockup(page, '01_Mockup_Spotlight_Hero.jpg');

  // ---------------------------------------------------------------------------
  // GENERATE MOCKUP 02: CURATED FILMOGRAPHY SHOWCASE (Studio Display with Real Posters)
  // ---------------------------------------------------------------------------
  console.log('\n--- Generating Mockup 02: Curated Filmography Showcase ---');
  const mockup02Html = createMockup02Html(filmographyB64, mobFilmsB64);
  await page.setContent(mockup02Html, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));
  await saveMockup(page, '02_Mockup_Filmography_Showcase.jpg');

  // ---------------------------------------------------------------------------
  // GENERATE MOCKUP 03: BEYOND THE FRAME (Aamir Khan Talkies Video Hub)
  // ---------------------------------------------------------------------------
  console.log('\n--- Generating Mockup 03: Beyond the Frame Talkies Hub ---');
  const mockup03Html = createMockup03Html(btfB64, mobBtfB64);
  await page.setContent(mockup03Html, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));
  await saveMockup(page, '03_Mockup_Beyond_The_Frame.jpg');

  // ---------------------------------------------------------------------------
  // GENERATE MOCKUP 04: FILM DETAIL EXHIBITION (Lagaan Page with Real Artwork)
  // ---------------------------------------------------------------------------
  console.log('\n--- Generating Mockup 04: Film Detail Exhibition (Lagaan) ---');
  const mockup04Html = createMockup04Html(lagaanB64);
  await page.setContent(mockup04Html, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));
  await saveMockup(page, '04_Mockup_Film_Detail_Lagaan.jpg');

  // ---------------------------------------------------------------------------
  // GENERATE MOCKUP 05: MULTI-DEVICE RESPONSIVE ECOSYSTEM
  // ---------------------------------------------------------------------------
  console.log('\n--- Generating Mockup 05: Multi-Device Responsive Ecosystem ---');
  const mockup05Html = createMockup05Html(heroScreenB64, tabFilmsB64, mobHomeB64);
  await page.setContent(mockup05Html, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));
  await saveMockup(page, '05_Mockup_MultiDevice_Ecosystem.jpg');

  await browser.close();
  console.log('\nAll 5 Fresh Mockups generated and saved successfully!');
}

async function saveMockup(page, filename) {
  const p1 = path.join(mockupsDir, filename);
  const p2 = path.join(akpMockupsDir, filename);
  const p3 = path.join(brainDir, filename);
  const p4 = path.join(desktopDir, filename);

  await page.screenshot({ path: p1, type: 'jpeg', quality: 92 });
  fs.copyFileSync(p1, p2);
  fs.copyFileSync(p1, p3);
  fs.copyFileSync(p1, p4);
  console.log(`Saved: ${filename} across Mockups directories`);
}

// -----------------------------------------------------------------------------
// HTML Templates for Fresh Mockups
// -----------------------------------------------------------------------------

function getBaseStyles() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 20%, #151920 0%, #07090C 65%, #030405 100%);
      color: #F7F3ED;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      width: 2880px;
      height: 1620px;
      overflow: hidden;
      position: relative;
      padding: 60px 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid rgba(247, 243, 237, 0.12);
      padding-bottom: 24px;
      z-index: 10;
    }
    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .brand-mark {
      font-family: Georgia, serif;
      font-size: 48px;
      color: #E5262C;
      font-weight: bold;
      line-height: 1;
    }
    .brand-text-col {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #F7F3ED;
    }
    .brand-subtitle {
      font-size: 12px;
      color: #9C9A95;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    .header-pills {
      display: flex;
      gap: 14px;
    }
    .pill {
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 8px 18px;
      border-radius: 999px;
      background: rgba(247,243,237,0.06);
      border: 1px solid rgba(247,243,237,0.15);
      color: #D6D2CA;
    }
    .pill.red {
      border-color: rgba(229,38,44,0.4);
      color: #FF8588;
      background: rgba(229,38,44,0.08);
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(247, 243, 237, 0.12);
      padding-top: 20px;
      font-size: 13px;
      color: #8C8A84;
      letter-spacing: 0.08em;
      z-index: 10;
    }
    .footer-quote {
      font-family: Georgia, serif;
      font-size: 20px;
      font-style: italic;
      color: #F7F3ED;
    }
    .footer-quote em {
      color: #E5262C;
      font-style: normal;
    }

    /* Ambient Spotlight Cones */
    .glow-cone {
      position: absolute;
      top: -15%;
      left: 30%;
      width: 1400px;
      height: 900px;
      background: radial-gradient(ellipse at 50% 30%, rgba(229, 38, 44, 0.11) 0%, rgba(197, 168, 69, 0.07) 35%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
    }

    /* MacBook Pro Frame */
    .macbook-wrap {
      position: relative;
      filter: drop-shadow(0 40px 90px rgba(0,0,0,0.85));
    }
    .macbook-lid {
      background: #181B20;
      border: 3px solid #2C323B;
      border-radius: 20px 20px 4px 4px;
      padding: 12px 12px 0 12px;
      box-shadow: inset 0 1px 2px rgba(255,255,255,0.2);
    }
    .macbook-notch-bar {
      height: 26px;
      background: #0B0E12;
      border-radius: 8px 8px 0 0;
      display: flex;
      align-items: center;
      padding: 0 14px;
      gap: 7px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .dot-close { width: 9px; height: 9px; border-radius: 50%; background: #FF5F56; }
    .dot-min { width: 9px; height: 9px; border-radius: 50%; background: #FFBD2E; }
    .dot-max { width: 9px; height: 9px; border-radius: 50%; background: #27C93F; }
    .mac-url {
      margin-left: 18px;
      background: rgba(255,255,255,0.06);
      padding: 2px 20px;
      border-radius: 5px;
      font-size: 11px;
      color: #9E9C96;
      font-family: monospace;
    }
    .macbook-screen {
      overflow: hidden;
      background: #000;
    }
    .macbook-screen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .macbook-base {
      height: 22px;
      background: linear-gradient(180deg, #2D333C 0%, #171A1F 100%);
      border-radius: 0 0 16px 16px;
      border-top: 1px solid rgba(255,255,255,0.15);
      position: relative;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }
    .macbook-notch-lip {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 180px;
      height: 7px;
      background: #111317;
      border-radius: 0 0 6px 6px;
    }

    /* iPhone 15 Pro Frame */
    .iphone-wrap {
      width: 440px;
      height: 900px;
      background: #121418;
      border: 4px solid #373E4A;
      border-radius: 56px;
      padding: 12px;
      position: relative;
      box-shadow: 0 35px 70px rgba(0,0,0,0.9);
      display: flex;
      flex-direction: column;
    }
    .iphone-screen {
      width: 100%;
      height: 100%;
      border-radius: 44px;
      overflow: hidden;
      background: #000;
      position: relative;
    }
    .iphone-screen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .dynamic-island {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: 110px;
      height: 30px;
      background: #000;
      border-radius: 20px;
      z-index: 20;
    }
  `;
}

function createMockup01Html(deskB64, mobB64) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getBaseStyles()}
    .stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 70px;
      perspective: 1800px;
      z-index: 5;
    }
    .macbook-wrap {
      width: 1540px;
      transform: rotateY(-3deg) rotateX(2deg);
    }
    .macbook-screen {
      height: 860px;
    }
    .macbook-base {
      width: 1700px;
      margin-left: -80px;
    }
    .iphone-wrap {
      transform: rotateY(5deg) rotateX(1deg);
    }
  </style>
</head>
<body>
  <div class="glow-cone"></div>
  <header class="header-bar">
    <div class="brand-wrap">
      <span class="brand-mark">a</span>
      <div class="brand-text-col">
        <div class="brand-title">Aamir Khan Productions</div>
        <div class="brand-subtitle">01 — Spotlight Film-Title Wall · Desktop & Mobile Showcase</div>
      </div>
    </div>
    <div class="header-pills">
      <span class="pill red">● Active Spotlight Wall</span>
      <span class="pill">2.5s Lissajous Autopilot</span>
      <span class="pill">CSS Mask Radial Physics</span>
      <span class="pill">1440 × 900 Retina</span>
    </div>
  </header>

  <main class="stage">
    <!-- MacBook Pro with Spotlight Hero -->
    <div class="macbook-wrap">
      <div class="macbook-lid">
        <div class="macbook-notch-bar">
          <div class="dot-close"></div><div class="dot-min"></div><div class="dot-max"></div>
          <span class="mac-url">https://aamirkhanproductions.com</span>
        </div>
        <div class="macbook-screen">
          <img src="data:image/png;base64,${deskB64}" />
        </div>
      </div>
      <div class="macbook-base"><div class="macbook-notch-lip"></div></div>
    </div>

    <!-- iPhone 15 Pro with Mobile Spotlight -->
    <div class="iphone-wrap">
      <div class="iphone-screen">
        <div class="dynamic-island"></div>
        <img src="data:image/png;base64,${mobB64}" />
      </div>
    </div>
  </main>

  <footer class="footer-bar">
    <span class="footer-quote">“Stories that stay <em>with us.</em>”</span>
    <span>Aamir Khan Productions Pvt. Ltd. · 2026 Creative Pitch Concept</span>
  </footer>
</body>
</html>`;
}

function createMockup02Html(deskFilmsB64, mobFilmsB64) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getBaseStyles()}
    .stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 70px;
      perspective: 1800px;
      z-index: 5;
    }
    .macbook-wrap {
      width: 1540px;
      transform: rotateY(-2deg) rotateX(1deg);
    }
    .macbook-screen {
      height: 860px;
    }
    .macbook-base {
      width: 1700px;
      margin-left: -80px;
    }
    .iphone-wrap {
      transform: rotateY(4deg);
    }
  </style>
</head>
<body>
  <div class="glow-cone"></div>
  <header class="header-bar">
    <div class="brand-wrap">
      <span class="brand-mark">a</span>
      <div class="brand-text-col">
        <div class="brand-title">Aamir Khan Productions</div>
        <div class="brand-subtitle">02 — Curated Filmography · Authentic Theatrical Artworks</div>
      </div>
    </div>
    <div class="header-pills">
      <span class="pill red">● Real Theatrical Key Art</span>
      <span class="pill">Lagaan (2001) · Laapataa Ladies (2024) · Dangal (2016)</span>
      <span class="pill">2:3 Portrait Aspect</span>
    </div>
  </header>

  <main class="stage">
    <div class="macbook-wrap">
      <div class="macbook-lid">
        <div class="macbook-notch-bar">
          <div class="dot-close"></div><div class="dot-min"></div><div class="dot-max"></div>
          <span class="mac-url">https://aamirkhanproductions.com/#featured-films</span>
        </div>
        <div class="macbook-screen">
          <img src="data:image/png;base64,${deskFilmsB64}" />
        </div>
      </div>
      <div class="macbook-base"><div class="macbook-notch-lip"></div></div>
    </div>

    <div class="iphone-wrap">
      <div class="iphone-screen">
        <div class="dynamic-island"></div>
        <img src="data:image/png;base64,${mobFilmsB64}" />
      </div>
    </div>
  </main>

  <footer class="footer-bar">
    <span class="footer-quote">“Cinema crafted with purpose and cultural realism.”</span>
    <span>Lumbre Minimalist Editorial · Warm Ivory (#FAF8F5) Canvas</span>
  </footer>
</body>
</html>`;
}

function createMockup03Html(deskBtfB64, mobBtfB64) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getBaseStyles()}
    .stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 70px;
      perspective: 1800px;
      z-index: 5;
    }
    .macbook-wrap {
      width: 1540px;
      transform: rotateY(-3deg) rotateX(1deg);
    }
    .macbook-screen {
      height: 860px;
    }
    .macbook-base {
      width: 1700px;
      margin-left: -80px;
    }
    .iphone-wrap {
      transform: rotateY(5deg);
    }
  </style>
</head>
<body>
  <div class="glow-cone"></div>
  <header class="header-bar">
    <div class="brand-wrap">
      <span class="brand-mark">a</span>
      <div class="brand-text-col">
        <div class="brand-title">Aamir Khan Productions</div>
        <div class="brand-subtitle">03 — Beyond the Frame · Aamir Khan Talkies Video Archive</div>
      </div>
    </div>
    <div class="header-pills">
      <span class="pill red">● Aamir Khan Talkies</span>
      <span class="pill">Click-to-Load YouTube Facade</span>
      <span class="pill">Category Filtering</span>
      <span class="pill">Dedicated /beyond-the-frame Route</span>
    </div>
  </header>

  <main class="stage">
    <div class="macbook-wrap">
      <div class="macbook-lid">
        <div class="macbook-notch-bar">
          <div class="dot-close"></div><div class="dot-min"></div><div class="dot-max"></div>
          <span class="mac-url">https://aamirkhanproductions.com/beyond-the-frame</span>
        </div>
        <div class="macbook-screen">
          <img src="data:image/png;base64,${deskBtfB64}" />
        </div>
      </div>
      <div class="macbook-base"><div class="macbook-notch-lip"></div></div>
    </div>

    <div class="iphone-wrap">
      <div class="iphone-screen">
        <div class="dynamic-island"></div>
        <img src="data:image/png;base64,${mobBtfB64}" />
      </div>
    </div>
  </main>

  <footer class="footer-bar">
    <span class="footer-quote">“The conversations, craft and moments behind the stories we love.”</span>
    <span>Official YouTube Video Archive & Directors Commentary Hub</span>
  </footer>
</body>
</html>`;
}

function createMockup04Html(lagaanB64) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getBaseStyles()}
    .stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }
    .macbook-wrap {
      width: 1740px;
    }
    .macbook-screen {
      height: 960px;
    }
    .macbook-base {
      width: 1920px;
      margin-left: -90px;
    }
  </style>
</head>
<body>
  <div class="glow-cone"></div>
  <header class="header-bar">
    <div class="brand-wrap">
      <span class="brand-mark">a</span>
      <div class="brand-text-col">
        <div class="brand-title">Aamir Khan Productions</div>
        <div class="brand-subtitle">04 — Film Detail Exhibition · Lagaan (2001) Flagship Feature</div>
      </div>
    </div>
    <div class="header-pills">
      <span class="pill red">● Academy Award Nominee</span>
      <span class="pill">Sticky Chapter Subnavigation</span>
      <span class="pill">Trailer Modal & Curated Stills</span>
      <span class="pill">Verified Metadata</span>
    </div>
  </header>

  <main class="stage">
    <div class="macbook-wrap">
      <div class="macbook-lid">
        <div class="macbook-notch-bar">
          <div class="dot-close"></div><div class="dot-min"></div><div class="dot-max"></div>
          <span class="mac-url">https://aamirkhanproductions.com/films/lagaan</span>
        </div>
        <div class="macbook-screen">
          <img src="data:image/png;base64,${lagaanB64}" />
        </div>
      </div>
      <div class="macbook-base"><div class="macbook-notch-lip"></div></div>
    </div>
  </main>

  <footer class="footer-bar">
    <span class="footer-quote">“In 1893 Victorian India, a high-stakes cricket match stakes the future of Champaner.”</span>
    <span>Official Theatrical Key Visual & Dynamic Chapters Nav</span>
  </footer>
</body>
</html>`;
}

function createMockup05Html(deskHeroB64, tabB64, mobB64) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getBaseStyles()}
    .stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 50px;
      perspective: 2000px;
      z-index: 5;
    }
    .macbook-wrap {
      width: 1300px;
      transform: rotateY(-6deg) rotateX(2deg);
    }
    .macbook-screen {
      height: 750px;
    }
    .macbook-base {
      width: 1440px;
      margin-left: -70px;
    }
    .ipad-wrap {
      width: 680px;
      height: 520px;
      background: #15181E;
      border: 3px solid #2F3642;
      border-radius: 28px;
      padding: 10px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.8);
      transform: rotateY(0deg) translateY(60px);
    }
    .ipad-screen {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      overflow: hidden;
      background: #000;
    }
    .ipad-screen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .iphone-wrap {
      width: 360px;
      height: 740px;
      border-radius: 48px;
      transform: rotateY(8deg) translateY(20px);
    }
    .iphone-screen {
      border-radius: 38px;
    }
  </style>
</head>
<body>
  <div class="glow-cone"></div>
  <header class="header-bar">
    <div class="brand-wrap">
      <span class="brand-mark">a</span>
      <div class="brand-text-col">
        <div class="brand-title">Aamir Khan Productions</div>
        <div class="brand-subtitle">05 — Multi-Device Responsive Ecosystem · Desktop · Tablet · Mobile</div>
      </div>
    </div>
    <div class="header-pills">
      <span class="pill red">● Full Responsiveness</span>
      <span class="pill">Desktop (1440px)</span>
      <span class="pill">Tablet iPad (1024px)</span>
      <span class="pill">Mobile iPhone (390px)</span>
    </div>
  </header>

  <main class="stage">
    <!-- Desktop MacBook Pro -->
    <div class="macbook-wrap">
      <div class="macbook-lid">
        <div class="macbook-notch-bar">
          <div class="dot-close"></div><div class="dot-min"></div><div class="dot-max"></div>
          <span class="mac-url">https://aamirkhanproductions.com</span>
        </div>
        <div class="macbook-screen">
          <img src="data:image/png;base64,${deskHeroB64}" />
        </div>
      </div>
      <div class="macbook-base"><div class="macbook-notch-lip"></div></div>
    </div>

    <!-- Tablet iPad Pro -->
    <div class="ipad-wrap">
      <div class="ipad-screen">
        <img src="data:image/png;base64,${tabB64}" />
      </div>
    </div>

    <!-- Mobile iPhone 15 Pro -->
    <div class="iphone-wrap">
      <div class="iphone-screen">
        <div class="dynamic-island"></div>
        <img src="data:image/png;base64,${mobB64}" />
      </div>
    </div>
  </main>

  <footer class="footer-bar">
    <span class="footer-quote">“Unified design language across every screen and resolution.”</span>
    <span>Engineered with Angular 20 · Zero Dependency CSS Radial Masks · Touchpan Optimized</span>
  </footer>
</body>
</html>`;
}

run().catch(err => {
  console.error('Error generating fresh mockups:', err);
  process.exit(1);
});
