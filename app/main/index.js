//@ts-check
import { app, crashReporter } from 'electron';
import configureIpcRoutes from "./ipc/routes.js";
import ProcessManager from "./manager/ProcessManager";

const isDevelopment = process.env.NODE_ENV === 'development';

let tray = null;

const processManager = ProcessManager.getInstance();

/**
 * Initialize the app.
 */
const initializeApp = () => {
  processManager.createRendererProcess();
  processManager.createDeviceProcess();

  configureIpcRoutes();
  processManager.startWatchingProcesses();

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
    processManager.stopWatchingProcesses();
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  initializeApp();
});
