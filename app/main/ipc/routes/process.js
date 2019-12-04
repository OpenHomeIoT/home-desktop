import ProcessManager from "../../manager/ProcessManager";
import IpcHelper from "../../../common/ipc/IpcHelper";
import Destination from "../../../common/ipc/Destination";

const processManager = ProcessManager.getInstance();

/**
 * Called when a process is initialized
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string }} param1
 */
const onProcessInitialized = (event, { origin, destination }) => {
  if (destination === Destination.main) {
    switch (origin) {
      case Destination.renderer:
        processManager.updateRendererProcessStatus("Initialized");
        break;
      case Destination.device:
        processManager.updateDeviceProcessStatus("Initialized");
        break;
    }
  }
};

/**
 * Called when a process quits.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string }} param1
 */
const onProcessQuit = (event, { origin, destination }) => {
  if (destination === Destination.main) {
    switch (origin) {
      case Destination.device:
        // TODO: processManager.handleDeviceProcessClose();
        break;
      case Destination.renderer:
        // TODO: processManager.handleRendererProcessClose();
        break;
    }
  }
};

export default {
  onProcessInitialized,
  onProcessQuit
};
