import lowdb from "lowdb";
import Memory from "lowdb/adapters/Memory";

class Cache {

  /**
   * Cache constructor.
   * @param {string} name the name of the cache.
   */
  constructor(name) {
    this._cacheName = name;
    this._db = new lowdb(new Memory());
    const tableCount = `${name}Count`;
    let tableDefaults = {};
    tableDefaults[name] = [];
    tableDefaults[tableCount] = 0;
    this._db.defaults(tableDefaults)
    .write();

    // binding
    this.close = this.close.bind(this);
    this.count = this.count.bind(this);
    this.delete = this.delete.bind(this);
    this.exists = this.exists.bind(this);
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);

    this._decreaseRecordCount = this._decreaseRecordCount.bind(this);
    this._getTable = this._getTable.bind(this);
    this._increaseRecordCount = this._increaseRecordCount.bind(this);
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
      const count = `${this._cacheName}Count`;
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
    return new Promise((resolve, _) => {
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
    .then(record => record != null && record !== undefined && record !== {})
    .catch(_ => false);
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
      const all = this._getTable().value();
      resolve(all || []);
    });
  }

  /**
   * Insert a record into the database.
   * @param {*} data the data.
   * @returns {Promise<void>}
   */
  insert(data) {
    return this.exists(data._id)
    .then(exists => {
      if (!exists) {
        data.timeCached = Date.now();
        this._getTable()
        .push(data)
        .write();
        this._increaseRecordCount();
      } else return this.update(data);
    });
  }

  /**
   * Update a record in the database.
   * @param {*} data the data.
   * @returns {Promise<void>}
   */
  update(data) {
    return new Promise((resolve, reject) => {
      data.timeCached = Date.now();
      this._getTable()
      .find({ _id: data._id })
      .assign(data)
      .write();
      resolve();
    });
  }

  _decreaseRecordCount() {
    const count = `${this._cacheName}Count`;
    const currentCount = this._db.get(count).value();
    return this._db.set(count, currentCount - 1).write();
  }

  _getTable() {
    return this._db.get(this._cacheName);
  }

  _increaseRecordCount() {
    const count = `${this._cacheName}Count`;
    const currentCount = this._db.get(count).value();
    return this._db.set(count, currentCount + 1).write();
  }
}

export default Cache;
