import Database from "./Database";
import DatabaseHelper from "./helper/DatabaseHelper";

class ServiceVersionLedgerDatabase extends Database {

  static _instance = null;

  static getInstance() {
    if (ServiceVersionLedgerDatabase._instance === null) {
      ServiceVersionLedgerDatabase._instance = new ServiceVersionLedgerDatabase({ isLedger: true });
    }
    return ServiceVersionLedgerDatabase._instance;
  }

  /**
   * 
   * @param {{ isMemoryDB?: boolean, isLedger?: boolean, isTest?: boolean }} options 
   */
  constructor(options) {
    super("ServiceVersionLedger", [
      { name: "serviceVersionName", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "serviceName", type: DatabaseHelper.TEXT },
      { name: "version", type: DatabaseHelper.TEXT },
      { name: "timeInstalledOnHub", type: DatabaseHelper.BIGINT, includeInUpdate: false }
    ], options);
  };
}

export default ServiceVersionLedgerDatabase;
