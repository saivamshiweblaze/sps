import { intro, sectors } from '../data/site.mjs';
import { groups, sections, further } from '../data/services.mjs';
import { page, pageHead, photo, esc, heading, icon } from '../templates/layout.mjs';
import { leadershipCareers, contactBand } from '../templates/components.mjs';

const pad = (n) => String(n).padStart(2, '0');

// Scope facts quoted from the original Services page.
const scope = [
  ['Voltage range', 'Control & relay panels, HT/LT switchgear, substation equipment and SAS products from 400 V to 765 kV'],
  ['Substations', 'Primary and secondary equipment in AIS & GIS substations up to 765 kV'],
  ['SAS voltage levels', '11 kV, 33 kV, 132 kV, 220 kV, 440 kV, 765 kV'],
  ['Communication protocols', 'IEC 61850 Ed1 & Ed2, DNP3.0, MODBUS, IEC 101, 103, 104 & Courier'],
  ['Relay makes', 'ABB/Hitachi, GE/Alstom, SIEMENS, Schneider Electric, SEL, NR Electric, Toshiba, L&T, Easun Reyrolle, Ashida, Avana, JVS, Megawin & every make'],
  ['Engineering software', 'ETAP (E-TAP) for relay coordination, load flow and power system analysis studies; Electrical CAD for scheme drawings'],
];

export default {
  path: '/about/',
  active: 'about',
  title: 'About | SPS Engineering Solutions, Hyderabad',
  description:
    'SPS Engineering Solutions, Hyderabad — mission, vision and leadership. We electrify, automate and digitalize the world around us, with a steadfast focus on safety.',
  render() {
    const body = `
${pageHead({
  eyebrow: 'About SPS Engineering Solutions',
  title: intro.heading,
  lead: 'Protection relay testing, substation automation, equipment testing and engineering for power generation, transmission, distribution and industry, from Hyderabad.',
  image: 'photography/aerial-breaker-bay',
  imageAlt: 'Aerial view of a high-voltage circuit-breaker bay in a substation',
})}

<section class="section section-ivory" aria-labelledby="purpose-title">
  <div class="wrap purpose">
    <div class="purpose-aside">
      ${heading({ eyebrow: 'Purpose', title: 'Mission, vision and direction', id: 'purpose-title' })}
      ${photo('photo/panel-technician', { alt: 'Technician working on an electrical distribution panel with a tablet', sizes: '(min-width: 1000px) 34vw, 100vw', cls: 'purpose-figure' })}
    </div>
    <ol class="statement-rows" role="list">
      ${intro.statements
        .map(
          (s, i) => `<li class="srow reveal" id="${s.id}">
        <p class="srow-n" aria-hidden="true">${pad(i + 1)}</p>
        <h3>${esc(s.title)}</h3>
        <p class="srow-text">${esc(s.text)}</p>
      </li>`,
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section section-white" aria-labelledby="scope-title">
  <div class="wrap scope">
    <div class="scope-text reveal">
      ${heading({ eyebrow: 'Who we work with', title: 'Sectors we serve', id: 'scope-title' })}
      <p class="lead">${esc(sectors.served)}</p>
      <p>Our Operation and Maintenance services cover industries including:</p>
      <ul class="tag-list" role="list">${sectors.industries.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      <a class="link-arrow" href="/customers/">See our customers ${icon.arrow}</a>
      ${photo('photography/relay-panels', { alt: 'Control and relay panels with meters and annunciator windows at an industrial plant', sizes: '(min-width: 1000px) 40vw, 100vw', cls: 'scope-figure' })}
    </div>
    <div class="scope-facts reveal">
      <h3 class="facts-title">Technical capability at a glance</h3>
      <dl class="fact-list">
        ${scope.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
      </dl>
    </div>
  </div>
</section>

<section class="section section-stone" aria-labelledby="areas-title">
  <div class="wrap">
    <div class="split-head">
      ${heading({ eyebrow: 'What we do', title: 'Service areas', id: 'areas-title' })}
      <a class="btn btn-outline" href="/services/">All services ${icon.arrow}</a>
    </div>
    <div class="areas">
      ${groups
        .map((g, gi) => {
          const links = g.id === 'further' ? further.map((f) => ({ id: f.id, nav: f.title })) : sections.filter((s) => s.group === g.id);
          return `<div class="area reveal"><p class="area-n" aria-hidden="true">${pad(gi + 1)}</p><h3>${esc(g.title)}</h3><ul role="list">${links.map((s) => `<li><a href="/services/#${s.id}">${esc(s.nav)}${icon.arrow}</a></li>`).join('')}</ul></div>`;
        })
        .join('')}
    </div>
  </div>
</section>

${leadershipCareers({ careers: false })}
${contactBand()}
`;
    return page({ ...this, body, ogImage: 'photo/panel-technician' });
  },
};
