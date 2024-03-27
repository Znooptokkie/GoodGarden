const { ipcRenderer } = require("electron");
const axios = require('axios');
 
// Function to open the modal
function openModal() {
    const modal = document.getElementById("myModal");
    const button = document.getElementById("modalButton");
    const close = document.getElementsByClassName("close")[0];
 
    if (modal && button) { // Check if elements are found
        // Toon de modal wanneer op de knop wordt geklikt
        button.onclick = function () {
            modal.style.display = "block";
        }
 
        // Sluit de modal wanneer op het 'sluiten' icoon wordt geklikt
        close.onclick = function () {
            modal.style.display = "none";
        }
 
        // Sluit de modal wanneer buiten de modal wordt geklikt
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else {
        console.error("Modal elements not found");
    }
}
 
document.addEventListener('DOMContentLoaded', () => {
    // Call openModal when DOM content is loaded
    openModal();
 
    // Send a message to the main process to execute the Python script
    ipcRenderer.send('run-python-script', ['some', 'arguments']);
 
    ipcRenderer.on('python-script-response', (event, pythonData) => {
        if (pythonData === 'error') {
            console.error('An error occurred while retrieving data from Python');
        } else {
            // Update HTML elements with data received from Python
            document.getElementById('bodem-temperatuur').textContent = pythonData.bodemTemperatuur; // Adjust the property based on your actual Python response
        }
    });
 
    // Listen for updates to HTML data from the main process
    ipcRenderer.on('update-html-data', (event, data) => {
        // Update the HTML with the received data
        document.getElementById('batteryVoltage').innerText = data.batteryVoltage;
        // Add similar lines for other data fields
    });
 
    // Trigger an event to request data update
    ipcRenderer.send('request-update-data');
 
    // Fetch battery data when the page loads
    fetchBatteryData();
});
 
function drawLineChart()
{
    /*Dit is de data die getoond wordt als "punt" op de grafiek. 20 = y20 / x20, 50 = y50 / x50 enzovoort... De array "data" & "xLabels" moeten beide evenveel array items hebben!!*/
    const data = [20, 50, 60, 45, 50, 100, 70, 60, 65, 0, 85, 0];
    const xLabels = ["", "", "", "", "", 6, "", "", "", "", "", 12];
   
    const yLabels = ["", 20, "", 40, "", 60, "", 80, "", 100]; /*NIET VERANDEREN!!!*/
 
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    const padding = 35; // Increased padding for Y labels
    const graphWidth = canvas.width - padding * 2;
    const graphHeight = canvas.height - padding * 2;
 
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
 
    // Set the color of the line
    ctx.strokeStyle = "rgb(143, 188, 143)";
 
    const xIncrement = graphWidth / (xLabels.length - 1);
    const yIncrement = graphHeight / (yLabels.length - 1);
 
    // Plot the data
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - (data[0] / 100) * graphHeight);
 
    for (let i = 1; i < data.length; i++)
    {
        const xPos = padding + i * xIncrement;
        const yPos = canvas.height - padding - (data[i] / 100) * graphHeight;
        ctx.lineTo(xPos, yPos);
    }
    ctx.stroke();
 
    // Draw Y labels
    ctx.fillStyle = "black";
    ctx.textAlign = "right"; // Align text to the right
    ctx.textBaseline = "middle"; // Center vertically
 
    for (let i = 0; i < yLabels.length; i++)
    {
        if (yLabels[i] !== "")
        {
            const yPos = canvas.height - padding - i * yIncrement;
            ctx.fillText(yLabels[i], padding - 10, yPos);
        }
    }
 
    // Draw X labels
    ctx.textAlign = "center"; // Center horizontally for X labels
    for (let i = 0; i < xLabels.length; i++)
    {
        if (xLabels[i] !== "")
        {
            const xPos = padding + i * xIncrement;
            ctx.fillText(xLabels[i], xPos, canvas.height - padding + 20);
        }
    }
}
    drawLineChart();
// Function to fetch battery data from Flask API
function fetchBatteryData() {
    axios.get('http://127.0.0.1:5000')
        .then(response => {
            const batteryData = response.data;
            updateBatteryData(batteryData);
        })
        .catch(error => {
            console.error('Error fetching battery data:', error);
        });
}
 
function updateBatteryData(batteryData) {
    document.getElementById('deviceNumber-322').innerHTML = batteryData[1].device_id;
    document.getElementById('voltage-322').innerHTML = batteryData[1].label;
    document.getElementById('time-322').innerHTML = batteryData[1].last_seen;
    document.getElementById('tevredenheid-322').innerHTML = batteryData[1].last_battery_voltage;

    document.getElementById('deviceNumber-256').innerHTML = batteryData[0].device_id;
    document.getElementById('voltage-256').innerHTML = batteryData[0].label;
    document.getElementById('time-256').innerHTML = batteryData[0].last_seen;
    document.getElementById('tevredenheid-256').innerHTML = batteryData[0].last_battery_voltage;
 
    console.log(batteryData);
}