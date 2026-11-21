const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT_DIR = path.resolve(__dirname, '..');
const mobileDir = path.join(ROOT_DIR, '2 - Mobile View');

const PAGES = [
  '01_Home',
  '02_Films',
  '03_Film_Details',
  '04_Studio',
  '05_Journal',
  '06_Contact'
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 2400, height: 1400, deviceScaleFactor: 1 });

  const images = PAGES.map(p => {
    const filePath = path.join(mobileDir, `${p}.png`);
    const b64 = fs.readFileSync(filePath).toString('base64');
    return { name: p.replace(/_/g, ' '), src: `data:image/png;base64,${b64}` };
  });

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      background: #090C0F;
      color: #FAF8F5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 50px 70px;
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
      gap: 28px;
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
      padding: 12px 14px;
      background: #0E1216;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 11px;
      text-align: center;
      color: #D2CEC6;
      letter-spacing: 0.08em;
      font-weight: 500;
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
    <div class="meta-tag">390 × 844 PX RESPONSIVE UX · ORDINARY FOLK FULL-SCREEN MENU</div>
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

  await page.setContent(html, { waitUntil: 'load', timeout: 10000 });
  await new Promise(r => setTimeout(r, 600));

  const outPath = path.join(mobileDir, 'Mobile_Collage.jpg');
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 90 });
  console.log('Mobile collage saved successfully to:', outPath);

  await browser.close();
}

run().catch(console.error);
