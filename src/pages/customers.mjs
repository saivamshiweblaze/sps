import { sectors } from '../data/site.mjs';
import { customers } from '../data/customers.mjs';
import { page, pageHead, esc, heading, icon } from '../templates/layout.mjs';
import { logoGrid, contactBand } from '../templates/components.mjs';

export default {
  path: '/customers/',
  active: 'customers',
  title: 'Customers | SPS Engineering Solutions, Hyderabad',
  description:
    'Customers of SPS Engineering Solutions across power generation, transmission, distribution and industry — including steel, sugar, cement, refinery and power plants.',
  render() {
    const body = `
${pageHead({
  eyebrow: 'Customers & Experience',
  title: 'Our Customers',
})}

<section class="section section-ivory" aria-labelledby="logos-title">
  <div class="wrap">
    ${heading({ eyebrow: `${customers.length} organisations`, title: 'Organisations we have worked with', id: 'logos-title' })}
    ${logoGrid({ captions: true })}
  </div>
</section>

<section class="section" aria-labelledby="sectors-title">
  <div class="wrap split-2 align-start">
    <div class="reveal">
      ${heading({ eyebrow: 'Sectors', title: 'Industries served by our O&M services', id: 'sectors-title' })}
    </div>
    <div class="reveal">
      <ul class="tag-list" role="list">${sectors.industries.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      <a class="link-arrow" href="/services/#annual-contract">Operation &amp; maintenance contract details ${icon.arrow}</a>
    </div>
  </div>
</section>
${contactBand()}
`;
    return page({ ...this, body });
  },
};
