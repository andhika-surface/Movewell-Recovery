document.addEventListener("DOMContentLoaded", () => {
  const langBtns = document.querySelectorAll(".lang-btn");
  const yearSpan = document.getElementById("year");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // default language
  let currentLang = localStorage.getItem("lang") || "en";

  function applyLanguage(lang) {
    const all = document.querySelectorAll("[data-lang]");
    all.forEach(el => {
      el.classList.toggle("show-lang", el.dataset.lang === lang);
    });

    langBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    localStorage.setItem("lang", lang);
    currentLang = lang;
  }

  langBtns.forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  // mobile menu
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !expanded);
      mobileMenu.hidden = expanded;
    });
  }

  // footer year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // run on load
  applyLanguage(currentLang);
});
