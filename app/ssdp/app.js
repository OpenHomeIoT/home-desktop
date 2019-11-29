import { ipcRenderer } from "electron";

ipcRenderer.send("ssdp.process_loaded", { sender: "ssdp", recipient: "main" });