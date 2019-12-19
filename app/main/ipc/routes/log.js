import IpcHelper from "../../../common/ipc/IpcHelper";
import Destination from "../../../common/ipc/Destination";

//@ts-check

/**
 *
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, requestID: string, data: string }} message
 */
const onLog = (event, message) => {
    const { origin, data } = message;
    if (IpcHelper.messageIsFor(message, Destination.main)) {
        console.log(`[Log] ${origin}: ${data}`);
    }
};

export default {
    onLog
};
