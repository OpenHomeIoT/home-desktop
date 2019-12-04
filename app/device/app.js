import SsdpManager from "./manager/SsdpManager";
import configureIpcRoutes from "./ipc/configureIpcRoutes";

const ssdpManager = SsdpManager.getInstance();
ssdpManager.startListening();

configureIpcRoutes();
