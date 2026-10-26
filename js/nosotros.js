document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const languageToggle = document.getElementById("language-toggle");

  // Menú para celulares
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-active");

      hamburgerBtn.classList.toggle("is-active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
      hamburgerBtn.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-active");
        hamburgerBtn.classList.remove("is-active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !hamburgerBtn.contains(event.target)
      ) {
        navMenu.classList.remove("is-active");
        hamburgerBtn.classList.remove("is-active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Idiomas
  const translatableElements = document.querySelectorAll("[data-es][data-en]");

  function setLanguage(language) {
    document.documentElement.lang = language;

    translatableElements.forEach((element) => {
      const translation = element.dataset[language];

      if (translation !== undefined) {
        // Permite conservar el span naranja del título principal.
        if (element.tagName === "H1" || element.tagName === "H2") {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    if (languageToggle) {
      languageToggle.textContent = language === "es" ? "ESP" : "ENG";
      languageToggle.setAttribute(
        "aria-label",
        language === "es" ? "Switch to English" : "Cambiar a español"
      );
    }

    try {
      localStorage.setItem("creaimp-language", language);
    } catch (error) {
      // La página sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }

  if (languageToggle) {
    let currentLanguage = "es";

    try {
      currentLanguage = localStorage.getItem("creaimp-language") || "es";
    } catch (error) {
      currentLanguage = "es";
    }

    setLanguage(currentLanguage);

    languageToggle.addEventListener("click", () => {
      const nextLanguage =
        document.documentElement.lang === "es" ? "en" : "es";

      setLanguage(nextLanguage);
    });
  }
});