import ProcessManager from "../../manager/ProcessManager";
import IpcHelper from "../../../common/ipc/IpcHelper";
import Destination from "../../../common/ipc/Destination";

const processManager = ProcessManager.getInstance();

/**
 * Called when a process is initialized
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string }} message
 */
const onProcessInitialized = (event, message) => {
  const { origin } = message;
  if (IpcHelper.messageIsFor(message, Destination.main)) {
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
 * @param {{ origin: string, destination: string }} message
 */
const onProcessQuit = (event, message) => {
  const { origin } = message;
  if (IpcHelper.messageIsFor(message, Destination.main)) {
    switch (origin) {
      case Destination.device:
        processManager.destroyDeviceProcess();
        break;
      case Destination.renderer:
        processManager.destroyRendererProcess();
        break;
    }
  }
};

export default {
  onProcessInitialized,
  onProcessQuit
};
