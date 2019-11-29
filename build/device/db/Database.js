"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sqlite = _interopRequireDefault(require("sqlite3"));

var _SqlHelper = _interopRequireDefault(require("./helper/SqlHelper"));

var _DatabaseHelper = _interopRequireDefault(require("./helper/DatabaseHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Database {
  /**
   * Database constructor.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the definition for the database table.
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options the options.
   */
  constructor(tableDefinition, options) {
    let dbName = "oshiot.db"; // TODO: put this in a more suiting place...

    if (options) {
      const {
        isMemoryDB,
        isTest
      } = options;

      if (isTest) {
        dbName = "oshiot.test.db";
        tableDefinition.name = `${tableDefinition.name}_Test`;
      } else if (isMemoryDB) {
        dbName = ":memory:";
      }
    }

    this._db = new _sqlite.default.Database(dbName);
    this._tableDefinition = tableDefinition;
    this._options = options || {};
    this._insertSql = _SqlHelper.default.generateInsertSql(tableDefinition);
    this._updateByPKSql = _SqlHelper.default.generateUpdateByPrimaryKeySql(tableDefinition);
    this._getOneByPKSql = _SqlHelper.default.generateGetByPrimaryKeySql(tableDefinition);
    this._getAllSql = _SqlHelper.default.generateGetAllSql(tableDefinition);
    this._deleteByPKSql = _SqlHelper.default.generateDeleteByPrimaryKeySql(tableDefinition); // TODO: implement ledger
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
    return this._options.isLedger ? Promise.resolve() : new Promise((resolve, reject) => {
      const primaryKey = this._tableDefinition.primaryKey;
      const key = `$${primaryKey}`;
      const params = {};
      params[key] = pk;

      this._db.run(this._deleteByPKSql, params, err => {
        if (err) reject(err);else resolve();
      });
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
        if (err) reject(err);else resolve(row);
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
        if (err) reject(err);else resolve(rows);
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
      if (_DatabaseHelper.default.isValidInsertData(this._tableDefinition, data)) {
        const preparedData = _DatabaseHelper.default.prepareDataForInsert(this._tableDefinition, data);

        this._db.run(this._insertSql, preparedData, err => {
          if (err) reject(err);else resolve();
        });
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
        this._createTable().then(() => this._initialize()).then(() => resolve()).catch(err => reject(err));
      });
    });
  }
  /**
   * Update a record in the database.
   * @param {*} data the data. 
   * @returns {Promise<void>}
   */


  update(data) {
    return this._options.isLedger ? Promise.resolve() : new Promise((resolve, reject) => {
      if (_DatabaseHelper.default.isValidUpdateData(this._tableDefinition, data)) {
        const preparedData = _DatabaseHelper.default.prepareDataForUpdate(this._tableDefinition, data);

        this._db.run(this._updateByPKSql, preparedData, err => {
          if (err) reject(err);else resolve();
        });
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
      this._db.run(_SqlHelper.default.generateCreateTableSql(this._tableDefinition), error => {
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

var _default = Database;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9EYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwidGFibGVEZWZpbml0aW9uIiwib3B0aW9ucyIsImRiTmFtZSIsImlzTWVtb3J5REIiLCJpc1Rlc3QiLCJuYW1lIiwiX2RiIiwic3FsaXRlMyIsIl90YWJsZURlZmluaXRpb24iLCJfb3B0aW9ucyIsIl9pbnNlcnRTcWwiLCJTcWxIZWxwZXIiLCJnZW5lcmF0ZUluc2VydFNxbCIsIl91cGRhdGVCeVBLU3FsIiwiZ2VuZXJhdGVVcGRhdGVCeVByaW1hcnlLZXlTcWwiLCJfZ2V0T25lQnlQS1NxbCIsImdlbmVyYXRlR2V0QnlQcmltYXJ5S2V5U3FsIiwiX2dldEFsbFNxbCIsImdlbmVyYXRlR2V0QWxsU3FsIiwiX2RlbGV0ZUJ5UEtTcWwiLCJnZW5lcmF0ZURlbGV0ZUJ5UHJpbWFyeUtleVNxbCIsImluaXRpYWxpemUiLCJfaW5pdGlhbGl6ZSIsImJpbmQiLCJjbG9zZSIsIm9wZW4iLCJfY3JlYXRlVGFibGUiLCJkZWxldGUiLCJwayIsImlzTGVkZ2VyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwcmltYXJ5S2V5Iiwia2V5IiwicGFyYW1zIiwicnVuIiwiZXJyIiwiZ2V0Iiwicm93IiwiZ2V0QWxsIiwiYWxsIiwicm93cyIsImluc2VydCIsImRhdGEiLCJEYXRhYmFzZUhlbHBlciIsImlzVmFsaWRJbnNlcnREYXRhIiwicHJlcGFyZWREYXRhIiwicHJlcGFyZURhdGFGb3JJbnNlcnQiLCJzZXJpYWxpemUiLCJ0aGVuIiwiY2F0Y2giLCJ1cGRhdGUiLCJpc1ZhbGlkVXBkYXRlRGF0YSIsInByZXBhcmVEYXRhRm9yVXBkYXRlIiwiZ2VuZXJhdGVDcmVhdGVUYWJsZVNxbCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxRQUFOLENBQWU7QUFFYjs7Ozs7QUFLQUMsRUFBQUEsV0FBVyxD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QUN0QyxXQUFLMUIsR0FBTCxDQUFTOEIsR0FBVCxDQUFhekIsbUJBQVU0QyxzQkFBVixDQUFpQyxLQUFLL0MsZ0JBQXRDLENBQWIsRUFBdUVnRCxLQUFELElBQVc7QUFDL0UsWUFBSUEsS0FBSixFQUFXO0FBQ1R4QixVQUFBQSxNQUFNLENBQUN3QixLQUFELENBQU47QUFDRCxTQUZELE1BRU87QUFDTHpCLFVBQUFBLE9BQU87QUFDUjtBQUNGLE9BTkQ7QUFPRCxLQVJNLENBQVA7QUFTRDtBQUVEOzs7Ozs7QUFJQVQsRUFBQUEsV0FBVyxHQUFHO0FBQ1osV0FBT1EsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDs7QUEzS1k7O2VBK0tBakMsUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzcWxpdGUzIGZyb20gXCJzcWxpdGUzXCI7XG5pbXBvcnQgU3FsSGVscGVyIGZyb20gXCIuL2hlbHBlci9TcWxIZWxwZXJcIjtcbmltcG9ydCBEYXRhYmFzZUhlbHBlciBmcm9tIFwiLi9oZWxwZXIvRGF0YWJhc2VIZWxwZXJcIjtcblxuY2xhc3MgRGF0YWJhc2Uge1xuXG4gIC8qKlxuICAgKiBEYXRhYmFzZSBjb25zdHJ1Y3Rvci5cbiAgICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgaXNMZWRnZXI/OiBib29sZWFuLCBwcmltYXJ5S2V5OiBzdHJpbmcsIGZpZWxkczogeyBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYXV0b2luY3JlbWVudD86IGJvb2xlYW4sIGluY2x1ZGVJblVwZGF0ZT86IGJvb2xlYW4gfVtdIH19IHRhYmxlRGVmaW5pdGlvbiB0aGUgZGVmaW5pdGlvbiBmb3IgdGhlIGRhdGFiYXNlIHRhYmxlLlxuICAgKiBAcGFyYW0ge3sgaXNNZW1vcnlEQj86IGJvb2xlYW4sIGlzVGVzdD86IGJvb2xlYW4gfX0gb3B0aW9ucyB0aGUgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhYmxlRGVmaW5pdGlvbiwgb3B0aW9ucykge1xuICAgIGxldCBkYk5hbWUgPSBcIm9zaGlvdC5kYlwiOyAvLyBUT0RPOiBwdXQgdGhpcyBpbiBhIG1vcmUgc3VpdGluZyBwbGFjZS4uLlxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBjb25zdCB7IGlzTWVtb3J5REIsIGlzVGVzdCB9ID0gb3B0aW9ucztcbiAgICAgIGlmIChpc1Rlc3QpIHtcbiAgICAgICAgZGJOYW1lID0gXCJvc2hpb3QudGVzdC5kYlwiO1xuICAgICAgICB0YWJsZURlZmluaXRpb24ubmFtZSA9IGAke3RhYmxlRGVmaW5pdGlvbi5uYW1lfV9UZXN0YDtcbiAgICAgIH0gZWxzZSBpZiAoaXNNZW1vcnlEQikge1xuICAgICAgICBkYk5hbWUgPSBcIjptZW1vcnk6XCJcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZGIgPSBuZXcgc3FsaXRlMy5EYXRhYmFzZShkYk5hbWUpO1xuICAgIFxuICAgIHRoaXMuX3RhYmxlRGVmaW5pdGlvbiA9IHRhYmxlRGVmaW5pdGlvbjtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMuX2luc2VydFNxbCA9IFNxbEhlbHBlci5nZW5lcmF0ZUluc2VydFNxbCh0YWJsZURlZmluaXRpb24pO1xuICAgIHRoaXMuX3VwZGF0ZUJ5UEtTcWwgPSBTcWxIZWxwZXIuZ2VuZXJhdGVVcGRhdGVCeVByaW1hcnlLZXlTcWwodGFibGVEZWZpbml0aW9uKTtcbiAgICB0aGlzLl9nZXRPbmVCeVBLU3FsID0gU3FsSGVscGVyLmdlbmVyYXRlR2V0QnlQcmltYXJ5S2V5U3FsKHRhYmxlRGVmaW5pdGlvbik7XG4gICAgdGhpcy5fZ2V0QWxsU3FsID0gU3FsSGVscGVyLmdlbmVyYXRlR2V0QWxsU3FsKHRhYmxlRGVmaW5pdGlvbik7XG4gICAgdGhpcy5fZGVsZXRlQnlQS1NxbCA9IFNxbEhlbHBlci5nZW5lcmF0ZURlbGV0ZUJ5UHJpbWFyeUtleVNxbCh0YWJsZURlZmluaXRpb24pO1xuXG4gICAgLy8gVE9ETzogaW1wbGVtZW50IGxlZGdlclxuXG4gICAgLy8gYmluZGluZ1xuICAgIHRoaXMuaW5pdGlhbGl6ZSA9IHRoaXMuX2luaXRpYWxpemUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuY2xvc2UgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vcGVuID0gdGhpcy5vcGVuLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fY3JlYXRlVGFibGUgPSB0aGlzLl9jcmVhdGVUYWJsZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSBkYXRhYmFzZS5cbiAgICovXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX2RiLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgcmVjb3JkIGZyb20gdGhlIGRhdGFiYXNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGsgdGhlIHZhbHVlIG9mIHRoZSBwcmltYXJ5IGtleS5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBkZWxldGUocGspIHtcbiAgICByZXR1cm4gKHRoaXMuX29wdGlvbnMuaXNMZWRnZXIpXG4gICAgPyBQcm9taXNlLnJlc29sdmUoKVxuICAgIDogbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHJpbWFyeUtleSA9IHRoaXMuX3RhYmxlRGVmaW5pdGlvbi5wcmltYXJ5S2V5O1xuICAgICAgY29uc3Qga2V5ID0gYCQke3ByaW1hcnlLZXl9YDtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuICAgICAgcGFyYW1zW2tleV0gPSBwaztcbiAgICAgIHRoaXMuX2RiLnJ1bih0aGlzLl9kZWxldGVCeVBLU3FsLCBwYXJhbXMsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmVqZWN0KGVycik7XG4gICAgICAgIGVsc2UgcmVzb2x2ZSgpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSByZWNvcmQgZnJvbSB0aGUgZGF0YWJhc2UgYmFzZWQgb24gYSBwcmltYXJ5IGtleS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBrIHRoZSB2YWx1ZSBvZiB0aGUgcHJpbWFyeSBrZXkuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBcbiAgICovXG4gIGdldChwaykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBwcmltYXJ5S2V5ID0gdGhpcy5fdGFibGVEZWZpbml0aW9uLnByaW1hcnlLZXk7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICAgIHBhcmFtc1tgJCR7cHJpbWFyeUtleX1gXSA9IHBrO1xuICAgICAgdGhpcy5fZGIuZ2V0KHRoaXMuX2dldE9uZUJ5UEtTcWwsIHBhcmFtcywgKGVyciwgcm93KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIHJlc29sdmUocm93KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgcmVjb3JkcyBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8KltdPn1cbiAgICovXG4gIGdldEFsbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fZGIuYWxsKHRoaXMuX2dldEFsbFNxbCwgKGVyciwgcm93cykgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlKHJvd3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGEgcmVjb3JkIGludG8gdGhlIGRhdGFiYXNlLlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGEuIFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGluc2VydChkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChEYXRhYmFzZUhlbHBlci5pc1ZhbGlkSW5zZXJ0RGF0YSh0aGlzLl90YWJsZURlZmluaXRpb24sIGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkRGF0YSA9IERhdGFiYXNlSGVscGVyLnByZXBhcmVEYXRhRm9ySW5zZXJ0KHRoaXMuX3RhYmxlRGVmaW5pdGlvbiwgZGF0YSk7XG4gICAgICAgIHRoaXMuX2RiLnJ1bih0aGlzLl9pbnNlcnRTcWwsIHByZXBhcmVkRGF0YSwgKGVycikgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gdGhlIGRhdGFiYXNlLlxuICAgKi9cbiAgb3BlbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fZGIuc2VyaWFsaXplKCgpID0+IHtcbiAgICAgICAgdGhpcy5fY3JlYXRlVGFibGUoKVxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9pbml0aWFsaXplKCkpXG4gICAgICAgIC50aGVuKCgpID0+IHJlc29sdmUoKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWNvcmQgaW4gdGhlIGRhdGFiYXNlLlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGEuIFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHVwZGF0ZShkYXRhKSB7XG4gICAgcmV0dXJuICh0aGlzLl9vcHRpb25zLmlzTGVkZ2VyKSBcbiAgICA/IFByb21pc2UucmVzb2x2ZSgpXG4gICAgOiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoRGF0YWJhc2VIZWxwZXIuaXNWYWxpZFVwZGF0ZURhdGEodGhpcy5fdGFibGVEZWZpbml0aW9uLCBkYXRhKSkge1xuICAgICAgICBjb25zdCBwcmVwYXJlZERhdGEgPSBEYXRhYmFzZUhlbHBlci5wcmVwYXJlRGF0YUZvclVwZGF0ZSh0aGlzLl90YWJsZURlZmluaXRpb24sIGRhdGEpO1xuICAgICAgICB0aGlzLl9kYi5ydW4odGhpcy5fdXBkYXRlQnlQS1NxbCwgcHJlcGFyZWREYXRhLCAoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikgcmVqZWN0KGVycik7XG4gICAgICAgICAgZWxzZSByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgdGFibGUgaW4gdGhlIGRhdGFiYXNlIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QuXG4gICAqL1xuICBfY3JlYXRlVGFibGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX2RiLnJ1bihTcWxIZWxwZXIuZ2VuZXJhdGVDcmVhdGVUYWJsZVNxbCh0aGlzLl90YWJsZURlZmluaXRpb24pLCAoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoaXMgc3R1Yi5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBfaW5pdGlhbGl6ZSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhYmFzZTsiXSwiZmlsZSI6ImRldmljZS9kYi9EYXRhYmFzZS5qcyJ9
