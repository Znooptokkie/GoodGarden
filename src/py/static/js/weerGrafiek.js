/**
 * Fetches weather data from an API and draws a line chart with the fetched data using Chart.js.
 * @param {string} canvasId - The ID of the canvas element where the chart will be drawn.
 * @param {string} apiUrl - The URL to fetch the weather data from.
 */
function fetchWeatherDataAndDrawChart(canvasId, apiUrl) {
    fetch(apiUrl)
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok.'))
        .then(data => {
            const dates = data.weather_forecast.map(item => {
                // Split the date string
                const [day, month, year] = item.dag.split('-').map(Number);

                // Create a new Date object (Month is 0-based in JavaScript)
                const date = new Date(year, month - 1, day);

                // Map days to Dutch weekdays
                const weekdays = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
                const weekday = weekdays[date.getDay()];

                // Format the date string
                // return `${weekday} ${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}`;
                return `${weekday}`;
            });

            const temperatures = data.weather_forecast.map(item => item.max_temp);

            // Check if the canvas element exists
            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                console.error('Canvas element not found.');
                return;
            }

            // Get the canvas context
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        data: temperatures,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // JavaScript code that interacts with the DOM
    fetchWeatherDataAndDrawChart("sensorCanvas", "http://127.0.0.1:5000/weather");
});
