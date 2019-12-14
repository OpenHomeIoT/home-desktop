import Database from "../../common/database/Database";

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
        { name: "usn", type: "string", required: true },
        { name: "timeAdded", type: "number", required: true },
        { name: "ipAddress", type: "string", required: true }
      ]
    }, options);
  }
}

export default ConnectionBufferDatabase;
