class DatabaseHelper {

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
      if (!DatabaseHelper._dataHasKeyOfName(name, data)) return false;
      if (!DatabaseHelper._dataKeyOfNameIsOfType(name, type, data)) return false;
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
    for (const { name, type, includeInUpdate } of tableFields) {
      if (includeInUpdate) {
        if (!DatabaseHelper._dataHasKeyOfName(data, name)) return false;
        if (!DatabaseHelper._dataKeyOfNameIsOfType(name, type, data)) return false;
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
    tableFields.forEach(({ name, includeInUpdate }) => {
      if (includeInUpdate) prepared[`$${name}`] = data[name];
    });
    return prepared;
  }

  /**
   * Check to see if the data has a key of a given name.
   * @param {string} name the name of the key.
   * @param {*} data the data.
   * @returns {boolean}
   */
  static _dataHasKeyOfName(name, data) {
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
      case "TEXT":
        return DatabaseHelper._dataKeyOfNameIsOfTypeText(name, data);
      case "INT":
        return DatabaseHelper._dataKeyOfNameIsOfTypeInt(name, data);
      case "BIGINT":
        return DatabaseHelper._dataKeyOfNameIsOfTypeBigInt(name, data);
      case "BOOLEAN":
        return DatabaseHelper._dataKeyOfNameIsOfTypeBoolean(name, data);
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
    return typeof data[name] === "number"; // TODO: int check
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
