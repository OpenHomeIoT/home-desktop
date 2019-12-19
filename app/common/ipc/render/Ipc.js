import { ipcRenderer } from "electron";
import IpcHelper from "../IpcHelper";

class Ipc {

    /**
     * Create a new Ipc object for communication with other processes.
     * @param {string} process the name of the process.
     */
    constructor(process) {
        this._process = process;
    }

    /**
     * Register a callback for a message from another process. // TODO: add support for multiple callbacks per channel.
     * @param {string} channel the channel to recieve the message in.
     * @param {({ origin: string, destination: string, requestID, data: any }) => {}} cb the callback function.
     */
    on(channel, cb) {
        ipcRenderer.on(channel, (_, message) => {
            if (IpcHelper.messageIsFor(message, this._process)) {
                cb(message);
            }
        });
    }

    /**
     * Send a message to another process.
     * @param {string} channel the channel to send the message in.
     * @param {string} destination the name of the destination process.
     * @param {string} requestID the request ID.
     * @param {any} data the data to send.
     */
    send(channel, destination, requestID, data) {
        const message = IpcHelper.createMessage(this._process, destination, requestID, data);
        ipcRenderer.send(channel, message);
    }
}

export default Ipc;
