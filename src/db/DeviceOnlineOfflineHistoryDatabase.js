import Database from "./Database";

class DeviceOnlineOfflineHistoryDatabase extends Database {

  static _instance = null;

  /**
   * @returns {DeviceOnlineOfflineHistoryDatabase}
   */
  static getInstance() {
    if (DeviceOnlineOfflineHistoryDatabase._instance === null) {
      DeviceOnlineOfflineHistoryDatabase._instance = new DeviceOnlineOfflineHistoryDatabase();
    }
    return DeviceOnlineOfflineHistoryDatabase._instance;
  }

  constructor() {
    super("DeviceOnlineOfflineHistory", [
      { name: "id", type: "INTEGER", autoincrement: true, isPrimaryKey: true },
      { name: "usn", type: "TEXT" },
      { name: "time", type: "BIGINT" },
      { name: "isOnline", type: "INTEGER" }
    ], { isLedger: true });
  }
}

export default DeviceOnlineOfflineHistoryDatabase;
