/**
 * Crea-Imp - Usuarios Page Script
 * Verificación obligatoria de sesión activa (seguridad de ruta) y gestión de cierre de sesión
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Comprobación de seguridad: verificar si existe una sesión iniciada
    const activeUser = localStorage.getItem('creaImpActiveUser');

    if (!activeUser) {
        // Si no hay sesión válida, impedir el acceso y redirigir inmediatamente a ingreso.html
        window.location.href = 'ingreso.html';
        return;
    }

    // 2. Mostrar el correo electrónico con el que se inició sesión en la interfaz
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userEmailDisplay) {
        userEmailDisplay.textContent = activeUser;
    }

    // 3. Manejo del botón de Cierre de Sesión
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // Eliminar la sesión almacenada en localStorage
            localStorage.removeItem('creaImpActiveUser');
            // Redirigir de regreso a la página de ingreso (o index.html según preferencia)
            window.location.href = 'ingreso.html';
        });
    }
});