document.addEventListener("DOMContentLoaded", function () {

    // === Selectors voor de auth-modal (login, register, logout) ===
    const modalAuth = document.getElementById("auth-modal");
    const closeAuthButton = document.getElementById("close-auth-modal");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const logoutConfirmation = document.getElementById("logout-confirmation");
    const modalTitle = document.getElementById("auth-modal-title");
    const overlay = document.getElementById("auth-modal");
    const modalWindow = document.querySelector(".modal");
    const modalFlash = document.getElementById("flash-modal");

    const plantForm = document.getElementById("plant-toevoegen-form");

    // === Selectors voor de flash-modal ===
    const flashModal = document.getElementById("flash-modal");
    const flashCloseButton = document.querySelector("#flash-modal .modal-close-button");

    document.addEventListener("DOMContentLoaded", function () {
        const firstInput = document.querySelector(".first-input");
        if (firstInput) {
            firstInput.focus();
        }
    });    

    function openModal(formType) {
        overlay.style.display = "flex";
        modalWindow.style.display = "block"; 
        modalAuth.style.display = "flex";
    
        loginForm.style.display = "none";
        registerForm.style.display = "none";
        logoutConfirmation.style.display = "none";

        plantForm.style.display = "none";
    
        let targetInput = null;
    
        if (formType === "login") {
            loginForm.style.display = "block";
            modalTitle.innerText = "Inloggen";
            targetInput = loginForm.querySelector(".first-input");  // Pak de eerste input van login
        } else if (formType === "register") {
            registerForm.style.display = "block";
            modalTitle.innerText = "Registreren";
            targetInput = registerForm.querySelector(".first-input"); // Pak de eerste input van register
        } else if (formType === "logout") {
            logoutConfirmation.style.display = "block";
            modalTitle.innerText = "Uitloggen";
        } else if (formType === "plant-toevoegen") {
            plantForm.style.display = "block";
            modalTitle.innerText = "Plant Toevoegen";
            targetInput = plantForm.querySelector("first-input");
        }
    
        // Zorg ervoor dat het juiste inputveld wordt gefocust
        setTimeout(() => {
            if (targetInput) {
                targetInput.focus();
            }
        }, 50);
    }    

    // === Functies om modals te sluiten ===
    function closeAuthModal() {
        if (modalAuth) {
            modalAuth.style.display = "none";
        }
    }

    function closeFlashModal() {
        if (flashModal) {
            flashModal.style.display = "none";
        }
    }

    if (modalFlash) 
    {
        modalFlash.style.display = "flex";
    }

    closeAuthButton?.addEventListener("click", closeAuthModal);

    // === Event listeners voor knoppen ===
    document.getElementById("login-button")?.addEventListener("click", function () {
        openModal("login");
    });

    document.getElementById("register-button")?.addEventListener("click", function () {
        openModal("register");
    });

    document.getElementById("logout-button")?.addEventListener("click", function () {
        openModal("logout");
    });

    document.querySelector(".plant-toevoegen")?.addEventListener("click", () => {
        openModal("plant-toevoegen")
    })

    document.getElementById("cancel-logout")?.addEventListener("click", closeAuthModal);

    // Auth-modal “Sluiten” knop
    document.querySelector(".modal-close-button")?.addEventListener("click", closeAuthModal);

    // Flash-modal “Sluiten” knop
    // (zorg dat je de knop in je flash-modal markup hebt met .modal-close-button)
    flashCloseButton?.addEventListener("click", closeFlashModal);

    // Sluit auth-modal als je buiten klikt
    window.addEventListener("click", function (event) {
        if (event.target === modalAuth) {
            closeAuthModal();
        }
    });
    
});
