import request from "request";

class DeviceMangager {

  static _instance = null;

  /**
   * Get the DeviceMangager instance.
   * @returns {DeviceMangager} the instance.
   */
  static getInstance() {
    if (DeviceMangager._instance == null) DeviceMangager._instance = new DeviceMangager();
    return DeviceMangager._instance;
  }

  /**
   * Create a new DeviceMangager.
   */
  constructor() {

    // binding
    this.getAllExternal = this.getAllExternal.bind(this);
    this.getAllInternal = this.getAllInternal.bind(this);
    this.getExternal = this.getExternal.bind(this);
    this.getInternal = this.getInternal.bind(this);

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
  getAllInternal() {
    return this._get("/device/internal");
  }

  /**
   * Get all device that need to be setup.
   * @returns {Promise<{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }[]>}
   */
  getAllToBeConfigured() {
    return this._get("/device/configurable");
  }

  /**
   * Get a device that needs to be configured.
   * @param {string} id the id of the device that needs to be configured.
   * @returns {Promise<{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }>}
   */
  getDeviceToBeConfigured(id) {
    return this._get(`/device/configurable/${id}`);
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
  getInternal(usn) {
    return this._get(`/device/internal/${usn}`);
  }

  /**
   * Perform a HTTP GET request.
   * @param {string} path the path.
   * @returns Promise<object> the response
   */
  _get(path) {
    return new Promise((resolve, reject) => {
      const host = "127.0.0.1";
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

export default DeviceMangager;
