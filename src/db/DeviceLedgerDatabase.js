import Database from "./Database";

const TABLE_DEVICE_LEDGER = "DeviceLedger";

class DeviceLedgerDatabase extends Database {

  static _instance = null;

  /**
   * 
   * @returns {DeviceLedgerDatabase}
   */
  static getInstance() {
    if (DeviceLedgerDatabase._instance === null) {
      DeviceLedgerDatabase._instance = new DeviceLedgerDatabase();
    }
    return DeviceLedgerDatabase._instance;
  }

  constructor() {
    super(TABLE_DEVICE_LEDGER, [
      { name: "usn", type: "TEXT", isPrimaryKey: true },
      { name: "ssdpDescriptionLocation", type: "TEXT" },
      { name: "ipAddress", type: "TEXT" },
      { name: "services", type: "TEXT" },
      { name: "configuredAsChild", type: "INTEGER" },
      { name: "timeLastSeen", type: "BIGINT" },
      { name: "timeDiscovered", type: "BIGINT" },
      { name: "isOnline", type: "INTEGER" },
    ]);

    // TODO: getDeviceByUsn(usn);
    // binding
    this.getAllDevices = this.getAllDevices.bind(this);
    this.insertDevice = this.insertDevice.bind(this);
    this.updateDevice = this.updateDevice.bind(this);
  }

  /**
   * Get all of the devices.
   * @returns {Promise<Array<{usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: number, timeLastSeen: number, timeDiscovered: number, isOnline: number }>>} the devices.
   */
  getAllDevices() {
    return new Promise((resolve, reject) => {
      this._db.all(`SELECT * FROM ${this._tableName}`, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          const devices = [];
          for (const row of rows) {
            const { usn, ssdpDescriptionLocation, ipAddress, services, configuredAsChild, timeLastSeen, timeDiscovered, isOnline } = row;
            devices.push({
              usn,
              ssdpDescriptionLocation,
              ipAddress,
              services: services,
              configuredAsChild,
              timeLastSeen,
              timeDiscovered,
              isOnline
            });
          }
          resolve(devices);
        }
      });
    });
  }

  /**
   * Get a device by its USN.
   * @param {string} usn the usn of the device.
   * @returns {Promise<{usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: number, timeLastSeen: number, timeDiscovered: number, isOnline: number }>} the device record.
   */
  getDeviceByUsn(usn) {
    return new Promise((resolve, reject) => {
      this._db.get(`SELECT * FROM ${this._tableName} WHERE usn = $usn`, { $usn: usn }, (err, doc) => {
        if (err) {
          reject(err);
          return;
        }
        resolve((doc) ? doc : null);
      });
    });
  }

  /**
   * Store a device in the database.
   * @param {{usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: number, timeLastSeen: number, timeDiscovered: number, isOnline: number }} param0 the device. 
   */
  insertDevice({ usn, ssdpDescriptionLocation, ipAddress, services, configuredAsChild, timeLastSeen, timeDiscovered, isOnline }) {
    return new Promise((resolve, reject) => {
      const device = {
        $usn: usn,
        $ssdpDescriptionLocation: ssdpDescriptionLocation,
        $ipAddress: ipAddress,
        $services: services,
        $configuredAsChild: configuredAsChild,
        $timeLastSeen: timeLastSeen,
        $timeDiscovered: timeDiscovered,
        $isOnline: isOnline
      };
      this._db.run(`INSERT INTO ${this._tableName} (usn, ssdpDescriptionLocation, ipAddress, services, configuredAsChild, timeLastSeen, timeDiscovered, isOnline) VALUES ($usn, $ssdpDescriptionLocation, $ipAddress, $services, $configuredAsChild, $timeLastSeen, $timeDiscovered, $isOnline)`, device, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Update a device record.
   * @param {{usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: number, timeLastSeen: number, timeDiscovered: number, isOnline: number }} param0 
   */
  updateDevice({ usn, ssdpDescriptionLocation, ipAddress, services, configuredAsChild, timeLastSeen, timeDiscovered, isOnline }) {
    return new Promise((resolve, reject) => {
      const device = {
        $usn: usn,
        $ssdpDescriptionLocation: ssdpDescriptionLocation,
        $ipAddress: ipAddress,
        $services: services,
        $configuredAsChild: configuredAsChild,
        $timeLastSeen: timeLastSeen,
        $isOnline: isOnline
      };
      this._db.run(`UPDATE ${this._tableName} SET ssdpDescriptionLocation = $ssdpDescriptionLocation, ipAddress = $ipAddress, services = $services, configuredAsChild = $configuredAsChild, timeLastSeen = $timeLastSeen, isOnline = $isOnline WHERE usn = $usn`, device, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}

export default DeviceLedgerDatabase;

