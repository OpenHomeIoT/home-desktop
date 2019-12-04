import SsdpManager from "./manager/SsdpManager";
import configureIpcRoutes from "./ipc/configureIpcRoutes";
import Ipc from "../common/ipc/render/Ipc";
import Destination from "../common/ipc/Destination";
import Channel from "../common/ipc/Channel";
const ipc = new Ipc(Destination.device);

const ssdpManager = SsdpManager.getInstance();
ssdpManager.startListening();

window.onerror = (event, source, lineno, error) => {
  ipc.send(Channel.ERROR, Destination.main, JSON.stringify({ event, source, lineno, error }));
}

configureIpcRoutes();
