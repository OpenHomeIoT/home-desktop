import Database from "./Database";

const TABLE_NAME = "DeviceReconnectionBuffer";

class ReconnectionBufferDatabase extends Database {

  static _instance = null;

  /**
   * @returns {ReconnectionBufferDatabase}
   */
  static getInstance() {
    if (ReconnectionBufferDatabase._instance === null) {
      ReconnectionBufferDatabase._instance = new ReconnectionBufferDatabase();
    }
    return ReconnectionBufferDatabase._instance;
  }

  constructor() {
    super("DeviceReconnectionBuffer", [
      { name: "usn", type: "TEXT", isPrimaryKey: true },
      { name: "timeAdded", type: "BIGINT" },
    ], { isMemoryDB: true });
  }
}

export default ReconnectionBufferDatabase;
