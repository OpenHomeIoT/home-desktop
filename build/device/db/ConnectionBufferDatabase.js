"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = _interopRequireDefault(require("./Database"));

var _DatabaseHelper = _interopRequireDefault(require("./helper/DatabaseHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ConnectionBufferDatabase extends _Database.default {
  /**
   * @returns {ConnectionBufferDatabase}
   */
  static getInstance() {
    if (ConnectionBufferDatabase._instance === null) {
      ConnectionBufferDatabase._instance = new ConnectionBufferDatabase({
        isMemoryDB: true
      });
    }

    return ConnectionBufferDatabase._instance;
  }
  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options the options
   */


  constructor(options) {
    super({
      name: "DeviceConnectionBuffer",
      isLedger: false,
      primaryKey: "usn",
      fields: [{
        name: "usn",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "timeAdded",
        type: _DatabaseHelper.default.INT,
        includeInUpdate: false
      }, {
        name: "ipAddress",
        type: _DatabaseHelper.default.TEXT
      }]
    }, options);
  }

}

_defineProperty(ConnectionBufferDatabase, "_instance", null);

var _default = ConnectionBufferDatabase;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9Db25uZWN0aW9uQnVmZmVyRGF0YWJhc2UuanMiXSwibmFtZXMiOlsiQ29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlIiwiRGF0YWJhc2UiLCJnZXRJbnN0YW5jZSIsIl9pbnN0YW5jZSIsImlzTWVtb3J5REIiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJuYW1lIiwiaXNMZWRnZXIiLCJwcmltYXJ5S2V5IiwiZmllbGRzIiwidHlwZSIsIkRhdGFiYXNlSGVscGVyIiwiVEVYVCIsIklOVCIsImluY2x1ZGVJblVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSx3QkFBTixTQUF1Q0MsaUJBQXZDLENBQWdEO0FBSTlDOzs7QUFHQSxTQUFPQyxXQUFQLEdBQXFCO0FBQ25CLFFBQUlGLHdCQUF3QixDQUFDRyxTQUF6QixLQUF1QyxJQUEzQyxFQUFpRDtBQUMvQ0gsTUFBQUEsd0JBQXdCLENBQUNHLFNBQXpCLEdBQXFDLElBQUlILHdCQUFKLENBQTZCO0FBQUVJLFFBQUFBLFVBQVUsRUFBRTtBQUFkLE9BQTdCLENBQXJDO0FBQ0Q7O0FBQ0QsV0FBT0osd0JBQXdCLENBQUNHLFNBQWhDO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFFLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO0FBQ25CLFVBQU07QUFDSkMsTUFBQUEsSUFBSSxFQUFFLHdCQURGO0FBRUpDLE1BQUFBLFFBQVEsRUFBRSxLQUZOO0FBR0pDLE1BQUFBLFVBQVUsRUFBRSxLQUhSO0FBSUpDLE1BQUFBLE1BQU0sRUFBRSxDQUNOO0FBQUVILFFBQUFBLElBQUksRUFBRSxLQUFSO0FBQWVJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQXBDLE9BRE0sRUFFTjtBQUFFTixRQUFBQSxJQUFJLEVBQUUsV0FBUjtBQUFxQkksUUFBQUEsSUFBSSxFQUFFQyx3QkFBZUUsR0FBMUM7QUFBK0NDLFFBQUFBLGVBQWUsRUFBRTtBQUFoRSxPQUZNLEVBR047QUFBRVIsUUFBQUEsSUFBSSxFQUFFLFdBQVI7QUFBcUJJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQTFDLE9BSE07QUFKSixLQUFOLEVBU0dQLE9BVEg7QUFVRDs7QUE3QjZDOztnQkFBMUNOLHdCLGVBRWUsSTs7ZUE4Qk5BLHdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL0RhdGFiYXNlXCI7XG5pbXBvcnQgRGF0YWJhc2VIZWxwZXIgZnJvbSBcIi4vaGVscGVyL0RhdGFiYXNlSGVscGVyXCI7XG5cbmNsYXNzIENvbm5lY3Rpb25CdWZmZXJEYXRhYmFzZSBleHRlbmRzIERhdGFiYXNlIHtcblxuICBzdGF0aWMgX2luc3RhbmNlID0gbnVsbDtcblxuICAvKipcbiAgICogQHJldHVybnMge0Nvbm5lY3Rpb25CdWZmZXJEYXRhYmFzZX1cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAoQ29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgQ29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlLl9pbnN0YW5jZSA9IG5ldyBDb25uZWN0aW9uQnVmZmVyRGF0YWJhc2UoeyBpc01lbW9yeURCOiB0cnVlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gQ29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlLl9pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHt7IGlzTWVtb3J5REI/OiBib29sZWFuLCBpc1Rlc3Q/OiBib29sZWFuIH19IG9wdGlvbnMgdGhlIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcih7XG4gICAgICBuYW1lOiBcIkRldmljZUNvbm5lY3Rpb25CdWZmZXJcIixcbiAgICAgIGlzTGVkZ2VyOiBmYWxzZSxcbiAgICAgIHByaW1hcnlLZXk6IFwidXNuXCIsXG4gICAgICBmaWVsZHM6IFtcbiAgICAgICAgeyBuYW1lOiBcInVzblwiLCB0eXBlOiBEYXRhYmFzZUhlbHBlci5URVhUIH0sXG4gICAgICAgIHsgbmFtZTogXCJ0aW1lQWRkZWRcIiwgdHlwZTogRGF0YWJhc2VIZWxwZXIuSU5ULCBpbmNsdWRlSW5VcGRhdGU6IGZhbHNlIH0sXG4gICAgICAgIHsgbmFtZTogXCJpcEFkZHJlc3NcIiwgdHlwZTogRGF0YWJhc2VIZWxwZXIuVEVYVCB9XG4gICAgICBdXG4gICAgfSwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlO1xuIl0sImZpbGUiOiJkZXZpY2UvZGIvQ29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlLmpzIn0=
