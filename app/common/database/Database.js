import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import Memory from "lowdb/adapters/Memory";
import uuid from "uuid/v4";

class Database {

  /**
   * Database constructor.
   * @param {{ name: string, isLedger?: boolean, fields: { name: string, type: string, required?: boolean }[] }} tableDefinition the definition for the database table.
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options the options.
   */
  constructor(tableDefinition, options) {
    const { isMemoryDB = false } = options;

    if (isMemoryDB) this._adapter = new Memory();
    else this._adapter = new FileSync(`db/${tableDefinition.name}.oshiot.db`);

    this._db = new lowdb(this._adapter);
    const tableName = tableDefinition.name;
    const tableCount = `${tableName}Count`;
    let defs = {};
    defs[tableName] = [];
    defs[tableCount] = 0;

    this._db.defaults(defs)
    .write();

    this._tableDefinition = tableDefinition;
    this._options = options || {};

    // TODO: implement ledger

    // binding
    this._initialize = this._initialize.bind(this);
    this.close = this.close.bind(this);

    this._initialize();
  }

  /**
   * Close the database.
   */
  close() {
    this._db.close();
  }

  /**
   * Get the number of records in the database.
   * @returns {Promise<number>}
   */
  count() {
    return new Promise((resolve, reject) => {
      const count = `${this._tableDefinition.name}Count`;
      resolve(
        this._db.get(count)
        .value()
      );
    });
  }

  /**
   * Delete a record from the database.
   * @param {string} pk the value of the primary key.
   * @returns {Promise<void>}
   */
  delete(pk) {
    return new Promise((resolve, reject) => {
      this._getTable()
      .remove({ _id: pk })
      .write();

      this._decreaseRecordCount();

      resolve();
    });
  }

  /**
   * Check to see if a record exists in the database.
   * @param {string} pk the primary key.
   * @returns {Promise<boolean>}
   */
  exists(pk) {
    return this.get(pk)
    .then(record => record != null && record != undefined && record !== {})
    .catch(err => false);
  }

  /**
   * Get a record from the database based on a primary key.
   * @param {string} pk the value of the primary key.
   * @returns {Promise<any>} the data.
   */
  get(pk) {
    return new Promise((resolve, reject) => {
      resolve(
        this._getTable()
        .find({ _id: pk })
        .value()
      );
    });
  }

  /**
   * Get all records from the database.
   * @returns {Promise<any[]>}
   */
  getAll() {
    return new Promise((resolve, reject) => {
      resolve(
        this._getTable()
        .value()
      );
    });
  }

  /**
   * Insert a record into the database.
   * @param {*} data the data.
   * @returns {Promise<void>}
   */
  insert(data) {
    if (!data._id) data._id = uuid();

    return this.exists(data._id)
    .then(exists => {
      if (!exists) {
        this._getTable()
        .push(data)
        .write();
        this._increaseRecordCount();
      }
    });
  }

  /**
   * Update a record in the database.
   * @param {*} data the data.
   * @returns {Promise<void>}
   */
  update(data) {
    return new Promise((resolve, reject) => {
      this._getTable()
      .find({ _id: data._id })
      .assign(data)
      .write();
      resolve();
    });
  }

  _decreaseRecordCount() {
    const count = `${this._tableDefinition.name}Count`;
    const currentCount = this._db.get(count).value();
    return this._db.set(count, currentCount - 1).write();
  }

  _getTable() {
    return this._db.get(this._tableDefinition.name);
  }

  _increaseRecordCount() {
    const count = `${this._tableDefinition.name}Count`;
    const currentCount = this._db.get(count).value();
    return this._db.set(count, currentCount + 1).write();
  }

  /**
   * Override this stub.
   * @returns {Promise<void>}
   */
  _initialize() {
    return Promise.resolve();
  }

  /**
   * Check to see if the data is valid.
   * @param {object} data the data.
   */
  _isValidData(data) {

  }
}

export default Database;
