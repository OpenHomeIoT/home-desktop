"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = _interopRequireDefault(require("./Database"));

var _DatabaseHelper = _interopRequireDefault(require("./helper/DatabaseHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ServiceVersionLedgerDatabase extends _Database.default {
  static getInstance() {
    if (ServiceVersionLedgerDatabase._instance === null) {
      ServiceVersionLedgerDatabase._instance = new ServiceVersionLedgerDatabase();
    }

    return ServiceVersionLedgerDatabase._instance;
  }
  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options 
   */


  constructor(options) {
    super({
      name: "ServiceVersionLedger",
      isLedger: true,
      primaryKey: "serviceVersionName",
      fields: [{
        name: "serviceVersionName",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "serviceName",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "version",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "timeInstalledOnHub",
        type: _DatabaseHelper.default.BIGINT,
        includeInUpdate: false
      }]
    }, options);
  }

}

_defineProperty(ServiceVersionLedgerDatabase, "_instance", null);

var _default = ServiceVersionLedgerDatabase;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9TZXJ2aWNlVmVyc2lvbkxlZGdlckRhdGFiYXNlLmpzIl0sIm5hbWVzIjpbIlNlcnZpY2VWZXJzaW9uTGVkZ2VyRGF0YWJhc2UiLCJEYXRhYmFzZSIsImdldEluc3RhbmNlIiwiX2luc3RhbmNlIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwibmFtZSIsImlzTGVkZ2VyIiwicHJpbWFyeUtleSIsImZpZWxkcyIsInR5cGUiLCJEYXRhYmFzZUhlbHBlciIsIlRFWFQiLCJCSUdJTlQiLCJpbmNsdWRlSW5VcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsNEJBQU4sU0FBMkNDLGlCQUEzQyxDQUFvRDtBQUlsRCxTQUFPQyxXQUFQLEdBQXFCO0FBQ25CLFFBQUlGLDRCQUE0QixDQUFDRyxTQUE3QixLQUEyQyxJQUEvQyxFQUFxRDtBQUNuREgsTUFBQUEsNEJBQTRCLENBQUNHLFNBQTdCLEdBQXlDLElBQUlILDRCQUFKLEVBQXpDO0FBQ0Q7O0FBQ0QsV0FBT0EsNEJBQTRCLENBQUNHLFNBQXBDO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO0FBQ25CLFVBQU07QUFDSkMsTUFBQUEsSUFBSSxFQUFFLHNCQURGO0FBRUpDLE1BQUFBLFFBQVEsRUFBRSxJQUZOO0FBR0pDLE1BQUFBLFVBQVUsRUFBRSxvQkFIUjtBQUlKQyxNQUFBQSxNQUFNLEVBQUUsQ0FDTjtBQUFFSCxRQUFBQSxJQUFJLEVBQUUsb0JBQVI7QUFBOEJJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQW5ELE9BRE0sRUFFTjtBQUFFTixRQUFBQSxJQUFJLEVBQUUsYUFBUjtBQUF1QkksUUFBQUEsSUFBSSxFQUFFQyx3QkFBZUM7QUFBNUMsT0FGTSxFQUdOO0FBQUVOLFFBQUFBLElBQUksRUFBRSxTQUFSO0FBQW1CSSxRQUFBQSxJQUFJLEVBQUVDLHdCQUFlQztBQUF4QyxPQUhNLEVBSU47QUFBRU4sUUFBQUEsSUFBSSxFQUFFLG9CQUFSO0FBQThCSSxRQUFBQSxJQUFJLEVBQUVDLHdCQUFlRSxNQUFuRDtBQUEyREMsUUFBQUEsZUFBZSxFQUFFO0FBQTVFLE9BSk07QUFKSixLQUFOLEVBVUdULE9BVkg7QUFXRDs7QUEzQmlEOztnQkFBOUNMLDRCLGVBRWUsSTs7ZUE0Qk5BLDRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL0RhdGFiYXNlXCI7XG5pbXBvcnQgRGF0YWJhc2VIZWxwZXIgZnJvbSBcIi4vaGVscGVyL0RhdGFiYXNlSGVscGVyXCI7XG5cbmNsYXNzIFNlcnZpY2VWZXJzaW9uTGVkZ2VyRGF0YWJhc2UgZXh0ZW5kcyBEYXRhYmFzZSB7XG5cbiAgc3RhdGljIF9pbnN0YW5jZSA9IG51bGw7XG5cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmIChTZXJ2aWNlVmVyc2lvbkxlZGdlckRhdGFiYXNlLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgU2VydmljZVZlcnNpb25MZWRnZXJEYXRhYmFzZS5faW5zdGFuY2UgPSBuZXcgU2VydmljZVZlcnNpb25MZWRnZXJEYXRhYmFzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gU2VydmljZVZlcnNpb25MZWRnZXJEYXRhYmFzZS5faW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSB7eyBpc01lbW9yeURCPzogYm9vbGVhbiwgaXNUZXN0PzogYm9vbGVhbiB9fSBvcHRpb25zIFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IFwiU2VydmljZVZlcnNpb25MZWRnZXJcIixcbiAgICAgIGlzTGVkZ2VyOiB0cnVlLFxuICAgICAgcHJpbWFyeUtleTogXCJzZXJ2aWNlVmVyc2lvbk5hbWVcIixcbiAgICAgIGZpZWxkczogW1xuICAgICAgICB7IG5hbWU6IFwic2VydmljZVZlcnNpb25OYW1lXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcInNlcnZpY2VOYW1lXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcInZlcnNpb25cIiwgdHlwZTogRGF0YWJhc2VIZWxwZXIuVEVYVCB9LFxuICAgICAgICB7IG5hbWU6IFwidGltZUluc3RhbGxlZE9uSHViXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLkJJR0lOVCwgaW5jbHVkZUluVXBkYXRlOiBmYWxzZSB9XG4gICAgICBdXG4gICAgfSwgb3B0aW9ucyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VWZXJzaW9uTGVkZ2VyRGF0YWJhc2U7XG4iXSwiZmlsZSI6ImRldmljZS9kYi9TZXJ2aWNlVmVyc2lvbkxlZGdlckRhdGFiYXNlLmpzIn0=
