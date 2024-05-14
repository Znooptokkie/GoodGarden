const { app, BrowserWindow, ipcMain } = require("electron");
const express = require("express");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");
const path = require("path");

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json()); // Zorg ervoor dat je JSON bodies correct kunt verwerken

server.post("/submit-form", (req, res) => {
    const { plant_naam, plantensoort, kas_locatie } = req.body; // Voeg kas_locatie toe aan de destructuring
    const plant_geteelt = req.body.plant_geteelt === "true" ? "true" : "false";

    let options = {
        mode: "text",
        args: [plant_naam, plantensoort, plant_geteelt, kas_locatie], // Voeg kas_locatie toe aan de argumenten
    };

    PythonShell.run("src/py/script/db_connect_form.py", options, (err, results) => {
        if (err) {
            console.error(err);
            res.send("Er is een fout opgetreden");
        } else {
            console.log("Python script uitvoering resultaten:", results);
            res.send("Formulier succesvol verwerkt");
        }
    });
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        frame: false,
        icon: path.join(__dirname, "src/py/static/images/logo.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
        },
        minimizable: false, 
        resizable: false,   
    });

    mainWindow.loadFile(path.join(__dirname, "src/py/templates/index.html"));
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.setZoomFactor(1);
    });
}




/**
 * *Is voor het herladen van de pagina (werkt niet goed nog!)*/
ipcMain.on("reload-request", (event) => {
        console.log("Reload request received for URL:");
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        const urlElectron = path.join(__dirname, "src/py/templates/index.html");
        if (win) {
            console.log("Loading URL...");
            win.loadFile(urlElectron);
        } else {
            console.log("No window found.");
        }
      });

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});