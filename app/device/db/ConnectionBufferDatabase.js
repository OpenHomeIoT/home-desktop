import Database from "../../common/database/Database";
import DatabaseHelper from "../../common/database/helper/DatabaseHelper";

class ConnectionBufferDatabase extends Database {

  static _instance = null;

  /**
   * @returns {ConnectionBufferDatabase}
   */
  static getInstance() {
    if (ConnectionBufferDatabase._instance === null) {
      ConnectionBufferDatabase._instance = new ConnectionBufferDatabase({ isMemoryDB: true });
    }
    return ConnectionBufferDatabase._instance;
  }

  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options the options
   */
  constructor(options) {
    super({
      name: "DeviceConnectionBuffer",
      isLedger: false,
      primaryKey: "usn",
      fields: [
        { name: "usn", type: DatabaseHelper.TEXT },
        { name: "timeAdded", type: DatabaseHelper.INT, includeInUpdate: false },
        { name: "ipAddress", type: DatabaseHelper.TEXT }
      ]
    }, options);
  }
}

export default ConnectionBufferDatabase;
