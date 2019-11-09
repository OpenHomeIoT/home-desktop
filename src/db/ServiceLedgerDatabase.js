import Database from "./Database";
import DatabaseHelper from "./helper/DatabaseHelper";

class ServiceLedgerDatabase extends Database {

  static _instance = null;

  static getInstance() {
    if (ServiceLedgerDatabase._instance === null) {
      ServiceLedgerDatabase._instance = new ServiceLedgerDatabase({ isLedger: true });
    }
    return ServiceLedgerDatabase._instance;
  }

  /**
   * 
   * @param {{ isMemoryDB?: boolean, isLedger?: boolean, isTest?: boolean }} options 
   */
  constructor(options) {
    super("ServiceLedger", [
      { name: "id", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "name", type: DatabaseHelper.TEXT },
      { name: "friendlyName", type: DatabaseHelper.TEXT },
      { name: "description", type: DatabaseHelper.TEXT },
      { name: "ssdpName", type: DatabaseHelper.TEXT },
      { name: "currentSsdpVersionName", type: DatabaseHelper.TEXT }
    ], options);
  }
}

export default ServiceLedgerDatabase;
