import Database from "../../common/database/Database";
import DatabaseHelper from "../../common/database/helper/DatabaseHelper";

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
        { name: "id", type: DatabaseHelper.INT, autoincrement: true },
        { name: "usn", type: DatabaseHelper.TEXT },
        { name: "time", type: DatabaseHelper.BIGINT },
        { name: "isOnline", type: DatabaseHelper.INT }
      ]
    }, options);
  }
}

export default DeviceOnlineOfflineHistoryDatabase;
