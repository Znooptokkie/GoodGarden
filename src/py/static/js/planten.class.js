class Plant 
{
    constructor(dataObject) 
    {
        this.id = dataObject.id;
        this.plantNaam = dataObject.plant_naam;
        this.plantensoort = dataObject.plantensoort;
        this.plantGeteelt = dataObject.plant_geteelt;
    }
}

class PlantGrid 
{
    constructor() 
    {
        this.grid = [];
        this.cols = 2;
        this.rows = 4;

        for (let i = 0; i < this.rows; i++) 
        {
            this.grid[i] = new Array(this.cols).fill(null);
        }
        this.loadData();
    }
    
    loadData() 
    {
        fetch('../script/json/plants.json')
            .then(response => {
                if (!response.ok) 
                {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => 
            {
                const filteredData = data.filter(plantObject => plantObject.plant_geteelt === 1);

                filteredData.slice(0, 8).forEach((plantObject, index) => 
                {
                    const plant = new Plant(plantObject);
                    const col = index % this.cols;
                    const row = Math.floor(index / this.cols);
                    this.grid[row][col] = plant;
                });

                this.displayGrid();
            })
            .catch(error => console.error('Error loading data:', error));
    }
    

    displayGrid() 
    {
       const plantenTable = document.getElementById("planten");

       let addPlaced = false;

       this.grid.forEach((row, rowIndex) => 
       {
           const tr = document.createElement("tr");

           row.forEach((plant, colIndex) => 
           {
               const td = document.createElement("td");

               if (plant) 
               {
                   const link = document.createElement("a");
                   link.href = `planteninfo.html?id=${plant.id}`;
           
                   const article = document.createElement("article");
                   article.classList.add("plant-container");
                   link.appendChild(article);
           
                   const img = article.appendChild(document.createElement("img"));
                   img.src = "../static/images/icon_awesome-apple-alt.png";
                   const h2 = article.appendChild(document.createElement("h2"));
                   h2.classList.add("plant-naam");
                   h2.textContent = plant.plantNaam;
           
                   td.appendChild(link);
               } 
               else if (!addPlaced)
               {
                   const article = document.createElement("article");
                   const img = article.appendChild(document.createElement("img"));
                   img.src = "../static/images/plus.png";
                   img.id = "toevoegen";
                   img.alt = "Add";
                   article.id = "modalButton";
                   article.onclick = openModal;
           
                   td.appendChild(article);
                   addPlaced = true;
               }

               tr.appendChild(td);
           });

           plantenTable.appendChild(tr);
       });

       if (!addPlaced) 
       {
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

document.addEventListener("DOMContentLoaded", () => 
{
    const plantGrid = new PlantGrid();
});