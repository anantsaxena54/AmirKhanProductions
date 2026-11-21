const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DIST_DIR = path.resolve(__dirname, '../dist/AKP/browser');
const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 4288;

const desktopDir = path.join(ROOT_DIR, '1 - Desktop View');
const mobileDir = path.join(ROOT_DIR, '2 - Mobile View');

if (!fs.existsSync(desktopDir)) fs.mkdirSync(desktopDir, { recursive: true });
if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });

// 1. Static SPA Server
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
        // SPA Fallback
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(DIST_DIR, 'index.html')).pipe(res);
      }
    });

    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

const PAGES = [
  { name: '01_Home', path: '/' },
  { name: '02_Films', path: '/films' },
  { name: '03_Beyond_The_Frame', path: '/beyond-the-frame' },
  { name: '04_Film_Details_Lagaan', path: '/films/lagaan' },
  { name: '05_Film_Details_Taare_Zameen_Par', path: '/films/taare-zameen-par' },
  { name: '06_Studio', path: '/studio' },
  { name: '07_Journal', path: '/journal' },
  { name: '08_Contact', path: '/contact' }
];

async function capture() {
  const server = await startServer();

  console.log('Launching Headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  // 1. Desktop Screenshots (1440 x 900)
  console.log('\n--- Capturing Desktop Screens (1440 x 900) ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const p of PAGES) {
    const url = `http://localhost:${PORT}${p.path}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200)); // Allow Three.js canvas & webfonts to stabilize

    // Above the fold (1440x900)
    const foldPath = path.join(desktopDir, `${p.name}.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    console.log(`Saved: ${foldPath}`);

    // Full page capture
    const fullPath = path.join(desktopDir, `${p.name}_FullPage.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved: ${fullPath}`);
  }

  // 2. Mobile Screenshots (390 x 844)
  console.log('\n--- Capturing Mobile Screens (390 x 844) ---');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });

  for (const p of PAGES) {
    const url = `http://localhost:${PORT}${p.path}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    // Above the fold (390x844)
    const foldPath = path.join(mobileDir, `${p.name}.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    console.log(`Saved: ${foldPath}`);

    // Full page capture
    const fullPath = path.join(mobileDir, `${p.name}_FullPage.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved: ${fullPath}`);
  }

  // 3. Generate Desktop Collage
  console.log('\n--- Generating Desktop Collage ---');
  const desktopCollageHtml = generateDesktopCollageHtml();
  await page.setViewport({ width: 2400, height: 1600, deviceScaleFactor: 1 });
  await page.setContent(desktopCollageHtml, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  const desktopCollagePath = path.join(desktopDir, 'Desktop_Collage.jpg');
  await page.screenshot({ path: desktopCollagePath, type: 'jpeg', quality: 90 });
  console.log(`Saved: ${desktopCollagePath}`);

  // 4. Generate Mobile Collage
  console.log('\n--- Generating Mobile Collage ---');
  const mobileCollageHtml = generateMobileCollageHtml();
  await page.setViewport({ width: 2400, height: 1500, deviceScaleFactor: 1 });
  await page.setContent(mobileCollageHtml, { waitUntil: 'load', timeout: 10000 });
  await new Promise(r => setTimeout(r, 500));
  const mobileCollagePath = path.join(mobileDir, 'Mobile_Collage.jpg');
  await page.screenshot({ path: mobileCollagePath, type: 'jpeg', quality: 90 });
  console.log(`Saved: ${mobileCollagePath}`);

  await browser.close();
  server.close();
  console.log('\nAll captures and collages created successfully!');
}

function generateDesktopCollageHtml() {
  const images = PAGES.map(p => {
    const imgPath = path.join(desktopDir, `${p.name}.png`);
    const b64 = fs.readFileSync(imgPath).toString('base64');
    return { name: p.name.replace(/_/g, ' '), src: `data:image/png;base64,${b64}` };
  });

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      background: #090C0F;
      color: #FAF8F5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 60px 80px;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid rgba(250,248,245,0.15);
      padding-bottom: 24px;
      margin-bottom: 40px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .logo-mark {
      font-size: 36px;
      font-family: Georgia, serif;
      color: #BB4941;
      font-weight: bold;
    }
    .brand-title {
      font-size: 20px;
      letter-spacing: 0.18em;
      font-weight: 600;
    }
    .brand-sub {
      font-size: 11px;
      color: #A8A6A0;
      letter-spacing: 0.12em;
    }
    .meta-tag {
      font-size: 13px;
      color: #C5A845;
      letter-spacing: 0.14em;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 36px;
    }
    .tile {
      background: #14181E;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0,0,0,0.5);
    }
    .tile img {
      width: 100%;
      height: auto;
      display: block;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .tile-footer {
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #D2CEC6;
      letter-spacing: 0.08em;
      background: #0E1216;
    }
    .tile-footer span:last-child {
      color: #BB4941;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <span class="logo-mark">a</span>
      <div>
        <div class="brand-title">AAMIR KHAN PRODUCTIONS</div>
        <div class="brand-sub">WEBSITE REDESIGN CONCEPT · SIX DESKTOP SCREENS OVERVIEW</div>
      </div>
    </div>
    <div class="meta-tag">1440 × 900 PX REFERENCE · LUMBRE EDITORIAL GRID</div>
  </div>
  <div class="grid">
    ${images.map(img => `
      <div class="tile">
        <img src="${img.src}" />
        <div class="tile-footer">
          <span>${img.name}</span>
          <span>1440 × 900</span>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

function generateMobileCollageHtml() {
  const images = PAGES.map(p => {
    const imgPath = path.join(mobileDir, `${p.name}.png`);
    const b64 = fs.readFileSync(imgPath).toString('base64');
    return { name: p.name.replace(/_/g, ' '), src: `data:image/png;base64,${b64}` };
  });

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      background: #090C0F;
      color: #FAF8F5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 60px 80px;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid rgba(250,248,245,0.15);
      padding-bottom: 24px;
      margin-bottom: 40px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .logo-mark {
      font-size: 36px;
      font-family: Georgia, serif;
      color: #BB4941;
      font-weight: bold;
    }
    .brand-title {
      font-size: 20px;
      letter-spacing: 0.18em;
      font-weight: 600;
    }
    .brand-sub {
      font-size: 11px;
      color: #A8A6A0;
      letter-spacing: 0.12em;
    }
    .meta-tag {
      font-size: 13px;
      color: #C5A845;
      letter-spacing: 0.14em;
    }
    .mobile-row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 24px;
    }
    .phone-mockup {
      background: #14181E;
      border: 3px solid #282E38;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
    }
    .phone-mockup img {
      width: 100%;
      height: auto;
      display: block;
    }
    .phone-meta {
      padding: 10px 12px;
      background: #0E1216;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 11px;
      text-align: center;
      color: #D2CEC6;
      letter-spacing: 0.06em;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <span class="logo-mark">a</span>
      <div>
        <div class="brand-title">AAMIR KHAN PRODUCTIONS</div>
        <div class="brand-sub">WEBSITE REDESIGN CONCEPT · SIX MOBILE SCREENS OVERVIEW</div>
      </div>
    </div>
    <div class="meta-tag">390 × 844 PX RESPONSIVE UX · ORDINARY FOLK MENU</div>
  </div>
  <div class="mobile-row">
    ${images.map(img => `
      <div class="phone-mockup">
        <img src="${img.src}" />
        <div class="phone-meta">${img.name}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

capture().catch(err => {
  console.error('Error during screen capture:', err);
  process.exit(1);
});
