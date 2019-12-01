import { ipcRenderer } from "electron";
import SsdpManager from "./manager/SsdpManager";

const ssdpManager = SsdpManager.getInstance();
ssdpManager.startListening();

ipcRenderer.send("ssdp.process_loaded", { sender: "ssdp", recipient: "main" });

ipcRenderer.on("ssdp.quit_process", (event, { sender, recipient }) => {
    ssdpManager.stopListening();
});

ipcRenderer.on("health", (event, { sender, recipient }) => {
    ipcRenderer.send("health", { sender: "ssdp", recipient: "main", status: "OK" });
});
