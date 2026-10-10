// Browser QA for the built site. Requires the preview server (npm start) and
// Playwright (`npm i -g @playwright/test` + `npx playwright install chromium`).
//   node tests/qa.mjs [--shots]
// Checks every page at five widths (1440/1024/768/390/360) for: console errors,
// failed requests, broken images, horizontal overflow, internal links + #anchors,
// tel:/mailto: links, the mobile menu, enquiry-form validation, minimum text
// sizes, web-font loading, content counts, photo credits, keyboard focus and
// reduced-motion behaviour.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('@playwright/test')); } catch {
  ({ chromium } = require(path.join(execSync('npm root -g').toString().trim(), '@playwright', 'test')));
}

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const SHOTS = process.argv.includes('--shots');
const shotDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'screenshots');
if (SHOTS) mkdirSync(shotDir, { recursive: true });

const pages = ['/', '/about/', '/services/', '/testing-equipment/', '/customers/', '/contact/'];
const viewports = {
  desktop: { width: 1440, height: 900 },
  compact: { width: 1024, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
  narrow: { width: 360, height: 740 },
};
const SHOT_VIEWPORTS = ['desktop', 'tablet', 'mobile'];
// Minimum computed font sizes (px) for reading text, per the design system.
const MIN_PX = [
  ['main p, main li', 15, 'reading text'],
  ['.sg-text, .svc-list li, .further-item p, .feat-body > p:not(.feat-n), .ec-items', 16, 'service descriptions'],
  ['.data-table tbody th, .data-table td', 15, 'table content'],
  ['.data-table thead th', 13, 'table headings'],
  ['.eyebrow, .svc-kicker, .fact-list dt, .contact-label', 12.5, 'supporting labels'],
  ['.nav-list a', 15, 'navigation'],
];
const PHONES = ['tel:+919581283853', 'tel:+919052269804'];
const EMAILS = ['mailto:relay@spsserviceshyd.in', 'mailto:spsserviceshyd@gmail.com'];

const problems = [];
const fail = (msg) => { problems.push(msg); console.log(`  ✗ ${msg}`); };
const ok = (msg) => console.log(`  ✓ ${msg}`);

const browser = await chromium.launch();
const anchorsByPage = {};
const linksSeen = new Set();

for (const [vpName, vp] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport: vp });
  for (const p of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    // mailto: navigations "fail" in headless Chromium (no mail client) — expected
    const mailtos = [];
    page.on('requestfailed', (r) => { if (r.url().startsWith('mailto:')) mailtos.push(r.url()); else errors.push(`request failed: ${r.url()}`); });
    page.on('response', (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
    const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
    console.log(`[${vpName}] ${p} → ${res.status()}`);
    if (res.status() !== 200) fail(`${p} returned ${res.status()}`);

    // Scroll through so lazy images load and reveals trigger
    await page.evaluate(async () => {
      // 'instant' overrides the site's CSS smooth scrolling so each step really lands
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForLoadState('networkidle');

    const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
    broken.length ? fail(`${p} broken images: ${broken.join(', ')}`) : ok(`all ${await page.$$eval('img', (i) => i.length)} images loaded`);

    const missingAlt = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).length);
    if (missingAlt) fail(`${p} ${missingAlt} images without alt attribute`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    overflow > 1 ? fail(`${p} horizontal overflow ${overflow}px at ${vpName}`) : ok('no horizontal overflow');

    const small = await page.evaluate((rules) => {
      const out = [];
      for (const [sel, min, label] of rules) {
        for (const el of document.querySelectorAll(sel)) {
          if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue; // hidden
          if (el.closest('.sr-only, .credit, figcaption')) continue;
          // Labels and index numerals have their own (smaller) rule
          if (label === 'reading text' && /(^|\s)(eyebrow|svc-kicker|grp-n|sg-index|feat-n|area-n|srow-n|leader-role)(\s|$)/.test(el.className)) continue;
          if (!el.textContent.trim()) continue;
          const px = parseFloat(getComputedStyle(el).fontSize);
          if (px < min - 0.01) { out.push(`${label} ${px}px < ${min}px: "${el.textContent.trim().slice(0, 40)}"`); break; }
        }
      }
      return out;
    }, MIN_PX);
    small.length ? fail(`${p} [${vpName}] text below minimum size:\n      ${small.join('\n      ')}`) : ok('reading text meets minimum sizes');

    const hidden = await page.$$eval('.reveal', (els) => els.filter((e) => getComputedStyle(e).opacity === '0').length);
    if (hidden) fail(`${p} ${hidden} .reveal elements still hidden after full scroll`);

    const h1 = await page.$$eval('h1', (h) => h.length);
    if (h1 !== 1) fail(`${p} has ${h1} <h1> elements`);

    if (vpName === 'desktop') {
      const fonts = await page.evaluate(async () => {
        await document.fonts.ready;
        // The mono face is only requested by pages that use it (indices, specs)
        const usesMono = [...document.querySelectorAll('main *')].some((e) => getComputedStyle(e).fontFamily.includes('IBM Plex Mono') && e.textContent.trim());
        return ['600 18px Inter', '700 30px Manrope', ...(usesMono ? ['500 15px "IBM Plex Mono"'] : [])].filter((f) => !document.fonts.check(f));
      });
      fonts.length ? fail(`${p} web fonts not loaded: ${fonts.join(', ')}`) : ok('Inter, Manrope and IBM Plex Mono loaded');

      // Every third-party photograph on the page must carry a visible credit
      const uncredited = await page.evaluate(() => {
        const imgs = [...document.querySelectorAll('img')].filter((i) => (i.currentSrc || i.src).includes('/photography/'));
        return imgs.filter((i) => {
          const box = i.closest('figure, .feat, .page-head-media, .contact-band');
          return !box || !box.querySelector('.credit');
        }).map((i) => i.currentSrc || i.src);
      });
      uncredited.length ? fail(`${p} photos without credit: ${uncredited.join(', ')}`) : ok('every third-party photo is credited');

      // Keyboard: the first Tab reaches the skip link and shows a focus outline
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => {
        const a = document.activeElement;
        const cs = getComputedStyle(a);
        return { cls: a.className, outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2 };
      });
      focus.cls === 'skip' && focus.outline ? ok('Tab reaches skip link with visible focus ring') : fail(`${p} first Tab focus: ${JSON.stringify(focus)}`);

      anchorsByPage[p] = await page.$$eval('[id]', (els) => els.map((e) => e.id));
      const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
      hrefs.forEach((h) => linksSeen.add(JSON.stringify([p, h])));
      const meta = await page.evaluate(() => ({
        title: document.title,
        desc: document.querySelector('meta[name=description]')?.content,
        canonical: document.querySelector('link[rel=canonical]')?.href,
        og: document.querySelector('meta[property="og:image"]')?.content,
      }));
      if (!meta.title || !meta.desc || !meta.canonical || !meta.og) fail(`${p} missing SEO meta ${JSON.stringify(meta)}`);
      else ok('title, description, canonical and og:image present');
    }

    if (vpName === 'mobile') {
      const toggle = page.locator('[data-nav-toggle]');
      await toggle.click();
      const open = await page.locator('[data-nav]').evaluate((n) => n.classList.contains('is-open') && getComputedStyle(n).visibility === 'visible');
      const expanded = await toggle.getAttribute('aria-expanded');
      open && expanded === 'true' ? ok('mobile menu opens') : fail(`${p} mobile menu did not open`);
      await page.keyboard.press('Escape');
      (await toggle.getAttribute('aria-expanded')) === 'false' ? ok('mobile menu closes on Escape') : fail(`${p} Escape did not close menu`);
    }

    if (vpName === 'desktop') {
      const counts = await page.evaluate(() => ({
        serviceRows: document.querySelectorAll('#services .sg-item').length,
        logos: document.querySelectorAll('.logo-grid .logo-cell').length,
        invRows: document.querySelectorAll('.inv-table tbody tr').length,
        svcSections: document.querySelectorAll('.svc-main section.svc').length,
        further: document.querySelectorAll('.further-item').length,
        dataTables: document.querySelectorAll('.data-table:not(.inv-table)').length,
      }));
      const expect = {
        '/': { serviceRows: 19, logos: 16 },
        '/customers/': { logos: 16 },
        '/testing-equipment/': { invRows: 30 },
        '/services/': { svcSections: 15, further: 7, dataTables: 2 },
      }[p] || {};
      const bad = Object.entries(expect).filter(([k, v]) => counts[k] !== v);
      if (Object.keys(expect).length) bad.length ? fail(`${p} content counts ${JSON.stringify(counts)} expected ${JSON.stringify(expect)}`) : ok(`content counts ${JSON.stringify(expect)}`);
    }

    // Repetition guard: no sentence-length paragraph or list item appears twice on one page
    if (vpName === 'desktop') {
      const dupes = await page.$$eval('main p, main li, main td', (els) => {
        const seen = new Map();
        els.filter((e) => !e.querySelector('p, li')).forEach((e) => {
          const t = e.textContent.replace(/\s+/g, ' ').trim();
          if (t.length >= 60) seen.set(t, (seen.get(t) || 0) + 1);
        });
        return [...seen].filter(([, n]) => n > 1).map(([t]) => t.slice(0, 70));
      });
      dupes.length ? fail(`${p} repeats text on the same page: ${dupes.join(' | ')}`) : ok('no repeated paragraphs on the page');
    }

    if (p === '/contact/' && (vpName === 'desktop' || vpName === 'mobile')) {
      const submit = page.locator('form [type=submit]');
      const label = (await submit.innerText()).trim();
      label === 'Send request' && (await submit.isVisible()) ? ok(`submit button reads "Send request" [${vpName}]`) : fail(`submit button label is "${label}"`);
      const helper = (await page.textContent('#f-handoff')) || '';
      helper.includes('Your email application will open with your request ready to send') && (await page.isVisible('#f-handoff'))
        ? ok('email-handoff helper text visible') : fail('email-handoff helper text missing');
      await page.click('form [type=submit]');
      const invalid = await page.$$eval('[aria-invalid=true]', (e) => e.map((x) => x.name));
      invalid.join() === 'name,email,message' ? ok('empty form shows 3 required-field errors') : fail(`form validation flagged: ${invalid}`);
      await page.fill('#f-name', 'QA Tester');
      await page.fill('#f-email', 'not-an-email');
      await page.click('form [type=submit]');
      (await page.getAttribute('#f-email', 'aria-invalid')) === 'true' ? ok('invalid email rejected') : fail('invalid email accepted');
      (await page.inputValue('#f-name')) === 'QA Tester' && (await page.inputValue('#f-email')) === 'not-an-email'
        ? ok('entered values kept after failed validation') : fail('form input lost after failed validation');
      await page.fill('#f-email', 'qa@example.com');
      await page.fill('#f-message', 'Relay testing for a 132 kV substation.');
      await page.click('form [type=submit]');
      const statusText = (await page.textContent('[data-form-status]')) || '';
      const shown = await page.isVisible('[data-form-status]');
      shown && statusText.includes('relay@spsserviceshyd.in') && !/sent|delivered|received/i.test(statusText.replace(/press send/i, ''))
        ? ok('valid form shows hand-off message (no delivery claim)')
        : fail(`unexpected status after valid submit (${statusText})`);
      await page.waitForTimeout(200);
      const m = decodeURIComponent(mailtos[0] || '');
      m.startsWith('mailto:relay@spsserviceshyd.in?subject=Project enquiry') && m.includes('QA Tester') && m.includes('132 kV')
        ? ok('mailto hand-off composed with subject and entered details') : fail(`mailto hand-off not composed (${m || 'none'})`);
      (await page.inputValue('#f-message')).includes('132 kV') ? ok('entered values kept after hand-off') : fail('form cleared after hand-off');
    }

    if (errors.length) fail(`${p} [${vpName}] console/network errors:\n      ${[...new Set(errors)].join('\n      ')}`);
    else ok('no console or network errors');

    if (SHOTS && SHOT_VIEWPORTS.includes(vpName)) await page.screenshot({ path: path.join(shotDir, `${vpName}${p === '/' ? '-home' : p.replace(/\//g, '-').replace(/-$/, '')}.png`), fullPage: true });
    await page.close();
  }
  await ctx.close();
}

// Internal links and anchors
console.log('\n[links]');
const pageFor = (href, from) => {
  const u = new URL(href, BASE + from);
  return { path: u.pathname, hash: u.hash.slice(1), origin: u.origin, protocol: u.protocol };
};
let checked = 0;
for (const item of linksSeen) {
  const [from, href] = JSON.parse(item);
  if (href.startsWith('tel:')) { if (!PHONES.includes(href)) fail(`unexpected tel link ${href} on ${from}`); continue; }
  if (href.startsWith('mailto:')) { if (!EMAILS.some((e) => href.startsWith(e))) fail(`unexpected mailto ${href} on ${from}`); continue; }
  const t = pageFor(href, from);
  if (t.origin !== new URL(BASE).origin) continue;
  checked++;
  if (!anchorsByPage[t.path]) { fail(`link ${href} on ${from} → unknown page ${t.path}`); continue; }
  if (t.hash && t.hash !== 'top' && !anchorsByPage[t.path].includes(t.hash)) fail(`link ${href} on ${from} → missing anchor #${t.hash}`);
}
ok(`${checked} internal link instances checked`);

// Reduced motion: nothing hidden, no transitions running, page still complete
console.log('\n[reduced motion]');
{
  const rctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  for (const p of pages) {
    const rp = await rctx.newPage();
    await rp.goto(BASE + p, { waitUntil: 'networkidle' });
    const r = await rp.evaluate(() => ({
      motionReady: document.documentElement.classList.contains('motion-ready'),
      hidden: [...document.querySelectorAll('.reveal')].filter((e) => getComputedStyle(e).opacity !== '1').length,
      smooth: getComputedStyle(document.documentElement).scrollBehavior,
    }));
    !r.motionReady && !r.hidden && r.smooth === 'auto' ? ok(`${p} static under prefers-reduced-motion`) : fail(`${p} reduced motion: ${JSON.stringify(r)}`);
    await rp.close();
  }
  await rctx.close();
}

// Legacy URLs from the original site
const ctx = await browser.newContext();
for (const legacy of ['/services', '/#customers', '/#contact', '/#services', '/#equipment', '/services#relay', '/services#sas', '/services#rental', '/no-such-page']) {
  const lp = await ctx.newPage();
  const r = await lp.goto(BASE + legacy);
  const hash = legacy.split('#')[1];
  const has = hash ? await lp.$(`#${hash}`) : true;
  const expect404 = legacy === '/no-such-page';
  if ((expect404 ? r.status() === 404 : r.status() === 200) && has) ok(`legacy ${legacy} → ${r.status()}${hash ? ` #${hash} found` : ''}`);
  else fail(`legacy ${legacy} → ${r.status()} anchor ${hash} ${has ? 'found' : 'missing'}`);
  await lp.close();
}
await browser.close();

console.log(`\n${problems.length ? `${problems.length} problem(s) found` : 'All browser QA checks passed'}`);
process.exit(problems.length ? 1 : 0);
