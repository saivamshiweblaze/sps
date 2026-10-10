import { groups, sections, further } from '../data/services.mjs';
import { page, pageHead, img, photo, esc, icon } from '../templates/layout.mjs';
import { contactBand } from '../templates/components.mjs';

const pad = (n) => String(n).padStart(2, '0');
const linksFor = (g) => (g.id === 'further' ? further.map((f) => ({ id: f.id, nav: f.title })) : sections.filter((s) => s.group === g.id));

function toc() {
  const byGroup = groups.map(
    (g, gi) => `<li class="toc-g"><p class="toc-group"><span aria-hidden="true">${pad(gi + 1)}</span>${esc(g.title)}</p><ul role="list">${linksFor(g)
      .map((s) => `<li><a href="#${s.id}">${esc(s.nav)}</a></li>`)
      .join('')}</ul></li>`,
  );
  return `<nav class="toc" aria-label="Services on this page">
    <details class="toc-details" open data-toc-details>
      <summary><span>Jump to a service</span><span class="toc-current" data-toc-current></span></summary>
      <ol class="toc-list" role="list">${byGroup.join('')}</ol>
    </details>
  </nav>`;
}

function table(t) {
  return `<div class="table-wrap" role="region" aria-label="${esc(t.caption)}" tabindex="0">
    <table class="data-table">
      <caption class="sr-only">${esc(t.caption)}</caption>
      <thead><tr>${t.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${t.rows.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td data-label="${esc(t.head[1])}">${esc(b)}</td></tr>`).join('')}</tbody>
    </table>
  </div>`;
}

// Opening band for each service group: number, title, service count, optional photograph.
// (The section links live in the TOC, so they are not repeated here.)
function groupHead(g, gi) {
  const links = linksFor(g);
  return `<header class="grp reveal${g.image ? ' has-image' : ''}" id="group-${g.id}">
    <div class="grp-text">
      <p class="grp-n">Service group ${pad(gi + 1)} <span>/ ${pad(groups.length)}</span></p>
      <h2 class="grp-title">${esc(g.title)}</h2>
      <p class="grp-count">${links.length} ${links.length === 1 ? 'service' : 'services'}</p>
    </div>
    ${g.image ? photo(g.image, { alt: g.imageAlt, sizes: '(min-width: 1000px) 40vw, 100vw', cls: 'grp-photo' }) : ''}
  </header>`;
}

function section(s, index) {
  const group = groups.find((g) => g.id === s.group);
  const media = s.images
    ? `<div class="svc-media${s.images.length > 1 ? ' stack' : ''}">${s.images
        .map((im) => `<figure class="svc-figure${im.contain ? ' contain' : ''}${im.natural ? ' natural' : ''}">${img(im.key, { alt: im.alt, sizes: '(min-width: 1000px) 28vw, 100vw' })}</figure>`)
        .join('')}</div>`
    : '';
  const list = s.items
    ? `<ul class="svc-list${s.columns ? ' cols' : ''}" role="list">${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
    : '';
  const audience = s.audience
    ? `<div class="svc-audience"><h4>${esc(s.audience.title)}</h4><ul role="list">${s.audience.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`
    : '';
  const gallery = s.gallery
    ? `<ul class="kit-gallery" role="list">${s.gallery.map((g) => `<li>${img(g.key, { alt: g.alt, sizes: '(min-width: 1000px) 18vw, 45vw' })}</li>`).join('')}</ul>`
    : '';
  return `<section class="svc reveal" id="${s.id}" aria-labelledby="${s.id}-title">
    <div class="svc-head">
      <span class="svc-n" aria-hidden="true">${pad(index + 1)}</span>
      <div>
        <p class="svc-kicker">${esc(s.eyebrow || group.title)}</p>
        <h3 class="svc-title" id="${s.id}-title">${esc(s.title)}</h3>
      </div>
    </div>
    <div class="svc-body${media ? ' has-media' : ''}">
      ${media}
      <div class="svc-text">${list}${s.table ? table(s.table) : ''}${audience}</div>
    </div>
    ${gallery}
  </section>`;
}

export default {
  path: '/services/',
  active: 'services',
  title: 'Services | Relay Testing, SAS, Substation Testing & Engineering | SPS Engineering Solutions',
  description:
    'Protection relay testing and commissioning, relay retrofitting, substation automation (SAS), substation equipment testing, O&M contracts, substation engineering, meter calibration, thermography, training and test-kit rental.',
  render() {
    let n = 0;
    const main = groups
      .map((g, gi) => {
        if (g.id === 'further') {
          return `${groupHead(g, gi)}
    <section class="svc svc-further reveal" id="further" aria-labelledby="further-title">
      <h3 class="sr-only" id="further-title">Further services we offer</h3>
      <ul class="further-list" role="list">
        ${further
          .map(
            (f) => `<li id="${f.id}" class="further-item">
          <span class="svc-n" aria-hidden="true">${pad(++n)}</span>
          <div><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p>${f.related ? `<a class="link-arrow" href="${f.related.href}">Related: ${esc(f.related.label)} ${icon.arrow}</a>` : ''}</div>
        </li>`,
          )
          .join('')}
      </ul>
    </section>`;
        }
        return `${groupHead(g, gi)}${sections
          .filter((s) => s.group === g.id)
          .map((s) => section(s, n++))
          .join('')}`;
      })
      .join('');

    const body = `
${pageHead({
  eyebrow: 'Services',
  title: 'Protection, testing, automation and engineering',
  lead: 'Complete technical scope of SPS Engineering Solutions — relay testing and retrofitting, substation automation, substation equipment, O&amp;M contracts, engineering, calibration, thermography, training and rental.',
  image: 'photography/switchyard-gantries',
  imageAlt: 'High-voltage switchyard with lattice gantries against a blue sky',
})}
<div class="wrap svc-layout">
  <aside class="svc-aside">${toc()}</aside>
  <div class="svc-main">
    ${main}
  </div>
</div>
${contactBand({ heading: 'Need testing, commissioning or engineering support?' })}
`;
    return page({ ...this, body, ogImage: 'services/relay-commissioning' });
  },
};
