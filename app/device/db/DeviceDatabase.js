import Database from "../../common/database/Database";

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
    if (typeof options === "")
    super({
      name: "Devices",
      isLedger: false,
      primaryKey: "usn",
      fields: [
        { name: "usn", type: "string" },
        { name: "ssdpDescriptionLocation", type: "string" },
        { name: "ipAddress", type: "string", },
        { name: "services", type: "string", },
        { name: "configuredAsChild", type: "boolean" },
        { name: "timeLastSeen", type: "number" },
        { name: "timeDiscovered", type: "number", includeInUpdate: false },
        { name: "connectionStatus", type: "string" },
        { name: "name", type: "string" }
      ]
    }, options);
  }
}

export default DeviceDatabase;
