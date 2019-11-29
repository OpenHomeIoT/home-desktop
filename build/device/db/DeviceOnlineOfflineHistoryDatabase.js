"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = _interopRequireDefault(require("./Database"));

var _DatabaseHelper = _interopRequireDefault(require("./helper/DatabaseHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DeviceOnlineOfflineHistoryDatabase extends _Database.default {
  /**
   * @returns {DeviceOnlineOfflineHistoryDatabase}
   */
  static getInstance() {
    if (DeviceOnlineOfflineHistoryDatabase._instance === null) {
      DeviceOnlineOfflineHistoryDatabase._instance = new DeviceOnlineOfflineHistoryDatabase();
    }

    return DeviceOnlineOfflineHistoryDatabase._instance;
  }
  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options 
   */


  constructor(options) {
    super({
      name: "DeviceOnlineOfflineHistory",
      isLedger: true,
      primaryKey: "id",
      fields: [{
        name: "id",
        type: _DatabaseHelper.default.INT,
        autoincrement: true
      }, {
        name: "usn",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "time",
        type: _DatabaseHelper.default.BIGINT
      }, {
        name: "isOnline",
        type: _DatabaseHelper.default.INT
      }]
    }, options);
  }

}

_defineProperty(DeviceOnlineOfflineHistoryDatabase, "_instance", null);

var _default = DeviceOnlineOfflineHistoryDatabase;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9EZXZpY2VPbmxpbmVPZmZsaW5lSGlzdG9yeURhdGFiYXNlLmpzIl0sIm5hbWVzIjpbIkRldmljZU9ubGluZU9mZmxpbmVIaXN0b3J5RGF0YWJhc2UiLCJEYXRhYmFzZSIsImdldEluc3RhbmNlIiwiX2luc3RhbmNlIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwibmFtZSIsImlzTGVkZ2VyIiwicHJpbWFyeUtleSIsImZpZWxkcyIsInR5cGUiLCJEYXRhYmFzZUhlbHBlciIsIklOVCIsImF1dG9pbmNyZW1lbnQiLCJURVhUIiwiQklHSU5UIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLGtDQUFOLFNBQWlEQyxpQkFBakQsQ0FBMEQ7QUFJeEQ7OztBQUdBLFNBQU9DLFdBQVAsR0FBcUI7QUFDbkIsUUFBSUYsa0NBQWtDLENBQUNHLFNBQW5DLEtBQWlELElBQXJELEVBQTJEO0FBQ3pESCxNQUFBQSxrQ0FBa0MsQ0FBQ0csU0FBbkMsR0FBK0MsSUFBSUgsa0NBQUosRUFBL0M7QUFDRDs7QUFDRCxXQUFPQSxrQ0FBa0MsQ0FBQ0csU0FBMUM7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVU7QUFDbkIsVUFBTTtBQUNKQyxNQUFBQSxJQUFJLEVBQUUsNEJBREY7QUFFSkMsTUFBQUEsUUFBUSxFQUFFLElBRk47QUFHSkMsTUFBQUEsVUFBVSxFQUFFLElBSFI7QUFJSkMsTUFBQUEsTUFBTSxFQUFFLENBQ047QUFBRUgsUUFBQUEsSUFBSSxFQUFFLElBQVI7QUFBY0ksUUFBQUEsSUFBSSxFQUFFQyx3QkFBZUMsR0FBbkM7QUFBd0NDLFFBQUFBLGFBQWEsRUFBRTtBQUF2RCxPQURNLEVBRU47QUFBRVAsUUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZUksUUFBQUEsSUFBSSxFQUFFQyx3QkFBZUc7QUFBcEMsT0FGTSxFQUdOO0FBQUVSLFFBQUFBLElBQUksRUFBRSxNQUFSO0FBQWdCSSxRQUFBQSxJQUFJLEVBQUVDLHdCQUFlSTtBQUFyQyxPQUhNLEVBSU47QUFBRVQsUUFBQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0JJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQXpDLE9BSk07QUFKSixLQUFOLEVBVUdQLE9BVkg7QUFXRDs7QUE5QnVEOztnQkFBcERMLGtDLGVBRWUsSTs7ZUErQk5BLGtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL0RhdGFiYXNlXCI7XG5pbXBvcnQgRGF0YWJhc2VIZWxwZXIgZnJvbSBcIi4vaGVscGVyL0RhdGFiYXNlSGVscGVyXCI7XG5cbmNsYXNzIERldmljZU9ubGluZU9mZmxpbmVIaXN0b3J5RGF0YWJhc2UgZXh0ZW5kcyBEYXRhYmFzZSB7XG5cbiAgc3RhdGljIF9pbnN0YW5jZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtEZXZpY2VPbmxpbmVPZmZsaW5lSGlzdG9yeURhdGFiYXNlfVxuICAgKi9cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmIChEZXZpY2VPbmxpbmVPZmZsaW5lSGlzdG9yeURhdGFiYXNlLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgRGV2aWNlT25saW5lT2ZmbGluZUhpc3RvcnlEYXRhYmFzZS5faW5zdGFuY2UgPSBuZXcgRGV2aWNlT25saW5lT2ZmbGluZUhpc3RvcnlEYXRhYmFzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gRGV2aWNlT25saW5lT2ZmbGluZUhpc3RvcnlEYXRhYmFzZS5faW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSB7eyBpc01lbW9yeURCPzogYm9vbGVhbiwgaXNUZXN0PzogYm9vbGVhbiB9fSBvcHRpb25zIFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IFwiRGV2aWNlT25saW5lT2ZmbGluZUhpc3RvcnlcIixcbiAgICAgIGlzTGVkZ2VyOiB0cnVlLFxuICAgICAgcHJpbWFyeUtleTogXCJpZFwiLFxuICAgICAgZmllbGRzOiBbXG4gICAgICAgIHsgbmFtZTogXCJpZFwiLCB0eXBlOiBEYXRhYmFzZUhlbHBlci5JTlQsIGF1dG9pbmNyZW1lbnQ6IHRydWUgfSxcbiAgICAgICAgeyBuYW1lOiBcInVzblwiLCB0eXBlOiBEYXRhYmFzZUhlbHBlci5URVhUIH0sXG4gICAgICAgIHsgbmFtZTogXCJ0aW1lXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLkJJR0lOVCB9LFxuICAgICAgICB7IG5hbWU6IFwiaXNPbmxpbmVcIiwgdHlwZTogRGF0YWJhc2VIZWxwZXIuSU5UIH1cbiAgICAgIF1cbiAgICB9LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXZpY2VPbmxpbmVPZmZsaW5lSGlzdG9yeURhdGFiYXNlO1xuIl0sImZpbGUiOiJkZXZpY2UvZGIvRGV2aWNlT25saW5lT2ZmbGluZUhpc3RvcnlEYXRhYmFzZS5qcyJ9
