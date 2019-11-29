
let _mainWindow = null;
let _deviceProcess = null;
let _ssdpProcess = null;

const init = (mainWindow, deviceProcess, ssdpProcess) => {
  _mainWindow = mainWindow;
  _deviceProcess = deviceProcess;
  _ssdpProcess = ssdpProcess;
}

/**
 * Called when the device process is loaded.
 * @param {Electron.IpcEvent} event the ipc event
 * @param {{ sender: string, recipeient: string }} param0 the ipc message.
 */
const onInitialized = (event, { sender, recipient }) => {
  console.log("Device process initialized.");
}

export default {
  init,
  onInitialized
};
