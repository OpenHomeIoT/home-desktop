import Database from "../../common/database/Database";
import DatabaseHelper from "../../common/database/helper/DatabaseHelper";

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
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options 
   */
  constructor(options) {
    super({
      name: "Devices",
      isLedger: false,
      primaryKey: "usn",
      fields: [
        { name: "usn", type: DatabaseHelper.TEXT },
        { name: "ssdpDescriptionLocation", type: DatabaseHelper.TEXT },
        { name: "ipAddress", type: DatabaseHelper.TEXT, },
        { name: "services", type: DatabaseHelper.TEXT, },
        { name: "configuredAsChild", type: DatabaseHelper.BOOLEAN },
        { name: "timeLastSeen", type: DatabaseHelper.BIGINT },
        { name: "timeDiscovered", type: DatabaseHelper.BIGINT, includeInUpdate: false },
        { name: "connectionStatus", type: DatabaseHelper.TEXT }
      ]
    }, options);
  }
}

export default DeviceDatabase;

