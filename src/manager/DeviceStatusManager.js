import ConnectionBufferDatabase from "../db/ConnectionBufferDatabase";
import DeviceOnlineOfflineHistoryDatabase from "../db/DeviceOnlineOfflineHistoryDatabase";
import DeviceDatabase from "../db/DeviceDatabase";
import DeviceManager from "./DeviceManager";

class DeviceStatusManager {

  static _instance = null;

  /**
   * @returns {DeviceStatusManager}
   */
  static getInstance() {
    if (DeviceStatusManager._instance === null) {
      DeviceStatusManager._instance = new DeviceStatusManager(DeviceOnlineOfflineHistoryDatabase.getInstance(), ConnectionBufferDatabase.getInstance(), DeviceManager.getInstance());
    }
    return DeviceStatusManager._instance;
  }


  /**
   * 
   * @param {DeviceOnlineOfflineHistoryDatabase} onlineOfflineHistoryDatabase `
   * @param {ConnectionBufferDatabase} reconnectionBufferDatabase 
   * @param {DeviceManager} deviceManager 
   */
  constructor(onlineOfflineHistoryDatabase, 
              reconnectionBufferDatabase,
              deviceManager) {
    this._onlineOfflineHistoryDatabase = onlineOfflineHistoryDatabase;
    this._reconnectionBufferDatabase = reconnectionBufferDatabase;
    this._deviceManager = deviceManager;

    // binding
    this.isDeviceReconnecting = this.isDeviceReconnecting.bind(this);
    this.setDeviceHasDisconnected = this.setDeviceHasDisconnected.bind(this);
    this.setDeviceHasReconnected = this.setDeviceHasConnected.bind(this);
    this.setDeviceIsReconnecting = this.setDeviceIsReconnecting.bind(this);

    this._setDeviceIsOnline = this._setDeviceIsOnline.bind(this);
  }

  /**
   * Set that a device has disconnected from the hub.
   * @param {string} usn the device's usn.
   * @returns {Promise<void>}
   */
  setDeviceHasDisconnected(usn) {
    return this._setDeviceIsOnline(usn, false);
  }

  /**
   * Set that a device has reconnected.
   * @param {string} usn the device's usn.
   * @returns {Promise<void>}
   */
  setDeviceHasConnected(usn) {
    return Promise.resolve()
    .then(() => this._setDeviceIsOnline(usn, true))
    .then(() => this._reconnectionBufferDatabase.delete(usn));
  }

  /**
   * Add a reconnection entry to the database for a device.
   * @param {string} usn the device's usn.
   */
  setDeviceIsReconnecting(usn) {
    const now = Date.now();
    
    return this._reconnectionBufferDatabase.get(usn)
    .then(reconnectionInfo => { 
      if (!reconnectionInfo) return this._reconnectionBufferDatabase.insert({ usn, timeAdded: now });
    });
  }

  /**
   * Set a device's online status.
   * @param {string} usn the device's usn.
   * @param {boolean} isOnline the online status.
   */
  _setDeviceIsOnline(usn, isOnline) {
    return Promise.resolve()
    .then(() => this._deviceManager.getDeviceByUsn(usn))
    .then(iotDevice => {
      if (!isOnline) {
        iotDevice.setLastSeen(Date.now());
      }
      iotDevice.setOnline(isOnline);
      return this._deviceManager.updateDevice(iotDevice);
    })
    .then(() => this._onlineOfflineHistoryDatabase.insert({ usn, time: Date.now(), isOnline }))
    .then(() => (isOnline) ? this.setDeviceIsReconnecting(usn) : Promise.resolve());
  }
}

export default DeviceStatusManager;
