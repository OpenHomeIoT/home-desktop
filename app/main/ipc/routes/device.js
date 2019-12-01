
let _mainWindow = null;
let _deviceProcess = null;

const init = (mainWindow, deviceProcess) => {
  _mainWindow = mainWindow;
  _deviceProcess = deviceProcess;
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
