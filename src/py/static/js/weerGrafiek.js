/**
 * Fetches weather data from an API and draws a bar chart with the fetched data using Chart.js.
 * @param {string}
 * @param {string}
 */
function fetchWeatherDataAndDrawChart(canvasId, apiUrl) {
    fetch(apiUrl)
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok.'))
        .then(data => {
            const dates = data.weather_forecast.map(item => {
                const [day, month, year] = item.dag.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                const weekdays = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
                const weekday = weekdays[date.getDay()];

                return `${weekday}`;
            });

            const temperatures = data.weather_forecast.map(item => item.max_temp);

            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                console.error('Canvas element not found.');
                return;
            }


            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Changed to bar chart type
                data: {
                    labels: dates,
                    datasets: [{
                        data: temperatures,
                        backgroundColor: 'rgba(143, 188, 143, 0.6)', // Changed background color for bars
                        borderColor: 'rgba(143, 188, 143, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'x', // Display bars vertically
                    maintainAspectRatio: false, // Disable aspect ratio
                    responsive: false, // Disable responsiveness
                    scales: {
                        y: {
                            beginAtZero: true // Ensure the y-axis starts from zero
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
    fetchWeatherDataAndDrawChart("sensorCanvas", "http://127.0.0.1:5000/weather");
});
