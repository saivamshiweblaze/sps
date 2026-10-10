import { hero, intro } from '../data/site.mjs';
import { featured, overview, overviewGroups } from '../data/services.mjs';
import { categories, photos, heading as equipmentHeading } from '../data/equipment.mjs';
import { page, img, photo, credit, esc, heading, icon } from '../templates/layout.mjs';
import { logoGrid, leadershipCareers, contactBand } from '../templates/components.mjs';

const total = categories.reduce((n, c) => n + c.items.length, 0);

// Facts stated on the original Services page, shown as a static reference band.
const specStrip = [
  ['Control & relay panels', '400 V to 765 kV'],
  ['AIS & GIS substations', 'Up to 765 kV'],
  ['Protocols', 'IEC 61850 Ed1 & Ed2, DNP3.0, MODBUS, IEC 101/103/104'],
  ['Calibrated primary test equipment', `${total} instruments`],
];

// Home shows the opening sentence of each statement; About carries the full text.
const firstSentence = (t) => t.slice(0, t.indexOf('. ') + 1) || t;
const pad = (n) => String(n).padStart(2, '0');
// True when the original sentence only restates the short title (e.g. "Thermography.")
const letters = (s) => s.toLowerCase().replace(/[^a-z]/g, '');
const same = (a, b) => letters(a) === letters(b);
// True when a featured card above already shows this sentence (or starts with it)
const shownAbove = (text) => featured.some((f) => letters(f.summary).startsWith(letters(text)));

function serviceGroups() {
  let k = 0;
  return overviewGroups
    .map((g, gi) => {
      const rows = [
        ...g.lines.map((n) => overview.find((o) => o.n === n)),
        ...(g.extra || []),
      ];
      return `<section class="sg reveal" aria-labelledby="sg-${g.id}">
      <header class="sg-head">
        <p class="sg-index" aria-hidden="true">${pad(gi + 1)}</p>
        <h3 id="sg-${g.id}">${esc(g.title)}</h3>
        <p class="sg-count">${rows.length} ${rows.length === 1 ? 'service' : 'services'}</p>
      </header>
      <ol class="sg-list" role="list">
        ${rows
          .map(
            (s) => `<li><a class="sg-item" href="${s.href}">
          <span class="sg-n" aria-hidden="true">${pad(++k)}</span>
          <span class="sg-body"><span class="sg-title">${esc(s.title)}</span>${same(s.title, s.text) || shownAbove(s.text) ? '' : `<span class="sg-text">${esc(s.text)}</span>`}</span>
          ${icon.arrow}
        </a></li>`,
          )
          .join('')}
      </ol>
    </section>`;
    })
    .join('');
}

export default {
  path: '/',
  active: 'home',
  title: 'SPS Engineering Solutions | Protection Relay Testing, Substation Automation & Engineering, Hyderabad',
  description:
    'SPS Engineering Solutions, Hyderabad: testing and commissioning of numerical protection relays, substation automation (SAS), substation equipment testing, O&M contracts and electrical substation engineering up to 765 kV.',
  render() {
    const body = `
<section class="hero" id="home" aria-labelledby="hero-title">
  <div class="hero-media">${img('photo/substation-yard', { alt: '', eager: true, sizes: '100vw' })}</div>
  <div class="wrap hero-inner">
    <p class="eyebrow eyebrow-light"><span class="rule" aria-hidden="true"></span>Protection · Testing · Automation · Engineering</p>
    <h1 id="hero-title" class="hero-title">${hero.titleLines.map((l) => `<span>${esc(l)}</span>`).join(' ')}</h1>
    <p class="hero-lead">${esc(hero.lead)} <em>${esc(hero.quote)}</em> ${esc(hero.tail)}.</p>
    <div class="btn-row">
      <a class="btn btn-light btn-lg" href="/services/">Explore Our Services ${icon.arrow}</a>
      <a class="btn btn-ghost btn-lg" href="/contact/">Contact Our Team</a>
    </div>
  </div>
  <div class="hero-strip">
    <dl class="wrap spec-strip">
      ${specStrip.map(([k, v], i) => `<div><dt><span class="spec-i" aria-hidden="true">${pad(i + 1)}</span>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section section-ivory" id="about" aria-labelledby="intro-title">
  <div class="wrap intro-grid">
    <div class="intro-lead reveal">
      ${heading({ eyebrow: 'Who we are', title: 'About SPS Engineering Solutions', id: 'intro-title', cls: 'sec-head-xl' })}
      ${photo('photo/panel-technician', { alt: 'Technician working on an electrical distribution panel with a tablet', sizes: '(min-width: 1000px) 40vw, 100vw', cls: 'intro-figure' })}
    </div>
    <ol class="statements" role="list">
      ${intro.statements
        .filter((s) => s.id !== 'leading')
        .map(
          (s, i) => `<li class="statement reveal" id="${s.id}">
        <span class="statement-n" aria-hidden="true">${pad(i + 1)}</span>
        <div><h3>${esc(s.title)}</h3><p>${esc(firstSentence(s.text))}</p></div>
      </li>`,
        )
        .join('')}
      <li class="statement-more reveal"><a class="link-arrow" href="/about/">Mission, vision and leadership ${icon.arrow}</a></li>
    </ol>
  </div>
</section>

<section class="section section-slate" id="top-services" aria-labelledby="top-services-title">
  <div class="wrap">
    <div class="split-head">
      ${heading({ eyebrow: 'Core capability', title: 'Our Top Services', id: 'top-services-title', cls: 'on-dark' })}
      <a class="link-arrow" href="/services/">All services ${icon.arrow}</a>
    </div>
    <div class="featured">
      ${featured
        .map(
          (f, i) => `<article class="feat reveal">
        <a class="feat-link" href="${f.href}" aria-labelledby="feat-${i}">
          <div class="feat-media">${img(f.image, { alt: f.imageAlt, sizes: '(min-width: 900px) 30vw, 100vw' })}</div>
          <div class="feat-body">
            <img class="feat-icon" src="/assets/img/${f.icon}-160.webp" width="56" height="56" alt="" loading="lazy">
            <p class="feat-n" aria-hidden="true">${pad(i + 1)}</p>
            <h3 id="feat-${i}">${esc(f.title)}</h3>
            <p>${esc(f.summary)}</p>
            <span class="feat-cta">View technical details ${icon.arrow}</span>
          </div>
        </a>
        ${credit(f.image, { cls: 'credit-overlay' })}
      </article>`,
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section" id="services" aria-labelledby="services-title">
  <div class="wrap">
    <div class="services-top">
      ${heading({
        eyebrow: 'Complete service range',
        title: 'Services We Offer',
        id: 'services-title',
        lead: 'Every service line, grouped by discipline. Select any service to open its full technical detail on the Services page.',
      })}
    </div>
    <div class="service-groups">${serviceGroups()}</div>
  </div>
</section>

<section class="section section-stone" id="equipment" aria-labelledby="equipment-title">
  <div class="wrap">
    <div class="split-head">
      ${heading({ eyebrow: 'Testing equipment', title: equipmentHeading, id: 'equipment-title', lead: `${total} calibrated primary test instruments, grouped by test area.` })}
      <a class="btn btn-outline" href="/testing-equipment/">Full equipment inventory ${icon.arrow}</a>
    </div>
    <div class="equip-home">
      <div class="equip-home-photos reveal">
        ${photo(photos[1].key, { alt: photos[1].alt, sizes: '(min-width: 1000px) 40vw, 100vw', cls: 'eh-main' })}
        <figure class="eh-cut"><div class="eh-cut-img">${img(photos[0].key, { alt: photos[0].alt, sizes: '160px' })}</div><figcaption>${esc(photos[0].caption)}</figcaption></figure>
      </div>
      <ul class="equip-cats" role="list">
        ${categories
          .map(
            (c) => `<li class="equip-cat reveal">
          <a href="/testing-equipment/#${c.id}">
            <span class="ec-body"><span class="ec-title">${esc(c.title)} <span class="ec-count">${c.items.length} instruments</span></span><span class="ec-items">${c.items.map((i) => esc(i.name)).join(' · ')}</span></span>
            ${icon.arrow}
          </a>
        </li>`,
          )
          .join('')}
      </ul>
    </div>
  </div>
</section>

<section class="section section-ivory" id="customers" aria-labelledby="customers-title">
  <div class="wrap">
    <div class="split-head">
      ${heading({ eyebrow: 'Experience', title: 'Our Customers', id: 'customers-title' })}
      <a class="btn btn-outline" href="/customers/">Customers &amp; sectors ${icon.arrow}</a>
    </div>
    ${logoGrid()}
  </div>
</section>

${leadershipCareers()}
${contactBand()}
`;
    return page({ ...this, body });
  },
};
