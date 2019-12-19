import Ipc from "../../common/ipc/render/Ipc";
import Destination from "../../common/ipc/Destination";
import Channel from "../../common/ipc/Channel";
import Database from "../../common/database/Database";
import { runInThisContext } from "vm";

class WifiSetupInfoDatabase extends Database {

  static _instance = null;

  /**
   * @returns {WifiSetupInfoDatabase}
   */
  static getInstance() {
    if (WifiSetupInfoDatabase._instance == null) {
      WifiSetupInfoDatabase._instance = new WifiSetupInfoDatabase();
    }
    return WifiSetupInfoDatabase._instance;
  }

  constructor() {
    super({
      name: "WifiSetupInfo",
      fields: [
        { name: "_id", type: "string" },
        { name: "ssid", type: "string" },
        { name: "timeDiscovered", type: "number" },
        { name: "timeLastSeen", type: "number" }
      ]
    }, { isMemoryDB: false });

    this._ipc = new Ipc(Destination.device);
    this._handleGetDevicesToBeConfigured = this._handleGetDevicesToBeConfigured.bind(this);

    this._ipc.on(Channel.DEVICE_GET_DEVICES_TO_CONFIGURE, this._handleGetDevicesToBeConfigured);
  }

  /**
   * Handle an IPC request for all devices that need to be configured.
   * //TODO: move all this logic to a new class
   * @param {{ origin: string, destination: string, requestID: string }} message
   */
  _handleGetDevicesToBeConfigured(message) {
    this.getAll()
    .then(wifiSetupInfos => {
      this._ipc.send(Channel.DEVICE_GET_DEVICES_TO_CONFIGURE, message.origin, message.requestID, wifiSetupInfos);
    });
  }
}

export default WifiSetupInfoDatabase;
