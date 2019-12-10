import Database from "../../common/database/Database";

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
        { name: "serviceVersionName", type: "string" },
        { name: "serviceName", type: "string" },
        { name: "version", type: "string" },
        { name: "timeInstalledOnHub", type: "bigint", includeInUpdate: false }
      ]
    }, options);
  };
}

export default ServiceVersionLedgerDatabase;
