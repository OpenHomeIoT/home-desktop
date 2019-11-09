//@ts-check
import request from "request";

import DeviceDatabase from "../db/DeviceDatabase";
import IoTDevice from "../IoTDevice";

class DeviceManager {

  static _instance = null;

  /**
   * Get the DeviceManager instance.
   * @returns {DeviceManager} the DeviceManager instance.
   */
  static getInstance() {
    if (DeviceManager._instance == null) {
      DeviceManager._instance = new DeviceManager(DeviceDatabase.getInstance());
    }
    return DeviceManager._instance;
  }

  /**
   * 
   * @param {DeviceDatabase} deviceDatabase 
   */
  constructor(deviceDatabase) {
    this._deviceLedgerDatabase = deviceDatabase;

    // binding
    this.addDevice = this.addDevice.bind(this);
    this.configureDeviceAsChild = this.configureDeviceAsChild.bind(this);
    this.getAllDevices = this.getAllDevices.bind(this);
    this.getDeviceByUsn = this.getDeviceByUsn.bind(this);
  }

  /**
   * Add an IoTDevice to the DeviceLedgerDatabase.
   * @param {IoTDevice} device the iot device.
   * @param {string} host the ip address of this hub instance
   * @param {number} port the port
   */
  addDevice(device, host, port) {
    return this._deviceLedgerDatabase.insert(device.toJson())
      .then(() => this.configureDeviceAsChild(device.getUSN(), host, port))
      .then(() => console.log(`[DeviceManager] Added device: '${device.toString()}'`));
  }

  /**
   * Get all of the IoTDevices.
   * @returns {Promise<Array<IoTDevice>>} the IoTDevices.
   */
  getAllDevices() {
    return this._deviceLedgerDatabase.getAll()
      .then(deviceRecords => {
        const devices = [];
        for (const record of deviceRecords) {
          devices.push(IoTDevice.fromJson(record));
        }
        return devices;
      });
  }

  /**
   * Get an IoTDevice by its usn.
   * @param {string} usn the usn of the device.
   * @return {Promise<IoTDevice | null>} the IoTDevice.
   */
  getDeviceByUsn(usn) {
    return this._deviceLedgerDatabase.get(usn)
      .then(deviceRec => { return IoTDevice.fromJson(deviceRec); });
  }

  /**
   * Update an IoTDevice in the database.
   * @param {IoTDevice} iotDevice this IoTDevice.
   */
  updateDevice(iotDevice) {
    return this._deviceLedgerDatabase.update(iotDevice.toJson());
  }
};

export default DeviceManager;
