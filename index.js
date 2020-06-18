const { app, BrowserWindow, Menu } = require('electron');
const launcherConfig = require("./launcher.json");
const path = require("path");
const { stderr } = require('process');

app.allowRendererProcessReuse = false

console.log(process.platform)

const { exec } = require('child_process');
 

function createWindow () {

 
  exec("java -jar Staxx.jar", (err, out, stderr) => {
    console.log(`Error: ${err}`, `Stdout: ${out}`, `Stderror: ${stderr}`);
  })
  
  // Create main window
  let win = new BrowserWindow({
    title: launcherConfig.WINDOW_SETTING.WINDOW_NAME,
    width: launcherConfig.WINDOW_SETTING.WINDOW_SIZE.WIDTH,
    height: launcherConfig.WINDOW_SETTING.WINDOW_SIZE.HEIGHT,
    resizable: launcherConfig.WINDOW_SETTING.RESIZABLE,
    fullscreen: launcherConfig.WINDOW_SETTING.FULLSCREEN,
    frame: !launcherConfig.WINDOW_SETTING.FRAMELESS,
    icon: launcherConfig.WINDOW_SETTING.WINDOW_ICON ? path.resolve(__dirname, "public", launcherConfig.WINDOW_SETTING.WINDOW_ICON) : false,
    webPreferences: {
      nodeIntegration: launcherConfig.ELECTRON_SETTINGS.NODE_INTEGRATION
    }
  });

  
  // Build menu
  (function buildMenu(){
    let menuTemplate = [];

    if (launcherConfig.MENU_SETTINGS.ITEM_QUIT || launcherConfig.MENU_SETTINGS.ITEM_ABOUT){
      let appItemTemplate = {
        label: launcherConfig.WINDOW_SETTING.WINDOW_NAME,
        submenu: []
      };

      if (launcherConfig.MENU_SETTINGS.ITEM_QUIT){
        appItemTemplate.submenu.push({ label: "Quit", role: "quit" });
      }
      if (launcherConfig.MENU_SETTINGS.ITEM_ABOUT){
        appItemTemplate.submenu.push({ label: "About", role: "about" });
      }

      menuTemplate.push(appItemTemplate);
    }

    if (launcherConfig.MENU_SETTINGS.ITEMS_CLIPBOARD){
      let editItemTemplate = {
        label: "Edit",
        submenu: []
      };

      if (launcherConfig.MENU_SETTINGS.ITEMS_CLIPBOARD){
        editItemTemplate.submenu.push({ label: "Cut", role: "cut" });
        editItemTemplate.submenu.push({ label: "Copy", role: "copy" });
        editItemTemplate.submenu.push({ label: "Paste", role: "paste" });
      }

      menuTemplate.push(editItemTemplate);
    }

    if (launcherConfig.MENU_SETTINGS.ITEMS_DEVTOOL){
      let devtoolItemTemplate = {
        label: "Devtool",
        submenu: []
      };

      if (launcherConfig.MENU_SETTINGS.ITEMS_DEVTOOL){
        devtoolItemTemplate.submenu.push({ label: "Reload", role: "reload" });
        devtoolItemTemplate.submenu.push({ label: "Devtool", role: "toggledevtools" });
      }

      menuTemplate.push(devtoolItemTemplate);
    }
  
    
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    win.setMenu(menu);
  })();

  (function handleEvent(){
    app.on('window-all-closed', () => {
      // Quit on darwin when all the window closed
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  
    app.on('activate', () => {
      // Create new window when no one is display
      if (win === null) {
        createWindow()
      }
    })
  })()

  // Load the .html index file of the app.
  win.loadFile(path.resolve(__dirname, "public", launcherConfig.ELECTRON_SETTINGS.INDEX_HTML_FILE));
}

app.whenReady().then(createWindow);