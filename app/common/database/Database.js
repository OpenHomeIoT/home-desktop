import PouchDB from "pouchdb";

class Database {

  /**
   * Database constructor.
   * @param {{ name: string, isLedger?: boolean, fields: { name: string, type: string, required?: boolean }[] }} tableDefinition the definition for the database table.
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options the options.
   */
  constructor(tableDefinition, options) {
    const { isMemoryDB } = options;

    const pouchdbOptions = (isMemoryDB) ? { adapter: "memory" } : {};
    this._db = new PouchDB(`oshiot_${tableDefinition.name}`, pouchdbOptions);

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
    return this.getAll()
    .then(records => records.length)
    .catch(err => 0);
  }

  /**
   * Delete a record from the database.
   * @param {string} pk the value of the primary key.
   * @param {string} rev the revision of the record.
   * @returns {Promise<PouchDB.Core.Response>}
   */
  delete(pk, rev) {
    return this._db.remove(pk, rev);
  }

  /**
   * Check to see if a record exists in the database.
   * @param {string} pk the primary key.
   * @returns {Promise<boolean>}
   */
  exists(pk) {
    return this._db.get(pk)
    .then(_ => true)
    .catch(_ => false);
  }

  /**
   * Get a record from the database based on a primary key.
   * @param {string} pk the value of the primary key.
   * @returns {Promise<any>} the data.
   */
  get(pk) {
    return this._db.get(pk);
  }

  /**
   * Get all records from the database.
   * @returns {Promise<PouchDB.Core.AllDocsResponse<any>>}
   */
  getAll() {
    return this._db.allDocs();
  }

  /**
   * Insert a record into the database.
   * @param {*} data the data.
   * @returns {Promise<PouchDB.Core.Response>}
   */
  insert(data) {
    return this._db.put(data);
  }

  /**
   * Update a record in the database.
   * @param {*} data the data.
   * @returns {Promise<void>}
   */
  update(data) {
    return this._db.put(data, { force: true });
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
