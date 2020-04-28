const { app, BrowserWindow } = require('electron');
const launcherConfig = require("./launcher.json");
const path = require("path");

function createWindow () {
  // Create main window
  let win = new BrowserWindow({
    width: launcherConfig.WINDOW_SETTING.WINDOW_SIZE.WIDTH,
    height: launcherConfig.WINDOW_SETTING.WINDOW_SIZE.HEIGHT,
    webPreferences: {
      nodeIntegration: launcherConfig.ELECTRON_SETTINGS.NODE_INTEGRATION
    }
  });

  // Load the .html index file of the app.
  win.loadFile(path.resolve(__dirname, "public", launcherConfig.ELECTRON_SETTINGS.INDEX_HTML_FILE));
}

app.whenReady().then(createWindow);