//@ts-check
import deviceRoutes from "./routes/device";
import healthRoutes from "./routes/health";
import logRoutes from "./routes/log";
import rendererRoutes from "./routes/renderer";
import ssdpRoutes from "./routes/ssdp";

/**
 * Configure routes for interprocess communication.
 * @param {Electron.IpcMain} ipcMain
 * @param {Electron.BrowserWindow} mainWindow
 * @param {Electron.BrowserWindow} deviceProcess
 * @param {Electron.BrowserWindow} ssdpProcess
 */
const configureIpcRoutes = (ipcMain, mainWindow, deviceProcess, ssdpProcess) => {
  deviceRoutes.init(mainWindow, deviceProcess, ssdpProcess);
  rendererRoutes.init(mainWindow, deviceProcess, ssdpProcess);
  ssdpRoutes.init(mainWindow, deviceProcess, ssdpProcess);

  ipcMain.on("device.process_loaded", deviceRoutes.onInitialized);

  ipcMain.on("renderer.process_loaded", rendererRoutes.onInitialized);

  ipcMain.on("ssdp.process_loaded", ssdpRoutes.onInitialized);
  ipcMain.on("ssdp.devices_discovered", ssdpRoutes.onDevicesDiscovered);

  ipcMain.on("health", healthRoutes.onHealth);
  ipcMain.on("log", logRoutes.onLog);

  startHealthChecks(ipcMain, mainWindow, deviceProcess, ssdpProcess);
}

/**
 * Start the process health checks.
 * @param {Electron.IpcMain} ipcMain
 * @param {Electron.BrowserWindow} mainWindow
 * @param {Electron.BrowserWindow} deviceProcess
 * @param {Electron.BrowserWindow} ssdpProcess
 */
const startHealthChecks = (ipcMain, mainWindow, deviceProcess, ssdpProcess) => {
  setInterval(() => {
    mainWindow.webContents.send("health", { sender: "main", recipient: "renderer" });
    deviceProcess.webContents.send("health", { sender: "main", recipient: "device" });
    ssdpProcess.webContents.send("health", { sender: "main", recipient: "ssdp" });
  }, 3000);
};

export default configureIpcRoutes;
