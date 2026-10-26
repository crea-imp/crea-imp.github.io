
/**
 * Crea-Imp - Ingreso & Registro Page Script
 * Manejo de navegación entre Login/Registro, validación de contraseñas y Captcha
 */

// Usuarios precargados de demostración
const preloadedUsers = [
    { email: 'creaimp.oficial@gmail.com', password: 'crea-imp2026' },
    { email: 'natalyborges377@gmail.com', password: 'alexandra123#' },
    { email: 'cliente@creaimp.com', password: 'cliente2026' }
];

let loginCaptchaResult = 0;
let registerCaptchaResult = 0;

// Generar cálculo matemático aleatorio
function generateCaptchas() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    loginCaptchaResult = num1 + num2;
    const qLogin = document.getElementById('captchaQuestionLogin');
    if (qLogin) qLogin.textContent = `¿Cuánto es ${num1} + ${num2}?`;

    const num3 = Math.floor(Math.random() * 10) + 1;
    const num4 = Math.floor(Math.random() * 10) + 1;
    registerCaptchaResult = num3 + num4;
    const qReg = document.getElementById('captchaQuestionReg');
    if (qReg) qReg.textContent = `¿Cuánto es ${num3} + ${num4}?`;
}

document.addEventListener('DOMContentLoaded', () => {
    generateCaptchas();

    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorModal = document.getElementById('errorModal');
    const btnRetry = document.getElementById('btnRetry');
    const btnCancel = document.getElementById('btnCancel');

    // Cambiar al Cuadro de Registro
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => {
            loginCard.classList.add('hidden');
            registerCard.classList.remove('hidden');
            generateCaptchas();
        });
    }

    // Cambiar al Cuadro de Inicio de Sesión
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            registerCard.classList.add('hidden');
            loginCard.classList.remove('hidden');
            generateCaptchas();
        });
    }

    // Procesar Inicio de Sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email').value.trim();
            const passwordInput = document.getElementById('password').value.trim();
            const captchaInput = parseInt(document.getElementById('captchaAnswerLogin').value, 10);

            if (captchaInput !== loginCaptchaResult) {
                showErrorModal('El resultado de la verificación matemática es incorrecto.');
                return;
            }

            const validUser = preloadedUsers.find(
                u => u.email.toLowerCase() === emailInput.toLowerCase() && u.password === passwordInput
            );

            if (validUser) {
                localStorage.setItem('creaImpActiveUser', validUser.email);
                window.location.href = 'usuarios.html';
            } else {
                showErrorModal('El correo electrónico o la contraseña ingresados no coinciden con nuestros registros.');
            }
        });
    }

    // Procesar Registro de Nuevo Usuario
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regEmail = document.getElementById('regEmail').value.trim();
            const regPassword = document.getElementById('regPassword').value.trim();
            const regPasswordConfirm = document.getElementById('regPasswordConfirm').value.trim();
            const captchaInput = parseInt(document.getElementById('captchaAnswerReg').value, 10);

            // 1. Validar coincidencia de contraseñas
            if (regPassword !== regPasswordConfirm) {
                showErrorModal('Las contraseñas ingresadas no coinciden. Por favor verifica.');
                return;
            }

            // 2. Validar Captcha
            if (captchaInput !== registerCaptchaResult) {
                showErrorModal('El resultado de la verificación matemática es incorrecto.');
                return;
            }

            // 3. Agregar nuevo usuario registrado a la lista
            preloadedUsers.push({ email: regEmail, password: regPassword });

            // 4. Guardar sesión y redirigir automáticamente a usuarios.html
            localStorage.setItem('creaImpActiveUser', regEmail);
            window.location.href = 'usuarios.html';
        });
    }

    function showErrorModal(message) {
        const msgEl = document.getElementById('errorMessage');
        if (msgEl) msgEl.textContent = message;
        if (errorModal) errorModal.classList.remove('hidden');
    }

    if (btnRetry) {
        btnRetry.addEventListener('click', () => {
            if (errorModal) errorModal.classList.add('hidden');
            generateCaptchas();
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});