"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = _interopRequireDefault(require("../Database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DatabaseHelper {
  /**
   * Check to see if the insert data is valid.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @param {*} data the data
   * @returns {boolean} whether or not the data is valid for insert.
   */
  static isValidInsertData({
    fields
  }, data) {
    for (const {
      name,
      type,
      autoincrement
    } of fields) {
      if (!autoincrement && !DatabaseHelper._dataHasKeyOfName(data, name)) return false;
      if (!autoincrement && !DatabaseHelper._dataKeyOfNameIsOfType(name, type, data)) return false;
    }

    return true;
  }
  /**
   * Check to see if the update data is valid.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @param {*} data the data
   * @returns {boolean}
   */


  static isValidUpdateData({
    primaryKey,
    fields
  }, data) {
    for (const {
      name,
      type,
      includeInUpdate = true
    } of fields) {
      if (includeInUpdate || primaryKey === name) {
        if (DatabaseHelper._dataHasKeyOfName(data, name) && !DatabaseHelper._dataKeyOfNameIsOfType(name, type, data)) return false;
      } else if (!includeInUpdate && DatabaseHelper._dataHasKeyOfName(data, name)) {
        return false;
      }
    }

    return true;
  }
  /**
   * Prepare data for insert.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @param {*} data the data
   * @returns {*} the prepared insert data.
   */


  static prepareDataForInsert({
    fields
  }, data) {
    const prepared = {};
    fields.forEach(({
      name
    }) => prepared[`$${name}`] = data[name]);
    return prepared;
  }
  /**
   * Prepare data for update.
   * @param {{ name: string, isLedger?: boolean, primaryKey: string, fields: { name: string, type: string, autoincrement?: boolean, includeInUpdate?: boolean }[] }} tableDefinition the table definition.
   * @param {*} data the data
   * @returns {*} the prepared update data.
   */


  static prepareDataForUpdate({
    fields,
    primaryKey
  }, data) {
    const prepared = {};
    fields.forEach(({
      name,
      includeInUpdate = true
    }) => {
      if (includeInUpdate || primaryKey === name) prepared[`$${name}`] = data[name];
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
    switch (type.toUpperCase()) {
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

_defineProperty(DatabaseHelper, "TEXT", "TEXT");

_defineProperty(DatabaseHelper, "BIGINT", "BIGINT");

_defineProperty(DatabaseHelper, "INT", "INTEGER");

_defineProperty(DatabaseHelper, "BOOLEAN", "BOOLEAN");

_defineProperty(DatabaseHelper, "REAL", "REAL");

_defineProperty(DatabaseHelper, "BLOB", "BLOB");

var _default = DatabaseHelper;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9oZWxwZXIvRGF0YWJhc2VIZWxwZXIuanMiXSwibmFtZXMiOlsiRGF0YWJhc2VIZWxwZXIiLCJpc1ZhbGlkSW5zZXJ0RGF0YSIsImZpZWxkcyIsImRhdGEiLCJuYW1lIiwidHlwZSIsImF1dG9pbmNyZW1lbnQiLCJfZGF0YUhhc0tleU9mTmFtZSIsIl9kYXRhS2V5T2ZOYW1lSXNPZlR5cGUiLCJpc1ZhbGlkVXBkYXRlRGF0YSIsInByaW1hcnlLZXkiLCJpbmNsdWRlSW5VcGRhdGUiLCJwcmVwYXJlRGF0YUZvckluc2VydCIsInByZXBhcmVkIiwiZm9yRWFjaCIsInByZXBhcmVEYXRhRm9yVXBkYXRlIiwidW5kZWZpbmVkIiwidG9VcHBlckNhc2UiLCJURVhUIiwiX2RhdGFLZXlPZk5hbWVJc09mVHlwZVRleHQiLCJJTlQiLCJfZGF0YUtleU9mTmFtZUlzT2ZUeXBlSW50IiwiQklHSU5UIiwiX2RhdGFLZXlPZk5hbWVJc09mVHlwZUJpZ0ludCIsIkJPT0xFQU4iLCJfZGF0YUtleU9mTmFtZUlzT2ZUeXBlQm9vbGVhbiIsIlJFQUwiLCJfZGF0YUtleU9mTmFtZUlzT2ZUeXBlUmVhbCIsIk51bWJlciIsImlzSW50ZWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxNQUFNQSxjQUFOLENBQXFCO0FBU25COzs7Ozs7QUFNQSxTQUFPQyxpQkFBUCxDQUF5QjtBQUFFQyxJQUFBQTtBQUFGLEdBQXpCLEVBQXFDQyxJQUFyQyxFQUEyQztBQUN6QyxTQUFLLE1BQU07QUFBRUMsTUFBQUEsSUFBRjtBQUFRQyxNQUFBQSxJQUFSO0FBQWNDLE1BQUFBO0FBQWQsS0FBWCxJQUE0Q0osTUFBNUMsRUFBb0Q7QUFDbEQsVUFBSSxDQUFDSSxhQUFELElBQWtCLENBQUNOLGNBQWMsQ0FBQ08saUJBQWYsQ0FBaUNKLElBQWpDLEVBQXVDQyxJQUF2QyxDQUF2QixFQUFxRSxPQUFPLEtBQVA7QUFDckUsVUFBSSxDQUFDRSxhQUFELElBQWlCLENB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V0FBTyxPQUFPQSxJQUFJLENBQUNDLElBQUQsQ0FBWCxLQUFzQixRQUE3QjtBQUNEOztBQXJKa0I7O2dCQUFmSixjLFVBRVUsTTs7Z0JBRlZBLGMsWUFHWSxROztnQkFIWkEsYyxTQUlTLFM7O2dCQUpUQSxjLGFBS2EsUzs7Z0JBTGJBLGMsVUFNVSxNOztnQkFOVkEsYyxVQU9VLE07O2VBaUpEQSxjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuLi9EYXRhYmFzZVwiO1xuXG5jbGFzcyBEYXRhYmFzZUhlbHBlciB7XG5cbiAgc3RhdGljIFRFWFQgPSBcIlRFWFRcIjtcbiAgc3RhdGljIEJJR0lOVCA9IFwiQklHSU5UXCI7XG4gIHN0YXRpYyBJTlQgPSBcIklOVEVHRVJcIjtcbiAgc3RhdGljIEJPT0xFQU4gPSBcIkJPT0xFQU5cIjtcbiAgc3RhdGljIFJFQUwgPSBcIlJFQUxcIjtcbiAgc3RhdGljIEJMT0IgPSBcIkJMT0JcIjtcblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZSBpbnNlcnQgZGF0YSBpcyB2YWxpZC5cbiAgICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgaXNMZWRnZXI/OiBib29sZWFuLCBwcmltYXJ5S2V5OiBzdHJpbmcsIGZpZWxkczogeyBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYXV0b2luY3JlbWVudD86IGJvb2xlYW4sIGluY2x1ZGVJblVwZGF0ZT86IGJvb2xlYW4gfVtdIH19IHRhYmxlRGVmaW5pdGlvbiB0aGUgdGFibGUgZGVmaW5pdGlvbi5cbiAgICogQHBhcmFtIHsqfSBkYXRhIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIG9yIG5vdCB0aGUgZGF0YSBpcyB2YWxpZCBmb3IgaW5zZXJ0LlxuICAgKi9cbiAgc3RhdGljIGlzVmFsaWRJbnNlcnREYXRhKHsgZmllbGRzIH0sIGRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IHsgbmFtZSwgdHlwZSwgYXV0b2luY3JlbWVudCB9IG9mIGZpZWxkcykge1xuICAgICAgaWYgKCFhdXRvaW5jcmVtZW50ICYmICFEYXRhYmFzZUhlbHBlci5fZGF0YUhhc0tleU9mTmFtZShkYXRhLCBuYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFhdXRvaW5jcmVtZW50ICYmIURhdGFiYXNlSGVscGVyLl9kYXRhS2V5T2ZOYW1lSXNPZlR5cGUobmFtZSwgdHlwZSwgZGF0YSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZSB1cGRhdGUgZGF0YSBpcyB2YWxpZC5cbiAgICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgaXNMZWRnZXI/OiBib29sZWFuLCBwcmltYXJ5S2V5OiBzdHJpbmcsIGZpZWxkczogeyBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYXV0b2luY3JlbWVudD86IGJvb2xlYW4sIGluY2x1ZGVJblVwZGF0ZT86IGJvb2xlYW4gfVtdIH19IHRhYmxlRGVmaW5pdGlvbiB0aGUgdGFibGUgZGVmaW5pdGlvbi5cbiAgICogQHBhcmFtIHsqfSBkYXRhIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzVmFsaWRVcGRhdGVEYXRhKHsgcHJpbWFyeUtleSwgZmllbGRzIH0sIGRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IHsgbmFtZSwgdHlwZSwgaW5jbHVkZUluVXBkYXRlID0gdHJ1ZSB9IG9mIGZpZWxkcykge1xuICAgICAgaWYgKGluY2x1ZGVJblVwZGF0ZSB8fCAocHJpbWFyeUtleSA9PT0gbmFtZSkpIHtcbiAgICAgICAgaWYgKERhdGFiYXNlSGVscGVyLl9kYXRhSGFzS2V5T2ZOYW1lKGRhdGEsIG5hbWUpICYmICFEYXRhYmFzZUhlbHBlci5fZGF0YUtleU9mTmFtZUlzT2ZUeXBlKG5hbWUsIHR5cGUsIGRhdGEpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFpbmNsdWRlSW5VcGRhdGUgJiYgRGF0YWJhc2VIZWxwZXIuX2RhdGFIYXNLZXlPZk5hbWUoZGF0YSwgbmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgZGF0YSBmb3IgaW5zZXJ0LlxuICAgKiBAcGFyYW0ge3sgbmFtZTogc3RyaW5nLCBpc0xlZGdlcj86IGJvb2xlYW4sIHByaW1hcnlLZXk6IHN0cmluZywgZmllbGRzOiB7IG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBhdXRvaW5jcmVtZW50PzogYm9vbGVhbiwgaW5jbHVkZUluVXBkYXRlPzogYm9vbGVhbiB9W10gfX0gdGFibGVEZWZpbml0aW9uIHRoZSB0YWJsZSBkZWZpbml0aW9uLlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGFcbiAgICogQHJldHVybnMgeyp9IHRoZSBwcmVwYXJlZCBpbnNlcnQgZGF0YS5cbiAgICovXG4gIHN0YXRpYyBwcmVwYXJlRGF0YUZvckluc2VydCh7IGZpZWxkcyB9LCBkYXRhKSB7XG4gICAgY29uc3QgcHJlcGFyZWQgPSB7fTtcbiAgICBmaWVsZHMuZm9yRWFjaCgoeyBuYW1lIH0pID0+IHByZXBhcmVkW2AkJHtuYW1lfWBdID0gZGF0YVtuYW1lXSk7XG4gICAgcmV0dXJuIHByZXBhcmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgZGF0YSBmb3IgdXBkYXRlLlxuICAgKiBAcGFyYW0ge3sgbmFtZTogc3RyaW5nLCBpc0xlZGdlcj86IGJvb2xlYW4sIHByaW1hcnlLZXk6IHN0cmluZywgZmllbGRzOiB7IG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBhdXRvaW5jcmVtZW50PzogYm9vbGVhbiwgaW5jbHVkZUluVXBkYXRlPzogYm9vbGVhbiB9W10gfX0gdGFibGVEZWZpbml0aW9uIHRoZSB0YWJsZSBkZWZpbml0aW9uLlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGFcbiAgICogQHJldHVybnMgeyp9IHRoZSBwcmVwYXJlZCB1cGRhdGUgZGF0YS5cbiAgICovXG4gIHN0YXRpYyBwcmVwYXJlRGF0YUZvclVwZGF0ZSh7IGZpZWxkcywgcHJpbWFyeUtleSB9LCBkYXRhKSB7XG4gICAgY29uc3QgcHJlcGFyZWQgPSB7fTtcbiAgICBmaWVsZHMuZm9yRWFjaCgoeyBuYW1lLCBpbmNsdWRlSW5VcGRhdGUgPSB0cnVlIH0pID0+IHtcbiAgICAgIGlmIChpbmNsdWRlSW5VcGRhdGUgfHwgKHByaW1hcnlLZXkgPT09IG5hbWUpKSBwcmVwYXJlZFtgJCR7bmFtZX1gXSA9IGRhdGFbbmFtZV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHByZXBhcmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRvIHNlZSBpZiB0aGUgZGF0YSBoYXMgYSBrZXkgb2YgYSBnaXZlbiBuYW1lLlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGFcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIGtleS5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgX2RhdGFIYXNLZXlPZk5hbWUoZGF0YSwgbmFtZSkge1xuICAgIHJldHVybiBkYXRhW25hbWVdICE9IG51bGwgJiYgZGF0YVtuYW1lXSAhPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZSBkYXRhIHZhbHVlIG9mIGEga2V5IGlzIG9mIGEgZ2l2ZW4gdHlwZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIGtleS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHR5cGUgb2YgZGF0YS5cbiAgICogQHBhcmFtIHsqfSBkYXRhIHRoZSBkYXRhLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBfZGF0YUtleU9mTmFtZUlzT2ZUeXBlKG5hbWUsIHR5cGUsIGRhdGEpIHtcbiAgICBzd2l0Y2godHlwZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBjYXNlIERhdGFiYXNlSGVscGVyLlRFWFQ6XG4gICAgICAgIHJldHVybiBEYXRhYmFzZUhlbHBlci5fZGF0YUtleU9mTmFtZUlzT2ZUeXBlVGV4dChuYW1lLCBkYXRhKTtcbiAgICAgIGNhc2UgRGF0YWJhc2VIZWxwZXIuSU5UOlxuICAgICAgICByZXR1cm4gRGF0YWJhc2VIZWxwZXIuX2RhdGFLZXlPZk5hbWVJc09mVHlwZUludChuYW1lLCBkYXRhKTtcbiAgICAgIGNhc2UgRGF0YWJhc2VIZWxwZXIuQklHSU5UOlxuICAgICAgICByZXR1cm4gRGF0YWJhc2VIZWxwZXIuX2RhdGFLZXlPZk5hbWVJc09mVHlwZUJpZ0ludChuYW1lLCBkYXRhKTtcbiAgICAgIGNhc2UgRGF0YWJhc2VIZWxwZXIuQk9PTEVBTjpcbiAgICAgICAgcmV0dXJuIERhdGFiYXNlSGVscGVyLl9kYXRhS2V5T2ZOYW1lSXNPZlR5cGVCb29sZWFuKG5hbWUsIGRhdGEpO1xuICAgICAgY2FzZSBEYXRhYmFzZUhlbHBlci5SRUFMOlxuICAgICAgICByZXR1cm4gRGF0YWJhc2VIZWxwZXIuX2RhdGFLZXlPZk5hbWVJc09mVHlwZVJlYWwobmFtZSwgZGF0YSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRvIHNlZSBpZiB0aGUgZGF0YSB2YWx1ZSBvZiBhIGtleSBpcyBhIGJpZyBpbnRlZ2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUga2V5LlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGEuXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIF9kYXRhS2V5T2ZOYW1lSXNPZlR5cGVCaWdJbnQobmFtZSwgZGF0YSkge1xuICAgIHJldHVybiB0eXBlb2YgZGF0YVtuYW1lXSA9PT0gXCJiaWdpbnRcIiB8fCB0eXBlb2YgZGF0YVtuYW1lXSA9PT0gXCJudW1iZXJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0byBzZWUgaWYgdGhlIGRhdGEgdmFsdWUgb2YgYSBrZXkgaXMgYSBib29sZWFuLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUga2V5LlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGEuXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIF9kYXRhS2V5T2ZOYW1lSXNPZlR5cGVCb29sZWFuKG5hbWUsIGRhdGEpIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGFbbmFtZV0gPT09IFwiYm9vbGVhblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRvIHNlZSBpZiB0aGUgZGF0YSB2YWx1ZSBvZiBhIGtleSBpcyBhbiBpbnRlZ2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUga2V5LlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGEuXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIF9kYXRhS2V5T2ZOYW1lSXNPZlR5cGVJbnQobmFtZSwgZGF0YSkge1xuICAgIHJldHVybiB0eXBlb2YgZGF0YVtuYW1lXSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNJbnRlZ2VyKGRhdGFbbmFtZV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRvIHNlZSBpZiB0aGUgZGF0YSB2YWx1ZSBvZiBhIGtleSBpcyBhIHJlYWwgbnVtYmVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUga2V5LlxuICAgKiBAcGFyYW0geyp9IGRhdGEgdGhlIGRhdGEuXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIF9kYXRhS2V5T2ZOYW1lSXNPZlR5cGVSZWFsKG5hbWUsIGRhdGEpIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGFbbmFtZV0gPT09IFwibnVtYmVyXCIgJiYgIU51bWJlci5pc0ludGVnZXIoZGF0YVtuYW1lXSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZSBkYXRhIHZhbHVlIG9mIGEga2V5IGlzIGEgdGV4dC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIGtleS5cbiAgICogQHBhcmFtIHsqfSBkYXRhIHRoZSBkYXRhLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBfZGF0YUtleU9mTmFtZUlzT2ZUeXBlVGV4dChuYW1lLCBkYXRhKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBkYXRhW25hbWVdID09PSBcInN0cmluZ1wiO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFiYXNlSGVscGVyO1xuIl0sImZpbGUiOiJkZXZpY2UvZGIvaGVscGVyL0RhdGFiYXNlSGVscGVyLmpzIn0=
