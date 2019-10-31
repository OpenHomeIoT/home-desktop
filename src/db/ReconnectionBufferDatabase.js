import Database from "./Database";

const TABLE_NAME = "DeviceReconnectionBuffer";

// TODO: extend a memory database
class ReconnectionBufferDatabase extends Database {

  static _instance = null;

  /**
   * @returns {ReconnectionBufferDatabase}
   */
  static getInstance() {
    if (ReconnectionBufferDatabase._instance === null) {
      ReconnectionBufferDatabase._instance = new ReconnectionBufferDatabase();
    }
    return ReconnectionBufferDatabase._instance;
  }

  constructor() {
    super(TABLE_NAME, [
      { name: "usn", type: "TEXT", isPrimaryKey: true },
      { name: "timeAdded", type: "BIGINT" },
    ]);

    // binding
    this.addReconnectionEntry = this.addReconnectionEntry.bind(this);
    this.hasReconnectionEntry = this.hasReconnectionEntry.bind(this); 
    this.removeReconnectionEntry = this.removeReconnectionEntry.bind(this);
  }

  /**
   * Add a reconnection entry for a device.
   * @param {{ usn: string, timeAdded: number }} param0 the reconnection information.
   * @returns {Promise<void>}
   */
  addReconnectionEntry({ usn, timeAdded }) {
    return new Promise((resolve, reject) => {
      this._db.run(`INSERT INTO ${TABLE_NAME} (usn, timeAdded) VALUES ($usn, $timeAdded)`, { $usn: usn, $timeAdded: timeAdded }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Check to see if a device already has some reconnection info added.
   * @param {string} usn the usn of the device.
   * @returns {Promise<boolean>}
   */
  hasReconnectionEntry(usn) {
    return new Promise((resolve, reject) => {
      this._db.get(`SELECT * FROM ${TABLE_NAME} WHERE usn = $usn`, { $usn: usn }, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row != undefined && row != null);
        }
      })
    });
  }

  /**
   * Remove a reconnection entry.
   * @param {string} usn the device usn.
   * @returns {Promise<void>}
   */
  removeReconnectionEntry(usn) {
    return new Promise((resolve, reject) => {
      this._db.run(`DELETE FROM ${TABLE_NAME} WHERE $usn = usn`, { $usn: usn }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }
}

export default ReconnectionBufferDatabase;
