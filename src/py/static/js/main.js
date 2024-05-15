
// function closeApplication() 
// {
//     if (confirm("Weet je zeker dat je de applicatie wilt sluiten?")) 
//     {
//         window.close();
//     }
// }

// ---------------------
document.addEventListener('DOMContentLoaded', function() {
  // Definieer de closeApplication() functie
  function closeApplication() {
    openModal();
  }

  // Definieer de openModal() functie
  function openModal() {
    const modal = document.getElementById('custom-modal');
    modal.style.display = 'block';
  }

  // Definieer de closeModal() functie
  function closeModal() {
    const modal = document.getElementById('custom-modal');
    modal.style.display = 'none';
  }

  // Voeg event listeners toe aan de bevestigings- en annuleringsknoppen
  document.getElementById('confirm-close').addEventListener('click', function() {
    window.close();
  });

  document.getElementById('cancel-close').addEventListener('click', function() {
    closeModal();
  });

  // Selecteer de close-button binnen het element met de class "nav-menu"
  const closeButton = document.querySelector('.nav-menu .close-button');

  // Voeg een event listener toe aan de close-button
  closeButton.addEventListener('click', function() {
    // Roep de closeApplication() functie aan
    closeApplication();
  });
});

//------


//---LAADSCHERM---
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen(); 
    // fetchBatteryData();
      startTimer();
});

function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'block';
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
}

// function fetchBatteryData() {
//     // Voer een GET-verzoek uit naar de server om batterijdata op te halen.
//     axios.get('http://127.0.0.1:5000/')
//         .then(response => 
//         {
//             const batteryData = response.data;
//             updateBatteryData(batteryData);
//         })
//         .catch(error => 
//         {
//             console.error('Error fetching all data:', error);
//             hideLoadingScreen();
//         });
// }

function startTimer() {
    setTimeout(hideLoadingScreen, 100); // Verberg laadscherm na 1 seconden
}

function fetchPlantenData()
{
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
    const gevondenPlant = plantenData.find(plant => plant.planten_id === plantId);

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

document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen(); // Toon laadscherm wanneer de pagina wordt geladen
    // fetchBatteryData(); // Haal gegevens op
    startTimer();
});
 
function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'block';
}
 
function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
}
hideLoadingScreen(); // Verberg laadscherm wanneer gegevens zijn geladen

 
// function fetchBatteryData() {
//     // Voer een GET-verzoek uit naar de server om batterijdata op te halen.
//     axios.get('http://127.0.0.1:5000/')
//         .then(response => {
//             // Verwerk de ontvangen data.
//             const batteryData = response.data;
//             // Roep de updateBatteryData-functie aan om de batterijdata bij te werken.
//             updateBatteryData(batteryData);
//             // Voeg hier andere functieaanroepen toe om de rest van de pagina bij te werken.
//             hideLoadingScreen(); // Verberg laadscherm wanneer gegevens zijn geladen
//         })
//         .catch(error => {
//             // Log eventuele fouten tijdens het ophalen.
//             console.error('Error fetching battery data:', error);
//             hideLoadingScreen(); // Verberg laadscherm bij fout
//         });
// }
 
function startTimer() {
    // Stel de timer in op 3 seconden (3000 milliseconden)
    setTimeout(hideLoadingScreen, 300); // Verberg laadscherm na 3 seconden
}
