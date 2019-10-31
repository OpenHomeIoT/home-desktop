import Database from "./Database";

const TABLE_SERVICES_LEDGER = "DeviceServiceLedger";

class ServiceLedgerDatabase extends Database {

  static _instance = null;

  static getInstance() {
    if (ServiceLedgerDatabase._instance === null) {
      ServiceLedgerDatabase._instance = new ServiceLedgerDatabase();
    }
    return ServiceLedgerDatabase._instance;
  }

  constructor() {
    super(TABLE_SERVICES_LEDGER, [
      { name: "id", type: "TEXT", isPrimaryKey: true },
      { name: "name", type: "TEXT" },
      { name: "friendlyName", type: "TEXT" },
      { name: "description", type: "TEXT" },
      { name: "ssdpName", type: "TEXT" },
      { name: "currentSsdpVersionName", type: "TEXT" }
    ]);

    // binding
    this._createIRBlasterService = this._createIRBlasterService.bind(this);
    this._createLightService = this._createLightService.bind(this);
    this._createService = this._createService.bind(this);
    this._createSwitchService = this._createSwitchService.bind(this);
    this._doesServiceExist = this._doesServiceExist.bind(this);
  }

  /**
   * Initialize the table with the known service  descriptions
   */
  _initialize() {
    return new Promise((resolve, reject) => {
      this._db.serialize(() => {
        Promise.resolve()
        .then(() => this._createLightService())
        .then(() => this._createIRBlasterService())
        .then(() => this._createSwitchService())
        .then(() => resolve())
        .catch(err => { console.error(`[ServiceLedgerDatabase] Error while initializing the table: ${JSON.stringify(err)}`); reject(err); });
      });
    });
  }

  /**
   * Register a service in the database.
   * @param {{$id: string, $name: string, $friendlyName: string, $description: string, $ssdpName: string, $currentSsdpVersionName: string}} service 
   */
  _createService(service) {
    return this._doesServiceExist(service.$id)
    .then(serviceExists => {
      if (!serviceExists) {
        return new Promise((resolve, reject) => {
          this._db.run(`INSERT INTO ${this._tableName} (id, name, friendlyName, description, ssdpName, currentSsdpVersionName) VALUES ($id, $name, $friendlyName, $description, $ssdpName, $currentSsdpVersionName)`, service, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
      return Promise.resolve();
    });
  }

  /**
   * Register the light service in the database.
   */
  _createLightService() {
    const lightService = {
      $id: "oshiot:service:light",
      $name: "oshiot:service:light",
      $friendlyName: "Simple Light",
      $description: "The Simple Light service enables light switching capabilities.",
      $ssdpName: "oshiot:service:light:1",
      $currentSsdpVersionName: "oshiot:service:light:1-0"
    };
    return this._createService(lightService);
  }

  /**
   * Register the IR Blaster service in the database.
   */
  _createIRBlasterService() {
    const irblasterService = {
      $id: "oshiot:service:irblaster",
      $name: "oshiot:service:irblaster",
      $friendlyName: "IR Blaster",
      $description: "The IR Blaster service enables Infrared Device control capabilities.",
      $ssdpName: "oshiot:service:irblaster:1",
      $currentSsdpVersionName: "oshiot:service:irblaster:1-0"
    };
    return this._createService(irblasterService);
  }

  /**
   * Create the switch service entry.
   */
  _createSwitchService() {
    const switchService = {
      $id: "oshiot:service:switch",
      $name: "oshiot:service:switch",
      $friendlyName: "Simple Switch",
      $description: "The Simple Switch service enables switching capabilities.",
      $ssdpName: "oshiot:service:switch:1",
      $currentSsdpVersionName: "oshiot:service:switch:1-0"
    };
    return this._createService(switchService);
  }

  /**
   * Check to see if a service exists.
   * @param {string} serviceName the name of the service.
   */
  _doesServiceExist(serviceName) {
    return new Promise((resolve, reject) => {
      this._db.get(`SELECT * FROM ${this._tableName} WHERE id = $serviceName`, {$serviceName: serviceName}, (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row != undefined);
      });
    });
  }
}

export default ServiceLedgerDatabase;
