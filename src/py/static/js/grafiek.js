/**
 * Class to handle the creation and manipulation of line charts on a canvas.
 */
class LineChart 
{
    /**
     * Creates an instance of LineChart.
     * @param {string} canvasId - The ID of the canvas element where the chart will be drawn.
     */
    constructor(canvasId) 
    {
        this.canvas = document.getElementById(canvasId);
        if (this.canvas) 
        {
            this.ctx = this.canvas.getContext("2d");
        }
        this.padding = 35; // Default padding around the graph
    }

    /**
     * Clears the entire canvas, preparing it for a new drawing.
     */
    clearCanvas() 
    {
        if (this.canvas) 
        {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /**
     * Draws a line chart on the canvas using the provided data.
     * @param {Array<string>} xLabels - Labels for the x-axis.
     * @param {Array<number>} data - Data points for the chart, one per x-label.
     * @param {Array<number|string>} [yLabels=["", 10, 15, 20, 25, 30, 35, 40]] - Labels for the y-axis.
     */
    drawChart(xLabels, data, yLabels = [0, 5, 10, 15, 20, 25, 30, 35, 40]) 
    {
        if (!this.canvas) 
        {
            return; // Exit if canvas is not initialized
        }
        
        this.clearCanvas();
        const graphWidth = this.canvas.width - this.padding * 2;
        const graphHeight = this.canvas.height - this.padding * 2;
        const maxValue = Math.max(...yLabels);
        const graphScale = graphHeight / maxValue;
        
        // Draw the axes
        this.ctx.strokeStyle = "rgb(46, 86, 81)";
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding, this.padding);
        this.ctx.lineTo(this.padding, this.canvas.height - this.padding);
        this.ctx.lineTo(this.canvas.width - this.padding, this.canvas.height - this.padding);
        this.ctx.stroke();
        
        // Calculate increments for plotting points
        const xIncrement = graphWidth / (xLabels.length - 1);
        
        // Plot the data points and draw the line
        this.ctx.strokeStyle = "rgb(191, 215, 182)";
        this.ctx.beginPath();
        let xPos = this.padding;
        let yPos = this.canvas.height - this.padding - (data[0] * graphScale);
        this.ctx.moveTo(xPos, yPos);
        
        for (let i = 1; i < data.length; i++) 
        {
            xPos = this.padding + i * xIncrement;
            yPos = this.canvas.height - this.padding - (data[i] * graphScale);
            this.ctx.lineTo(xPos, yPos);
        }
        this.ctx.stroke();
        
        // Draw points on the line and temperature labels
        this.ctx.fillStyle = "rgb(46, 86, 81)";
        for (let i = 0; i < data.length; i++) 
        {
            xPos = this.padding + i * xIncrement;
            yPos = this.canvas.height - this.padding - (data[i] * graphScale);
        
            // Draw point for each data entry
            this.ctx.beginPath();
            this.ctx.arc(xPos, yPos, 3, 0, Math.PI * 2);
            this.ctx.fill();
        
            // Draw temperature values beside each point 
            this.ctx.fillStyle = "rgb(46, 86, 81)";
            this.ctx.fillText(data[i] + "°C", xPos + 10, yPos - 10);
        }
        
        // Draw y-axis labels
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "middle"; // Center the text vertically
        for (let i = 0; i < yLabels.length; i++) 
        {
            const label = yLabels[i];
            // Calculate the y position for the label
            yPos = this.canvas.height - this.padding - (label * graphScale);
            this.ctx.fillText(label, this.padding - 10, yPos);
        }
        
        // Draw x-axis labels
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "alphabetic"; // Default vertical alignment for text
        for (let i = 0; i < xLabels.length; i++) 
        {
            xPos = this.padding + i * xIncrement;
            if (xLabels[i] !== "") 
            {
                this.ctx.fillText(xLabels[i], xPos, this.canvas.height - this.padding + 20);
            }
        }
    }
    
}    
/**
 * Fetches weather data from an API and draws a line chart with the fetched data.
 * @param {LineChart} chart - The LineChart instance to draw on.
 * @param {string} apiUrl - The URL to fetch the weather data from.
 */
function fetchWeatherDataAndDrawChart(chart, apiUrl) {
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

            // Draw the chart with the transformed dates and temperatures
            chart.drawChart(dates, temperatures);
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}



// Utility function to return the weekday in Dutch
function getWeekday(date) {
    const options = { weekday: 'short' };
    return date.toLocaleDateString('nl-NL', options);
}

const myChart = new LineChart("myCanvas");
fetchWeatherDataAndDrawChart(myChart, "http://127.0.0.1:5000/weather");