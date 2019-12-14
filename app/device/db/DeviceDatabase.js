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
    super({
      name: "Devices",
      isLedger: false,
      primaryKey: "usn",
      fields: [
        { name: "usn", type: "string", required: true },
        { name: "ssdpDescriptionLocation", type: "string", required: true },
        { name: "ipAddress", type: "string", required: true },
        { name: "services", type: "string", required: true },
        { name: "configuredAsChild", type: "boolean", required: true },
        { name: "timeLastSeen", type: "number", required: true },
        { name: "timeDiscovered", type: "number", required: true },
        { name: "connectionStatus", type: "string", required: true },
        { name: "name", type: "string", required: true }
      ]
    }, options);
  }
}

export default DeviceDatabase;
