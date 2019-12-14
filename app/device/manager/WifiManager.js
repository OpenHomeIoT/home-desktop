import wifi from "node-wifi";
import WifiSetupInfoDatabase from "../db/WifiSetupInfoDatabase";

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
    this._timer = setInterval(() => this._searchForDevices(), 60000);
    this._searchForDevices();
  }

  /**
   * Stop listening.
   */
  stopListening() {
    clearInterval(this._timer);
  }

  _searchForDevices() {
    const wifiDB = this._wifiSetupInfoDB;
    wifi.scan((err, networks) => {
      if (err) {
        // TODO: ipc the error to main.
        return;
      }
      const internalDevices = networks.filter(network => network.ssid.toLowerCase().startsWith("oshiot-"));
      if (internalDevices.length > 0) {
        internalDevices.forEach(network => {
          wifiDB.exists(network)
          .then(exists => {
            if (!exists) {
              return wifiDB.insert({ id: network, ssid: network, timeDiscovered: Date.now() });
            }
          })
        });
      }
    });
  }
};

export default WifiManager;
