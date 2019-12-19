import Ipc from "../../common/ipc/render/Ipc";
import IpcHelper from "../../common/ipc/IpcHelper";
import Channel from "../../common/ipc/Channel";
import Destination from "../../common/ipc/Destination";

const ipc = new Ipc(Destination.device);

const configureIpcRoutes = () => {
  ipc.on(Channel.HEALTH, message => {
    if (IpcHelper.messageIsFrom(message, Destination.main)) {
      ipc.send(Channel.HEALTH, Destination.main, message.requestID, { status: "OK" });
    }
  });

  ipc.on(Channel.PROCESS_QUIT, message => {
    if (IpcHelper.messageIsFrom(message, Destination.main)) {
      ipc.send(Channel.PROCESS_QUIT, Destination.main, message.requestID);
      process.exit();
    }
  });

  process.on("uncaughtException", err => {
    ipc.send(Channel.LOG, Destination.main, null, JSON.stringify(err))
  });

   // send process initialized
   ipc.send(Channel.PROCESS_INITIALIZED, Destination.main, null, null);
};

export default configureIpcRoutes;
