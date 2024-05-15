/**
 * Functie om een modaal venster te openen.
 * Deze functie stelt event listeners in voor het openen en sluiten van de modaal.
 */
function openModal(side) 
{
    const modal = document.getElementById("myModal");
    const leftRadio = document.getElementById("kas_locatie_left");
    const rightRadio = document.getElementById("kas_locatie_right");
    const closeButton = document.querySelector(".annulatie-knop");
    const close = document.querySelector(".close");
    const submit = document.querySelector(".submit-plant");

    console.log("Modal opened for side:", side);
    console.log("Left radio element:", leftRadio);
    console.log("Right radio element:", rightRadio);

    if (side === "left") {
        leftRadio.checked = true;
    } else if (side === "right") {
        rightRadio.checked = true;
    }

    modal.style.display = "block";

    closeButton.onclick = close.onclick = function () 
    {
        modal.style.display = "none";
    };
    submit.onclick = function () {
        const plantNaamInput = document.getElementById("plantNaam");
        const plantNaam = plantNaamInput.value.trim(); 
    
        const plantensoortSelect = document.getElementById("plantensoort");
        const plantensoort = plantensoortSelect.value;
    
        if (plantNaam === "" || plantensoort === "") {
            const emptyModal = document.createElement("article");
            emptyModal.classList.add("modal", "modal-content");
            emptyModal.style.display = "block"; 
    
            const modalContent = document.createElement("article");
            modalContent.classList.add("modal-items");
            const errorMessage = document.createElement("h2");
            errorMessage.textContent = "Je hebt niet alle velden ingevuld.";
            modalContent.appendChild(errorMessage);
    
            const okButton = document.createElement("button");
            okButton.classList.add("okButton");
            okButton.textContent = "Ok";
            okButton.onclick = function () {
                emptyModal.style.display = "none"; 
            };
            modalContent.appendChild(okButton);
    
            emptyModal.appendChild(modalContent);
    
            document.body.appendChild(emptyModal);
        } else {
            const okModal = document.createElement("article");
            okModal.classList.add("modal", "modal-content");
            okModal.style.display = "block"; 
        
            const modalContent = document.createElement("article");
            modalContent.classList.add("modal-items");
            const successMessage = document.createElement("h2");
            successMessage.textContent = "Plant is succesvol toegevoegd";
            modalContent.appendChild(successMessage);
        
            const okButton = document.createElement("button");
            okButton.classList.add("okButton");
            okButton.textContent = "Ok";
            okButton.onclick = function () {
                okModal.style.display = "none"; 
                modal.style.display = "none"; 
            };
            modalContent.appendChild(okButton);
        
            okModal.appendChild(modalContent);
        
            document.body.appendChild(okModal);
        }
    };
    
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}