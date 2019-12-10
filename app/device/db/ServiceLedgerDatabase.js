import Database from "../../common/database/Database";

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
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "friendlyName", type: "string" },
        { name: "description", type: "string" },
        { name: "ssdpName", type: "string" },
        { name: "currentSsdpVersionName", type: "string" }
      ]
    }, options);
  }
}

export default ServiceLedgerDatabase;
