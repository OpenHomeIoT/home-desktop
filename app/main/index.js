import path from 'path';
import { app, crashReporter, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import configureIpcRoutes from "./ipc/routes.js";

const isDevelopment = process.env.NODE_ENV === 'development';

let tray = null;
let mainWindow = null;
let deviceProcess = null; // TODO: implement
let ssdpProcess = null; // TODO: implement
let forceQuit = false;

/**
 * Create the Device management process.
 */
const createDeviceProcess = () => {
  deviceProcess = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  deviceProcess.loadFile(path.resolve(path.join(__dirname, "../device/index.html")));
}

/**
 * Create the main window.
 */
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function(e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
        deviceProcess = null;
        ssdpProcess = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(props.x, props.y);
          },
        },
      ]).popup(mainWindow);
    });
  }
};

/**
 * Create the Ssdp process.
 */
const createSsdpProcess = () => {
  ssdpProcess = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  ssdpProcess.loadFile(path.resolve(path.join(__dirname, '../ssdp/index.html')));
}

/**
 * Initialize the app.
 */
const initializeApp = () => {
  createMainWindow();
  createDeviceProcess();
  createSsdpProcess();

  configureIpcRoutes(ipcMain);

  // create the tray
  // TODO: supply icon
  // tray = new Tray("");
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: "Open Hub", type: "normal" },
  //   { label: "Settings", type: "normal" },
  //   { type: "separator" },
  //   { label: "Exit", type: "normal" }
  // ]);
  // // TODO: set tooltip for tray
  // tray.setContextMenu(contextMenu);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'Hub',
  companyName: 'OpenSourceHomeIoT',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  initializeApp();
});
