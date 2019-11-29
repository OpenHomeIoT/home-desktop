import { ipcRenderer } from "electron";

// TODO: move logic to common module
ipcRenderer.send("device.process_loaded", { sender: "device", recipient: "main" });