function getPlantId() {
    // Get the current URL
    const url = window.location.href;
    console.log("Current URL:", url);

    // Extract the query parameter 'id' from the URL
    const urlParams = new URL(url);
    const plantId = urlParams.searchParams.get('id');
    console.log("Plant ID:", plantId);

    return plantId;
}

// JavaScript code to update plant cultivation status
function updatePlant(event) {
    const plantId = event.target.dataset.plantId; // Get plant ID from data attribute
    const isChecked = event.target.checked ? 1 : 0; // 1 for cultivated, 0 for not cultivated
    
    // Send POST request to Flask backend to update plant cultivation status
    fetch(`/update_plant_geteelt/${plantId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plant_geteelt: isChecked }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update plant_geteelt');
        }
        console.log('Plant_geteelt updated successfully');
    })
    .catch(error => {
        console.error('Error updating plant_geteelt:', error);
    });
}


// Function to update the plant status in the database
function updatePlantInDatabase(plantId, plant_geteelt) {
    // Make a POST request to update the database with the new value
    fetch(`http://localhost:5000/update_plant_geteelt/${plantId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plant_geteelt }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update plant_geteelt');
        }
        console.log('Plant_geteelt updated successfully');
    })
    .catch(error => {
        console.error('Error updating plant_geteelt:', error);
    });
}


// Function to handle switch change event
function handleSwitchChange(event) {
    // Get the plant ID from the URL
    const plantId = getPlantId();
    console.log("Plant ID:", plantId);  
    if (!plantId) {
        console.error('Plant ID is missing');
        return;
    }

    // Get the new value of the switch
    const isChecked = event.target.checked;

    // Determine the value to be sent based on the switch state
    const plant_geteelt = isChecked ? 1 : 0;

    // Update the plant status in the database
    updatePlantInDatabase(plantId, plant_geteelt);
}


// Function to initialize the switch state based on the stored value
function initializeSwitchState() {
    // Get the plant ID from the URL
    const plantId = getPlantId();
    if (!plantId) {
        console.error('Plant ID is missing');
        return;
    }

    // Fetch the stored value of plant_geteelt from the backend
    fetch(`http://localhost:5000/get_plant_geteelt/${plantId}`)
        .then(response => response.json())
        .then(data => {
            // If a stored value exists, set the switch state accordingly
            const switchElement = document.getElementById('switch');
            if (switchElement && data.plant_geteelt !== undefined) {
                switchElement.checked = data.plant_geteelt === 1;
            }
        })
        .catch(error => {
            console.error('Error fetching plant_geteelt:', error);
        });
}



// Add event listener to handle switch change
document.addEventListener('DOMContentLoaded', function () {
    initializeSwitchState();

    const switchElement = document.getElementById('switch');

    if (switchElement) {
        switchElement.addEventListener('change', handleSwitchChange);
    }
});
