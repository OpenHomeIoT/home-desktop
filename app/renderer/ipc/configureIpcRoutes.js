import Ipc from "../../common/ipc/render/Ipc";
import IpcHelper from "../../common/ipc/IpcHelper";
import Channel from "../../common/ipc/Channel";
import Destination from "../../common/ipc/Destination";

const ipc = new Ipc(Destination.renderer);

const configureIpcRoutes = () => {
  ipc.on(Channel.HEALTH, message => {
    if (IpcHelper.messageIsFrom(message, Destination.main)) {
      ipc.send(Channel.HEALTH, Destination.main, { status: "OK" });
    }
  });

  ipc.on(Channel.PROCESS_QUIT, message => {
    if (IpcHelper.messageIsFrom(message, Destination.main)) {
      // TODO: handle quit
      ipc.send(Channel.PROCESS_QUIT, Destination.main, null);
    }
  })

  // send process initialized
  ipc.send(Channel.PROCESS_INITIALIZED, Destination.main, null);

  process.on("uncaughtException", err => {
    // TODO: implement
    ipc.send(Channel.LOG, Destination.main, JSON.stringify(err))
  });
};

export default configureIpcRoutes;
