//@ts-check
let _mainWindow = null;
let _deviceProcess = null;

/**
 * Initialize the renderer ipc routes.
 */
const init = (mainWindow, deviceProcess) => {
  _mainWindow = mainWindow;
  _deviceProcess = deviceProcess;
};

const onInitialized = (event, { sender, recipient }) => {
  console.log("Renderer process initialized.");
}

export default {
  init,
  onInitialized
};
