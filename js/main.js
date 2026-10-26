document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const languageBtn = document.getElementById('language-toggle');

  const translations = {
    en: {
      pageTitle: 'Crea-Imp | Design & Digital Development Agency',
      description: 'We design brands with identity and purpose. Graphic design, social media, and digital design solutions.',
      logoAlt: 'Crea-Imp Logo',
      menuLabel: 'Open menu',

      home: 'Home',
      services: 'Services',
      contact: 'Contact',
      portfolio: 'Portfolio',
      about: 'About Us',
      login: 'LOG IN',

      heroEyebrow: 'CREA-IMP · DESIGN WITH PURPOSE',
      headline: 'the key to',
      success: 'success',
      subtitle: 'We design brands with identity and purpose',
      heroDescription: 'We help entrepreneurs and small businesses build a strong visual identity through creative and professional design.',
      getStarted: 'GET STARTED',

      portfolioEyebrow: 'OUR WORK',
      portfolioTitle: 'Ideas that make an impact',
      portfolioDescription: 'Discover our portfolio and explore the creativity, dedication and purpose behind our designs.',
      viewPortfolio: 'EXPLORE PORTFOLIO',

      contactEyebrow: 'LET’S WORK TOGETHER',
      contactTitle: 'Ready to give your brand a new look?',
      contactDescription: 'Tell us about your idea. We would love to help you bring it to life.',
      contactButton: 'CONTACT US',

      videoFallback: 'Your browser does not support video playback.',
      copyright: '© 2026 Crea-Imp. All rights reserved.'
    },

    es: {
      pageTitle: 'Crea-Imp | Agencia de Diseño Digital',
      description: 'Diseñamos marcas con identidad y propósito mediante soluciones de diseño gráfico y contenido visual.',
      logoAlt: 'Logo de Crea-Imp',
      menuLabel: 'Abrir menú',

      home: 'Inicio',
      services: 'Servicios',
      contact: 'Contacto',
      portfolio: 'Portafolio',
      about: 'Nosotros',
      login: 'INICIO DE SESIÓN',

      heroEyebrow: 'CREA-IMP · DISEÑO CON PROPÓSITO',
      headline: 'la clave para el',
      success: 'éxito',
      subtitle: 'Diseñamos marcas con identidad y propósito',
      heroDescription: 'Ayudamos a emprendedores y pequeños negocios a construir una identidad visual sólida mediante diseños creativos y profesionales.',
      getStarted: 'COMENZAR',

      portfolioEyebrow: 'NUESTRO TRABAJO',
      portfolioTitle: 'Ideas que generan impacto',
      portfolioDescription: 'Descubre nuestro portafolio y conoce la creatividad, dedicación y propósito detrás de nuestros diseños.',
      viewPortfolio: 'EXPLORAR PORTAFOLIO',

      contactEyebrow: 'TRABAJEMOS JUNTOS',
      contactTitle: '¿Listo para darle una nueva imagen a tu marca?',
      contactDescription: 'Cuéntanos tu idea. Nos encantaría ayudarte a hacerla realidad.',
      contactButton: 'CONTÁCTANOS',

      videoFallback: 'Tu navegador no admite la reproducción de video.',
      copyright: '© 2026 Crea-Imp. Todos los derechos reservados.'
    }
  };

  let language = localStorage.getItem('creaImpLanguage') || 'en';

  // MENÚ HAMBURGUESA
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-active');

      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar el menú al seleccionar una página
    navMenu.querySelectorAll('a.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // RESALTAR LA PÁGINA ACTUAL
  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('#nav-menu a.nav-link').forEach(link => {
    const href = link.getAttribute('href');

    link.classList.toggle(
      'active',
      href && href.toLowerCase() === currentPage.toLowerCase()
    );
  });

  // CAMBIAR IDIOMA
  function changeLanguage(lang) {
    language = lang;

    const texts = translations[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(texts, key)) {
        element.textContent = texts[key];
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      const key = element.dataset.i18nAlt;

      if (Object.prototype.hasOwnProperty.call(texts, key)) {
        element.alt = texts[key];
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.dataset.i18nAria;

      if (Object.prototype.hasOwnProperty.call(texts, key)) {
        element.setAttribute('aria-label', texts[key]);
      }
    });

    document.title = texts.pageTitle;

    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      description.setAttribute('content', texts.description);
    }

    if (languageBtn) {
      languageBtn.textContent = lang === 'en' ? 'ENG' : 'ESP';

      languageBtn.setAttribute(
        'aria-label',
        lang === 'en' ? 'Cambiar a español' : 'Switch to English'
      );
    }

    try {
      localStorage.setItem('creaImpLanguage', lang);
    } catch (error) {
      // El sitio sigue funcionando si el navegador bloquea el almacenamiento.
    }
  }

  // BOTÓN DE IDIOMA
  if (languageBtn) {
    languageBtn.addEventListener('click', () => {
      changeLanguage(language === 'en' ? 'es' : 'en');

      if (navMenu) {
        navMenu.classList.remove('is-active');
      }

      if (hamburgerBtn) {
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // APLICAR EL IDIOMA GUARDADO
  changeLanguage(language);
});