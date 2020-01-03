//@ts-check
import { ipcMain } from "electron";

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
    if (mainWindow) {
      mainWindow.webContents.send(Channel.HEALTH, IpcHelper.createMessage(Destination.main, Destination.renderer, null, null));
    } else {
      console.log("[MainIpcRoutes] Renderer process is null.");
    }
  }, 1000);
};

export default configureIpcRoutes;
