
class IpcHelper {

    /**
     * Create a new IPC message.
     * @param {string} origin the origin process.
     * @param {string} destination the destination process.
     * @param {string} requestID the request ID.
     * @param {object} data the object to send
     */
    static createMessage(origin, destination, requestID, data) {
        return { origin, destination, requestID, data };
    }

    /**
     * Check to see if a message is for a given process.
     * @param {{ origin: string, destination: string, requestID, data: any }} param0 the message
     * @param {*} process
     */
    static messageIsFor({ destination }, process) {
        return (destination != null) && (process == destination);
    }

    /**
     * Check to see if a message is from a given process.
     * @param {{ origin: string, destination: string, requestID, data: any }} param0 the message
     * @param {string} process the name of the process.
     */
    static messageIsFrom({ origin }, process) {
        return (origin != null) && (process === origin);
    }
}

export default IpcHelper;
