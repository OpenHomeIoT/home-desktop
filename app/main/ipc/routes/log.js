//@ts-check

/**
 *
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data: string }} param1
 */
const onLog = (event, { origin, destination, data }) => {
    console.log(`[Log] ${origin}: ${data}`);
};

export default {
    onLog
};
