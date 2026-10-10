// Renders the first (static) frame of the animated customer logo 15.svg to PNG.
// The original SVG loops a colour shimmer every 8 s, which is distracting in a
// logo grid and ignores prefers-reduced-motion. The artwork itself is unchanged.
// Output: source-original/derived/15-static-frame.png (consumed by optimize-images.py)
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('@playwright/test'));
} catch {
  const globalRoot = execSync('npm root -g').toString().trim();
  ({ chromium } = require(path.join(globalRoot, '@playwright', 'test')));
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'source-original', 'derived');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 387, height: 180 }, deviceScaleFactor: 3 });
await page.goto(pathToFileURL(path.join(root, '15.svg')).href);
await page.waitForTimeout(300); // well before the shimmer starts at 4 s
await page.screenshot({ path: path.join(outDir, '15-static-frame.png'), omitBackground: true });
await browser.close();
console.log('wrote source-original/derived/15-static-frame.png');
