class SqlHelper {

  /**
   * Generate the sql that creates a table.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @returns {string} the sql.
   */
  static generateCreateTableSql({ name, primaryKey, fields}) {
    const values = [];
    for (const { name, type, autoincrement } of fields) {
      let value = `${name} ${type}`;
      if (name === primaryKey) {
        value += " PRIMARY KEY";
      }
      if (autoincrement) {
        value += " AUTOINCREMENT";
      }
      values.push(value);
    }
    return `CREATE TABLE IF NOT EXISTS ${name} (${values.join(",")})`;
  }

  /**
   * Generate the sql that deletes an object by its primary key.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @returns {string} the sql.
   */
  static generateDeleteByPrimaryKeySql({ name, primaryKey }) {
    return `DELETE FROM ${name} WHERE ${primaryKey} = $${primaryKey}`;
  }

    /**
   * Generate the sql that returns all objects in the table.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @returns {string} the sql.
   */
  static generateGetAllSql({ name }) {
    return `SELECT * FROM ${name}`;
  }

  /**
   * Generate the sql that gets an object from the table by its primary key.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition
   * @returns {string} the sql.
   */
  static generateGetByPrimaryKeySql({ name, primaryKey}) {
    return `SELECT * FROM ${name} WHERE ${primaryKey} = $${primaryKey}`;
  }

  /**
   * Generate the sql that inserts an object into the table.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition
   * @returns {string} the sql.
   */
  static generateInsertSql({ name, fields}) {
    let insertFields = fields.map(({ name }) => name);
    let insertValues = fields.map(({ name }) => `$${name}`);
    return `INSERT INTO ${name} (${insertFields.join(",")}) VALUES (${insertValues.join(",")})`;
  }

  /**
   * Generate the sql that updates an object by its primary key.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition
   * @returns {string} the sql.
   */
  static generateUpdateByPrimaryKeySql({ name, primaryKey, fields}) {
    const fieldUpdates = fields.filter(({ includeInUpdate = true, autoincrement = false }) => !autoincrement && includeInUpdate).map(({ name }) => `${name} = $${name}`);
    return `UPDATE ${name} SET ${fieldUpdates.join(",")} WHERE ${primaryKey} = $${primaryKey}`;
  }
}

export default SqlHelper;
