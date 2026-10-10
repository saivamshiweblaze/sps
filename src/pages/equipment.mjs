import { categories, photos, heading as equipmentHeading } from '../data/equipment.mjs';
import { sections } from '../data/services.mjs';
import { page, pageHead, img, esc, heading, icon } from '../templates/layout.mjs';
import { contactBand } from '../templates/components.mjs';

const relayKits = sections.find((s) => s.id === 'relay-test-kits');
const rental = sections.find((s) => s.id === 'rental');
const pad = (n) => String(n).padStart(2, '0');

export default {
  path: '/testing-equipment/',
  active: 'equipment',
  title: 'Calibrated Testing Equipment | SPS Engineering Solutions, Hyderabad',
  description:
    'Calibrated primary testing equipment held by SPS Engineering Solutions: tan delta, circuit breaker analysers, Hi-Pot, SFRA, CPC 100, winding resistance, micro ohm meters, relay test kits and more.',
  render() {
    const total = categories.reduce((n, c) => n + c.items.length, 0);
    const body = `
${pageHead({
  eyebrow: 'Testing Equipment',
  title: equipmentHeading,
  lead: 'Calibrated primary test instruments, relay test kits and rental kits, grouped by test area.',
  image: 'equipment/eq-3',
  imageAlt: 'Test panel with meters, selector switches and a wiring diagram inside the door',
})}

<nav class="cat-bar" aria-label="Equipment categories" data-cat-bar>
  <div class="wrap">
    <ul class="cat-nav" role="list">
      ${categories.map((c) => `<li><a href="#${c.id}"><span class="cat-count" aria-label="${c.items.length} instruments">${c.items.length}</span><span class="cat-name">${esc(c.title)}</span></a></li>`).join('')}
    </ul>
  </div>
</nav>

<section class="section inv-section" aria-labelledby="inventory-title">
  <div class="wrap">
    ${heading({ eyebrow: 'Inventory', title: 'Primary testing equipment', id: 'inventory-title', lead: `${total} instruments in ${categories.length} test areas. Item numbers, ratings, ranges and makes follow the original SPS equipment list.` })}
    <div class="inventory">
      ${categories
        .map(
          (c, ci) => `<section class="inv-group reveal" id="${c.id}" aria-labelledby="${c.id}-title">
        <header class="inv-head">
          <span class="inv-i" aria-hidden="true">${pad(ci + 1)}</span>
          <h3 id="${c.id}-title">${esc(c.title)}</h3>
          <p class="inv-count">${c.items.length} instruments</p>
        </header>
        <div class="table-wrap" role="region" aria-label="${esc(c.title)}" tabindex="0">
          <table class="data-table inv-table">
            <thead><tr><th scope="col">No.</th><th scope="col">Equipment</th><th scope="col">Rating, range or make</th></tr></thead>
            <tbody>${c.items
              .map(
                (i) => `<tr><td class="inv-no">${pad(i.n)}</td><th scope="row">${esc(i.name)}</th><td class="inv-spec" data-label="Rating, range or make">${i.spec ? esc(i.spec) : '<span class="inv-none">Not specified</span>'}</td></tr>`,
              )
              .join('')}</tbody>
          </table>
        </div>
      </section>`,
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section-stone" aria-labelledby="photos-title">
  <div class="wrap">
    ${heading({ eyebrow: 'Equipment photographs', title: 'From our equipment gallery', id: 'photos-title' })}
    <div class="equip-photos">
      ${photos.map((p) => `<figure class="equip-photo reveal">${img(p.key, { alt: p.alt, sizes: '(min-width: 900px) 30vw, 45vw' })}${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}</figure>`).join('')}
    </div>
  </div>
</section>

<section class="section section-white" id="relay-test-kits" aria-labelledby="relay-kits-title">
  <div class="wrap split-2 align-start">
    <div class="reveal">
      ${heading({ eyebrow: 'Protection relay testing', title: 'Calibrated relay test kits', id: 'relay-kits-title', cls: 'sec-head-md' })}
      <ul class="svc-list" role="list">${relayKits.items.slice(0, 2).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      <a class="link-arrow" href="/services/#relay-test-kits">Full relay test kit details ${icon.arrow}</a>
    </div>
    <figure class="svc-figure contain reveal">${img('gallery/kit-01', { alt: 'OMICRON CMC 356 three-phase relay test set', sizes: '(min-width: 900px) 45vw, 100vw' })}</figure>
  </div>
</section>

<section class="section section-ivory" id="rental" aria-labelledby="rental-title">
  <div class="wrap split-2">
    <figure class="svc-figure contain reveal">${img('services/test-set-rental', { alt: 'Three-phase relay test set', sizes: '(min-width: 900px) 45vw, 100vw' })}</figure>
    <div class="reveal">
      ${heading({ eyebrow: 'Rental', title: rental.title, id: 'rental-title', cls: 'sec-head-md' })}
      <p class="lead">${esc(rental.items[0])}</p>
      <a class="btn btn-solid" href="/contact/?service=rental#enquiry">Enquire about rental ${icon.arrow}</a>
    </div>
  </div>
</section>
${contactBand()}
`;
    return page({ ...this, body, ogImage: 'equipment/eq-3' });
  },
};
