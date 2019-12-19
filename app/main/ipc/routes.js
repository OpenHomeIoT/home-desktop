//@ts-check
import { ipcMain } from "electron";

import deviceRoutes from "./routes/device";
import errorRoutes from "./routes/error";
import healthRoutes from "./routes/health";
import logRoutes from "./routes/log";
import processRoutes from "./routes/process";
import ProcessManager from "../manager/ProcessManager";
import Channel from "../../common/ipc/Channel";
import Destination from "../../common/ipc/Destination";
import IpcHelper from "../../common/ipc/IpcHelper";

const processManager = ProcessManager.getInstance();

/**
 * Configure routes for interprocess communication.
 */
const configureIpcRoutes = () => {
  ipcMain.on(Channel.DEVICE_GET_ALL_DEVICES, deviceRoutes.onGetAllDevices);
  ipcMain.on(Channel.DEVICE_GET_DEVICE, deviceRoutes.onGetDevice);
  ipcMain.on(Channel.DEVICE_GET_DEVICES_TO_CONFIGURE, deviceRoutes.onGetDevicesToBeConfigured);
  ipcMain.on(Channel.DEVICE_NEW_DEVICE_TO_CONFIGURE, deviceRoutes.onNewDeviceToBeConfigured);
  ipcMain.on(Channel.DEVICE_DEVICE_TO_CONFIGURE_OFFLINE, deviceRoutes.onDeviceToBeConfiguredWentOffline);
  ipcMain.on(Channel.DEVICE_UPDATE_DEVICE, deviceRoutes.onUpdateDevice);
  ipcMain.on(Channel.ERROR, errorRoutes.onError);
  ipcMain.on(Channel.HEALTH, healthRoutes.onHealth);
  ipcMain.on(Channel.LOG, logRoutes.onLog);
  ipcMain.on(Channel.PROCESS_INITIALIZED, processRoutes.onProcessInitialized);
  ipcMain.on(Channel.PROCESS_QUIT, processRoutes.onProcessQuit);

  startHealthChecks();
}

/**
 * Start the process health checks.
 */
const startHealthChecks = () => {
  setInterval(() => {
    const mainWindow = processManager.getRendererProcess();
    const deviceProcess = processManager.getDeviceProcess();
    if (mainWindow) {
      mainWindow.webContents.send(Channel.HEALTH, IpcHelper.createMessage(Destination.main, Destination.renderer, null, null));
    } else {
      console.log("[MainIpcRoutes] Renderer process is null.");
    }
    if (deviceProcess) {
      deviceProcess.webContents.send(Channel.HEALTH, IpcHelper.createMessage(Destination.main, Destination.device, null, null));
    } else {
      processManager.updateDeviceProcessStatus("Dead");
      processManager.createDeviceProcess();
    }
  }, 1000);
};

export default configureIpcRoutes;
