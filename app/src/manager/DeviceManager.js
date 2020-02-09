import { jsonGet } from "../http/client";

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
    return jsonGet("/device/external");
  }

  /**
   * Get all internal OpenHomeIoT devices.
   * @returns {Promise<any>} // TODO: type signature
   */
  getAllOpenHomeIoTDevices() {
    return jsonGet("/device/OpenHomeIoT");
  }

  /**
   * Get an external device by its usn.
   * @param {string} usn the usn of the device.
   * @returns {Promise<any>} // TODO: type signature
   */
  getExternal(usn) {
    return jsonGet(`/device/external/${usn}`);
  }

  /**
   * Get an OpenHomeIoT device by its usn.
   * @param {string} usn the usn of the device.
   * @returns {Promise<any>} // TODO: type signature
   */
  getOpenHomeIoTDevice(usn) {
    return jsonGet(`/device/OpenHomeIoT/${usn}`);
  }
}

export default getDeviceManagerInstance;
export { DeviceManager };
