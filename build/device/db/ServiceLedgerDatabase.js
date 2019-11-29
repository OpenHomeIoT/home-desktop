"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = _interopRequireDefault(require("./Database"));

var _DatabaseHelper = _interopRequireDefault(require("./helper/DatabaseHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ServiceLedgerDatabase extends _Database.default {
  /**
   * @returns {ServiceLedgerDatabase}
   */
  static getInstance() {
    if (ServiceLedgerDatabase._instance === null) {
      ServiceLedgerDatabase._instance = new ServiceLedgerDatabase();
    }

    return ServiceLedgerDatabase._instance;
  }
  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options 
   */


  constructor(options) {
    super({
      name: "ServiceLedger",
      isLedger: true,
      primaryKey: "id",
      fields: [{
        name: "id",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "name",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "friendlyName",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "description",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "ssdpName",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "currentSsdpVersionName",
        type: _DatabaseHelper.default.TEXT
      }]
    }, options);
  }

}

_defineProperty(ServiceLedgerDatabase, "_instance", null);

var _default = ServiceLedgerDatabase;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9TZXJ2aWNlTGVkZ2VyRGF0YWJhc2UuanMiXSwibmFtZXMiOlsiU2VydmljZUxlZGdlckRhdGFiYXNlIiwiRGF0YWJhc2UiLCJnZXRJbnN0YW5jZSIsIl9pbnN0YW5jZSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsIm5hbWUiLCJpc0xlZGdlciIsInByaW1hcnlLZXkiLCJmaWVsZHMiLCJ0eXBlIiwiRGF0YWJhc2VIZWxwZXIiLCJURVhUIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLHFCQUFOLFNBQW9DQyxpQkFBcEMsQ0FBNkM7QUFJM0M7OztBQUdBLFNBQU9DLFdBQVAsR0FBcUI7QUFDbkIsUUFBSUYscUJBQXFCLENBQUNHLFNBQXRCLEtBQW9DLElBQXhDLEVBQThDO0FBQzVDSCxNQUFBQSxxQkFBcUIsQ0FBQ0csU0FBdEIsR0FBa0MsSUFBSUgscUJBQUosRUFBbEM7QUFDRDs7QUFDRCxXQUFPQSxxQkFBcUIsQ0FBQ0csU0FBN0I7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVU7QUFDbkIsVUFBTTtBQUNKQyxNQUFBQSxJQUFJLEVBQUUsZUFERjtBQUVKQyxNQUFBQSxRQUFRLEVBQUUsSUFGTjtBQUdKQyxNQUFBQSxVQUFVLEVBQUUsSUFIUjtBQUlKQyxNQUFBQSxNQUFNLEVBQUUsQ0FDTjtBQUFFSCxRQUFBQSxJQUFJLEVBQUUsSUFBUjtBQUFjSSxRQUFBQSxJQUFJLEVBQUVDLHdCQUFlQztBQUFuQyxPQURNLEVBRU47QUFBRU4sUUFBQUEsSUFBSSxFQUFFLE1BQVI7QUFBZ0JJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQXJDLE9BRk0sRUFHTjtBQUFFTixRQUFBQSxJQUFJLEVBQUUsY0FBUjtBQUF3QkksUUFBQUEsSUFBSSxFQUFFQyx3QkFBZUM7QUFBN0MsT0FITSxFQUlOO0FBQUVOLFFBQUFBLElBQUksRUFBRSxhQUFSO0FBQXVCSSxRQUFBQSxJQUFJLEVBQUVDLHdCQUFlQztBQUE1QyxPQUpNLEVBS047QUFBRU4sUUFBQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0JJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQXpDLE9BTE0sRUFNTjtBQUFFTixRQUFBQSxJQUFJLEVBQUUsd0JBQVI7QUFBa0NJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQXZELE9BTk07QUFKSixLQUFOLEVBWUdQLE9BWkg7QUFhRDs7QUFoQzBDOztnQkFBdkNMLHFCLGVBRWUsSTs7ZUFpQ05BLHFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL0RhdGFiYXNlXCI7XG5pbXBvcnQgRGF0YWJhc2VIZWxwZXIgZnJvbSBcIi4vaGVscGVyL0RhdGFiYXNlSGVscGVyXCI7XG5cbmNsYXNzIFNlcnZpY2VMZWRnZXJEYXRhYmFzZSBleHRlbmRzIERhdGFiYXNlIHtcblxuICBzdGF0aWMgX2luc3RhbmNlID0gbnVsbDtcblxuICAvKipcbiAgICogQHJldHVybnMge1NlcnZpY2VMZWRnZXJEYXRhYmFzZX1cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAoU2VydmljZUxlZGdlckRhdGFiYXNlLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgU2VydmljZUxlZGdlckRhdGFiYXNlLl9pbnN0YW5jZSA9IG5ldyBTZXJ2aWNlTGVkZ2VyRGF0YWJhc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIFNlcnZpY2VMZWRnZXJEYXRhYmFzZS5faW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSB7eyBpc01lbW9yeURCPzogYm9vbGVhbiwgaXNUZXN0PzogYm9vbGVhbiB9fSBvcHRpb25zIFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IFwiU2VydmljZUxlZGdlclwiLFxuICAgICAgaXNMZWRnZXI6IHRydWUsXG4gICAgICBwcmltYXJ5S2V5OiBcImlkXCIsXG4gICAgICBmaWVsZHM6IFtcbiAgICAgICAgeyBuYW1lOiBcImlkXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcIm5hbWVcIiwgdHlwZTogRGF0YWJhc2VIZWxwZXIuVEVYVCB9LFxuICAgICAgICB7IG5hbWU6IFwiZnJpZW5kbHlOYW1lXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcImRlc2NyaXB0aW9uXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcInNzZHBOYW1lXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcImN1cnJlbnRTc2RwVmVyc2lvbk5hbWVcIiwgdHlwZTogRGF0YWJhc2VIZWxwZXIuVEVYVCB9XG4gICAgICBdXG4gICAgfSwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VydmljZUxlZGdlckRhdGFiYXNlO1xuIl0sImZpbGUiOiJkZXZpY2UvZGIvU2VydmljZUxlZGdlckRhdGFiYXNlLmpzIn0=
