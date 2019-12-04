
class IpcHelper {

    /**
     * Create a new IPC message.
     * @param {string} origin the origin process.
     * @param {string} destination the destination process.
     * @param {object} data the object to send
     */
    static createMessage(origin, destination, data) {
        return { origin, destination, data };
    }

    /**
     *
     * @param {{ origin: string, destination: string, data: any }} param0 the message
     * @param {string} process the name of the process.
     */
    static messageIsFrom({ origin }, process) {
        return (origin != null) && (process === origin);
    }
}

export default IpcHelper;
