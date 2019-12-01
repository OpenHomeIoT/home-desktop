import Database from "../../common/database/Database";
import DatabaseHelper from "../../common/database/helper/DatabaseHelper";

class ServiceLedgerDatabase extends Database {

  static _instance = null;

  /**
   * @returns {ServiceLedgerDatabase}
   */
  static getInstance() {
    if (ServiceLedgerDatabase._instance === null) {
      ServiceLedgerDatabase._instance = new ServiceLedgerDatabase();
    }
    return ServiceLedgerDatabase._instance;
  }

  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options 
   */
  constructor(options) {
    super({
      name: "ServiceLedger",
      isLedger: true,
      primaryKey: "id",
      fields: [
        { name: "id", type: DatabaseHelper.TEXT },
        { name: "name", type: DatabaseHelper.TEXT },
        { name: "friendlyName", type: DatabaseHelper.TEXT },
        { name: "description", type: DatabaseHelper.TEXT },
        { name: "ssdpName", type: DatabaseHelper.TEXT },
        { name: "currentSsdpVersionName", type: DatabaseHelper.TEXT }
      ]
    }, options);
  }
}

export default ServiceLedgerDatabase;
