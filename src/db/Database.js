import sqlite3 from "sqlite3";

class Database {

  /**
   * Database constructor.
   * @param {string} tableName the name of the table this db is in charge of.
   * @param {Array<{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean }>} fields the fields of the table.
   */
  constructor(tableName, fields) {
    this._db = new sqlite3.Database("oshiot.db");

    this._tableName = tableName;
    this._tableFields = fields;

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
      const tableName = this._tableName;
      const fields = this._tableFields;
      const values = [];
      for (const field of fields) {
        const { name, type, isPrimaryKey, autoincrement } = field;
        let value = `${name} ${type}`;
        if (isPrimaryKey) {
          value += " PRIMARY KEY";
        }
        if (autoincrement) {
          value += " AUTOINCREMENT";
        }
        values.push(value);
      }
      const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${values.join(",")})`;
      this._db.run(sql, (error) => {
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