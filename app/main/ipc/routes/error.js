import Destination from "../../../common/ipc/Destination";
import IpcHelper from "../../../common/ipc/IpcHelper";

/**
 * Log an error.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, requestID: string, data: string}} message
 */
const onError = (event, message) => {
  const { origin, data: error } = message;
  if (IpcHelper.messageIsFor(message, Destination.main)) {
    console.error(`[Error] ${origin}: ${error}`);
  }
};

export default {
  onError
};
