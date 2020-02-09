import { jsonGet } from "../http/client";
import Cache from "./cache/Cache";

let instance = null;

/**
 * Get the DeviceManager instance.
 * @returns {DeviceManager}
 */
const getDeviceManagerInstance = () => {
  if (instance == null) instance = new DeviceManager();
  return instance;
};

class DeviceManager {

  /**
   * Create a new DeviceMangager.
   */
  constructor() {
    this._externalCache = new Cache("ExternalDevices");
    this._openHomeIoTCache = new Cache("OpenHomeIoTDevices");

    // binding
    this.getAllExternal = this.getAllExternal.bind(this);
    this.getAllOpenHomeIoTDevices = this.getAllOpenHomeIoTDevices.bind(this);
    this.getExternal = this.getExternal.bind(this);
    this.getOpenHomeIoTDevice = this.getOpenHomeIoTDevice.bind(this);
  }

  /**
   * Get all the external devices.
   * @returns {Promise<any>} // TODO: type signature
   */
  getAllExternal() {
    return this._externalCache.count()
    .then(count => {
      if (count > 0) {
        this._loadAllExternal();
        return this._externalCache.getAll();
      }
      return this._loadAllExternal();
    });
  }

  /**
   * Get all internal OpenHomeIoT devices.
   * @returns {Promise<any>} // TODO: type signature
   */
  getAllOpenHomeIoTDevices() {
    return this._openHomeIoTCache.count()
    .then(count => {
      if (count > 0) {
        this._loadAllOpenHomeIoT()
        return this._openHomeIoTCache.getAll();
      }
      return this._loadAllOpenHomeIoT();
    });
  }

  /**
   * Get an external device by its usn.
   * @param {string} usn the usn of the device.
   * @returns {Promise<any>} // TODO: type signature
   */
  getExternal(usn) {
    return this._externalCache.exists(usn)
    .then(exists => (exists) ? this._externalCache.get(usn) : this._loadExternal(usn));
  }

  /**
   * Get an OpenHomeIoT device by its usn.
   * @param {string} usn the usn of the device.
   * @returns {Promise<any>} // TODO: type signature
   */
  getOpenHomeIoTDevice(usn) {
    return this._openHomeIoTCache.exists(usn)
    .then(exists => (exists) ? this._openHomeIoTCache.get(usn) : this._loadOpenHomeIoT(usn));
  }

  /**
   * Load and cache all external devices.
   * @returns Promise<any[]> // TODO: type signature.
   */
  _loadAllExternal() {
    return jsonGet("/device/external")
    .then(externalDevices => {
      externalDevices.forEach(externalDevice => this._externalCache.insert(externalDevice));
      return externalDevices;
    });
  }

  /**
   * Load and cache all OpenHomeIoT devices.
   */
  _loadAllOpenHomeIoT() {
    return jsonGet("/device/OpenHomeIoT")
    .then(iotDevices => {
      iotDevices.forEach(iotDevice => this._openHomeIoTCache.insert(iotDevice));
      return iotDevices;
    });
  }

  /**
   * Load and cache an external device.
   * @param {string} usn the usn of the device.
   */
  _loadExternal(usn) {
    return jsonGet(`/device/external/${usn}`)
    .then(externalDevice => {
      this._externalCache.insert(externalDevice);
      return externalDevice;
    });
  }

  /**
   * Load the OpenHomeIoT device and cache it.
   * @param {string} usn the usn of the device.
   */
  _loadOpenHomeIoT(usn) {
    return jsonGet(`/device/OpenHomeIoT/${usn}`)
    .then(iotDevice => {
      this._openHomeIoTCache.insert(iotDevice);
      return iotDevice;
    })
  }
}

export default getDeviceManagerInstance;
export { DeviceManager };
