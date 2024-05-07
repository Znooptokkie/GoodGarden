// Importeert de benodigde Electron modules om een desktopapplicatie te creëren.
const { app, BrowserWindow, globalShortcut, getCurrentWindow } = require("electron");

// Express framework om een HTTP-server op te zetten.
const express = require("express");

// Body-parser middleware om inkomende request bodies te parsen.
const bodyParser = require("body-parser");

// PythonShell om Python scripts binnen een NodeJS applicatie uit te voeren.
const { PythonShell } = require("python-shell");

// Path module voor het werken met bestandspaden.
const path = require("path");

// Definieert het pad naar de index.html van de Electron app.
// const urlElectron = path.join(__dirname, "src/index.html");

// Initialiseert de Express app.
const server = express();

// Configureert de express server om URL-encoded data te accepteren.
server.use(bodyParser.urlencoded({ extended: true }));

// Handler voor het "/submit-form" endpoint. Verwerkt formulierinzendingen.
server.post("/submit-form", (req, res) =>
{
  // Extracts form data from the request body.
  const { plant_naam, plantensoort } = req.body;
  const plant_geteelt = req.body.plant_geteelt == "true" ? "true" : "false";

  // Configuratieopties voor het uitvoeren van het Python script.
  let options = {
    mode: "text",
    args: [plant_naam, plantensoort, plant_geteelt],
  };

  // Voert een Python script uit en handelt de response af.
  PythonShell.run("src/py/script/db_connect_form.py", options, (err, results) =>
  {
    if (err)
    {
      console.error(err);
      res.send("Er is een fout opgetreden");
    }
    else
    {
      console.log("Python script uitvoering resultaten:", results);
      res.send("Formulier succesvol verwerkt");
      // In main.js, direct na het uitvoeren van het script
      mainWindow.webContents.reloadIgnoringCache();
    }
  });
});

// Definieert de poort waarop de server luistert.
// const PORT = 5000;
const PORT = 3000;
server.listen(PORT, () => 
{
  console.log(`Server is listening on port ${PORT}`);
});

let mainWindow; // Referentie naar het hoofdvenster van de Electron app.

// Creëert het hoofdvenster van de Electron app.
function createWindow() 
{
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    icon: path.join(__dirname, "src/py/static/images/logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // webSecurity: true,
    },
  });

    mainWindow.loadFile(path.join(__dirname, "src", "py", "templates", "index.html"));
}

// Wanneer de app klaar is, wordt het hoofdvenster gecreëerd.
app.whenReady().then(createWindow);

// Sluit de app af wanneer alle vensters gesloten zijn (behalve op macOS).
app.on("window-all-closed", () => 
{
  if (process.platform !== "darwin") 
  {
    app.quit();
  }
});

// Creëert het hoofdvenster opnieuw wanneer het app icoon wordt aangeklikt en er zijn geen vensters open.
app.on("activate", () => 
{

  if (BrowserWindow.getAllWindows().length === 0) 
  {
    createWindow();
  }
});

//////////////////////

// const herlaad = () => {
//   getCurrentWindow().reload();
// }

// globalShortcut.register("submit", herlaad);