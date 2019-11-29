"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = _interopRequireDefault(require("./Database"));

var _DatabaseHelper = _interopRequireDefault(require("./helper/DatabaseHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DeviceDatabase extends _Database.default {
  /**
   * 
   * @returns {DeviceDatabase}
   */
  static getInstance() {
    if (DeviceDatabase._instance === null) {
      DeviceDatabase._instance = new DeviceDatabase({});
    }

    return DeviceDatabase._instance;
  }
  /**
   * 
   * @param {{ isMemoryDB?: boolean, isTest?: boolean }} options 
   */


  constructor(options) {
    super({
      name: "Devices",
      isLedger: false,
      primaryKey: "usn",
      fields: [{
        name: "usn",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "ssdpDescriptionLocation",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "ipAddress",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "services",
        type: _DatabaseHelper.default.TEXT
      }, {
        name: "configuredAsChild",
        type: _DatabaseHelper.default.BOOLEAN
      }, {
        name: "timeLastSeen",
        type: _DatabaseHelper.default.BIGINT
      }, {
        name: "timeDiscovered",
        type: _DatabaseHelper.default.BIGINT,
        includeInUpdate: false
      }, {
        name: "connectionStatus",
        type: _DatabaseHelper.default.TEXT
      }]
    }, options);
  }

}

_defineProperty(DeviceDatabase, "_instance", null);

var _default = DeviceDatabase;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9kYi9EZXZpY2VEYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEZXZpY2VEYXRhYmFzZSIsIkRhdGFiYXNlIiwiZ2V0SW5zdGFuY2UiLCJfaW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJuYW1lIiwiaXNMZWRnZXIiLCJwcmltYXJ5S2V5IiwiZmllbGRzIiwidHlwZSIsIkRhdGFiYXNlSGVscGVyIiwiVEVYVCIsIkJPT0xFQU4iLCJCSUdJTlQiLCJpbmNsdWRlSW5VcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsY0FBTixTQUE2QkMsaUJBQTdCLENBQXNDO0FBSXBDOzs7O0FBSUEsU0FBT0MsV0FBUCxHQUFxQjtBQUNuQixRQUFJRixjQUFjLENBQUNHLFNBQWYsS0FBNkIsSUFBakMsRUFBdUM7QUFDckNILE1BQUFBLGNBQWMsQ0FBQ0csU0FBZixHQUEyQixJQUFJSCxjQUFKLENBQW1CLEVBQW5CLENBQTNCO0FBQ0Q7O0FBQ0QsV0FBT0EsY0FBYyxDQUFDRyxTQUF0QjtBQUNEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVTtBQUNuQixVQUFNO0FBQ0pDLE1BQUFBLElBQUksRUFBRSxTQURGO0FBRUpDLE1BQUFBLFFBQVEsRUFBRSxLQUZOO0FBR0pDLE1BQUFBLFVBQVUsRUFBRSxLQUhSO0FBSUpDLE1BQUFBLE1BQU0sRUFBRSxDQUNOO0FBQUVILFFBQUFBLElBQUksRUFBRSxLQUFSO0FBQWVJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQXBDLE9BRE0sRUFFTjtBQUFFTixRQUFBQSxJQUFJLEVBQUUseUJBQVI7QUFBbUNJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVDO0FBQXhELE9BRk0sRUFHTjtBQUFFTixRQUFBQSxJQUFJLEVBQUUsV0FBUjtBQUFxQkksUUFBQUEsSUFBSSxFQUFFQyx3QkFBZUM7QUFBMUMsT0FITSxFQUlOO0FBQUVOLFFBQUFBLElBQUksRUFBRSxVQUFSO0FBQW9CSSxRQUFBQSxJQUFJLEVBQUVDLHdCQUFlQztBQUF6QyxPQUpNLEVBS047QUFBRU4sUUFBQUEsSUFBSSxFQUFFLG1CQUFSO0FBQTZCSSxRQUFBQSxJQUFJLEVBQUVDLHdCQUFlRTtBQUFsRCxPQUxNLEVBTU47QUFBRVAsUUFBQUEsSUFBSSxFQUFFLGNBQVI7QUFBd0JJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVHO0FBQTdDLE9BTk0sRUFPTjtBQUFFUixRQUFBQSxJQUFJLEVBQUUsZ0JBQVI7QUFBMEJJLFFBQUFBLElBQUksRUFBRUMsd0JBQWVHLE1BQS9DO0FBQXVEQyxRQUFBQSxlQUFlLEVBQUU7QUFBeEUsT0FQTSxFQVFOO0FBQUVULFFBQUFBLElBQUksRUFBRSxrQkFBUjtBQUE0QkksUUFBQUEsSUFBSSxFQUFFQyx3QkFBZUM7QUFBakQsT0FSTTtBQUpKLEtBQU4sRUFjR1AsT0FkSDtBQWVEOztBQW5DbUM7O2dCQUFoQ0wsYyxlQUVlLEk7O2VBb0NOQSxjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL0RhdGFiYXNlXCI7XG5pbXBvcnQgRGF0YWJhc2VIZWxwZXIgZnJvbSBcIi4vaGVscGVyL0RhdGFiYXNlSGVscGVyXCI7XG5cbmNsYXNzIERldmljZURhdGFiYXNlIGV4dGVuZHMgRGF0YWJhc2Uge1xuXG4gIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHJldHVybnMge0RldmljZURhdGFiYXNlfVxuICAgKi9cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmIChEZXZpY2VEYXRhYmFzZS5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgIERldmljZURhdGFiYXNlLl9pbnN0YW5jZSA9IG5ldyBEZXZpY2VEYXRhYmFzZSh7fSk7XG4gICAgfVxuICAgIHJldHVybiBEZXZpY2VEYXRhYmFzZS5faW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSB7eyBpc01lbW9yeURCPzogYm9vbGVhbiwgaXNUZXN0PzogYm9vbGVhbiB9fSBvcHRpb25zIFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IFwiRGV2aWNlc1wiLFxuICAgICAgaXNMZWRnZXI6IGZhbHNlLFxuICAgICAgcHJpbWFyeUtleTogXCJ1c25cIixcbiAgICAgIGZpZWxkczogW1xuICAgICAgICB7IG5hbWU6IFwidXNuXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcInNzZHBEZXNjcmlwdGlvbkxvY2F0aW9uXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLlRFWFQgfSxcbiAgICAgICAgeyBuYW1lOiBcImlwQWRkcmVzc1wiLCB0eXBlOiBEYXRhYmFzZUhlbHBlci5URVhULCB9LFxuICAgICAgICB7IG5hbWU6IFwic2VydmljZXNcIiwgdHlwZTogRGF0YWJhc2VIZWxwZXIuVEVYVCwgfSxcbiAgICAgICAgeyBuYW1lOiBcImNvbmZpZ3VyZWRBc0NoaWxkXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLkJPT0xFQU4gfSxcbiAgICAgICAgeyBuYW1lOiBcInRpbWVMYXN0U2VlblwiLCB0eXBlOiBEYXRhYmFzZUhlbHBlci5CSUdJTlQgfSxcbiAgICAgICAgeyBuYW1lOiBcInRpbWVEaXNjb3ZlcmVkXCIsIHR5cGU6IERhdGFiYXNlSGVscGVyLkJJR0lOVCwgaW5jbHVkZUluVXBkYXRlOiBmYWxzZSB9LFxuICAgICAgICB7IG5hbWU6IFwiY29ubmVjdGlvblN0YXR1c1wiLCB0eXBlOiBEYXRhYmFzZUhlbHBlci5URVhUIH1cbiAgICAgIF1cbiAgICB9LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXZpY2VEYXRhYmFzZTtcblxuIl0sImZpbGUiOiJkZXZpY2UvZGIvRGV2aWNlRGF0YWJhc2UuanMifQ==
