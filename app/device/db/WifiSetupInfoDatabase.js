import Database from "../../common/database/Database";

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
    }, { isMemoryDB: true });
  }
}

export default WifiSetupInfoDatabase;
