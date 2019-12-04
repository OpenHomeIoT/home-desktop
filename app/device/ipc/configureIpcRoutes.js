import Ipc from "../../common/ipc/render/Ipc";
import IpcHelper from "../../common/ipc/IpcHelper";
import Channel from "../../common/ipc/Channel";
import Destination from "../../common/ipc/Destination";

const ipc = new Ipc(Destination.device);

const configureIpcRoutes = () => {
  // handle close
  ipc.on(Channel.PROCESS_CLOSE, message => {
    if (IpcHelper.messageIsFrom(message, Destination.main)) {
        window.close();
    }
  });

  ipc.on(Channel.HEALTH, message => {
    if (IpcHelper.messageIsFrom(message, Destination.main)) {
        ipc.send(Channel.HEALTH, Destination.main, { status: "OK" });
    }
  });

  // send process initialized
  ipc.send(Channel.PROCESS_INITIALIZED, Destination.main, null);

  process.on("uncaughtException", err => {
    // TODO: implement
    ipc.send(Channel.LOG, Destination.main, JSON.stringify(err))
  });
};

export default configureIpcRoutes;
