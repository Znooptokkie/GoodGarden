// Importeer Axios voor het maken van HTTP-verzoeken
const axios = require('axios');

function closeApplication() 
{
    if (confirm("Weet je zeker dat je de applicatie wilt sluiten?")) 
    {
        window.close();
    }
}

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
//---LAADSCHERM---
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen(); 
    fetchBatteryData();
      startTimer();
    //   console.log("GELUKTWFE");
});

function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'block';
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
}

function fetchBatteryData() {
    // Voer een GET-verzoek uit naar de server om batterijdata op te halen.
    axios.get('http://127.0.0.1:5000/')
        .then(response => 
        {
            const batteryData = response.data;
            updateBatteryData(batteryData);
        })
        .catch(error => 
        {
            console.error('Error fetching all data:', error);
            hideLoadingScreen();
        });
}
function startTimer() {
    setTimeout(hideLoadingScreen, 100); // Verberg laadscherm na 1 seconden
}

function fetchPlantenData()
{
    // Gebruik Axios om een GET-verzoek te versturen naar de planten endpoint.
    axios.get('http://127.0.0.1:5000/planten')
    .then(response => 
    {
        const plantenData = response.data;
        updatePlantenData(plantenData);
    })
    .catch(error => 
    {
        console.error('Error fetching planten data:', error);
    });
}

function getPlantIdFromUrl()
{
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;
    return searchParams.get('id');
}

function updatePlantenData(plantenData) 
{
    const plantId = parseInt(getPlantIdFromUrl(), 10);
    const gevondenPlant = plantenData.find(plant => plant.id === plantId);

    if (gevondenPlant) 
    {
        document.title = gevondenPlant.plant_naam;
        document.querySelector(".plant-titel").textContent = gevondenPlant.plant_naam;
    }
    else 
    {
        console.log(`Geen plant gevonden met ID ${plantId}`);
    }
}
    
fetchPlantenData();