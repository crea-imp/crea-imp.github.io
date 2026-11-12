document.addEventListener("DOMContentLoaded", function() {
  // Crear el estilo para la animación flotante
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes whatsappFloat {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-8px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    .whatsapp-floating-btn {
      animation: whatsappFloat 3s ease-in-out infinite;
    }
    .whatsapp-floating-btn:hover {
      animation: none !important;
      transform: scale(1.1) !important;
      background-color: #20ba5a !important;
    }
  `;
  document.head.appendChild(styleSheet);

  // Crear el botón flotante de WhatsApp
  const whatsappButton = document.createElement("a");
  whatsappButton.href = "https://wa.me/573011760733?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n";
  whatsappButton.target = "_blank";
  whatsappButton.rel = "noopener noreferrer";
  whatsappButton.setAttribute("aria-label", "Contactar por WhatsApp");
  whatsappButton.className = "whatsapp-floating-btn";

  // Estilos base del botón
  whatsappButton.style.position = "fixed";
  whatsappButton.style.width = "60px";
  whatsappButton.style.height = "60px";
  whatsappButton.style.bottom = "25px";
  whatsappButton.style.right = "25px";
  whatsappButton.style.backgroundColor = "#25d366";
  whatsappButton.style.color = "#FFF";
  whatsappButton.style.borderRadius = "50%";
  whatsappButton.style.textAlign = "center";
  whatsappButton.style.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.3)";
  whatsappButton.style.zIndex = "9999";
  whatsappButton.style.display = "flex";
  whatsappButton.style.alignItems = "center";
  whatsappButton.style.justifyContent = "center";
  whatsappButton.style.transition = "transform 0.3s ease, background-color 0.3s ease";

  // Ícono SVG de WhatsApp
  whatsappButton.innerHTML = `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width: 35px; height: 35px; fill: #ffffff;">
      <path d="M16 2.93c-7.21 0-13.07 5.86-13.07 13.07 0 2.3.6 4.55 1.74 6.53L2.82 29.2l6.84-1.79c1.92 1.05 4.09 1.6 6.34 1.6 7.21 0 13.07-5.86 13.07-13.07S23.21 2.93 16 2.93zm0 23.86c-1.95 0-3.86-.52-5.53-1.51l-.4-.24-4.11 1.08 1.1-4.01-.26-.41c-1.09-1.73-1.66-3.73-1.66-5.76 0-5.99 4.87-10.86 10.86-10.86s10.86 4.87 10.86 10.86-4.87 10.86-10.86 10.86zm5.96-8.13c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.16-.22.33-.84 1.06-1.03 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.67.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.77-1.01-2.42-.26-.64-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.37c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38z"/>
    </svg>
  `;

  document.body.appendChild(whatsappButton);
});