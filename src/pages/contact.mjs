import { company, careers, leadership } from '../data/site.mjs';
import { groups } from '../data/services.mjs';
import { page, pageHead, esc, heading, icon } from '../templates/layout.mjs';

const serviceOptions = [
  ...groups.filter((g) => g.id !== 'further').map((g) => ({ value: g.id, label: g.title })),
  { value: 'rental', label: 'Test kit rental' },
  { value: 'further', label: 'Other / further services' },
];

export default {
  path: '/contact/',
  active: 'contact',
  title: 'Contact | SPS Engineering Solutions, Hyderabad',
  description: `Contact SPS Engineering Solutions, Hyderabad. Phone ${company.phones.map((p) => p.display).join(', ')}. Email ${company.emails[0].display}.`,
  render() {
    const body = `
${pageHead({
  eyebrow: 'Contact',
  title: 'Discuss a project',
  lead: 'Call, email or send an enquiry about testing, commissioning, automation, engineering or maintenance.',
})}

<section class="section section-ivory">
  <div class="wrap contact-grid">
    <div class="contact-details reveal">
      ${heading({ eyebrow: 'Reach us directly', title: company.name, level: 2 })}
      <dl class="contact-dl">
        <div><dt>${icon.pin} Location</dt><dd>${esc(company.location)}</dd></div>
        <div><dt>${icon.phone} Phone</dt><dd>${company.phones.map((p) => `<a href="${p.href}">${p.display}</a>`).join('<br>')}</dd></div>
        <div><dt>${icon.mail} Email</dt><dd>${company.emails.map((e) => `<a href="${e.href}">${e.display}</a>`).join('<br>')}</dd></div>
        <div><dt>Managing Director</dt><dd>${esc(leadership.name)}</dd></div>
      </dl>
      <div class="careers-note" id="careers">
        <h3>${esc(careers.heading)}</h3>
        <p>${esc(careers.text)}</p>
        <a class="link-arrow" href="mailto:${careers.email}?subject=${encodeURIComponent('CV submission')}">${esc(careers.cta)} — ${careers.email} ${icon.arrow}</a>
      </div>
    </div>

    <div class="enquiry reveal" id="enquiry">
      <h2 class="h3">Send an enquiry</h2>
      <p class="fine">Fields marked * are required.</p>
      <form class="form" data-enquiry novalidate action="mailto:${company.emails[0].display}" method="post" enctype="text/plain">
        <div class="field">
          <label for="f-name">Name <span aria-hidden="true">*</span></label>
          <input id="f-name" name="name" type="text" autocomplete="name" required maxlength="120" aria-describedby="f-name-err">
          <p class="field-error" id="f-name-err" hidden></p>
        </div>
        <div class="field">
          <label for="f-org">Organisation</label>
          <input id="f-org" name="organisation" type="text" autocomplete="organization" maxlength="160">
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-email">Email <span aria-hidden="true">*</span></label>
            <input id="f-email" name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="f-email-err">
            <p class="field-error" id="f-email-err" hidden></p>
          </div>
          <div class="field">
            <label for="f-phone">Phone</label>
            <input id="f-phone" name="phone" type="tel" autocomplete="tel" maxlength="20" inputmode="tel" pattern="[0-9+()\\-\\s]{7,20}" aria-describedby="f-phone-err">
            <p class="field-error" id="f-phone-err" hidden></p>
          </div>
        </div>
        <div class="field">
          <label for="f-service">Service</label>
          <select id="f-service" name="service">
            <option value="">Select a service area (optional)</option>
            ${serviceOptions.map((o) => `<option value="${o.value}">${esc(o.label)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="f-message">Project details <span aria-hidden="true">*</span></label>
          <textarea id="f-message" name="message" rows="6" required minlength="10" maxlength="3000" aria-describedby="f-message-err"></textarea>
          <p class="field-error" id="f-message-err" hidden></p>
        </div>
        <div class="form-submit">
          <button class="btn btn-solid" type="submit" aria-describedby="f-handoff">Send request ${icon.arrow}</button>
          <p class="fine" id="f-handoff">Your email application will open with your request ready to send to <a href="mailto:${company.emails[0].display}">${company.emails[0].display}</a>. Nothing is sent until you press send there.</p>
        </div>
        <div class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status hidden></div>
      </form>
    </div>
  </div>
</section>
`;
    return page({ ...this, body });
  },
};
