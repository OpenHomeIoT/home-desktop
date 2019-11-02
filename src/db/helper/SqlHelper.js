class SqlHelper {

  /**
   * Generate the sql that creates a table.
   * @param {string} tableName the name of the table.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} fields the table's fields.
   * @returns {string} the sql.
   */
  static generateCreateTableSql(tableName, fields) {
    const values = [];
    for (const { name, type, isPrimaryKey, autoincrement } of fields) {
      let value = `${name} ${type}`;
      if (isPrimaryKey) {
        value += " PRIMARY KEY";
      }
      if (autoincrement) {
        value += " AUTOINCREMENT";
      }
      values.push(value);
    }
    return `CREATE TABLE IF NOT EXISTS ${tableName} (${values.join(",")})`;
  }

  /**
   * Generate the sql that deletes an object by its primary key.
   * @param {string} tableName the name of the table.
   * @param {string} primaryKey the name of the primary key of the table.
   * @returns {string} the sql.
   */
  static generateDeleteByPrimaryKeySql(tableName, primaryKey) {
    return `DELETE FROM ${tableName} WHERE ${primaryKey} = $${primaryKey}`;
  }

    /**
   * Generate the sql that returns all objects in the table.
   * @param {string} tableName the name of the table.
   * @returns {string} the sql.
   */
  static generateGetAllSql(tableName) {
    return `SELECT * FROM ${tableName}`;
  }

  /**
   * Generate the sql that gets an object from the table by its primary key.
   * @param {string} tableName the name of the table.
   * @param {string} primaryKey the name of the primary key of the table.
   * @returns {string} the sql.
   */
  static generateGetByPrimaryKeySql(tableName, primaryKey) {
    return `SELECT * FROM ${tableName} WHERE ${primaryKey} = $${primaryKey}`;
  }

  /**
   * Generate the sql that inserts an object into the table.
   * @param {string} tableName the name of the table.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} tableFields the fields of the table.
   * @returns {string} the sql.
   */
  static generateInsertSql(tableName, tableFields) {
    let fields = [];
    let values = [];
    tableFields.forEach(({ name, type, isPrimaryKey, autoincrement }) => {
      let field = `${name} ${type}`;
      if (isPrimaryKey) field += " PRIMARY KEY";
      if (autoincrement) field += " AUTOINCREMENT";

      let value = `$${name}`;

      fields.push(field);
      values.push(value);
    });

    return `INSERT INTO ${tableName} (${fields.join(",")}) VALUES (${values.join(",")})`;
  }

  /**
   * Generate the sql that updates an object by its primary key.
   * @param {string} tableName the name of the table.
   * @param {{ name: string, type: string, isPrimaryKey?: boolean, autoincrement?: boolean, includeInUpdate?: boolean }[]} tableFields the fields of the table.
   * @param {string} primaryKey the name of the primary key of the table.
   * @returns {string} the sql.
   */
  static generateUpdateByPrimaryKeySql(tableName, tableFields, primaryKey) {
    const fieldUpdates = tableFields.filter(({ includeInUpdate }) => includeInUpdate).map(({ name }) => `${name} = $${name}`);

    return `UPDATE ${tableName} SET ${fieldUpdates.join(",")} WHERE ${primaryKey} = $${primaryKey}`;
  }
}

export default SqlHelper;
