import Database from "../../common/database/Database";
import DatabaseHelper from "../../common/database/helper/DatabaseHelper";

class ServiceVersionLedgerDatabase extends Database {

  static _instance = null;

  static getInstance() {
    if (ServiceVersionLedgerDatabase._instance === null) {
      ServiceVersionLedgerDatabase._instance = new ServiceVersionLedgerDatabase();
    }
    return ServiceVersionLedgerDatabase._instance;
  }

  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options 
   */
  constructor(options) {
    super({
      name: "ServiceVersionLedger",
      isLedger: true,
      primaryKey: "serviceVersionName",
      fields: [
        { name: "serviceVersionName", type: DatabaseHelper.TEXT },
        { name: "serviceName", type: DatabaseHelper.TEXT },
        { name: "version", type: DatabaseHelper.TEXT },
        { name: "timeInstalledOnHub", type: DatabaseHelper.BIGINT, includeInUpdate: false }
      ]
    }, options);
  };
}

export default ServiceVersionLedgerDatabase;
