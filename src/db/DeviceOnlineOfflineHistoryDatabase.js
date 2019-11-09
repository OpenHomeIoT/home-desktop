import Database from "./Database";
import DatabaseHelper from "./helper/DatabaseHelper";

class DeviceOnlineOfflineHistoryDatabase extends Database {

  static _instance = null;

  /**
   * @returns {DeviceOnlineOfflineHistoryDatabase}
   */
  static getInstance() {
    if (DeviceOnlineOfflineHistoryDatabase._instance === null) {
      DeviceOnlineOfflineHistoryDatabase._instance = new DeviceOnlineOfflineHistoryDatabase({ isLedger: true });
    }
    return DeviceOnlineOfflineHistoryDatabase._instance;
  }

  /**
   * 
   * @param {{ isMemoryDB?: boolean, isLedger?: boolean, isTest?: boolean }} options 
   */
  constructor(options) {
    super("DeviceOnlineOfflineHistory", [
      { name: "id", type: DatabaseHelper.INT, autoincrement: true, isPrimaryKey: true },
      { name: "usn", type: DatabaseHelper.TEXT },
      { name: "time", type: DatabaseHelper.BIGINT },
      { name: "isOnline", type: DatabaseHelper.INT }
    ], options);
  }
}

export default DeviceOnlineOfflineHistoryDatabase;
