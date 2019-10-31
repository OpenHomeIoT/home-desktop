import Database from "./Database";

const TABLE_SERVICE_VERSIONS = "ServiceVersionLedger";
const TIME_GENESIS = new Date(2019, 1, 1, 0, 0, 0, 0).getTime();

class ServiceVersionLedgerDatabase extends Database {

  static _instance = null;

  static getInstance() {
    if (ServiceVersionLedgerDatabase._instance === null) {
      ServiceVersionLedgerDatabase._instance = new ServiceVersionLedgerDatabase();
    }
    return ServiceVersionLedgerDatabase._instance;
  }

  constructor() {
    super(TABLE_SERVICE_VERSIONS, [
      { name: "serviceVersionName", type: "TEXT", isPrimaryKey: true },
      { name: "serviceName", type: "TEXT" },
      { name: "version", type: "TEXT" },
      { name: "timeCreated", type: "BIGINT" }
    ]);
    
    // binding
    this._addLightServiceVersions = this._addLightServiceVersions.bind(this);
    this._addSwitchServiceVersions = this._addSwitchServiceVersions.bind(this);
    this._addServiceVersions = this._addServiceVersions.bind(this);
    this._doesServiceVersionExist = this._doesServiceVersionExist.bind(this);
  };

  /**
   * Initialize the ServiceVersionLedgerDatabase.
   * @returns {Promise<void>}
   */
  _initialize() {
    return new Promise((resolve, reject) => {
      this._db.serialize(() => {
        Promise.resolve()
        .then(() => this._addIRBlasterServiceVersions())
        .then(() => this._addLightServiceVersions())
        .then(() => this._addSwitchServiceVersions())
        .then(() => resolve())
        .catch(err => { console.error(`[ServiceVersionLedgerDatabase] Error initializing the table: ${JSON.stringify(err)}`); reject(err); });
      });
    });
  }

  /**
   * Add the IR Blaster service versions.
   * @returns {Promise<void>}
   */
  _addIRBlasterServiceVersions() {
    const irblasterVersion1_0 = {
      $serviceVersionName: "oshiot:service:irblaster:1-0",
      $serviceName: "oshiot:service:irblaster",
      $version: "1.0",
      $timeCreated: TIME_GENESIS
    };
    return this._addServiceVersions(irblasterVersion1_0);
  }

  /**
   * Add the Light service versions.
   * @returns {Promise<void>}
   */
  _addLightServiceVersions() {
    const lightVersion1_0 = {
      $serviceVersionName: "oshiot:service:light:1-0",
      $serviceName: "oshiot:service:light",
      $version: "1.0",
      $timeCreated: TIME_GENESIS
    };
    return this._addServiceVersions(lightVersion1_0);
  }

  /**
   * Add the Switch service versions.
   * @returns {Promise<void>}
   */
  _addSwitchServiceVersions() {
    const switchVersion1_0 = {
      $serviceVersionName: "oshiot:service:switch:1-0",
      $serviceName: "oshiot:service:switch",
      $version: "1.0",
      $timeCreated: TIME_GENESIS,
    };
    return this._addServiceVersions(switchVersion1_0);
  }

  /**
   * Register a service version in the database.
   * @param {{ $serviceVersionName: string, $serviceName: string, $version: string, $timeCreated: number }} serviceVersion the service version.
   */
  _addServiceVersions(serviceVersion) {
    return this._doesServiceVersionExist(serviceVersion.$serviceVersionName)
    .then(serviceVersionExists => {
      if (serviceVersionExists) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        this._db.run(`INSERT INTO ${this._tableName} (serviceVersionName, serviceName, version, timeCreated) VALUES ($serviceVersionName, $serviceName, $version, $timeCreated)`, serviceVersion, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    })
  }

  /**
   * Check to see if a service version record exists in the database. // TODO: move this to Database class.
   * @param {string} serviceVersionName the name of the service version.
   */
  _doesServiceVersionExist(serviceVersionName) {
    return new Promise((resolve, reject) => {
      this._db.get(`SELECT * FROM ${this._tableName} WHERE serviceVersionName = $serviceVersionName`, { $serviceVersionName: serviceVersionName }, (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row != undefined);
      });
    });
  }
}

export default ServiceVersionLedgerDatabase;
