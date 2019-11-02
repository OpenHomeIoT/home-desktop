import sqlite3 from "sqlite3";
import SqlHelper from "./helper/SqlHelper";
import DatabaseHelper from "./helper/DatabaseHelper";

class Database {

  /**
   * Database constructor.
   * @param {string} tableName the name of the table this db is in charge of.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} fields the fields of the table.
   */
  constructor(tableName, fields) {
    this._db = new sqlite3.Database("oshiot.db");
    // TODO: verify there is a (and only one) primary key defined in fields
    // TODO: verify table name
    this._tableName = tableName;
    this._tableFields = fields;

    const primaryKey = this._getPrimaryKey();

    this._insertSql = SqlHelper.generateInsertSql(tableName, fields);
    // TODO: check if should update
    this._updateSql = SqlHelper.generateUpdateByPrimaryKeySql(tableName, fields, primaryKey);
    this._getOneSql = SqlHelper.generateGetByPrimaryKeySql(tableName, primaryKey);
    this._getAllSql = SqlHelper.generateGetAllSql(tableName);
    // TODO: check if should delete
    this._deleteSql = SqlHelper.generateDeleteByPrimaryKeySql(tableName, primaryKey);

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

  get(pk) {

  }

  getAll() {
    
  }

  /**
   * 
   * @param {*} data the data. 
   */
  insert(data) {
    return new Promise((resolve, reject) => {
      if (DatabaseHelper.isValidInsertData(this._tableFields, data)) {
        const preparedData = DatabaseHelper.prepareDataForInsert(this._tableFields, data);
        this._db.run(this._insertSql, preparedData, (err) => {
          if (err) reject(err);
          else resolve();
        })
      }
    });
  }

  /**
   * 
   * @param {*} data the data. 
   */
  update(data) {
    // TODO: check if update is allowed.
    return new Promise((resolve, reject) => {
      if (DatabaseHelper.isValidUpdateData(this._tableFields, data)) {
        const preparedData = DatabaseHelper.prepareDataForUpdate(this._tableFields, data);
        this._db.run(this._updateSql, preparedData, (err) => {
          if (err) reject(err);
          else resolve();
        })
      }
    });
  }

  delete(pk) {
    // TODO: check if delete is allowed
    return new Promise((resolve, reject) => {
      const primaryKey = this._getPrimaryKey();
      const key = `$${primaryKey}`;
      const params = {};
      params[key] = pk;
      this._db.run(this._deleteSql, params, (err) => {
        if (err) reject(err);
        else resolve();
      })
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
   */
  _initialize() {
    return Promise.resolve();
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

}

export default Database;