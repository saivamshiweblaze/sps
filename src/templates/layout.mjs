import { readFileSync } from 'node:fs';
import { company, nav, SITE_URL } from '../data/site.mjs';

const manifest = JSON.parse(readFileSync(new URL('../../public/assets/img/images.json', import.meta.url), 'utf8'));
// Licence + attribution for third-party photography (written by tools/fetch-photography.py).
const credits = JSON.parse(readFileSync(new URL('../../source-photography/credits.json', import.meta.url), 'utf8'));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const IMG = '/assets/img/';

/**
 * <picture> for an optimised image from public/assets/img/images.json.
 * opts: alt, sizes, cls, eager (hero), priority, style
 */
export function img(key, { alt = '', sizes = '100vw', cls = '', eager = false, style = '' } = {}) {
  const m = manifest[key];
  if (!m) throw new Error(`Unknown image key: ${key}`);
  const w = m.widths[m.widths.length - 1];
  const h = Math.round((m.height * w) / m.width);
  const srcset = m.widths.map((x) => `${IMG}${key}-${x}.webp ${x}w`).join(', ');
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<picture><source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img src="${IMG}${m.fallback}" width="${w}" height="${h}" alt="${esc(alt)}" ${loading} decoding="async"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}></picture>`;
}

export const imgSize = (key) => manifest[key];

/**
 * Visible attribution for third-party photography. Every such photo is labelled
 * "Illustrative photo" so it is never read as SPS staff, sites or projects.
 * Returns '' for original SPS assets.
 */
export function credit(key, { cls = '' } = {}) {
  const c = credits[key.replace(/^photography\//, '')];
  if (!c) return '';
  const lic = c.licenseUrl ? `<a href="${esc(c.licenseUrl)}" rel="license noopener">${esc(c.license)}</a>` : esc(c.license);
  return `<small class="credit${cls ? ` ${cls}` : ''}">Illustrative photo · <a href="${esc(c.sourcePage)}" rel="noopener">${esc(c.author)}</a> / Wikimedia Commons · ${lic}</small>`;
}

/** <figure> wrapper for photographs: image + credit line when the photo is third-party. */
export function photo(key, { alt = '', sizes = '100vw', cls = '', eager = false, caption = '' } = {}) {
  const cr = credit(key);
  const cap = caption || cr ? `<figcaption>${caption ? `<span>${esc(caption)}</span>` : ''}${cr}</figcaption>` : '';
  return `<figure class="ph${cls ? ` ${cls}` : ''}"><div class="ph-frame">${img(key, { alt, sizes, eager })}</div>${cap}</figure>`;
}

export const icon = {
  arrow: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  phone: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M6.6 2.8 8.2 6c.2.4.1.9-.2 1.2L6.8 8.4a9.6 9.6 0 0 0 4.8 4.8l1.2-1.2c.3-.3.8-.4 1.2-.2l3.2 1.6c.4.2.6.7.5 1.2l-.5 2.1c-.1.5-.6.8-1.1.8C8.8 17.2 2.8 11.2 2.5 3.9c0-.5.3-1 .8-1.1l2.1-.5c.5-.1 1 .1 1.2.5Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  mail: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m3 5.5 7 5.5 7-5.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  pin: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 17.5s5.5-5 5.5-9.5a5.5 5.5 0 0 0-11 0c0 4.5 5.5 9.5 5.5 9.5Z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  bolt: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M11.5 2 4.5 11h5l-1 7 7-9h-5l1-7Z" fill="currentColor"/></svg>',
};

/** Section heading block: small indexed eyebrow + heading + optional lead. */
export function heading({ eyebrow, title, lead, level = 2, id, cls = '' }) {
  return `<header class="sec-head ${cls}">
    ${eyebrow ? `<p class="eyebrow"><span class="rule" aria-hidden="true"></span>${esc(eyebrow)}</p>` : ''}
    <h${level} class="sec-title"${id ? ` id="${id}"` : ''}>${esc(title)}</h${level}>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </header>`;
}

function header(active) {
  const links = nav
    .map((l) => `<li><a href="${l.href}"${l.key === active ? ' aria-current="page"' : ''}>${esc(l.label)}</a></li>`)
    .join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="${esc(company.name)} — home">
      <img src="/assets/img/brand/sps-logo.png" width="248" height="94" alt="${esc(company.name)}">
    </a>
    <nav class="primary-nav" aria-label="Primary">
      <ul id="nav-list" class="nav-list" data-nav>${links}
        <li class="nav-cta-mobile"><a class="btn btn-solid" href="/contact/#enquiry">Discuss a Project ${icon.arrow}</a></li>
      </ul>
    </nav>
    <a class="btn btn-solid btn-sm header-cta" href="/contact/#enquiry">Discuss a Project ${icon.arrow}</a>
    <button class="nav-toggle" type="button" aria-controls="nav-list" aria-expanded="false" data-nav-toggle>
      <span class="sr-only">Menu</span><span class="bars" aria-hidden="true"></span>
    </button>
  </div>
</header>`;
}

function footer() {
  const navLinks = nav.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="footer-logo" href="/"><img src="/assets/img/brand/sps-logo.png" width="248" height="94" alt="${esc(company.name)}" loading="lazy"></a>
      <p>We electrify, automate and digitalize the world around us.</p>
    </div>
    <nav class="footer-col" aria-label="Footer">
      <h2 class="footer-h">Company</h2>
      <ul>${navLinks}<li><a href="/contact/#careers">Careers</a></li></ul>
    </nav>
    <div class="footer-col">
      <h2 class="footer-h">Services</h2>
      <ul>
        <li><a href="/services/#relay">Protection relay testing</a></li>
        <li><a href="/services/#retrofit">Relay retrofitting</a></li>
        <li><a href="/services/#sas">Substation automation</a></li>
        <li><a href="/services/#substation">Substation equipment testing</a></li>
        <li><a href="/services/#annual-contract">Operation &amp; maintenance</a></li>
        <li><a href="/services/#substation-activity">Substation engineering</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h2 class="footer-h">Contact</h2>
      <ul class="footer-contact">
        <li>${icon.pin}<span>${esc(company.location)}</span></li>
        ${company.phones.map((p) => `<li>${icon.phone}<a href="${p.href}">${p.display}</a></li>`).join('')}
        ${company.emails.map((e) => `<li>${icon.mail}<a href="${e.href}">${e.display}</a></li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>${esc(company.copyright)}</p>
    <p><a href="#top" class="to-top">Back to top</a></p>
  </div>
</footer>`;
}

function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/img/brand/sps-logo.png`,
    email: company.emails.map((e) => e.display),
    telephone: company.phones.map((p) => p.display.replace(/\s/g, '')),
    address: { '@type': 'PostalAddress', addressLocality: company.locality, addressCountry: company.country },
    employee: { '@type': 'Person', name: 'Venu Gopal Chitla', jobTitle: 'Managing Director' },
  };
}

/** Full HTML document. */
export function page({ path, title, description, active, body, ogImage = 'photo/substation-yard' }) {
  const canonical = `${SITE_URL}${path}`;
  const og = imgSize(ogImage);
  const ogUrl = `${SITE_URL}/assets/img/${og.fallback}`;
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#20292B">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(company.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogUrl}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/brand/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/assets/img/brand/sps-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/css/main.css">
<script type="application/ld+json">${JSON.stringify(structuredData())}</script>
<script>document.documentElement.classList.add('js')</script>
</head>
<body id="top" data-page="${active}">
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

/** Inner-page masthead. */
export function pageHead({ eyebrow, title, lead, image, imageAlt = '', meta = '', position = '' }) {
  return `<section class="page-head${image ? ' has-image' : ''}">
  <div class="wrap page-head-inner">
    <div class="page-head-text">
      <p class="eyebrow eyebrow-light"><span class="rule" aria-hidden="true"></span>${esc(eyebrow)}</p>
      <h1>${esc(title)}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
      ${meta}
    </div>
  </div>
  ${image ? `<div class="page-head-media"${position ? ` style="--pos:${position}"` : ''}>${img(image, { alt: imageAlt, eager: true, sizes: '(min-width: 900px) 48vw, 100vw' })}${credit(image, { cls: 'credit-overlay' })}</div>` : ''}
</section>`;
}
