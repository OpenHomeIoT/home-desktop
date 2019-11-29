//@ts-check
let _mainWindow = null;
let _deviceProcess = null;
let _ssdpProcess = null;

/**
 * Initialize the renderer ipc routes.
 */
const init = (mainWindow, deviceProcess, ssdpProcess) => {
  _mainWindow = mainWindow;
  _deviceProcess = deviceProcess;
  _ssdpProcess = ssdpProcess;
};

const onInitialized = (event, { sender, recipient }) => {
  console.log("Renderer process initialized.");
}

export default {
  init,
  onInitialized
};
