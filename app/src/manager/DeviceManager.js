import request from "request";

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

    this._get = this._get.bind(this);
  }

  /**
   * Get all the external devices.
   * @returns {Promise<any>} // TODO: type signature
   */
  getAllExternal() {
    return this._get("/device/external");
  }

  /**
   * Get all internal OpenHomeIoT devices.
   * @returns {Promise<any>} // TODO: type signature
   */
  getAllOpenHomeIoTDevices() {
    return this._get("/device/OpenHomeIoT");
  }

  /**
   * Get an external device by its usn.
   * @param {string} usn the usn of the device.
   * @returns {Promise<any>} // TODO: type signature
   */
  getExternal(usn) {
    return this._get(`/device/external/${usn}`);
  }

  /**
   * Get an OpenHomeIoT device by its usn.
   * @param {string} usn the usn of the device.
   * @returns {Promise<any>} // TODO: type signature
   */
  getOpenHomeIoTDevice(usn) {
    return this._get(`/device/OpenHomeIoT/${usn}`);
  }

  /**
   * Perform a HTTP GET request.
   * @param {string} path the path.
   * @returns Promise<object> the response
   */
  _get(path) {
    return new Promise((resolve, reject) => {
      const host = "homehubdev.local";
      const port = 30027;
      request({
        url: `http://${host}:${port}${path}`,
        method: "GET"
      }, (err, response, body) => {
        if (err)
          reject(err);
        else
          resolve(JSON.parse(body));
      });
    });
  }
}

export default getDeviceManagerInstance;
export { DeviceManager };
