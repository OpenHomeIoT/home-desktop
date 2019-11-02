import sqlite3 from "sqlite3";

class Database {

  /**
   * Database constructor.
   * @param {string} tableName the name of the table this db is in charge of.
   * @param {Array<{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }>} fields the fields of the table.
   */
  constructor(tableName, fields) {
    this._db = new sqlite3.Database("oshiot.db");
    // TODO: verify there is a (and only one) primary key defined in fields
    // TODO: verify table name
    this._tableName = tableName;
    this._tableFields = fields;

    this._insertSql = this._generateInsertSql(fields);
    this._updateSql = this._generateUpdateSql(fields);
    this._getOneSql = this._generateGetByPrimaryKeySql(fields);
    this._getAllSql = this._generateGetAllSql(fields);
    this._deleteSql = this._generateDeleteByPrimaryKeySql(fields);

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
   * 
   * @param {Object} data 
   */
  insert(data) {
    data.uyes;
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
   * Generate the sql that deletes an object by its primary key.
   * @returns {string} the sql.
   */
  _generateDeleteByPrimaryKeySql() {
    const primaryKey = this._getPrimaryKey();
    return `DELETE FROM ${this._tableName} WHERE ${primaryKey} = $${primaryKey}`;
  }

  /**
   * Generate the sql that returns all objects in the table.
   * @returns {string} the sql.
   */
  _generateGetAllSql() {
    return `SELECT * FROM ${this._tableName}`;
  }

  /**
   * Generate the sql that gets an object from the table by its primary key.
   * @returns {string} the sql.
   */
  _generateGetByPrimaryKeySql() {
    const primaryKey = this._getPrimaryKey();
    return `SELECT * FROM ${this._tableName} WHERE ${primaryKey} = $${primaryKey}`;
  }

  /**
   * Generate the sql that inserts an object into the table.
   * @returns {string} the sql.
   */
  _generateInsertSql() {
    let fields = [];
    let values = [];
    for (const { name, type, isPrimaryKey, autoincrement } of this._tableFields) {
      let field = `${name} ${type}`;
      if (isPrimaryKey) field += " PRIMARY KEY";
      if (autoincrement) field += " AUTOINCREMENT";

      let value = `$${name}`;

      fields.push(field);
      values.push(value);
    }

    return `INSERT INTO ${this._tableName} (${fields.join(",")}) VALUES (${values.join(",")})`;
  }

  /**
   * Generate the sql that updates an object by its primary key.
   * @returns {string|null} the sql.
   */
  _generateUpdateSql() {
    const primaryKey = this._getPrimaryKey();
    const fieldUpdates = this._tableFields.filter(({ includeInUpdate }) => includeInUpdate).map(({ name }) => `${name} = $${name}`);
    if (fieldUpdates.length === 0) return null;

    return `UPDATE ${this._tableName} SET ${fieldUpdates.join(",")} WHERE ${primaryKey} = $${primaryKey}`;
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