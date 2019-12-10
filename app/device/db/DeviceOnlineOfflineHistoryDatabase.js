import Database from "../../common/database/Database";

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

  /**
   *
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options
   */
  constructor(options) {
    super({
      name: "DeviceOnlineOfflineHistory",
      isLedger: true,
      primaryKey: "id",
      fields: [
        { name: "id", type: "bigint", autoincrement: true },
        { name: "usn", type: "string" },
        { name: "time", type: "bigint" },
        { name: "isOnline", type: "bigint" }
      ]
    }, options);
  }
}

export default DeviceOnlineOfflineHistoryDatabase;
