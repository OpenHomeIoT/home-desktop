import ReconnectionBufferDatabase from "../db/ReconnectionBufferDatabase";
import DeviceOnlineHistoryDatabase from "../db/DeviceOnlineHistoryDatabase";
import DeviceLedgerDatabase from "../db/DeviceLedgerDatabase";
import DeviceManager from "./DeviceManager";

class DeviceStatusManager {

  static _instance = null;

  /**
   * @returns {DeviceStatusManager}
   */
  static getInstance() {
    if (DeviceStatusManager._instance === null) {
      DeviceStatusManager._instance = new DeviceStatusManager();
    }
    return DeviceStatusManager._instance;
  }

  constructor() {
    this._deviceLedgerDatabase = DeviceLedgerDatabase.getInstance(); // TODO: device online offline toggles
    this._deviceOnlineHistoryDatabase = DeviceOnlineHistoryDatabase.getInstance();
    this._reconnectionBufferDatabase = ReconnectionBufferDatabase.getInstance();

    this._deviceManager = DeviceManager.getInstance();

    // binding
    this.isDeviceReconnecting = this.isDeviceReconnecting.bind(this);
    this.setDeviceHasDisconnected = this.setDeviceHasDisconnected.bind(this);
    this.setDeviceHasReconnected = this.setDeviceHasConnected.bind(this);
    this.setDeviceIsReconnecting = this.setDeviceIsReconnecting.bind(this);

    this._setDeviceIsOnline = this._setDeviceIsOnline.bind(this);
  }

  /**
   * Check to see if a device is currently reconnecting.
   * @param {string} usn the device's usn.
   * @return {Promise<boolean>}
   */
  isDeviceReconnecting(usn) {
    return this._reconnectionBufferDatabase.hasReconnectionEntry(usn);
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
    .then(() => this._reconnectionBufferDatabase.removeReconnectionEntry(usn));
  }

  /**
   * Add a reconnection entry to the database for a device.
   * @param {string} usn the device's usn.
   */
  setDeviceIsReconnecting(usn) {
    const now = Date.now();
    
    return this._reconnectionBufferDatabase.addReconnectionEntry({ usn, timeAdded: now });
  }

  /**
   * Add a device to the reconnection queue.
   * @param {string} usn the device's usn.
   */
  _addDeviceToReconnectionQueue(usn) {

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
    .then(() => this._deviceOnlineHistoryDatabase.storeDeviceOnlineHistory({ usn, time: Date.now(), isOnline }))
    .then(() => (isOnline) ? this._addDeviceToReconnectionQueue(usn) : Promise.resolve());
  }
}

export default DeviceStatusManager;
