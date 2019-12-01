//@ts-check
import deviceRoutes from "./routes/device";
import healthRoutes from "./routes/health";
import logRoutes from "./routes/log";
import rendererRoutes from "./routes/renderer";

/**
 * Configure routes for interprocess communication.
 * @param {Electron.IpcMain} ipcMain
 * @param {Electron.BrowserWindow} mainWindow
 * @param {Electron.BrowserWindow} deviceProcess
 */
const configureIpcRoutes = (ipcMain, mainWindow, deviceProcess) => {
  deviceRoutes.init(mainWindow, deviceProcess);
  rendererRoutes.init(mainWindow, deviceProcess);

  ipcMain.on("device.process_loaded", deviceRoutes.onInitialized);

  ipcMain.on("renderer.process_loaded", rendererRoutes.onInitialized);

  ipcMain.on("health", healthRoutes.onHealth);
  ipcMain.on("log", logRoutes.onLog);

  startHealthChecks(ipcMain, mainWindow, deviceProcess);
}

/**
 * Start the process health checks.
 * @param {Electron.IpcMain} ipcMain
 * @param {Electron.BrowserWindow} mainWindow
 * @param {Electron.BrowserWindow} deviceProcess
 */
const startHealthChecks = (ipcMain, mainWindow, deviceProcess) => {
  setInterval(() => {
    mainWindow.webContents.send("health", { sender: "main", recipient: "renderer" });
    deviceProcess.webContents.send("health", { sender: "main", recipient: "device" });
  }, 3000);
};

export default configureIpcRoutes;
