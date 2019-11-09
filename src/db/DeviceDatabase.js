import Database from "./Database";
import DatabaseHelper from "./helper/DatabaseHelper";

class DeviceDatabase extends Database {

  static _instance = null;

  /**
   * 
   * @returns {DeviceDatabase}
   */
  static getInstance() {
    if (DeviceDatabase._instance === null) {
      DeviceDatabase._instance = new DeviceDatabase({});
    }
    return DeviceDatabase._instance;
  }

  /**
   * 
   * @param {{ isMemoryDB?: boolean, isLedger?: boolean, isTest?: boolean }} options 
   */
  constructor(options) {
    super("Devices", [
      { name: "usn", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "ssdpDescriptionLocation", type: DatabaseHelper.TEXT },
      { name: "ipAddress", type: DatabaseHelper.TEXT, },
      { name: "services", type: DatabaseHelper.TEXT, },
      { name: "configuredAsChild", type: DatabaseHelper.BOOLEAN },
      { name: "timeLastSeen", type: DatabaseHelper.BIGINT },
      { name: "timeDiscovered", type: DatabaseHelper.BIGINT, includeInUpdate: false },
      { name: "connectionStatus", type: DatabaseHelper.TEXT }
    ], options);
  }
}

export default DeviceDatabase;

