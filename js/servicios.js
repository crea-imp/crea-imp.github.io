document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = menuButton?.querySelector(".material-symbols-outlined");

  function closeMenu() {
    if (!menuButton || !mobileMenu) return;

    mobileMenu.classList.add("hidden");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");

    if (menuIcon) {
      menuIcon.textContent = "menu";
    }

    document.body.classList.remove("menu-open");
  }

  function toggleMenu() {
    if (!menuButton || !mobileMenu) return;

    const isOpening = mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden", !isOpening);
    menuButton.setAttribute("aria-expanded", String(isOpening));
    menuButton.setAttribute(
      "aria-label",
      isOpening ? "Cerrar menú" : "Abrir menú"
    );

    if (menuIcon) {
      menuIcon.textContent = isOpening ? "close" : "menu";
    }

    document.body.classList.toggle("menu-open", isOpening);
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", toggleMenu);

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // Cambio de idioma español / inglés
  const languageButtons = [
    document.getElementById("language-toggle"),
    document.getElementById("mobile-language-toggle")
  ].filter(Boolean);

  const translatableElements = document.querySelectorAll("[data-es][data-en]");

  function setLanguage(language) {
    const selectedLanguage = language === "en" ? "en" : "es";

    document.documentElement.lang = selectedLanguage;

    translatableElements.forEach((element) => {
      const translation = element.dataset[selectedLanguage];

      if (translation !== undefined) {
        element.textContent = translation;
      }
    });

    languageButtons.forEach((button) => {
      button.textContent = selectedLanguage === "es" ? "ESP" : "ENG";
      button.setAttribute(
        "aria-label",
        selectedLanguage === "es" ? "Switch to English" : "Cambiar a español"
      );
    });

    try {
      localStorage.setItem("creaimp-language", selectedLanguage);
    } catch (error) {
      // El sitio sigue funcionando aunque el navegador bloquee localStorage.
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentLanguage = document.documentElement.lang || "es";
      setLanguage(currentLanguage === "es" ? "en" : "es");
      closeMenu();
    });
  });

  let savedLanguage = "es";

  try {
    const storedLanguage = localStorage.getItem("creaimp-language");

    if (storedLanguage === "en" || storedLanguage === "es") {
      savedLanguage = storedLanguage;
    }
  } catch (error) {
    // Se usa español como idioma predeterminado.
  }

  setLanguage(savedLanguage);

  // Animaciones al aparecer las secciones
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08
      }
    );

    document.documentElement.classList.add("js-ready");

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Desplazamiento suave para enlaces internos reales
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMenu();
      }
    });
  });
});