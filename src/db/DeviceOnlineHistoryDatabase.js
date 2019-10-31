import Database from "./Database";

const TABLE_ONLINE_HISTORY = "DeviceOnlineHistory";

class DeviceOnlineHistoryDatabase extends Database {

  static _instance = null;

  /**
   * @returns {DeviceOnlineHistoryDatabase}
   */
  static getInstance() {
    if (DeviceOnlineHistoryDatabase._instance === null) {
      DeviceOnlineHistoryDatabase._instance = new DeviceOnlineHistoryDatabase();
    }
    return DeviceOnlineHistoryDatabase._instance;
  }

  constructor() {
    super(TABLE_ONLINE_HISTORY, [
      { name: "id", type: "INTEGER", autoincrement: true, isPrimaryKey: true },
      { name: "usn", type: "TEXT" },
      { name: "time", type: "BIGINT" },
      { name: "isOnline", type: "INTEGER" }
    ]);

    // binding
    this.storeDeviceOnlineHistory = this.storeDeviceOnlineHistory.bind(this);
  }

  /**
   * Store an online/offline history instance for a device.
   * @param {{ usn: String, time: number, isOnline: Boolean }} param0 the online/offline history.
   */
  storeDeviceOnlineHistory({ usn, time, isOnline }) {
    return new Promise((resolve, reject) => {
      const onlineHistory = {
        $usn: usn,
        $time: time,
        $isOnline: isOnline
      };
      this._db.run(`INSERT INTO ${TABLE_ONLINE_HISTORY} (usn, time, isOnline) VALUES ($usn, $time, $isOnline)`, onlineHistory, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

export default DeviceOnlineHistoryDatabase;
