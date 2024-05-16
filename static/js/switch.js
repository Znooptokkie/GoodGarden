function getPlantId() {
    const url = window.location.href;
    console.log("Current URL:", url);

    const urlParams = new URL(url);
    const plantId = urlParams.searchParams.get('id');
    console.log("Plant ID:", plantId);

    return plantId;
}

function updatePlant(event) {
    const plantId = event.target.dataset.plantId;
    const isChecked = event.target.checked ? 1 : 0;
    
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

function updatePlantInDatabase(plantId, plant_geteelt) {
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

function handleSwitchChange(event) {
    const plantId = getPlantId();
    console.log("Plant ID:", plantId);  
    if (!plantId) {
        console.error('Plant ID is missing');
        return;
    }

    const isChecked = event.target.checked;

    const plant_geteelt = isChecked ? 1 : 0;

    updatePlantInDatabase(plantId, plant_geteelt);
}

function initializeSwitchState() {
    const plantId = getPlantId();
    if (!plantId) {
        console.error('Plant ID is missing');
        return;
    }

    fetch(`http://localhost:5000/get_plant_geteelt/${plantId}`)
        .then(response => response.json())
        .then(data => {
            const switchElement = document.getElementById('switch');
            if (switchElement && data.plant_geteelt !== undefined) {
                switchElement.checked = data.plant_geteelt === 1;
            }
        })
        .catch(error => {
            console.error('Error fetching plant_geteelt:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    initializeSwitchState();

    const switchElement = document.getElementById('switch');

    if (switchElement) {
        switchElement.addEventListener('change', handleSwitchChange);
    }
});
