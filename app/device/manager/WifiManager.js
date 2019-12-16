import wifi from "node-wifi";
import WifiSetupInfoDatabase from "../db/WifiSetupInfoDatabase";
import { reverse } from "dns";

class WifiManager {

  static _instance = null;

  /**
   * @returns {WifiManager}
   */
  static getInstance() {
    if (WifiManager._instance == null) {
      WifiManager._instance = new WifiManager();
    }
    return WifiManager._instance;
  }

  constructor() {
    this._wifiSetupInfoDB = WifiSetupInfoDatabase.getInstance();

    // binding
    this.initialize = this.initialize.bind(this);
    this.startListening = this.startListening.bind(this);
    this.stopListening = this.stopListening.bind(this);
    this._searchForDevices = this._searchForDevices.bind(this);
  }

  /**
   * Initialize the WifiManager.
   */
  initialize() {
    wifi.init({ iface: null });
  }

  /**
   * Start listening for Open Source Home IoT devices that need to be configured.
   */
  startListening() {
    this._searchTimer = setInterval(() => this._searchForDevices(), 60000);
    this._cleanTimer = setInterval(() => this._cleanupOldWifiInfo(), 60000);
    this._searchForDevices();
  }

  /**
   * Stop listening.
   */
  stopListening() {
    clearInterval(this._searchTimer);
    clearInterval(this._cleanTimer);
  }

  /**
   * Cleanup any entries in the WifiSetupInfoDatabase that have not been seen within the last two minutes.
   */
  _cleanupOldWifiInfo() {
    this._wifiSetupInfoDB.getAll()
    .then(wifiInfos => {
      if (wifiInfos.length > 0) {
        wifiInfos.forEach(wifiInfo => this._verifyWifiInfo(wifiInfo));
      }
    })
  }

  /**
   * Handle a Wifi network scan result.
   * @param {Error} err the error, if any.
   * @param {any} networks the networks.
   */
  _handleWifiScan(err, networks) {
    if (err) {
      // TODO: ipc the error to main.
      return;
    }
    const wifiDB = this._wifiSetupInfoDB;
    const internalDevices = networks.filter(network => network.ssid.toLowerCase().startsWith("oshiot-"));
    if (internalDevices.length > 0) {
      internalDevices.forEach(network => {
        wifiDB.exists(network)
        .then(exists => {
          if (!exists) {
            // insert the wifi info into the database
            return wifiDB.insert({ id: network, ssid: network, timeDiscovered: Date.now() });
          } else {
            // update the timeLastSeen of the wifi info
            return wifiDB.get(network)
            .then(wifiInfo => {
              wifiInfo.timeLastSeen = Date.now();

            })
          }
        })
      });
    }
  }

  /**
   * Search of Open Source Home IoT devices that need to be configured to
   * access the network/Home Hub.
   */
  _searchForDevices() {
    wifi.scan((err, networks) => this._handleWifiScan(err, networks));
  }

  /**
   * Verify a Wifi info record.
   * @param {{ _id: string, _rev, ssid: string, timeDiscovered: number, timeLastSeen: number }} param0 the wifi info.
   */
  _verifyWifiInfo({ _id, _rev, ssid, timeDiscovered, timeLastSeen }) {
    const currentTime = Date.now();
    if (currentTime - timeLastSeen > (2 * 60000)) {
      return this._wifiSetupInfoDB.delete(_id, _rev);
    }
    return Promise.resolve();
  }
};

export default WifiManager;
