import sqlite3 from "sqlite3";
import SqlHelper from "./helper/SqlHelper";
import DatabaseHelper from "./helper/DatabaseHelper";

class Database {

  /**
   * Database constructor.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the definition for the database table.
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options the options.
   */
  constructor(tableDefinition, options) {
    let dbName = "oshiot.db"; // TODO: put this in a more suiting place...
    if (options) {
      const { isMemoryDB, isTest } = options;
      if (isTest) {
        dbName = "oshiot.test.db";
        tableDefinition.name = `${tableDefinition.name}_Test`;
      } else if (isMemoryDB) {
        dbName = ":memory:"
      }
    }
    this._db = new sqlite3.Database(dbName);
    
    this._tableDefinition = tableDefinition;
    this._options = options || {};

    this._insertSql = SqlHelper.generateInsertSql(tableDefinition);
    this._updateByPKSql = SqlHelper.generateUpdateByPrimaryKeySql(tableDefinition);
    this._getOneByPKSql = SqlHelper.generateGetByPrimaryKeySql(tableDefinition);
    this._getAllSql = SqlHelper.generateGetAllSql(tableDefinition);
    this._deleteByPKSql = SqlHelper.generateDeleteByPrimaryKeySql(tableDefinition);

    // TODO: implement ledger

    // binding
    this.initialize = this._initialize.bind(this);

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._createTable = this._createTable.bind(this);
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
   * @returns {Promise<void>}
   */
  delete(pk) {
    return (this._options.isLedger)
    ? Promise.resolve()
    : new Promise((resolve, reject) => {
      const primaryKey = this._tableDefinition.primaryKey;
      const key = `$${primaryKey}`;
      const params = {};
      params[key] = pk;
      this._db.run(this._deleteByPKSql, params, (err) => {
        if (err) reject(err);
        else resolve();
      })
    });
  }

  /**
   * Get a record from the database based on a primary key.
   * @param {string} pk the value of the primary key.
   * @returns {Promise<*>} 
   */
  get(pk) {
    return new Promise((resolve, reject) => {
      const primaryKey = this._tableDefinition.primaryKey;
      const params = {};
      params[`$${primaryKey}`] = pk;
      this._db.get(this._getOneByPKSql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Get all records from the database.
   * @returns {Promise<*[]>}
   */
  getAll() {
    return new Promise((resolve, reject) => {
      this._db.all(this._getAllSql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  /**
   * Insert a record into the database.
   * @param {*} data the data. 
   * @returns {Promise<void>}
   */
  insert(data) {
    return new Promise((resolve, reject) => {
      if (DatabaseHelper.isValidInsertData(this._tableDefinition, data)) {
        const preparedData = DatabaseHelper.prepareDataForInsert(this._tableDefinition, data);
        this._db.run(this._insertSql, preparedData, (err) => {
          if (err) reject(err);
          else resolve();
        })
      } else {
        resolve();
      }
    });
  }

  /**
   * Open the database.
   */
  open() {
    return new Promise((resolve, reject) => {
      this._db.serialize(() => {
        this._createTable()
        .then(() => this._initialize())
        .then(() => resolve())
        .catch(err => reject(err));
      });
    });
  }

  /**
   * Update a record in the database.
   * @param {*} data the data. 
   * @returns {Promise<void>}
   */
  update(data) {
    return (this._options.isLedger) 
    ? Promise.resolve()
    : new Promise((resolve, reject) => {
      if (DatabaseHelper.isValidUpdateData(this._tableDefinition, data)) {
        const preparedData = DatabaseHelper.prepareDataForUpdate(this._tableDefinition, data);
        this._db.run(this._updateByPKSql, preparedData, (err) => {
          if (err) reject(err);
          else resolve();
        })
      } else {
        resolve();
      }
    });
  }

  /**
   * Create a table in the database if it does not already exist.
   */
  _createTable() {
    return new Promise((resolve, reject) => {
      this._db.run(SqlHelper.generateCreateTableSql(this._tableDefinition), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
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