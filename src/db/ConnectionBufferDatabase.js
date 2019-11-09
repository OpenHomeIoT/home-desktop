import Database from "./Database";
import DatabaseHelper from "./helper/DatabaseHelper";

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
   * @param {{ isMemoryDB?: boolean, isLedger?: boolean, isTest?: boolean }} options the options
   */
  constructor(options) {
    super("DeviceConnectionBuffer", [
      { name: "usn", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "timeAdded", type: DatabaseHelper.INT, includeInUpdate: false },
      { name: "ipAddress", type: DatabaseHelper.TEXT }
    ], options);
  }
}

export default ConnectionBufferDatabase;
