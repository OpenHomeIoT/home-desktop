//@ts-check

/**
 * 
 * @param {Electron.IpcMainEvent} event 
 * @param {{ sender: string, recipient: string, message: string }} param1 
 */
const onLog = (event, { sender, recipient, message }) => {
    console.log(`[Log] ${sender} process: ${message}`);
};

export default {
    onLog
};
