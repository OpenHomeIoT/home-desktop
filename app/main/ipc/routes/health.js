import ProcessManager from "../../manager/ProcessManager";
import Destination from "../../../common/ipc/Destination";

const processManager = ProcessManager.getInstance();

/**
 * Called when a health status update from a process arrives.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data: { status: string } }} param1
 */
const onHealth = (event, { origin, destination, data }) => {
    if (destination === Destination.main) {
        switch (origin) {
            case Destination.device:
                processManager.updateDeviceProcessStatus(data.status);
                break;
            case Destination.renderer:
                processManager.updateRendererProcessStatus(data.status);
                break;
            default:
                break;
        }
    }
};

export default {
    onHealth
};
