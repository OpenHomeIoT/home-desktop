import Database from "./Database";

class DeviceDatabase extends Database {

  static _instance = null;

  /**
   * 
   * @returns {DeviceDatabase}
   */
  static getInstance() {
    if (DeviceDatabase._instance === null) {
      DeviceDatabase._instance = new DeviceDatabase();
    }
    return DeviceDatabase._instance;
  }

  constructor() {
    super("Devices", [
      { name: "usn", type: "TEXT", isPrimaryKey: true },
      { name: "ssdpDescriptionLocation", type: "TEXT", includeInUpdate: true },
      { name: "ipAddress", type: "TEXT", includeInUpdate: true },
      { name: "services", type: "TEXT", includeInUpdate: true },
      { name: "configuredAsChild", type: "BOOLEAN", includeInUpdate: true },
      { name: "timeLastSeen", type: "BIGINT", includeInUpdate: true },
      { name: "timeDiscovered", type: "BIGINT" },
      { name: "isOnline", type: "BOOLEAN", includeInUpdate: true },
    ]);
  }
}

export default DeviceDatabase;

