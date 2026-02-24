/* ============================================================
   D. João V Reserva 2022 — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── SMOOTH SCROLL para âncoras ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ─── SCROLL REVEAL ─── */
  var reveals = document.querySelectorAll('.reveal');

  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          var idx = siblings.indexOf(entry.target);
          var delay = Math.min(idx * 80, 300);
          setTimeout(function() {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function(el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ─── BARRAS SENSORIAIS ─── */
  var barFills = document.querySelectorAll('.sensory__bar-fill');

  if (barFills.length && 'IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    barFills.forEach(function(el) { barObserver.observe(el); });
  }

  /* ─── STICKY CTA (mobile) ─── */
  var stickyCta = document.getElementById('stickyCta');
  var heroEl = document.getElementById('hero');

  if (stickyCta && heroEl && 'IntersectionObserver' in window) {
    var heroObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        stickyCta.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    heroObserver.observe(heroEl);
  }

  /* ─── DOT NAV — seção ativa ─── */
  var dotItems = document.querySelectorAll('.dot-nav__item');
  var sections = ['hero','origem','castas','sensorial','harmonizacao','ficha','comprar']
    .map(function(id) { return document.getElementById(id); })
    .filter(Boolean);

  function updateActiveDot() {
    if (!sections.length || !dotItems.length) return;
    var scrollMid = window.scrollY + window.innerHeight * 0.45;
    var active = sections[0];
    sections.forEach(function(sec) {
      if (sec.offsetTop <= scrollMid) active = sec;
    });
    dotItems.forEach(function(item) {
      item.classList.toggle('active', item.dataset.section === active.id);
    });
  }

  window.addEventListener('scroll', updateActiveDot, { passive: true });
  updateActiveDot();

  /* ─── GARRAFA: paralaxe sutil no hero ─── */
  var bottleImg = document.querySelector('.hero__bottle-img');
  if (bottleImg && window.innerWidth >= 900) {
    window.addEventListener('scroll', function() {
      bottleImg.style.transform = 'translateY(' + (window.scrollY * 0.06) + 'px)';
    }, { passive: true });
  }

});