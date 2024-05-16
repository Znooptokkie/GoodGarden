function fetchPlantenAPI (apiUrl)
{
    fetch(apiUrl).then(response => response.json()).then(data => 
    {
 
        for (const plant of data.data) 
        {
            console.log(plant);
        }
    });
}
 
document.addEventListener("DOMContentLoaded", () =>
{
    fetchPlantenAPI("https://perenual.com/api/species-list?key=sk-CZEB66431774a19e35471");
});