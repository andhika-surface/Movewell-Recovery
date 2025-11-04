/* === main.js — MoveWell bilingual + interactions (Optimized 2025) === */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

/* === Language Switcher === */
function setLanguage(lang) {
  $$('[data-lang]').forEach(el => {
    el.classList.toggle('active-lang', el.getAttribute('data-lang') === lang);
  });

  $$('.lang-btn').forEach(btn => {
    const btnLang = btn.dataset.lang;
    const isActive = btnLang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  try {
    localStorage.setItem('movewell_lang', lang);
  } catch (e) {
    console.warn('LocalStorage not available');
  }
}

function initLanguage() {
  const saved = localStorage.getItem('movewell_lang') || 'en';
  setLanguage(saved);

  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });
}

/* === Mobile Menu === */
function initMobileMenu() {
  const toggle = $('#mobile-toggle');
  const menu = $('#mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.hidden = expanded;
  });

  // Close menu after clicking a link
  $$('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* === Navigation Active State === */
function setActiveNav() {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const map = {
    'index.html': 'home',
    'services.html': 'services',
    'about.html': 'about',
    'promo.html': 'promo',
    'contact.html': 'contact'
  };
  const activeKey = map[path] || 'home';
  $$('.nav-list .nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === activeKey);
  });
}

/* === Scroll Animations === */
function initFadeIn() {
  const fadeEls = $$('.fade-in');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));
}

/* === Hero Parallax === */
function initHeroParallax() {
  const heroMedia = $('.hero-media');
  if (!heroMedia) return;

  const onScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const offset = Math.max(-120, Math.min(120, scrollY * 0.06));
    heroMedia.style.transform = `translateY(${offset}px) scale(1.02)`;
  };

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(onScroll);
  });
}

/* === Footer Year === */
function setFooterYear() {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* === Initialize Everything === */
function initMoveWell() {
  initLanguage();
  initMobileMenu();
  setActiveNav();
  initFadeIn();
  initHeroParallax();
  setFooterYear();
}

window.addEventListener('DOMContentLoaded', initMoveWell);
