
const { ipcRenderer } = require("electron");

/**
 * Functie om een modaal venster te openen.
 * Deze functie stelt event listeners in voor het openen en sluiten van de modaal.
 */
function openModal() {
    const modal = document.getElementById("myModal");
    const button = document.getElementById("modalButton");
    const closeButton = document.getElementsByClassName("annulatie-knop")[0];
    const close = document.getElementsByClassName("close")[0];
    const submit = document.getElementsByClassName("submit-plant")[0];

    modal.style.display = "block";

    if (modal && button) 
        {
            close.onclick = closeButton.onclick = function () 
            {
                modal.style.display = "none";
            };

            submit.onclick = function () 
            {
                // ipcRenderer.send("reload-request");
                alert("Plant toegevoegd");
                modal.style.display = "none";
            };

            window.onclick = function (event) 
            {
                if (event.target === modal) 
                {
                    modal.style.display = "none";
                }
            };
    }
}