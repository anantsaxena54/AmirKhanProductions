const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DIST_DIR = path.resolve(__dirname, '../dist/AKP/browser');
const ROOT_DIR = '/Users/akshatsaxena/Desktop/AmirKhanProduction';
const AKP_DIR = path.resolve(__dirname, '..');
const PORT = 4299;

const desktopDir = path.join(ROOT_DIR, '1 - Desktop View');
const mobileDir = path.join(ROOT_DIR, '2 - Mobile View');
const brainDir = '/Users/akshatsaxena/.gemini/antigravity/brain/a1decb08-5093-46f2-8654-d21d847de9d9';

if (!fs.existsSync(desktopDir)) fs.mkdirSync(desktopDir, { recursive: true });
if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });
if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });

function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.ico': 'image/x-icon',
      '.svg': 'image/svg+xml'
    };

    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(DIST_DIR, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(DIST_DIR, 'index.html')).pipe(res);
      }
    });

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

const PAGES = [
  { id: '01_Home', title: 'Home · Spotlight Film-Title Wall', path: '/' },
  { id: '02_Films', title: 'Curated Filmography Archive', path: '/films' },
  { id: '03_Beyond_The_Frame', title: 'Beyond the Frame · Aamir Khan Talkies', path: '/beyond-the-frame' },
  { id: '04_Film_Details_Lagaan', title: 'Film Detail · Lagaan (2001)', path: '/films/lagaan' },
  { id: '05_Film_Details_Taare_Zameen_Par', title: 'Film Detail · Taare Zameen Par (2007)', path: '/films/taare-zameen-par' },
  { id: '06_Studio', title: 'The Studio · History & Vision', path: '/studio' },
  { id: '07_Journal', title: 'Journal · Production Stories', path: '/journal' },
  { id: '08_Contact', title: 'Contact · Inquiries & Representation', path: '/contact' }
];

async function run() {
  const server = await startServer();

  console.log('Launching Headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  // 1. Desktop Screenshots (1440x900)
  console.log('\n--- Capturing Desktop Screens (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const p of PAGES) {
    const url = `http://localhost:${PORT}${p.path}`;
    console.log(`Desktop: ${p.id} -> ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    if (p.id === '01_Home') {
      await new Promise(r => setTimeout(r, 2200));
      // Move mouse to illuminate Lagaan / Dangal
      await page.mouse.move(720, 360, { steps: 15 });
      await new Promise(r => setTimeout(r, 600));
    } else {
      await new Promise(r => setTimeout(r, 1000));
    }

    const foldPath = path.join(desktopDir, `${p.id}.png`);
    await page.screenshot({ path: foldPath, fullPage: false });

    const fullPath = path.join(desktopDir, `${p.id}_FullPage.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
  }

  // 2. Mobile Screenshots (390x844)
  console.log('\n--- Capturing Mobile Screens (390x844) ---');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  for (const p of PAGES) {
    const url = `http://localhost:${PORT}${p.path}`;
    console.log(`Mobile: ${p.id} -> ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    if (p.id === '01_Home') {
      await new Promise(r => setTimeout(r, 2200));
    } else {
      await new Promise(r => setTimeout(r, 1000));
    }

    const foldPath = path.join(mobileDir, `${p.id}.png`);
    await page.screenshot({ path: foldPath, fullPage: false });

    const fullPath = path.join(mobileDir, `${p.id}_FullPage.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
  }

  // 3. Realistic Device Mockup Presentation (MacBook Pro + iPhone 15 Pro)
  console.log('\n--- Generating Realistic Device Mockup Presentation ---');
  const homeDeskB64 = fs.readFileSync(path.join(desktopDir, '01_Home.png')).toString('base64');
  const homeMobB64 = fs.readFileSync(path.join(mobileDir, '01_Home.png')).toString('base64');
  const btfMobB64 = fs.readFileSync(path.join(mobileDir, '03_Beyond_The_Frame.png')).toString('base64');
  const filmsDeskB64 = fs.readFileSync(path.join(desktopDir, '02_Films.png')).toString('base64');

  const devicePresentationHtml = generateDevicePresentationHtml(homeDeskB64, homeMobB64, btfMobB64, filmsDeskB64);
  await page.setViewport({ width: 2880, height: 1620, deviceScaleFactor: 1 });
  await page.setContent(devicePresentationHtml, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 1200));

  const deviceMockupPath = path.join(desktopDir, 'AKP_Device_Mockup_Showcase.jpg');
  await page.screenshot({ path: deviceMockupPath, type: 'jpeg', quality: 92 });
  fs.copyFileSync(deviceMockupPath, path.join(ROOT_DIR, 'AKP_Device_Mockup_Showcase.jpg'));
  fs.copyFileSync(deviceMockupPath, path.join(brainDir, 'AKP_Device_Mockup_Showcase.jpg'));
  console.log(`Saved: ${deviceMockupPath}`);

  // 4. Desktop Collage
  console.log('\n--- Generating Desktop Collage ---');
  const desktopCollageHtml = generateDesktopCollageHtml();
  await page.setViewport({ width: 2800, height: 1950, deviceScaleFactor: 1 });
  await page.setContent(desktopCollageHtml, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 1200));

  const desktopCollagePath = path.join(desktopDir, 'Desktop_Collage.jpg');
  await page.screenshot({ path: desktopCollagePath, type: 'jpeg', quality: 90 });
  fs.copyFileSync(desktopCollagePath, path.join(ROOT_DIR, 'Desktop_Collage.jpg'));
  fs.copyFileSync(desktopCollagePath, path.join(brainDir, 'Desktop_Collage.jpg'));
  console.log(`Saved: ${desktopCollagePath}`);

  // 5. Mobile Collage
  console.log('\n--- Generating Mobile Collage ---');
  const mobileCollageHtml = generateMobileCollageHtml();
  await page.setViewport({ width: 2800, height: 1650, deviceScaleFactor: 1 });
  await page.setContent(mobileCollageHtml, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 1200));

  const mobileCollagePath = path.join(mobileDir, 'Mobile_Collage.jpg');
  await page.screenshot({ path: mobileCollagePath, type: 'jpeg', quality: 90 });
  fs.copyFileSync(mobileCollagePath, path.join(ROOT_DIR, 'Mobile_Collage.jpg'));
  fs.copyFileSync(mobileCollagePath, path.join(brainDir, 'Mobile_Collage.jpg'));
  console.log(`Saved: ${mobileCollagePath}`);

  await browser.close();
  server.close();
  console.log('\nAll mockups generated and saved successfully!');
}

function generateDevicePresentationHtml(deskHomeB64, mobHomeB64, mobBtfB64, deskFilmsB64) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 20%, #15191E 0%, #080A0C 70%, #030405 100%);
      color: #F7F3ED;
      font-family: 'Inter', -apple-system, sans-serif;
      width: 2880px;
      height: 1620px;
      overflow: hidden;
      position: relative;
      padding: 70px 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Ambient studio background glows */
    .bg-light-cone {
      position: absolute;
      top: -20%;
      left: 35%;
      width: 1200px;
      height: 900px;
      background: radial-gradient(ellipse at 50% 30%, rgba(229, 38, 44, 0.12) 0%, rgba(197, 168, 69, 0.08) 35%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
    }

    /* Header brand ribbon */
    .mockup-header {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid rgba(247, 243, 237, 0.12);
      padding-bottom: 28px;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .brand-logo-mark {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 52px;
      line-height: 1;
      color: #E5262C;
      font-weight: 700;
    }
    .brand-title-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .brand-headline {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #F7F3ED;
    }
    .brand-sub {
      font-size: 13px;
      letter-spacing: 0.14em;
      color: #9C9A95;
      text-transform: uppercase;
    }
    .spec-pills {
      display: flex;
      gap: 16px;
    }
    .spec-pill {
      font-size: 13px;
      padding: 8px 18px;
      border-radius: 999px;
      background: rgba(247, 243, 237, 0.06);
      border: 1px solid rgba(247, 243, 237, 0.15);
      color: #D6D2CA;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #E5262C;
    }

    /* Main Showcase Stage */
    .showcase-stage {
      position: relative;
      z-index: 5;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 60px;
      perspective: 2000px;
      padding: 30px 0;
    }

    /* MacBook Pro Mockup Frame */
    .laptop-frame {
      position: relative;
      width: 1480px;
      transform: rotateY(-3deg) rotateX(2deg);
      transition: transform 0.3s ease;
      filter: drop-shadow(0 40px 80px rgba(0, 0, 0, 0.85));
    }
    .laptop-lid {
      background: #181B1F;
      border: 3px solid #2B3038;
      border-radius: 20px 20px 4px 4px;
      padding: 14px 14px 0 14px;
      box-shadow: inset 0 1px 2px rgba(255,255,255,0.2), 0 0 0 1px #0B0D10;
    }
    .laptop-notch-bar {
      height: 28px;
      background: #0B0E11;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .mac-btn {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .mac-close { background: #FF5F56; }
    .mac-min { background: #FFBD2E; }
    .mac-max { background: #27C93F; }
    .laptop-url-bar {
      margin-left: 20px;
      background: rgba(255,255,255,0.06);
      padding: 3px 24px;
      border-radius: 6px;
      font-size: 11px;
      color: #A09E98;
      letter-spacing: 0.05em;
    }

    .laptop-screen {
      width: 100%;
      height: 840px;
      background: #040404;
      overflow: hidden;
      position: relative;
    }
    .laptop-screen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .laptop-base {
      width: 1640px;
      height: 24px;
      background: linear-gradient(180deg, #2A2F37 0%, #15181C 100%);
      margin-left: -80px;
      border-radius: 0 0 16px 16px;
      border-top: 1px solid rgba(255,255,255,0.15);
      position: relative;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }
    .laptop-notch-lip {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 180px;
      height: 8px;
      background: #111316;
      border-radius: 0 0 6px 6px;
    }

    /* iPhone 15 Pro Mockups */
    .phones-group {
      display: flex;
      gap: 36px;
      align-items: center;
      transform: rotateY(5deg) rotateX(1deg);
      filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.9));
    }
    .phone-mockup {
      width: 440px;
      height: 900px;
      background: #101216;
      border: 4px solid #363C47;
      border-radius: 56px;
      padding: 12px;
      box-shadow: inset 0 0 0 2px #181A1F, 0 0 0 2px #0A0C0E;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .phone-screen {
      width: 100%;
      height: 100%;
      border-radius: 44px;
      overflow: hidden;
      background: #000;
      position: relative;
    }
    .phone-screen img {
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
      width: 120px;
      height: 32px;
      background: #000000;
      border-radius: 20px;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 14px;
    }
    .island-lens {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #131924;
      border: 1px solid #1F2836;
    }

    .phone-caption {
      position: absolute;
      bottom: -46px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #A3A19C;
    }

    /* Footer Meta Bar */
    .mockup-footer {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(247, 243, 237, 0.12);
      padding-top: 24px;
      font-size: 13px;
      color: #8C8A84;
      letter-spacing: 0.08em;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .tagline-callout {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 22px;
      font-style: italic;
      color: #F7F3ED;
    }
    .tagline-red {
      color: #E5262C;
      font-style: normal;
    }
    .footer-right {
      display: flex;
      align-items: center;
      gap: 24px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }
  </style>
</head>
<body>
  <div class="bg-light-cone"></div>

  <!-- Header -->
  <header class="mockup-header">
    <div class="brand-group">
      <span class="brand-logo-mark">a</span>
      <div class="brand-title-wrap">
        <div class="brand-headline">Aamir Khan Productions</div>
        <div class="brand-sub">Official Website Experience · Design System & Device Showcase</div>
      </div>
    </div>

    <div class="spec-pills">
      <div class="spec-pill"><span class="pill-dot"></span> Spotlight Title Wall</div>
      <div class="spec-pill">Lumbre Minimalist System</div>
      <div class="spec-pill">Angular 19 · Responsive SPA</div>
      <div class="spec-pill">Aamir Khan Talkies Hub</div>
    </div>
  </header>

  <!-- Stage -->
  <main class="showcase-stage">
    <!-- Desktop MacBook Pro -->
    <div class="laptop-frame">
      <div class="laptop-lid">
        <div class="laptop-notch-bar">
          <div class="mac-btn mac-close"></div>
          <div class="mac-btn mac-min"></div>
          <div class="mac-btn mac-max"></div>
          <div class="laptop-url-bar">https://aamirkhanproductions.com</div>
        </div>
        <div class="laptop-screen">
          <img src="data:image/png;base64,${deskHomeB64}" alt="Spotlight Hero Desktop" />
        </div>
      </div>
      <div class="laptop-base">
        <div class="laptop-notch-lip"></div>
      </div>
    </div>

    <!-- Mobile iPhone 15 Pro Duo -->
    <div class="phones-group">
      <!-- Phone 1: Mobile Home Spotlight -->
      <div class="phone-mockup">
        <div class="phone-screen">
          <div class="dynamic-island"><div class="island-lens"></div></div>
          <img src="data:image/png;base64,${mobHomeB64}" alt="Mobile Home" />
        </div>
        <div class="phone-caption">Mobile · Spotlight Wall</div>
      </div>

      <!-- Phone 2: Mobile Beyond the Frame Hub -->
      <div class="phone-mockup">
        <div class="phone-screen">
          <div class="dynamic-island"><div class="island-lens"></div></div>
          <img src="data:image/png;base64,${mobBtfB64}" alt="Mobile Beyond The Frame" />
        </div>
        <div class="phone-caption">Mobile · Beyond the Frame</div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="mockup-footer">
    <div class="footer-left">
      <span>Core Cinema Philosophy:</span>
      <span class="tagline-callout">“Stories that stay <span class="tagline-red">with us.</span>”</span>
    </div>
    <div class="footer-right">
      <span>1440 × 900 Retina Desktop</span>
      <span>·</span>
      <span>390 × 844 Mobile Super Retina</span>
      <span>·</span>
      <span>Interactive Spotlight Physics</span>
    </div>
  </footer>
</body>
</html>`;
}

function generateDesktopCollageHtml() {
  const images = PAGES.map(p => {
    const imgPath = path.join(desktopDir, `${p.id}.png`);
    const b64 = fs.readFileSync(imgPath).toString('base64');
    return { id: p.id, title: p.title, src: `data:image/png;base64,${b64}` };
  });

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #06080A;
      color: #F7F3ED;
      font-family: 'Inter', -apple-system, sans-serif;
      padding: 70px 80px;
      width: 2800px;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid rgba(247, 243, 237, 0.15);
      padding-bottom: 28px;
      margin-bottom: 50px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .logo-mark {
      font-size: 46px;
      font-family: 'Instrument Serif', Georgia, serif;
      color: #E5262C;
      font-weight: bold;
    }
    .brand-title {
      font-size: 24px;
      letter-spacing: 0.16em;
      font-weight: 700;
      text-transform: uppercase;
    }
    .brand-sub {
      font-size: 13px;
      color: #A3A09A;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .meta-tag {
      font-size: 13px;
      color: #D6D2CA;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      display: flex;
      gap: 24px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 36px;
    }
    .tile {
      background: #111419;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 45px rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
    }
    .tile-chrome {
      background: #181C22;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }
    .dot-r { background: #FF5F56; }
    .dot-y { background: #FFBD2E; }
    .dot-g { background: #27C93F; }
    .tile-url {
      margin-left: 12px;
      font-size: 11px;
      color: #8C8A84;
      font-family: monospace;
      letter-spacing: 0.04em;
    }
    .tile img {
      width: 100%;
      height: auto;
      display: block;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      object-position: top;
    }
    .tile-footer {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #E2DFD8;
      background: #0D1014;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .tile-title {
      font-weight: 600;
      letter-spacing: 0.04em;
    }
    .tile-dim {
      color: #E5262C;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <span class="logo-mark">a</span>
      <div>
        <div class="brand-title">Aamir Khan Productions</div>
        <div class="brand-sub">Current Desktop Web Architecture · Eight Comprehensive Views</div>
      </div>
    </div>
    <div class="meta-tag">
      <span>1440 × 900 Desktop Widescreen</span>
      <span>·</span>
      <span>Lumbre Minimalist Editorial</span>
    </div>
  </div>
  <div class="grid">
    ${images.map(img => `
      <div class="tile">
        <div class="tile-chrome">
          <div class="dot dot-r"></div>
          <div class="dot dot-y"></div>
          <div class="dot dot-g"></div>
          <div class="tile-url">aamirkhanproductions.com</div>
        </div>
        <img src="${img.src}" />
        <div class="tile-footer">
          <span class="tile-title">${img.title}</span>
          <span class="tile-dim">1440 × 900</span>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

function generateMobileCollageHtml() {
  const images = PAGES.map(p => {
    const imgPath = path.join(mobileDir, `${p.id}.png`);
    const b64 = fs.readFileSync(imgPath).toString('base64');
    return { id: p.id, title: p.title, src: `data:image/png;base64,${b64}` };
  });

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #06080A;
      color: #F7F3ED;
      font-family: 'Inter', -apple-system, sans-serif;
      padding: 70px 80px;
      width: 2800px;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid rgba(247, 243, 237, 0.15);
      padding-bottom: 28px;
      margin-bottom: 50px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .logo-mark {
      font-size: 46px;
      font-family: 'Instrument Serif', Georgia, serif;
      color: #E5262C;
      font-weight: bold;
    }
    .brand-title {
      font-size: 24px;
      letter-spacing: 0.16em;
      font-weight: 700;
      text-transform: uppercase;
    }
    .brand-sub {
      font-size: 13px;
      color: #A3A09A;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .meta-tag {
      font-size: 13px;
      color: #D6D2CA;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      display: flex;
      gap: 24px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 24px;
    }
    .phone-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .phone-frame {
      width: 100%;
      background: #111419;
      border: 3px solid #2B313B;
      border-radius: 36px;
      padding: 8px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      position: relative;
    }
    .screen-wrap {
      width: 100%;
      border-radius: 28px;
      overflow: hidden;
      background: #000;
      position: relative;
    }
    .screen-wrap img {
      width: 100%;
      height: auto;
      display: block;
      aspect-ratio: 390 / 844;
      object-fit: cover;
      object-position: top;
    }
    .island {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 20px;
      background: #000;
      border-radius: 12px;
      z-index: 10;
    }
    .phone-label {
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: #E2DFD8;
    }
    .phone-sublabel {
      text-align: center;
      font-size: 10px;
      color: #E5262C;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      margin-top: 2px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <span class="logo-mark">a</span>
      <div>
        <div class="brand-title">Aamir Khan Productions</div>
        <div class="brand-sub">Mobile Responsive Suite · Eight Core Touch Views</div>
      </div>
    </div>
    <div class="meta-tag">
      <span>390 × 844 Mobile Viewport</span>
      <span>·</span>
      <span>Touch-Optimized Interaction</span>
    </div>
  </div>
  <div class="grid">
    ${images.map(img => `
      <div class="phone-tile">
        <div class="phone-frame">
          <div class="screen-wrap">
            <div class="island"></div>
            <img src="${img.src}" />
          </div>
        </div>
        <div>
          <div class="phone-label">${img.title.split('·')[0].trim()}</div>
          <div class="phone-sublabel">iOS / Android</div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

run().catch(err => {
  console.error('Error generating mockups:', err);
  process.exit(1);
});
