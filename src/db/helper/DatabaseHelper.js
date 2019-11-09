import Database from "../Database";

class DatabaseHelper {

  static TEXT = "TEXT";
  static BIGINT = "BIGINT";
  static INT = "INTEGER";
  static BOOLEAN = "BOOLEAN";
  static REAL = "REAL";
  static BLOB = "BLOB";

  /**
   * Check to see if the insert data is valid.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} tableFields the fields of the table.
   * @param {*} data the data
   * @returns {boolean} whether or not the data is valid for insert.
   */
  static isValidInsertData(tableFields, data) {
    let hasPrimaryKey = false;
    for (const { name, type, isPrimaryKey, autoincrement } of tableFields) {
      if (isPrimaryKey) hasPrimaryKey = true;
      if (!autoincrement && !DatabaseHelper._dataHasKeyOfName(data, name)) return false;
      if (!autoincrement &&!DatabaseHelper._dataKeyOfNameIsOfType(name, type, data)) return false;
    }
    return hasPrimaryKey;
  }

  /**
   * Check to see if the update data is valid.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} tableFields the fields of the table.
   * @param {*} data the data
   * @returns {boolean}
   */
  static isValidUpdateData(tableFields, data) {
    for (const { name, type, includeInUpdate = true, isPrimaryKey } of tableFields) {
      if (includeInUpdate || isPrimaryKey) {
        if (DatabaseHelper._dataHasKeyOfName(data, name) && !DatabaseHelper._dataKeyOfNameIsOfType(name, type, data)) return false;
      } else if (!includeInUpdate && DatabaseHelper._dataHasKeyOfName(data, name)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Prepare data for insert.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} tableFields the fields of the table.
   * @param {*} data the data
   * @returns {*} the prepared insert data.
   */
  static prepareDataForInsert(tableFields, data) {
    const prepared = {};
    tableFields.forEach(({ name }) => prepared[`$${name}`] = data[name]);
    return prepared;
  }

  /**
   * Prepare data for update.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} tableFields the fields of the table.
   * @param {*} data the data
   * @returns {*} the prepared update data.
   */
  static prepareDataForUpdate(tableFields, data) {
    const prepared = {};
    tableFields.forEach(({ name, includeInUpdate = true, isPrimaryKey }) => {
      if (includeInUpdate || isPrimaryKey) prepared[`$${name}`] = data[name];
    });
    return prepared;
  }

  /**
   * Check to see if the data has a key of a given name.
   * @param {*} data the data
   * @param {string} name the name of the key.
   * @returns {boolean}
   */
  static _dataHasKeyOfName(data, name) {
    return data[name] != null && data[name] != undefined;
  }

  /**
   * Check to see if the data value of a key is of a given type.
   * @param {string} name the name of the key.
   * @param {string} type the type of data.
   * @param {*} data the data.
   * @returns {boolean}
   */
  static _dataKeyOfNameIsOfType(name, type, data) {
    switch(type.toUpperCase()) {
      case DatabaseHelper.TEXT:
        return DatabaseHelper._dataKeyOfNameIsOfTypeText(name, data);
      case DatabaseHelper.INT:
        return DatabaseHelper._dataKeyOfNameIsOfTypeInt(name, data);
      case DatabaseHelper.BIGINT:
        return DatabaseHelper._dataKeyOfNameIsOfTypeBigInt(name, data);
      case DatabaseHelper.BOOLEAN:
        return DatabaseHelper._dataKeyOfNameIsOfTypeBoolean(name, data);
      case DatabaseHelper.REAL:
        return DatabaseHelper._dataKeyOfNameIsOfTypeReal(name, data);
      default:
        return false;
    }
  }

  /**
   * Check to see if the data value of a key is a big integer.
   * @param {string} name the name of the key.
   * @param {*} data the data.
   * @returns {boolean}
   */
  static _dataKeyOfNameIsOfTypeBigInt(name, data) {
    return typeof data[name] === "bigint" || typeof data[name] === "number";
  }

  /**
   * Check to see if the data value of a key is a boolean.
   * @param {string} name the name of the key.
   * @param {*} data the data.
   * @returns {boolean}
   */
  static _dataKeyOfNameIsOfTypeBoolean(name, data) {
    return typeof data[name] === "boolean";
  }

  /**
   * Check to see if the data value of a key is an integer.
   * @param {string} name the name of the key.
   * @param {*} data the data.
   * @returns {boolean}
   */
  static _dataKeyOfNameIsOfTypeInt(name, data) {
    return typeof data[name] === "number" && Number.isInteger(data[name]);
  }

  /**
   * Check to see if the data value of a key is a real number.
   * @param {string} name the name of the key.
   * @param {*} data the data.
   * @returns {boolean}
   */
  static _dataKeyOfNameIsOfTypeReal(name, data) {
    return typeof data[name] === "number" && !Number.isInteger(data[name]);
  }

  /**
   * Check to see if the data value of a key is a text.
   * @param {string} name the name of the key.
   * @param {*} data the data.
   * @returns {boolean}
   */
  static _dataKeyOfNameIsOfTypeText(name, data) {
    return typeof data[name] === "string";
  }
}

export default DatabaseHelper;
