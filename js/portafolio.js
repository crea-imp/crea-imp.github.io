document.addEventListener("DOMContentLoaded", () => {
  // MENÚ MÓVIL
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = menuButton?.querySelector(".material-symbols-outlined");

  function closeMobileMenu() {
    if (!menuButton || !mobileMenu) return;

    mobileMenu.classList.add("hidden");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");

    if (menuIcon) menuIcon.textContent = "menu";

    document.body.style.overflow = "";
  }

  function openMobileMenu() {
    if (!menuButton || !mobileMenu) return;

    mobileMenu.classList.remove("hidden");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Cerrar menú");

    if (menuIcon) menuIcon.textContent = "close";

    document.body.style.overflow = "hidden";
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMobileMenu();
    });
  }

  // FILTROS DEL PORTAFOLIO
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  function filterProjects(category) {
    filterButtons.forEach(button => {
      const isActive = button.dataset.filter === category;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach(card => {
      const matches =
        category === "all" || card.dataset.category === category;

      card.classList.toggle("is-hidden", !matches);
      card.setAttribute("aria-hidden", String(!matches));
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterProjects(button.dataset.filter);
    });
  });

  // IDIOMA ESPAÑOL / INGLÉS
  const languageButtons = [
    document.getElementById("language-toggle"),
    document.getElementById("mobile-language-toggle")
  ].filter(Boolean);

  function updateLanguage(language) {
    const isEnglish = language === "en";

    document.documentElement.lang = language;

    document.querySelectorAll("[data-es][data-en]").forEach(element => {
      const translatedText = isEnglish
        ? element.dataset.en
        : element.dataset.es;

      if (translatedText !== undefined) {
        element.textContent = translatedText;
      }
    });

   languageButtons.forEach(button => {
  button.textContent = isEnglish ? "ESP" : "ENG";
  button.setAttribute(
    "aria-label",
    isEnglish ? "Cambiar a español" : "Switch to English"
  );
});

    try {
      localStorage.setItem("creaimp-language", language);
    } catch (error) {
      // La página sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }

  let savedLanguage = "es";

  try {
    const storedLanguage = localStorage.getItem("creaimp-language");

    if (storedLanguage === "es" || storedLanguage === "en") {
      savedLanguage = storedLanguage;
    }
  } catch (error) {
    // Si no se puede leer el almacenamiento, se usa español.
  }

  updateLanguage(savedLanguage);

  languageButtons.forEach(button => {
    button.addEventListener("click", () => {
      const currentLanguage = document.documentElement.lang;
      updateLanguage(currentLanguage === "es" ? "en" : "es");
      closeMobileMenu();
    });
  });

  // ESTADO INICIAL DE LOS FILTROS
  filterProjects("all");
});



function openModal(type, src1, src2, title, description) {
  const modal = document.getElementById('portfolioModal');
  const mediaContainer = document.getElementById('modalMedia');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');

  mediaContainer.innerHTML = '';

  if (type === 'video') {
    const video = document.createElement('video');
    video.src = src1;
    video.controls = true;
    video.autoplay = true;
    mediaContainer.appendChild(video);
  } else if (type === 'image') {
    const img = document.createElement('img');
    img.src = src1;
    img.alt = title;
    mediaContainer.appendChild(img);
  } else if (type === 'comparison') {
    // Contenedor para mostrar las dos imágenes lado a lado (Antes y Después)
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '15px';
    wrapper.style.width = '100%';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.padding = '10px';

    // Imagen de ANTES
    const div1 = document.createElement('div');
    div1.style.flex = '1';
    div1.style.textAlign = 'center';
    div1.innerHTML = '<p style="color: var(--orange); font-weight: bold; margin-bottom: 8px; font-size: 0.95rem;">ANTES</p>';
    const imgBefore = document.createElement('img');
    imgBefore.src = src1;
    imgBefore.alt = title + ' - Antes';
    imgBefore.style.maxWidth = '100%';
    imgBefore.style.maxHeight = '350px';
    imgBefore.style.objectFit = 'contain';
    div1.appendChild(imgBefore);

    // Imagen de DESPUÉS
    const div2 = document.createElement('div');
    div2.style.flex = '1';
    div2.style.textAlign = 'center';
    div2.innerHTML = '<p style="color: var(--orange); font-weight: bold; margin-bottom: 8px; font-size: 0.95rem;">DESPUÉS</p>';
    const imgAfter = document.createElement('img');
    imgAfter.src = src2;
    imgAfter.alt = title + ' - Después';
    imgAfter.style.maxWidth = '100%';
    imgAfter.style.maxHeight = '350px';
    imgAfter.style.objectFit = 'contain';
    div2.appendChild(imgAfter);

    wrapper.appendChild(div1);
    wrapper.appendChild(div2);
    mediaContainer.appendChild(wrapper);
  }

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('portfolioModal');
  const mediaContainer = document.getElementById('modalMedia');
  mediaContainer.innerHTML = '';
  modal.classList.remove('active');
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById('portfolioModal');
  if (event.target === modal) {
    closeModal();
  }
};