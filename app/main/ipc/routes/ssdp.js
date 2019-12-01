//@ts-check
import { ipcRenderer } from "electron";

let _mainWindow = null;
let _deviceProcess = null;
let _ssdpProcess = null;

/**
 * Initialize the ssdp process ipc routes.
 * @param {Electron.BrowserWindow} mainWindow the main widnow.
 * @param {Electron.BrowserWindow} deviceProcess the device process.
 * @param {Electron.BrowserWindow} ssdpProcess the ssdp process.
 */
const init = (mainWindow, deviceProcess, ssdpProcess) => {
  _mainWindow = mainWindow;
  _deviceProcess = deviceProcess;
  _ssdpProcess = ssdpProcess;
};

/**
 * Called when the ssdp process is loaded.
 * @param {Electron.IpcMainEvent} event the ipc event
 * @param {{ sender: string, recipient: string }} param1 the ipc message.
 */
const onInitialized = (event, { sender, recipient }) => {
  console.log("SSDP process initialized.");
};

/**
 * Called when new devices are fouund by the ssdp process.
 * @param {Electron.IpcMainEvent} event the ipc event.
 * @param {{ sender: string, recipient: string, devices: { usn: string, ipAddress: string, ssdpDescriptionLocation: string }[] }} message the ipc message.
 */
const onDevicesDiscovered = (event, message) => {
  if (_ssdpProcess == null) {
    return; // TODO: log error that ssdp routes were not initializd
  }
  if (message.recipient === "device") {
    // forward the message to the device process
    _ssdpProcess.send("device.devices_discovered", message);
  }
};

export default {
  init,
  onInitialized,
  onDevicesDiscovered
};
