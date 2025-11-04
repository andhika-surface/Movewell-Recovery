document.addEventListener("DOMContentLoaded", () => {
  const langBtns = document.querySelectorAll(".lang-btn");
  const allLangElems = document.querySelectorAll("[data-lang]");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const yearSpan = document.getElementById("year");

  // Default ke localStorage atau EN
  let currentLang = localStorage.getItem("lang") || "en";

  // --- FUNGSI GANTI BAHASA ---
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    updateLanguage();
  }

  function updateLanguage() {
    allLangElems.forEach(el => {
      const langType = el.getAttribute("data-lang");
      if (langType === currentLang) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });

    langBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  // --- EVENT LISTENER UNTUK TOGGLE BAHASA ---
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // --- MENU MOBILE ---
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !expanded);
      mobileMenu.hidden = expanded;
    });
  }

  // --- TAMPILKAN TAHUN OTOMATIS ---
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Jalankan pertama kali
  updateLanguage();
});
