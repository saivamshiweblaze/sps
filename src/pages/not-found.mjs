import { page, icon } from '../templates/layout.mjs';

export default {
  path: '/404.html',
  file: '404.html',
  active: '',
  title: 'Page not found | SPS Engineering Solutions',
  description: 'The page you were looking for could not be found.',
  render() {
    const body = `
<section class="section notfound">
  <div class="wrap">
    <p class="eyebrow"><span class="rule" aria-hidden="true"></span>404</p>
    <h1 class="sec-title">This page could not be found</h1>
    <p class="lead">The link may be out of date. These pages may help:</p>
    <div class="btn-row">
      <a class="btn btn-solid" href="/">Home ${icon.arrow}</a>
      <a class="btn btn-outline" href="/services/">Services</a>
      <a class="btn btn-outline" href="/contact/">Contact</a>
    </div>
  </div>
</section>`;
    return page({ ...this, body });
  },
};
