import Database from "./Database";

class ServiceVersionLedgerDatabase extends Database {

  static _instance = null;

  static getInstance() {
    if (ServiceVersionLedgerDatabase._instance === null) {
      ServiceVersionLedgerDatabase._instance = new ServiceVersionLedgerDatabase();
    }
    return ServiceVersionLedgerDatabase._instance;
  }

  constructor() {
    super("ServiceVersionLedger", [
      { name: "serviceVersionName", type: "TEXT", isPrimaryKey: true },
      { name: "serviceName", type: "TEXT" },
      { name: "version", type: "TEXT" },
      { name: "timeCreated", type: "BIGINT" }
    ], { isLedger: true });
  };
}

export default ServiceVersionLedgerDatabase;
