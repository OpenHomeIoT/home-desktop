//@ts-check
import { ipcRenderer } from "electron";

let mainWindow = null;
let deviceProcess = null;
let ssdpProcess = null;

/**
 * Initialize the ssdp process ipc routes.
 * @param {Electron.BroswerWindow} mainWindow the main widnow.
 * @param {Electron.BrowserWindow} deviceProcess the device process.
 * @param {Electron.BroswerWindow} ssdpProcess the ssdp process.
 */
const init = (mainWindow, deviceProcess, ssdpProcess) => {
  mainWindow = mainWindow;
  deviceProcess = deviceProcess;
  ssdpProcess = ssdpProcess;
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
  if (ssdpProcess == null) {
    return; // TODO: log error that ssdp routes were not initializd
  }
  if (message.recipient === "device") {
    // forward the message to the device process
    ssdpProcess.send("device.devices_discovered", message);
  }
};

export default {
  init,
  onInitialized,
  onDevicesDiscovered
};