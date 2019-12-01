import sqlite3 from "sqlite3";
import SqlHelper from "./helper/SqlHelper";
import DatabaseHelper from "./helper/DatabaseHelper";
import PouchDB from "pouchdb";

class Database {

  /**
   * Database constructor.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the definition for the database table.
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
   * Delete a record from the database.
   * @param {string} pk the value of the primary key.
   * @param {string} rev the revision of the record.
   * @returns {Promise<PouchDB.Core.Response>}
   */
  delete(pk, rev) {
    return this._db.remove(pk, rev);
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

}

export default Database;
