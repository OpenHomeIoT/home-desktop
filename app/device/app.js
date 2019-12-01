import { ipcRenderer } from "electron";

// TODO: move logic to common module
ipcRenderer.send("device.process_loaded", { sender: "device", recipient: "main" });

ipcRenderer.on("device.quit_process", (event, { sender, recipient }) => {
    window.close();
});

ipcRenderer.on("health", (event, { sender, recipient }) => {
    ipcRenderer.send("health", { sender: "device", recipient: "main", status: "OK" });
});
