/* SPS Engineering Solutions — progressive enhancement only.
   Every page is fully usable without this script. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Sticky header state ---- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var navList = document.querySelector('[data-nav]');
  if (toggle && navList) {
    var setOpen = function (open, returnFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      navList.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      if (open) {
        var first = navList.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      } else if (returnFocus) {
        toggle.focus();
      }
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
      // Keep keyboard focus inside the open menu
      if (e.key === 'Tab' && navList.classList.contains('is-open')) {
        var items = [toggle].concat(Array.prototype.slice.call(navList.querySelectorAll('a')));
        var idx = items.indexOf(document.activeElement);
        if (e.shiftKey && idx <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && idx === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });
    window.matchMedia('(min-width: 1081px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---- Reveal on scroll (content is never hidden if this fails) ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window && reveals.length) {
    var vh = window.innerHeight;
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add('in');
    });
    doc.classList.add('motion-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { if (!el.classList.contains('in')) io.observe(el); });
    // Anchor jumps should never land on invisible content
    window.addEventListener('hashchange', function () {
      var t = location.hash && document.getElementById(location.hash.slice(1));
      if (t) { var r = t.closest('.reveal') || t; r.classList.add('in'); }
    });
    if (location.hash) {
      var t0 = document.getElementById(location.hash.slice(1));
      if (t0) (t0.closest('.reveal') || t0).classList.add('in');
    }
  }

  /* ---- Scroll-spy: mark the link whose target is currently in view ---- */
  var spyOn = function (links, opts) {
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    if (!('IntersectionObserver' in window)) return;
    var visible = new Map();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible.set(en.target, en.isIntersecting); });
      var current = null;
      for (var i = 0; i < targets.length; i++) { if (targets[i] && visible.get(targets[i])) { current = i; break; } }
      if (current === null) return;
      links.forEach(function (a, j) {
        a.classList.toggle('is-active', j === current);
        if (j === current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
      if (opts && opts.onChange) opts.onChange(links[current]);
    }, { rootMargin: (opts && opts.rootMargin) || '-20% 0px -60% 0px' });
    targets.forEach(function (t) { if (t) spy.observe(t); });
  };

  /* ---- Services table of contents ---- */
  var toc = document.querySelector('.toc');
  if (toc) {
    var details = toc.querySelector('[data-toc-details]');
    var current = toc.querySelector('[data-toc-current]');
    var compact = window.matchMedia('(max-width: 1080px)');
    var syncDetails = function () { if (details) details.open = !compact.matches; };
    syncDetails();
    compact.addEventListener('change', syncDetails);
    toc.addEventListener('click', function (e) {
      if (e.target.closest('a') && compact.matches && details) details.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && compact.matches && details && details.open) { details.open = false; details.querySelector('summary').focus(); }
    });
    spyOn(Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]')), {
      onChange: function (a) { if (current) current.textContent = a.textContent; },
    });
  }

  /* ---- Testing equipment category bar ---- */
  var catBar = document.querySelector('[data-cat-bar]');
  if (catBar) {
    spyOn(Array.prototype.slice.call(catBar.querySelectorAll('a[href^="#"]')), {
      rootMargin: '-30% 0px -55% 0px',
      onChange: function (a) {
        // keep the active category visible in the horizontally scrolling bar on small screens
        var list = a.closest('ul');
        if (list && list.scrollWidth > list.clientWidth) {
          list.scrollTo({ left: a.parentNode.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      },
    });
  }

  /* ---- Enquiry form: validate, then compose an email ---- */
  var form = document.querySelector('[data-enquiry]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var to = form.getAttribute('action').replace(/^mailto:/, '');
    var params = new URLSearchParams(location.search);
    var preset = params.get('service');
    if (preset && form.service.querySelector('option[value="' + preset + '"]')) form.service.value = preset;

    var rules = {
      name: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
      email: function (v) {
        if (!v.trim()) return 'Please enter your email address.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address, e.g. name@company.com.';
      },
      phone: function (v) {
        if (!v.trim()) return '';
        return /^[0-9+()\-\s]{7,20}$/.test(v.trim()) ? '' : 'Please enter a valid phone number (digits, spaces, + and - only).';
      },
      message: function (v) { return v.trim().length >= 10 ? '' : 'Please describe your project in a few words (at least 10 characters).'; },
    };

    var showError = function (field, msg) {
      var err = document.getElementById(field.id + '-err');
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) { err.textContent = msg; err.hidden = !msg; }
    };
    var check = function (name) {
      var field = form.elements[name];
      var msg = rules[name](field.value);
      showError(field, msg);
      return !msg;
    };

    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      field.addEventListener('blur', function () { if (field.value) check(name); });
      field.addEventListener('input', function () { if (field.getAttribute('aria-invalid') === 'true') check(name); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        if (!check(name) && !firstBad) firstBad = form.elements[name];
      });
      if (firstBad) {
        status.hidden = false;
        status.className = 'form-status is-error';
        status.textContent = 'Please correct the highlighted fields.';
        firstBad.focus();
        return;
      }
      var service = form.service.options[form.service.selectedIndex];
      var subject = 'Project enquiry' + (form.service.value ? ' – ' + service.text : '') + ' – ' + form.name.value.trim();
      var lines = [
        'Name: ' + form.name.value.trim(),
        form.organisation.value.trim() ? 'Organisation: ' + form.organisation.value.trim() : '',
        'Email: ' + form.email.value.trim(),
        form.phone.value.trim() ? 'Phone: ' + form.phone.value.trim() : '',
        form.service.value ? 'Service area: ' + service.text : '',
        '',
        form.message.value.trim(),
      ].filter(function (l, i) { return l !== '' || i === 5; });
      var href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
      status.hidden = false;
      status.className = 'form-status';
      status.innerHTML = '';
      var p1 = document.createElement('p');
      p1.textContent = 'Your email application should now be open with your request addressed to ' + to + '. Please review it and press send there. Your details are still in this form.';
      var p2 = document.createElement('p');
      p2.innerHTML = 'If nothing opened, email us directly at <a href="mailto:' + to + '">' + to + '</a> or call <a href="tel:+919581283853">+91 9581283853</a>.';
      status.appendChild(p1);
      status.appendChild(p2);
      status.focus();
    });
  }
})();
