// Static site build: renders every page module to dist/, copies public assets,
// CSS and JS, and writes sitemap.xml / robots.txt. No dependencies.
import { mkdirSync, rmSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from './data/site.mjs';

import home from './pages/home.mjs';
import about from './pages/about.mjs';
import services from './pages/services.mjs';
import equipment from './pages/equipment.mjs';
import customers from './pages/customers.mjs';
import contact from './pages/contact.mjs';
import notFound from './pages/not-found.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pages = [home, about, services, equipment, customers, contact, notFound];

if (!existsSync(path.join(root, 'public/assets/img/images.json'))) {
  console.error('Missing public/assets/img/images.json — run `npm run images` first.');
  process.exit(1);
}

rmSync(dist, { recursive: true, force: true });
cpSync(path.join(root, 'public'), dist, { recursive: true });
cpSync(path.join(root, 'src/styles'), path.join(dist, 'assets/css'), { recursive: true });
cpSync(path.join(root, 'src/scripts'), path.join(dist, 'assets/js'), { recursive: true });

for (const p of pages) {
  const file = p.file ? path.join(dist, p.file) : path.join(dist, p.path, 'index.html');
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, p.render());
  console.log(`built ${path.relative(root, file)}`);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => !p.file).map((p) => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod></url>`);
writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log('built sitemap.xml, robots.txt');
