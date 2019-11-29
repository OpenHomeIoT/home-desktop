"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SqlHelper {
  /**
   * Generate the sql that creates a table.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @returns {string} the sql.
   */
  static generateCreateTableSql({
    name,
    primaryKey,
    fields
  }) {
    const values = [];

    for (const {
      name,
      type,
      autoincrement
    } of fields) {
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


  static generateDeleteByPrimaryKeySql({
    name,
    primaryKey
  }) {
    return `DELETE FROM ${name} WHERE ${primaryKey} = $${primaryKey}`;
  }
  /**
  * Generate the sql that returns all objects in the table.
  * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
  * @returns {string} the sql.
  */


  static generateGetAllSql({
    name
  }) {
    return `SELECT * FROM ${name}`;
  }
  /**
   * Generate the sql that gets an object from the table by its primary key.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition
   * @returns {string} the sql.
   */


  static generateGetByPrimaryKeySql({
    name,
    primaryKey
  }) {
    return `SELECT * FROM ${name} WHERE ${primaryKey} = $${primaryKey}`;
  }
  /**
   * Generate the sql that inserts an object into the table.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition
   * @returns {string} the sql.
   */


  static generateInsertSql({
    name,
    fields
  }) {
    let insertFields = fields.map(({
      name
    }) => name);
    let insertValues = fields.map(({
      name
    }) => `$${name}`);
    return `INSERT INTO ${name} (${insertFields.join(",")}) VALUES (${insertValues.join(",")})`;
  }
  /**
   * Generate the sql that updates an object by its primary key.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition
   * @returns {string} the sql.
   */


  static generateUpdateByPrimaryKeySql({
    name,
    primaryKey,
    fields
  }) {
    const fieldUpdates = fields.filter(({
      includeInUpdate = true,
      autoincrement = false
    }) => !autoincrement && includeInUpdate).map(({
      name
    }) => `${name} = $${name}`);
    return `UPDATE ${name} SET ${fieldUpdates.join(",")} WHERE ${primaryKey} = $${primaryKey}`;
  }

}

var _default = SqlHelper;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9oZWxwZXIvU3FsSGVscGVyLmpzIl0sIm5hbWVzIjpbIlNxbEhlbHBlciIsImdlbmVyYXRlQ3JlYXRlVGFibGVTcWwiLCJuYW1lIiwicHJpbWFyeUtleSIsImZpZWxkcyIsInZhbHVlcyIsInR5cGUiLCJhdXRvaW5jcmVtZW50IiwidmFsdWUiLCJwdXNoIiwiam9pbiIsImdlbmVyYXRlRGVsZXRlQnlQcmltYXJ5S2V5U3FsIiwiZ2VuZXJhdGVHZXRBbGxTcWwiLCJnZW5lcmF0ZUdldEJ5UHJpbWFyeUtleVNxbCIsImdlbmVyYXRlSW5zZXJ0U3FsIiwiaW5zZXJ0RmllbGRzIiwibWFwIiwiaW5zZXJ0VmFsdWVzIiwiZ2VuZXJhdGVVcGRhdGVCeVByaW1hcnlLZXlTcWwiLCJmaWVsZFVwZGF0ZXMiLCJmaWx0ZXIiLCJpbmNsdWRlSW5VcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFNQSxTQUFOLENBQWdCO0FBRWQ7Ozs7O0FBS0EsU0FBT0Msc0JBQVAsQ0FBOEI7QUFBRUMsSUFBQUEsSUFBRjtBQUFRQyxJQUFBQSxVQUFSO0FBQW9CQyxJQUFBQTtBQUFwQixHQUE5QixFQUEyRDtBQUN6RCxVQUFNQyxNQUFNLEdBQUcsRUFBZjs7QUFDQSxTQUFLLE1BQU07QUFBRUgsTUFBQUEsSUFBRjtBQUFRSSxNQUFBQSxJQUFSO0FBQWNDLE1BQUFBO0FBQWQsS0FBWCxJQUE0Q0gsTUFBNUMsRUFBb0Q7QUFDbEQsVUFBSUksS0FBSyxHQUFJLEdBQUVOLElBQUssSUFBR0ksSUFBSyxFQUE1Qjs7QUFDQSxVQUFJSixJQUFJLEtBQUtDLFVBQWIsRUFBeUI7QUFDdkJLLFFBQUFBLEtBQUssSUFBSSxjQUFUO0FBQ0Q7O0FBQ0QsVUFBSUQsYUFBSixFQUFtQjtBQUNqQkMsUUFBQUEsS0FBSyxJQUFJLGdCQUFUO0FBQ0Q7O0FBQ0RILE1BQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZRCxLQUFaO0FBQ0Q7O0FBQ0QsV0FBUSw4QkFBNkJOLElBQUssS0FBSUcsTUFBTSxDQUFDSyxJQUFQLENBQVksR0FBWixDQUFpQixHQUEvRDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFPQyw2QkFBUCxDQUFxQztBQUFFVCxJQUFBQSxJQUFGO0FBQVFDLElBQUFBO0FBQVIsR0FBckMsRUFBMkQ7QUFDekQsV0FBUSxlQUFjRCxJQUFLLFVBQVNDLFVBQVcsT0FBTUEsVUFBVyxFQUFoRTtBQUNEO0FBRUM7Ozs7Ozs7QUFLRixTQUFPUyxpQkFBUCxDQUF5QjtBQUFFVixJQUFBQTtBQUFGLEdBQXpCLEVBQW1DO0FBQ2pDLFdBQVEsaUJBQWdCQSxJQUFLLEVBQTdCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFNBQU9XLDBCQUFQLENBQWtDO0FBQUVYLElBQUFBLElBQUY7QUFBUUMsSUFBQUE7QUFBUixHQUFsQyxFQUF1RDtBQUNyRCxXQUFRLGlCQUFnQkQsSUFBSyxVQUFTQyxVQUFXLE9BQU1BLFVBQVcsRUFBbEU7QUFDRDtBQUVEOzs7Ozs7O0FBS0EsU0FBT1csaUJBQVAsQ0FBeUI7QUFBRVosSUFBQUEsSUFBRjtBQUFRRSxJQUFBQTtBQUFSLEdBQXpCLEVBQTBDO0FBQ3hDLFFBQUlXLFlBQVksR0FBR1gsTUFBTSxDQUFDWSxHQUFQLENBQVcsQ0FBQztBQUFFZCxNQUFBQTtBQUFGLEtBQUQsS0FBY0EsSUFBekIsQ0FBbkI7QUFDQSxRQUFJZSxZQUFZLEdBQUdiLE1BQU0sQ0FBQ1ksR0FBUCxDQUFXLENBQUM7QUFBRWQsTUFBQUE7QUFBRixLQUFELEtBQWUsSUFBR0EsSUFBSyxFQUFsQyxDQUFuQjtBQUNBLFdBQVEsZUFBY0EsSUFBSyxLQUFJYSxZQUFZLENBQUNMLElBQWIsQ0FBa0IsR0FBbEIsQ0FBdUIsYUFBWU8sWUFBWSxDQUFDUCxJQUFiLENBQWtCLEdBQWxCLENBQXVCLEdBQXpGO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFNBQU9RLDZCQUFQLENBQXFDO0FBQUVoQixJQUFBQSxJQUFGO0FBQVFDLElBQUFBLFVBQVI7QUFBb0JDLElBQUFBO0FBQXBCLEdBQXJDLEVBQWtFO0FBQ2hFLFVBQU1lLFlBQVksR0FBR2YsTUFBTSxDQUFDZ0IsTUFBUCxDQUFjLENBQUM7QUFBRUMsTUFBQUEsZUFBZSxHQUFHLElBQXBCO0FBQTBCZCxNQUFBQSxhQUFhLEdBQUc7QUFBMUMsS0FBRCxLQUF1RCxDQUFDQSxhQUFELElBQWtCYyxlQUF2RixFQUF3R0wsR0FBeEcsQ0FBNEcsQ0FBQztBQUFFZCxNQUFBQTtBQUFGLEtBQUQsS0FBZSxHQUFFQSxJQUFLLE9BQU1BLElBQUssRUFBN0ksQ0FBckI7QUFDQSxXQUFRLFVBQVNBLElBQUssUUFBT2lCLFlBQVksQ0FBQ1QsSUFBYixDQUFrQixHQUFsQixDQUF1QixVQUFTUCxVQUFXLE9BQU1BLFVBQVcsRUFBekY7QUFDRDs7QUFwRWE7O2VBdUVESCxTIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3FsSGVscGVyIHtcblxuICAvKipcbiAgICogR2VuZXJhdGUgdGhlIHNxbCB0aGF0IGNyZWF0ZXMgYSB0YWJsZS5cbiAgICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgaXNMZWRnZXI/OiBib29sZWFuLCBwcmltYXJ5S2V5OiBzdHJpbmcsIGZpZWxkczogeyBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYXV0b2luY3JlbWVudD86IGJvb2xlYW4sIGluY2x1ZGVJblVwZGF0ZT86IGJvb2xlYW4gfVtdIH19IHRhYmxlRGVmaW5pdGlvbiB0aGUgdGFibGUgZGVmaW5pdGlvbi5cbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHNxbC5cbiAgICovXG4gIHN0YXRpYyBnZW5lcmF0ZUNyZWF0ZVRhYmxlU3FsKHsgbmFtZSwgcHJpbWFyeUtleSwgZmllbGRzfSkge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgeyBuYW1lLCB0eXBlLCBhdXRvaW5jcmVtZW50IH0gb2YgZmllbGRzKSB7XG4gICAgICBsZXQgdmFsdWUgPSBgJHtuYW1lfSAke3R5cGV9YDtcbiAgICAgIGlmIChuYW1lID09PSBwcmltYXJ5S2V5KSB7XG4gICAgICAgIHZhbHVlICs9IFwiIFBSSU1BUlkgS0VZXCI7XG4gICAgICB9XG4gICAgICBpZiAoYXV0b2luY3JlbWVudCkge1xuICAgICAgICB2YWx1ZSArPSBcIiBBVVRPSU5DUkVNRU5UXCI7XG4gICAgICB9XG4gICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgJHtuYW1lfSAoJHt2YWx1ZXMuam9pbihcIixcIil9KWA7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgdGhlIHNxbCB0aGF0IGRlbGV0ZXMgYW4gb2JqZWN0IGJ5IGl0cyBwcmltYXJ5IGtleS5cbiAgICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgaXNMZWRnZXI/OiBib29sZWFuLCBwcmltYXJ5S2V5OiBzdHJpbmcsIGZpZWxkczogeyBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYXV0b2luY3JlbWVudD86IGJvb2xlYW4sIGluY2x1ZGVJblVwZGF0ZT86IGJvb2xlYW4gfVtdIH19IHRhYmxlRGVmaW5pdGlvbiB0aGUgdGFibGUgZGVmaW5pdGlvbi5cbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHNxbC5cbiAgICovXG4gIHN0YXRpYyBnZW5lcmF0ZURlbGV0ZUJ5UHJpbWFyeUtleVNxbCh7IG5hbWUsIHByaW1hcnlLZXkgfSkge1xuICAgIHJldHVybiBgREVMRVRFIEZST00gJHtuYW1lfSBXSEVSRSAke3ByaW1hcnlLZXl9ID0gJCR7cHJpbWFyeUtleX1gO1xuICB9XG5cbiAgICAvKipcbiAgICogR2VuZXJhdGUgdGhlIHNxbCB0aGF0IHJldHVybnMgYWxsIG9iamVjdHMgaW4gdGhlIHRhYmxlLlxuICAgKiBAcGFyYW0ge3sgbmFtZTogc3RyaW5nLCBpc0xlZGdlcj86IGJvb2xlYW4sIHByaW1hcnlLZXk6IHN0cmluZywgZmllbGRzOiB7IG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBhdXRvaW5jcmVtZW50PzogYm9vbGVhbiwgaW5jbHVkZUluVXBkYXRlPzogYm9vbGVhbiB9W10gfX0gdGFibGVEZWZpbml0aW9uIHRoZSB0YWJsZSBkZWZpbml0aW9uLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgc3FsLlxuICAgKi9cbiAgc3RhdGljIGdlbmVyYXRlR2V0QWxsU3FsKHsgbmFtZSB9KSB7XG4gICAgcmV0dXJuIGBTRUxFQ1QgKiBGUk9NICR7bmFtZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBzcWwgdGhhdCBnZXRzIGFuIG9iamVjdCBmcm9tIHRoZSB0YWJsZSBieSBpdHMgcHJpbWFyeSBrZXkuXG4gICAqIEBwYXJhbSB7eyBuYW1lOiBzdHJpbmcsIGlzTGVkZ2VyPzogYm9vbGVhbiwgcHJpbWFyeUtleTogc3RyaW5nLCBmaWVsZHM6IHsgbmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGF1dG9pbmNyZW1lbnQ/OiBib29sZWFuLCBpbmNsdWRlSW5VcGRhdGU/OiBib29sZWFuIH1bXSB9fSB0YWJsZURlZmluaXRpb24gdGhlIHRhYmxlIGRlZmluaXRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHNxbC5cbiAgICovXG4gIHN0YXRpYyBnZW5lcmF0ZUdldEJ5UHJpbWFyeUtleVNxbCh7IG5hbWUsIHByaW1hcnlLZXl9KSB7XG4gICAgcmV0dXJuIGBTRUxFQ1QgKiBGUk9NICR7bmFtZX0gV0hFUkUgJHtwcmltYXJ5S2V5fSA9ICQke3ByaW1hcnlLZXl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSB0aGUgc3FsIHRoYXQgaW5zZXJ0cyBhbiBvYmplY3QgaW50byB0aGUgdGFibGUuXG4gICAqIEBwYXJhbSB7eyBuYW1lOiBzdHJpbmcsIGlzTGVkZ2VyPzogYm9vbGVhbiwgcHJpbWFyeUtleTogc3RyaW5nLCBmaWVsZHM6IHsgbmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGF1dG9pbmNyZW1lbnQ/OiBib29sZWFuLCBpbmNsdWRlSW5VcGRhdGU/OiBib29sZWFuIH1bXSB9fSB0YWJsZURlZmluaXRpb24gdGhlIHRhYmxlIGRlZmluaXRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHNxbC5cbiAgICovXG4gIHN0YXRpYyBnZW5lcmF0ZUluc2VydFNxbCh7IG5hbWUsIGZpZWxkc30pIHtcbiAgICBsZXQgaW5zZXJ0RmllbGRzID0gZmllbGRzLm1hcCgoeyBuYW1lIH0pID0+IG5hbWUpO1xuICAgIGxldCBpbnNlcnRWYWx1ZXMgPSBmaWVsZHMubWFwKCh7IG5hbWUgfSkgPT4gYCQke25hbWV9YCk7XG4gICAgcmV0dXJuIGBJTlNFUlQgSU5UTyAke25hbWV9ICgke2luc2VydEZpZWxkcy5qb2luKFwiLFwiKX0pIFZBTFVFUyAoJHtpbnNlcnRWYWx1ZXMuam9pbihcIixcIil9KWA7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgdGhlIHNxbCB0aGF0IHVwZGF0ZXMgYW4gb2JqZWN0IGJ5IGl0cyBwcmltYXJ5IGtleS5cbiAgICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgaXNMZWRnZXI/OiBib29sZWFuLCBwcmltYXJ5S2V5OiBzdHJpbmcsIGZpZWxkczogeyBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYXV0b2luY3JlbWVudD86IGJvb2xlYW4sIGluY2x1ZGVJblVwZGF0ZT86IGJvb2xlYW4gfVtdIH19IHRhYmxlRGVmaW5pdGlvbiB0aGUgdGFibGUgZGVmaW5pdGlvblxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgc3FsLlxuICAgKi9cbiAgc3RhdGljIGdlbmVyYXRlVXBkYXRlQnlQcmltYXJ5S2V5U3FsKHsgbmFtZSwgcHJpbWFyeUtleSwgZmllbGRzfSkge1xuICAgIGNvbnN0IGZpZWxkVXBkYXRlcyA9IGZpZWxkcy5maWx0ZXIoKHsgaW5jbHVkZUluVXBkYXRlID0gdHJ1ZSwgYXV0b2luY3JlbWVudCA9IGZhbHNlIH0pID0+ICFhdXRvaW5jcmVtZW50ICYmIGluY2x1ZGVJblVwZGF0ZSkubWFwKCh7IG5hbWUgfSkgPT4gYCR7bmFtZX0gPSAkJHtuYW1lfWApO1xuICAgIHJldHVybiBgVVBEQVRFICR7bmFtZX0gU0VUICR7ZmllbGRVcGRhdGVzLmpvaW4oXCIsXCIpfSBXSEVSRSAke3ByaW1hcnlLZXl9ID0gJCR7cHJpbWFyeUtleX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNxbEhlbHBlcjtcbiJdLCJmaWxlIjoiZGV2aWNlL2RiL2hlbHBlci9TcWxIZWxwZXIuanMifQ==
