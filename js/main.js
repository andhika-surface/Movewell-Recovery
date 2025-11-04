document.addEventListener("DOMContentLoaded", () => {
  const langBtns = document.querySelectorAll(".lang-btn");
  const yearSpan = document.getElementById("year");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // Bahasa default (dari localStorage atau 'en')
  let currentLang = localStorage.getItem("lang") || "en";

  // --- Fungsi: Set bahasa aktif ---
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    updateLanguage();
  }

  // --- Fungsi: Update tampilan bahasa ---
  function updateLanguage() {
    const allLangElems = document.querySelectorAll("[data-lang]");

    allLangElems.forEach(el => {
      const langType = el.getAttribute("data-lang");
      if (!langType) return; // lewati elemen tanpa data-lang

      // tampilkan hanya bahasa aktif
      if (langType === currentLang) {
        el.style.display = "";
      } else {
        el.style.display = "none";
      }
    });

    // toggle tombol aktif
    langBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  // --- Event listener tombol bahasa ---
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // --- Mobile menu toggle ---
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !expanded);
      mobileMenu.hidden = expanded;
    });
  }

  // --- Tahun otomatis ---
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Pastikan body tampil setelah script selesai
  document.body.style.visibility = "visible";

  // Jalankan bahasa awal
  updateLanguage();
});
