import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(__dirname, '../dist/client/whitepaper/carbon-fiber-selection-guide/index.html');
  
  if (!fs.existsSync(htmlPath)) {
    console.log('Dist not found at expected path');
    process.exit(1);
  }
  
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  
  const outDir = path.resolve(__dirname, '../public/whitepaper');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  await page.pdf({
    path: path.resolve(outDir, 'carbon-fiber-selection-guide-2026.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
  });
  
  await browser.close();
  console.log('PDF generated successfully!');
})();
