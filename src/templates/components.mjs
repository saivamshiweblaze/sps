import { company, leadership, careers, sectors } from '../data/site.mjs';
import { customers } from '../data/customers.mjs';
import { esc, img, imgSize, icon, credit } from './layout.mjs';

// Logos are sized by visual area rather than height, so wide wordmarks and
// compact marks read at a similar weight. Proportions are never altered.
const LOGO_AREA = 7600; // px² at desktop
const WIDE = 8; // aspect ratio above which a logo spans two cells (as in the original layout)

function logoWidth(ratio) {
  return Math.round(Math.sqrt(LOGO_AREA / ratio) * ratio);
}

export function logoGrid({ captions = false } = {}) {
  const cells = customers.map((c) => {
    let ratio;
    let media;
    if (c.svg) {
      ratio = c.ratio;
      const w = Math.round(logoWidth(ratio) * (c.scale || 1));
      media = `<img src="/assets/img/${c.svg}" alt="${esc(c.name)}" width="${w}" height="${Math.round(w / ratio)}" loading="lazy" style="--w:${w}px">`;
    } else {
      const m = imgSize(c.key);
      ratio = m.width / m.height;
      const w = Math.round(logoWidth(ratio) * (c.scale || 1));
      media = img(c.key, { alt: c.name, sizes: `${w}px`, style: `--w:${w}px` });
    }
    const wide = ratio > WIDE ? ' wide' : '';
    return `<li class="logo-cell${wide}">${media}${captions ? `<span class="logo-name">${esc(c.name)}</span>` : ''}</li>`;
  });
  // Closing cell fills whatever remains of the last row at any column count.
  // Grid units used by the logos (wide logos take two) decide how many columns
  // the closing cell must span at each breakpoint (4, 3 and 2 columns).
  const units = cells.reduce((n, c) => n + (c.includes('logo-cell wide') ? 2 : 1), 0);
  const span = (cols) => (units % cols ? cols - (units % cols) : cols);
  // Closing cell carries the sectors sentence (Home links on to the Customers page).
  cells.push(`<li class="logo-end" style="--span4:${span(4)};--span3:${span(3)};--span2:${span(2)}"><p>${esc(sectors.served)}</p></li>`);
  return `<ul class="logo-grid${captions ? ' with-captions' : ''}" role="list">${cells.join('')}</ul>`;
}

export function leadershipCareers({ careers: showCareers = true } = {}) {
  return `<section class="section section-white" id="leadership" aria-labelledby="leadership-title">
  <div class="wrap people${showCareers ? '' : ' people-solo'}">
    <div class="leader reveal">
      <p class="eyebrow"><span class="rule" aria-hidden="true"></span>Leadership</p>
      <h2 class="sr-only" id="leadership-title">Leadership</h2>
      <p class="leader-name">${esc(leadership.name)}</p>
      <p class="leader-role">${esc(leadership.role)}</p>
      <ul class="leader-facts" role="list">${leadership.lines.map((l) => `<li>${icon.bolt}<span>${esc(l)}</span></li>`).join('')}</ul>
    </div>
    ${showCareers ? `<div class="careers reveal" id="careers">
      <p class="eyebrow"><span class="rule" aria-hidden="true"></span>${esc(careers.heading)}</p>
      <h2 class="h3">Join our dynamic team</h2>
      <p>${esc(careers.text)}</p>
      <div class="careers-actions">
        <a class="btn btn-solid" href="mailto:${careers.email}?subject=${encodeURIComponent('CV submission')}">${icon.mail}${esc(careers.cta)}</a>
        <p class="careers-mail"><span>CVs to</span> <a href="mailto:${careers.email}">${careers.email}</a></p>
      </div>
    </div>` : ''}
  </div>
</section>`;
}

export function contactBand({ heading = 'Discuss a project with our team' } = {}) {
  return `<section class="section section-dark contact-band" id="contact" aria-labelledby="contact-band-title">
  <div class="contact-band-media" aria-hidden="true">${img('photography/transmission-sunset', { alt: '', sizes: '100vw' })}</div>
  <div class="wrap contact-band-grid">
    <div class="reveal">
      <p class="eyebrow eyebrow-light"><span class="rule" aria-hidden="true"></span>Contact</p>
      <h2 id="contact-band-title" class="sec-title">${esc(heading)}</h2>
      <p class="contact-loc">${icon.pin} ${esc(company.location)}</p>
      <a class="btn btn-light btn-lg" href="/contact/#enquiry">Send an enquiry ${icon.arrow}</a>
    </div>
    <ul class="contact-lines reveal" role="list">
      ${company.phones.map((p) => `<li><span class="contact-label">${icon.phone}Phone</span><a href="${p.href}">${p.display}</a></li>`).join('')}
      ${company.emails.map((e) => `<li><span class="contact-label">${icon.mail}Email</span><a href="${e.href}">${e.display}</a></li>`).join('')}
    </ul>
  </div>
  <div class="wrap contact-band-credit">${credit('photography/transmission-sunset', { cls: 'credit-dark' })}</div>
</section>`;
}
