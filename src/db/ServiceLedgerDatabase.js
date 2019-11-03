import Database from "./Database";

class ServiceLedgerDatabase extends Database {

  static _instance = null;

  static getInstance() {
    if (ServiceLedgerDatabase._instance === null) {
      ServiceLedgerDatabase._instance = new ServiceLedgerDatabase();
    }
    return ServiceLedgerDatabase._instance;
  }

  constructor() {
    super("ServiceLedger", [
      { name: "id", type: "TEXT", isPrimaryKey: true },
      { name: "name", type: "TEXT" },
      { name: "friendlyName", type: "TEXT" },
      { name: "description", type: "TEXT" },
      { name: "ssdpName", type: "TEXT" },
      { name: "currentSsdpVersionName", type: "TEXT" }
    ], { isLedger: true });
  }
}

export default ServiceLedgerDatabase;
