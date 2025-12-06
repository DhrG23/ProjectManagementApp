//main.js
const { app, BrowserWindow } = require('electron')
const path = require("path");

const pjmWindow = () => {
  const win = new BrowserWindow({
    width:1920,
    height:1080,
    webPreferences:{
      preload: path.join(__dirname,"preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then( () => {
  pjmWindow();
});
