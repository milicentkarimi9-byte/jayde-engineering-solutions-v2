/* ==========================================================
   JAYDE ENGINEERING SOLUTIONS — shared behaviour
   Loaded by every page. Each block checks its element exists
   first, so one file is safe across all five pages.

   EDIT: phone number and the optional form endpoint below.
   ========================================================== */
(function () {
  var PHONE = '254725927169';   // EDIT: digits only, country code first
  var ENDPOINT = '';            // EDIT: Formspree/Web3Forms url to also email enquiries
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- menu button ---- */
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  if (burger && nav) {
    var shut = function () {
      nav.classList.remove('open'); burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', shut); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 980) shut(); });
  }

  /* ---- reveal on scroll, plus counters ---- */
  function count(el) {
    var target = +el.dataset.count, suffix = el.dataset.suffix || '', t0 = null, dur = 1100;
    if (reduce) { el.textContent = target + suffix; return; }
    requestAnimationFrame(function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    });
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      en.target.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(en.target);
    });
  }, { threshold: .15 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  /* ---- background films: fade in once playing ---- */
  document.querySelectorAll('video[data-bg]').forEach(function (v) {
    var up = function () { v.classList.add('up'); };
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); up(); return; }
    v.addEventListener('playing', up, { once: true });
    var go = v.play();
    if (go && go.catch) go.catch(function () {
      up();
      var kick = function () {
        v.play().catch(function () { });
        ['touchstart', 'click', 'scroll'].forEach(function (e) { window.removeEventListener(e, kick); });
      };
      ['touchstart', 'click', 'scroll'].forEach(function (e) {
        window.addEventListener(e, kick, { once: true, passive: true });
      });
    });
    if (v.readyState >= 3) up();
  });

  /* ---- hero product carousel (home page only) ---- */
  var slidesWrap = document.getElementById('slides');
  if (slidesWrap) {
    /* No prices here. They live on smart-locks.html only, so there is one
       place to change them and nothing on the home page to be held to. */
    var products = [
      ['S5', 'Homes and apartments'],
      ['Sliding door lock', 'Sliding and patio doors'],
      ['Aluminium door lock', 'Aluminium frames and offices'],
      ['S320', 'Rentals and Airbnbs'],
      ['K8 Smart Lock', 'Front doors and hotels'],
      ['LM1 Cat Eye', 'Front doors that need eyes']
    ];
    var slides = slidesWrap.querySelectorAll('.slide'),
      dotwrap = document.getElementById('pdots'), cur = 0, auto = null;
    products.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', p[0]);
      if (i === 0) b.className = 'on';
      b.addEventListener('click', function () { go(i); rearm(); });
      dotwrap.appendChild(b);
    });
    var dotbtns = dotwrap.children;
    function go(i) {
      slides[cur].classList.remove('on'); dotbtns[cur].classList.remove('on');
      cur = i;
      slides[cur].classList.add('on'); dotbtns[cur].classList.add('on');
      document.getElementById('pname').textContent = products[i][0];
      document.getElementById('pfit').textContent = products[i][1];
    }
    function rearm() {
      clearInterval(auto);
      if (!reduce) auto = setInterval(function () { go((cur + 1) % products.length); }, 3600);
    }
    rearm();
    var stage = document.getElementById('stage');
    stage.addEventListener('mouseenter', function () { clearInterval(auto); });
    stage.addEventListener('mouseleave', rearm);
  }

  /* ---- phone mockup: press to unlock ---- */
  var ring = document.getElementById('ring');
  if (ring) {
    var rtxt = document.getElementById('ringtxt'),
      rstate = document.getElementById('ringstate'), rt = null;
    var press = function () {
      ring.classList.add('open'); rtxt.textContent = 'Unlocked';
      if (rstate) rstate.textContent = 'Open';
      clearTimeout(rt);
      rt = setTimeout(function () {
        ring.classList.remove('open'); rtxt.textContent = 'Press to unlock';
        if (rstate) rstate.textContent = 'Closed';
      }, 2600);
    };
    ring.addEventListener('click', press);
    ring.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press(); }
    });
  }

  /* ---- rental photo swipers: dots follow the scroll ---- */
  document.querySelectorAll('.swipe').forEach(function (strip) {
    var dots = strip.parentElement.querySelector('.swipedots');
    if (!dots) return;
    var frames = strip.children.length;
    for (var i = 0; i < frames; i++) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', 'Photo ' + (i + 1));
      if (i === 0) b.className = 'on';
      (function (n) {
        b.addEventListener('click', function () {
          strip.scrollTo({ left: strip.clientWidth * n, behavior: reduce ? 'auto' : 'smooth' });
        });
      })(i);
      dots.appendChild(b);
    }
    var tick = null;
    strip.addEventListener('scroll', function () {
      clearTimeout(tick);
      tick = setTimeout(function () {
        var n = Math.round(strip.scrollLeft / strip.clientWidth);
        Array.prototype.forEach.call(dots.children, function (d, k) {
          d.classList.toggle('on', k === n);
        });
      }, 60);
    }, { passive: true });
  });

  /* ---- quote links always do something visible ---- */
  var nameField = document.getElementById('f-name');
  document.querySelectorAll('a[href="#contact"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.getElementById('contact');
      if (!target) return;           // other pages link out to contact.html instead
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (!nameField) return;
      setTimeout(function () { nameField.focus({ preventScroll: true }); }, reduce ? 0 : 520);
    });
  });

  /* ---- enquiry form ---- */
  var send = document.getElementById('send');
  if (send) {
    send.addEventListener('click', function () {
      var v = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };
      var data = {
        name: v('f-name') || 'Not given',
        phone: v('f-phone') || 'Not given',
        email: v('f-email') || 'Not given',
        location: v('f-place') || 'Not given',
        looking_for: v('f-need'),
        property: v('f-type'),
        doors: v('f-doors'),
        notes: v('f-note') || 'None'
      };
      var lines = ['Hello Jayde Engineering Solutions, I would like a quote.', '',
        'Name: ' + data.name, 'Phone: ' + data.phone, 'Email: ' + data.email,
        'Location: ' + data.location,
        'Looking for: ' + data.looking_for, 'Property type: ' + data.property,
        'Doors or gates: ' + data.doors, 'Notes: ' + data.notes];
      if (ENDPOINT) {
        fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).catch(function () { });
      }
      window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(lines.join('\n')), '_blank');
    });
  }

  /* ---- floating mark: back to top ---- */
  var totop = document.getElementById('totop');
  if (totop) totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
