import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const base = 'http://localhost:4175/';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 880, deviceScaleFactor: 1 });
await page.goto(base, { waitUntil: 'networkidle2' });
await page.addStyleTag({
  content: '[data-reveal]{opacity:1 !important;transform:none !important;filter:none !important;}',
});
await new Promise((r) => setTimeout(r, 800));

// Posicionar el proceso en pantalla y mover el cursor para el foco de luz
const y = await page.evaluate(() => {
  const el = document.getElementById('proceso');
  return el ? window.scrollY + el.getBoundingClientRect().top - 70 : 0;
});
await page.evaluate((yy) => window.scrollTo(0, yy), y);
await new Promise((r) => setTimeout(r, 600));
await page.mouse.move(820, 460);
await page.mouse.move(840, 470); // segundo move para disparar :hover
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: '_s-proc.png' });
console.log('saved proc');
await browser.close();
