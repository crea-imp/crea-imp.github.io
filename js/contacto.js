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

    if (menuIcon) menuIcon.textContent = "menu";
    document.body.classList.remove("menu-open");
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const willOpen = mobileMenu.classList.contains("hidden");

      mobileMenu.classList.toggle("hidden", !willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute(
        "aria-label",
        willOpen ? "Cerrar menú" : "Abrir menú"
      );

      if (menuIcon) menuIcon.textContent = willOpen ? "close" : "menu";
      document.body.classList.toggle("menu-open", willOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Idioma ESP / ENG
  const translations = {
    es: {
      "hero-title": 'Creemos <span>juntos.</span>',
      "hero-description":
        "¿Tienes una idea en mente? Cuéntanos qué quieres crear y trabajemos para darle a tu marca una imagen que destaque.",
      "email-label": "ESCRÍBENOS A",
      "online-note": "Atendemos consultas por medios digitales.",
      "form-title": "Cuéntanos tu idea",
      "form-description":
        "Completa el formulario y nos pondremos en contacto contigo.",
      "name-label": "Nombre completo *",
      "form-email-label": "Correo electrónico *",
      "service-label": "¿Qué servicio necesitas? *",
      "service-placeholder": "Selecciona un servicio",
      "message-label": "Cuéntanos sobre tu proyecto *",
      "privacy-text":
        "Confirmo que los datos proporcionados se pueden utilizar para responder a mi consulta.",
      "submit-label": "Enviar mensaje",
      "form-disclaimer": "Tus datos se utilizarán para responder a tu mensaje.",
      "success-title": "¡Formulario enviado!",
      "success-description":
        "Si el envío se completó correctamente, FormSubmit te mostrará una confirmación.",
      "service-one": "Diseño gráfico",
      "service-two": "Diseño para redes sociales",
      "service-three": "Identidad visual básica",
      "service-four": "Edición y diseño digital",
      "footer-text": "Diseñamos marcas con identidad y propósito."
    },
    en: {
      "hero-title": 'Let’s create <span>together.</span>',
      "hero-description":
        "Have an idea in mind? Tell us what you want to create, and let's give your brand a look that stands out.",
      "email-label": "EMAIL US AT",
      "online-note": "We handle inquiries through digital channels.",
      "form-title": "Tell us your idea",
      "form-description":
        "Complete the form and we’ll get in touch with you.",
      "name-label": "Full name *",
      "form-email-label": "Email address *",
      "service-label": "Which service do you need? *",
      "service-placeholder": "Select a service",
      "message-label": "Tell us about your project *",
      "privacy-text":
        "I agree that the information provided may be used to respond to my inquiry.",
      "submit-label": "Send message",
      "form-disclaimer": "Your information will be used to reply to your message.",
      "success-title": "Form submitted!",
      "success-description":
        "If the submission was successful, FormSubmit will show you a confirmation.",
      "service-one": "Graphic design",
      "service-two": "Social media design",
      "service-three": "Basic visual identity",
      "service-four": "Digital editing and design",
      "footer-text": "We design brands with identity and purpose."
    }
  };

  const staticTranslations = {
    es: {
      "Inicio": "Inicio",
      "Nosotros": "Nosotros",
      "Portafolio": "Portafolio",
      "Servicios": "Servicios",
      "Contacto": "Contacto",
      "Inicio de sesión": "Inicio de sesión"
    },
    en: {
      "Inicio": "Home",
      "Nosotros": "About",
      "Portafolio": "Portfolio",
      "Servicios": "Services",
      "Contacto": "Contact",
      "Inicio de sesión": "Log in"
    }
  };

  const languageButtons = [
    document.getElementById("language-toggle"),
    document.getElementById("mobile-language-toggle")
  ].filter(Boolean);

  let currentLanguage = localStorage.getItem("creaimp-language") || "es";

  function applyLanguage(language) {
    currentLanguage = language;

    Object.entries(translations[language]).forEach(([id, text]) => {
      const element = document.getElementById(id);
      if (element) element.innerHTML = text;
    });

    document.querySelectorAll(".desktop-nav a, .mobile-menu a").forEach((link) => {
      const label = link.childNodes[0]?.textContent?.trim();
      if (label && staticTranslations[language][label]) {
        link.childNodes[0].textContent = staticTranslations[language][label] + " ";
      }
    });

    const serviceOptions = document.querySelectorAll("#service option");
    const optionTranslations = language === "en"
      ? [
          ["Diseño gráfico", "Graphic design"],
          ["Diseño para redes sociales", "Social media design"],
          ["Identidad visual básica", "Basic visual identity"],
          ["Edición y diseño digital", "Digital editing and design"],
          ["Otro", "Other"]
        ]
      : [
          ["Diseño gráfico", "Diseño gráfico"],
          ["Diseño para redes sociales", "Diseño para redes sociales"],
          ["Identidad visual básica", "Identidad visual básica"],
          ["Edición y diseño digital", "Edición y diseño digital"],
          ["Otro", "Otro"]
        ];

    serviceOptions.forEach((option) => {
      if (!option.value) {
        option.textContent = translations[language]["service-placeholder"];
        return;
      }

      const pair = optionTranslations.find(([spanish]) => option.value === spanish);
      if (pair) option.textContent = pair[language === "en" ? 1 : 0];
    });

    document.documentElement.lang = language;
    languageButtons.forEach(button => {
      button.textContent = selectedLanguage === "es"  ? "ENG" : "ESP";
      button.setAttribute(
        "aria-label",
        selectedLanguage === "es" ? "Switch to English" : "Cambiar a español";
    });

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (nameInput) nameInput.placeholder = language === "es" ? "Tu nombre" : "Your name";
    if (emailInput) emailInput.placeholder = language === "es" ? "tu@correo.com" : "you@email.com";
    if (messageInput) messageInput.placeholder = language === "es" ? "¿Qué tienes en mente?" : "What do you have in mind?";

    localStorage.setItem("creaimp-language", language);
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(currentLanguage === "es" ? "en" : "es");
    });
  });

  applyLanguage(currentLanguage);

  // FormSubmit: dejar que el navegador envíe el formulario al servicio.
  const contactForm = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitBtn");
  const submitLabel = document.getElementById("submit-label");
  const formError = document.getElementById("formError");

  if (contactForm && submitButton) {
    contactForm.addEventListener("submit", (event) => {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
        return;
      }

      if (formError) formError.classList.add("hidden");

      submitButton.disabled = true;
      if (submitLabel) {
        submitLabel.textContent = currentLanguage === "es"
          ? "Enviando..."
          : "Sending...";
      }

      // No se cancela el envío: FormSubmit recibe el formulario.
      // Si el servicio no responde, el usuario puede volver a la página.
    });
  }
});