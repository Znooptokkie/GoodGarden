class OogstDataFetcher 
{
    constructor(elementId, chartType, chartLabels, backgroundColors, category, titleClass) 
    {
        this.elementId = elementId;
        this.chartType = chartType;
        this.chartLabels = chartLabels;
        this.backgroundColors = backgroundColors;
        this.category = category;
        this.titleClass = titleClass;
        this.chart = null;
    }

    fetchAndDisplayData() 
    {
        axios.get("http://127.0.0.1:5000/oogsten")
            .then(response => 
            {
                console.log("Data fetched successfully:", response.data);
                const categoryData = response.data.find(item => item[0] === this.category);
                if (categoryData)
                {
                    this.updateTitle();
                    this.createChart(categoryData.slice(1));
                }
                else
                {
                    console.error("Category data not found.");
                }
            })
            .catch(error => 
            {
                console.error("Error fetching data:", error);
            });
    }

    updateTitle() 
    {
        const titleElement = document.querySelector(`.${this.titleClass}`);
        if (titleElement) 
        {
            titleElement.textContent = this.category;
        }
        else 
        {
            console.error("Title element not found.");
        }
    }

    createChart(data) 
    {
        const ctx = document.getElementById(this.elementId).getContext("2d");
        if (!ctx) 
        {
            console.error("Canvas context is null. Check if element exists and is visible.");
            return;
        }

        this.chart = new Chart(ctx, 
        {
            type: this.chartType,
            data: 
            {
                labels: this.chartLabels, // ["Successfully Harvested", "Not Successfully Harvested"]
                datasets: [{
                    label: `${this.category} Oogst resultaat`,
                    data: data,
                    backgroundColor: this.backgroundColors,
                    borderWidth: 0
                }]
            },
            options: 
            {
                responsive: true,
                plugins: 
                {
                    legend: 
                    {
                        position: "top",
                    },
                    tooltip: 
                    {
                        mode: "index",
                        intersect: false,
                    },
                }
            }
        });
    }
}

const fruitChart = new OogstDataFetcher("pie-1", "pie", ["Gelukt", "Mislukt"], ["rgba(191, 215, 182)", "rgba(46, 86, 81)"], "Fruit", "pie-1-titel");
const vegetableChart = new OogstDataFetcher("pie-2", "pie", ["Gelukt", "Mislukt"], ["rgba(191, 215, 182)", "rgba(46, 86, 81)"], "Groente", "pie-2-titel");
const herbChart = new OogstDataFetcher("pie-3", "pie", ["Gelukt", "Mislukt"], ["rgba(191, 215, 182)", "rgba(46, 86, 81)"], "Kruiden", "pie-3-titel");

fruitChart.fetchAndDisplayData();
vegetableChart.fetchAndDisplayData();
herbChart.fetchAndDisplayData();
