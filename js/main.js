/* main.js - full pages interactions */
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from((ctx || document).querySelectorAll(s));

function setLanguage(lang){
  $$('[data-lang]').forEach(el=>{
    el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
  });
  $$('.lang-btn').forEach(btn=>{
    const b = btn.getAttribute('data-lang') || btn.dataset.lang;
    btn.classList.toggle('active', b===lang);
    btn.setAttribute('aria-pressed', b===lang ? 'true' : 'false');
  });
  // store preference
  try{ localStorage.setItem('movewell_lang', lang); } catch(e){}
}

// detect and apply saved language
document.addEventListener('DOMContentLoaded', ()=>{
  const saved = (localStorage.getItem('movewell_lang') || 'en');
  setLanguage(saved);

  $$('.lang-btn').forEach(btn=> btn.addEventListener('click', ()=>{
    const lang = btn.getAttribute('data-lang') || btn.dataset.lang;
    setLanguage(lang);
  }));

  // mobile menu toggle
  const mobileToggle = $('#mobile-toggle');
  const mobileMenu = $('#mobile-menu');
  if(mobileToggle){
    mobileToggle.addEventListener('click', ()=>{
      const open = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!open));
      if(mobileMenu) mobileMenu.hidden = open;
    });
  }

  // close mobile menu on link click
  $$('#mobile-menu a').forEach(a => a.addEventListener('click', ()=>{
    if($('#mobile-menu')){ $('#mobile-menu').hidden = true; $('#mobile-toggle').setAttribute('aria-expanded','false'); }
  }));

  // set active nav link based on page
  const path = location.pathname.split('/').pop() || 'index.html';
  const map = { 'index.html':'home','services.html':'services','about.html':'about','promo.html':'promo','contact.html':'contact' };
  const key = map[path] || 'home';
  $$('.nav-list .nav-link').forEach(a=>{ if(a.dataset && a.dataset.nav===key) a.classList.add('active'); });

  // fade-in observer
  const fadeEls = $$('.fade-in');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
  },{threshold:0.12});
  fadeEls.forEach(el=> obs.observe(el));

  // hero parallax
  const heroMedia = document.querySelector('.hero-media');
  function heroParallax(){
    if(!heroMedia) return;
    const rect = heroMedia.getBoundingClientRect();
    const scrolled = window.scrollY || window.pageYOffset;
    const offset = Math.max(-120, Math.min(120, scrolled * 0.06));
    heroMedia.style.transform = `translateY(${offset}px) scale(1.02)`;
  }
  let ticking = false;
  window.addEventListener('scroll', ()=>{ if(!ticking){ window.requestAnimationFrame(()=>{ heroParallax(); ticking=false; }); ticking=true; } });
  window.addEventListener('resize', heroParallax);

  // set year if any
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
});