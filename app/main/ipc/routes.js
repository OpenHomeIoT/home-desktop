//@ts-check
import deviceRoutes from "./routes/device";
import rendererRoutes from "./routes/renderer";
import ssdpRoutes from "./routes/ssdp";

/**
 * Configure routes for interprocess communication.
 * @param {Electron.IpcMain} ipcMain
 */
const configureIpcRoutes = (ipcMain, mainWindow, deviceProcess, ssdpProcess) => {
  deviceRoutes.init(mainWindow, deviceProcess, ssdpProcess);
  rendererRoutes.init(mainWindow, deviceProcess, ssdpProcess);
  ssdpRoutes.init(mainWindow, deviceProcess, ssdpProcess);

  ipcMain.on("device.process_loaded", deviceRoutes.onInitialized);

  ipcMain.on("renderer.process_loaded", rendererRoutes.onInitialized);

  ipcMain.on("ssdp.process_loaded", ssdpRoutes.onInitialized);
  ipcMain.on("ssdp.devices_discovered", ssdpRoutes.onDevicesDiscovered);
}


export default configureIpcRoutes;