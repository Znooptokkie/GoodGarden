// Definitie van de Plant klasse.
class Plant {
    // Constructor om een Plant object te initialiseren met data van een dataObject.
    constructor(dataObject) {
        // Initialiseren van de eigenschappen van de plant.
        this.id = dataObject.id;
        this.plantNaam = dataObject.plant_naam; // Naam van de plant.
        this.plantensoort = dataObject.plantensoort; // Soort van de plant.
        this.plantGeteelt = dataObject.plant_geteelt; // Geteelt status van de plant.
    }
}

class PlantGrid {
    // Constructor om een PlantGrid object te initialiseren.
    constructor() {
        this.grid = []; // De datastructuur die het raster van planten bevat.
        this.cols = 2; // Aantal kolommen in het raster.
        this.rows = 4; // Aantal rijen in het raster (inclusief de rij voor de "Toevoegen" knop).

        // Initialiseren van het raster met null waarden.
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols).fill(null);
        }
        console.log(this.grid);

        // Laadt JSON data van de server.
        this.loadData();
    }
    
    // Methode om data te laden.
    loadData() {
        fetch('../script/json/plants.json')
            .then(response => {
                // Controleer of de netwerkrespons ok is.
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse de JSON uit de respons.
            })
            .then(data => {
                // Filter de data op planten die geteeld zijn.
                const filteredData = data.filter(plantObject => plantObject.plant_geteelt === 1);

                // Vul het raster met plantobjecten.
                filteredData.slice(0, 8).forEach((plantObject, index) => {
                    const plant = new Plant(plantObject); // Maak een nieuw Plant object.
                    const col = index % this.cols; // Bereken de kolomindex.
                    const row = Math.floor(index / this.cols); // Bereken de rijindex.
                    this.grid[row][col] = plant; // Voeg de plant toe aan het raster.
                });

                // Toon het raster in de HTML tabel met id "planten".
                this.displayGrid();
            })
            .catch(error => console.error('Error loading data:', error)); // Log eventuele fouten.
    }
    

    displayGrid() 
{
    const plantenTable = document.getElementById("planten");

    let addPlaced = false; // Flag to track if the "Add" button has been placed

    this.grid.forEach((row, rowIndex) => 
    {
        const tr = document.createElement("tr");

        row.forEach((plant, colIndex) => 
        {
            const td = document.createElement("td");

            if (plant) 
            {
                // Handle regular plant items
                const link = document.createElement("a");
                link.href = `planteninfo.html?id=${plant.id}`; // Link to the plant info page with plant id as query parameter
        
                const article = document.createElement("article");
                article.classList.add("plant-container");
                link.appendChild(article); // Append the article to the link
        
                const img = article.appendChild(document.createElement("img"));
                img.src = "../static/images/icon_awesome-apple-alt.png";
                const h2 = article.appendChild(document.createElement("h2"));
                h2.classList.add("plant-naam");
                h2.textContent = plant.plantNaam;
        
                td.appendChild(link); // Append the link to the td
            } 
            else if (!addPlaced) // Check if the "Add" button has not been placed yet
            {
                // Handle the "Add" button
                const article = document.createElement("article");
                const img = article.appendChild(document.createElement("img"));
                img.src = "../static/images/plus.png";
                img.id = "toevoegen";
                img.alt = "Add";
                article.id = "modalButton";
                article.onclick = openModal;
        
                td.appendChild(article);
                addPlaced = true; // Set the flag to true after placing the "Add" button
            }

            tr.appendChild(td);
        });

        plantenTable.appendChild(tr);
    });

    // If no "Add" button has been placed and there is still space, add it at the end
    if (!addPlaced) 
    {
        // Assume last tr and td are available for simplicity, you may need to create new if not existing
        const lastTr = plantenTable.lastChild;
        const td = document.createElement("td");
        const article = document.createElement("article");
        const img = article.appendChild(document.createElement("img"));
        img.src = "../static/images/plus.png";
        img.id = "toevoegen";
        img.alt = "Add";
        article.id = "modalButton";
        article.onclick = openModal;
        td.appendChild(article);
        lastTr.appendChild(td);
    }
}



}

document.addEventListener("DOMContentLoaded", () => {
    const plantGrid = new PlantGrid();
});