import sqlite3 from "sqlite3";
import SqlHelper from "./helper/SqlHelper";
import DatabaseHelper from "./helper/DatabaseHelper";

class Database {

  /**
   * Database constructor.
   * @param {string} tableName the name of the table this db is in charge of.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} fields the fields of the table.
   * @param {{ isMemoryDB?: boolean, isLedger?: boolean }} options the options.
   */
  constructor(tableName, fields, options) {
    const dbName = (options && options.isMemoryDB) ? ":memory:" : "oshiot.db";
    this._db = new sqlite3.Database(dbName);
    // TODO: verify there is a (and only one) primary key defined in fields
    // TODO: verify table name
    this._tableName = tableName;
    this._tableFields = fields;
    this._options = options || {};

    const primaryKey = this._getPrimaryKey();

    this._insertSql = SqlHelper.generateInsertSql(tableName, fields);
    // TODO: check if should update
    this._updateByPKSql = SqlHelper.generateUpdateByPrimaryKeySql(tableName, fields, primaryKey);
    this._getOneByPKSql = SqlHelper.generateGetByPrimaryKeySql(tableName, primaryKey);
    this._getAllSql = SqlHelper.generateGetAllSql(tableName);
    // TODO: check if should delete
    this._deleteByPKSql = SqlHelper.generateDeleteByPrimaryKeySql(tableName, primaryKey);

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
      const primaryKey = this._getPrimaryKey();
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
      const primaryKey = this._getPrimaryKey();
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
      if (DatabaseHelper.isValidInsertData(this._tableFields, data)) {
        const preparedData = DatabaseHelper.prepareDataForInsert(this._tableFields, data);
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
      if (DatabaseHelper.isValidUpdateData(this._tableFields, data)) {
        const preparedData = DatabaseHelper.prepareDataForUpdate(this._tableFields, data);
        this._db.run(this._updateByPKSql, preparedData, (err) => {
          if (err) reject(err);
          else resolve();
        })
      }
    });
  }

  /**
   * Create a table in the database if it does not already exist.
   */
  _createTable() {
    return new Promise((resolve, reject) => {
      this._db.run(SqlHelper.generateCreateTableSql(this._tableName, this._tableFields), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Get the name of the field that is the primary key for the table.
   * @returns {string} the primary key.
   */
  _getPrimaryKey() {
    for (const { name, isPrimaryKey } of this._tableFields) {
      if (isPrimaryKey) return name;
    }
    return "";
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