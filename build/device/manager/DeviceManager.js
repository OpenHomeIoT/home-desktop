"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DeviceDatabase = _interopRequireDefault(require("../db/DeviceDatabase"));

var _IoTDevice = _interopRequireDefault(require("../../common/device/IoTDevice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DeviceManager {
  /**
   * Get the DeviceManager instance.
   * @returns {DeviceManager} the DeviceManager instance.
   */
  static getInstance() {
    if (DeviceManager._instance == null) {
      DeviceManager._instance = new DeviceManager(_DeviceDatabase.default.getInstance());
    }

    return DeviceManager._instance;
  }
  /**
   * 
   * @param {DeviceDatabase} deviceDatabase 
   */


  constructor(deviceDatabase) {
    this._deviceDatabase = deviceDatabase; // binding

    this.addDevice = this.addDevice.bind(this);
    this.getAllDevices = this.getAllDevices.bind(this);
    this.getDeviceByUsn = this.getDeviceByUsn.bind(this);
  }
  /**
   * Add an IoTDevice to the DeviceLedgerDatabase.
   * @param {IoTDevice} device the iot device.
   */


  addDevice(device) {
    return this._deviceDatabase.insert(device.toJson()).then(() => console.log(`[DeviceManager] Added device: '${device.toString()}'`));
  }
  /**
   * Get all of the IoTDevices.
   * @returns {Promise<Array<IoTDevice>>} the IoTDevices.
   */


  getAllDevices() {
    return this._deviceDatabase.getAll().then(deviceRecords => {
      const devices = [];

      for (const record of deviceRecords) {
        devices.push(_IoTDevice.default.fromJson(record));
      }

      return devices;
    });
  }
  /**
   * Get an IoTDevice by its usn.
   * @param {string} usn the usn of the device.
   * @return {Promise<IoTDevice | null>} the IoTDevice.
   */


  getDeviceByUsn(usn) {
    return this._deviceDatabase.get(usn).then(deviceRec => {
      return _IoTDevice.default.fromJson(deviceRec);
    });
  }
  /**
   * Update an IoTDevice in the database.
   * @param {IoTDevice} iotDevice this IoTDevice.
   */


  updateDevice(iotDevice) {
    return this._deviceDatabase.update(iotDevice.toJson());
  }

}

_defineProperty(DeviceManager, "_instance", null);

;
var _default = DeviceManager;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9tYW5hZ2VyL0RldmljZU1hbmFnZXIuanMiXSwibmFtZXMiOlsiRGV2aWNlTWFuYWdlciIsImdldEluc3RhbmNlIiwiX2luc3RhbmNlIiwiRGV2aWNlRGF0YWJhc2UiLCJjb25zdHJ1Y3RvciIsImRldmljZURhdGFiYXNlIiwiX2RldmljZURhdGFiYXNlIiwiYWRkRGV2aWNlIiwiYmluZCIsImdldEFsbERldmljZXMiLCJnZXREZXZpY2VCeVVzbiIsImRldmljZSIsImluc2VydCIsInRvSnNvbiIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJnZXRBbGwiLCJkZXZpY2VSZWNvcmRzIiwiZGV2aWNlcyIsInJlY29yZCIsInB1c2giLCJJb1REZXZpY2UiLCJmcm9tSnNvbiIsInVzbiIsImdldCIsImRldmljZVJlYyIsInVwZGF0ZURldmljZSIsImlvdERldmljZSIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxhQUFOLENBQW9CO0FBSWxCOzs7O0FBSUEsU0FBT0MsV0FBUCxHQUFxQjtBQUNuQixRQUFJRCxhQUFhLENBQUNFLFNBQWQsSUFBMkIsSUFBL0IsRUFBcUM7QUFDbkNGLE1BQUFBLGFBQWEsQ0FBQ0UsU0FBZCxHQUEwQixJQUFJRixhQUFKLENBQWtCRyx3QkFBZUYsV0FBZixFQUFsQixDQUExQjtBQUNEOztBQUNELFdBQU9ELGFBQWEsQ0FBQ0UsU0FBckI7QUFDRDtBQUVEOzs7Ozs7QUFJQUUsRUFBQUEsV0FBVyxDQUFDQyxjQUFELEVBQWlCO0FBQzFCLFNBQUtDLGVBQUwsR0FBdUJELGNBQXZCLENBRDBCLENBRzFCOztBQUNBLFNBQUtFLFNBQUwsR0FBaUIsS0FBS0EsU0FBTCxDQUFlQyxJQUFmLENBQW9CLElBQXBCLENBQWpCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFLQSxhQUFMLENBQW1CRCxJQUFuQixDQUF3QixJQUF4QixDQUFyQjtBQUNBLFNBQUtFLGNBQUwsR0FBc0IsS0FBS0EsY0FBTCxDQUFvQkYsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdEI7QUFDRDtBQUVEOzs7Ozs7QUFJQUQsRUFBQUEsU0FBUyxDQUFDSSxNQUFELEVBQVM7QUFDaEIsV0FBTyxLQUFLTCxlQUFMLENBQXFCTSxNQUFyQixDQUE0QkQsTUFBTSxDQUFDRSxNQUFQLEVBQTVCLEVBQ0pDLElBREksQ0FDQyxNQUFNQyxPQUFPLENBQUNDLEdBQVIsQ0FBYSxrQ0FBaUNMLE1BQU0sQ0FBQ00sUUFBUCxFQUFrQixHQUFoRSxDQURQLENBQVA7QUFFRDtBQUVEOzs7Ozs7QUFJQVIsRUFBQUEsYUFBYSxHQUFHO0FBQ2QsV0FBTyxLQUFLSCxlQUFMLENBQXFCWSxNQUFyQixHQUNKSixJQURJLENBQ0NLLGFBQWEsSUFBSTtBQUNyQixZQUFNQyxPQUFPLEdBQUcsRUFBaEI7O0FBQ0EsV0FBSyxNQUFNQyxNQUFYLElBQXFCRixhQUFyQixFQUFvQztBQUNsQ0MsUUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWFDLG1CQUFVQyxRQUFWLENBQW1CSCxNQUFuQixDQUFiO0FBQ0Q7O0FBQ0QsYUFBT0QsT0FBUDtBQUNELEtBUEksQ0FBUDtBQVFEO0FBRUQ7Ozs7Ozs7QUFLQVYsRUFBQUEsY0FBYyxDQUFDZSxHQUFELEVBQU07QUFDbEIsV0FBTyxLQUFLbkIsZUFBTCxDQUFxQm9CLEdBQXJCLENBQXlCRCxHQUF6QixFQUNKWCxJQURJLENBQ0NhLFNBQVMsSUFBSTtBQUFFLGFBQU9KLG1CQUFVQyxRQUFWLENBQW1CRyxTQUFuQixDQUFQO0FBQXVDLEtBRHZELENBQVA7QUFFRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsWUFBWSxDQUFDQyxTQUFELEVBQVk7QUFDdEIsV0FBTyxLQUFLdkIsZUFBTCxDQUFxQndCLE1BQXJCLENBQTRCRCxTQUFTLENBQUNoQixNQUFWLEVBQTVCLENBQVA7QUFDRDs7QUFwRWlCOztnQkFBZGIsYSxlQUVlLEk7O0FBbUVwQjtlQUVjQSxhIiwic291cmNlc0NvbnRlbnQiOlsiLy9AdHMtY2hlY2tcbmltcG9ydCBEZXZpY2VEYXRhYmFzZSBmcm9tIFwiLi4vZGIvRGV2aWNlRGF0YWJhc2VcIjtcbmltcG9ydCBJb1REZXZpY2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9kZXZpY2UvSW9URGV2aWNlXCI7XG5cbmNsYXNzIERldmljZU1hbmFnZXIge1xuXG4gIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIERldmljZU1hbmFnZXIgaW5zdGFuY2UuXG4gICAqIEByZXR1cm5zIHtEZXZpY2VNYW5hZ2VyfSB0aGUgRGV2aWNlTWFuYWdlciBpbnN0YW5jZS5cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAoRGV2aWNlTWFuYWdlci5faW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgRGV2aWNlTWFuYWdlci5faW5zdGFuY2UgPSBuZXcgRGV2aWNlTWFuYWdlcihEZXZpY2VEYXRhYmFzZS5nZXRJbnN0YW5jZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIERldmljZU1hbmFnZXIuX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge0RldmljZURhdGFiYXNlfSBkZXZpY2VEYXRhYmFzZSBcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRldmljZURhdGFiYXNlKSB7XG4gICAgdGhpcy5fZGV2aWNlRGF0YWJhc2UgPSBkZXZpY2VEYXRhYmFzZTtcblxuICAgIC8vIGJpbmRpbmdcbiAgICB0aGlzLmFkZERldmljZSA9IHRoaXMuYWRkRGV2aWNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5nZXRBbGxEZXZpY2VzID0gdGhpcy5nZXRBbGxEZXZpY2VzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5nZXREZXZpY2VCeVVzbiA9IHRoaXMuZ2V0RGV2aWNlQnlVc24uYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gSW9URGV2aWNlIHRvIHRoZSBEZXZpY2VMZWRnZXJEYXRhYmFzZS5cbiAgICogQHBhcmFtIHtJb1REZXZpY2V9IGRldmljZSB0aGUgaW90IGRldmljZS5cbiAgICovXG4gIGFkZERldmljZShkZXZpY2UpIHtcbiAgICByZXR1cm4gdGhpcy5fZGV2aWNlRGF0YWJhc2UuaW5zZXJ0KGRldmljZS50b0pzb24oKSlcbiAgICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKGBbRGV2aWNlTWFuYWdlcl0gQWRkZWQgZGV2aWNlOiAnJHtkZXZpY2UudG9TdHJpbmcoKX0nYCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgb2YgdGhlIElvVERldmljZXMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PElvVERldmljZT4+fSB0aGUgSW9URGV2aWNlcy5cbiAgICovXG4gIGdldEFsbERldmljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RldmljZURhdGFiYXNlLmdldEFsbCgpXG4gICAgICAudGhlbihkZXZpY2VSZWNvcmRzID0+IHtcbiAgICAgICAgY29uc3QgZGV2aWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHJlY29yZCBvZiBkZXZpY2VSZWNvcmRzKSB7XG4gICAgICAgICAgZGV2aWNlcy5wdXNoKElvVERldmljZS5mcm9tSnNvbihyZWNvcmQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGV2aWNlcztcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBJb1REZXZpY2UgYnkgaXRzIHVzbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVzbiB0aGUgdXNuIG9mIHRoZSBkZXZpY2UuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8SW9URGV2aWNlIHwgbnVsbD59IHRoZSBJb1REZXZpY2UuXG4gICAqL1xuICBnZXREZXZpY2VCeVVzbih1c24pIHtcbiAgICByZXR1cm4gdGhpcy5fZGV2aWNlRGF0YWJhc2UuZ2V0KHVzbilcbiAgICAgIC50aGVuKGRldmljZVJlYyA9PiB7IHJldHVybiBJb1REZXZpY2UuZnJvbUpzb24oZGV2aWNlUmVjKTsgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIElvVERldmljZSBpbiB0aGUgZGF0YWJhc2UuXG4gICAqIEBwYXJhbSB7SW9URGV2aWNlfSBpb3REZXZpY2UgdGhpcyBJb1REZXZpY2UuXG4gICAqL1xuICB1cGRhdGVEZXZpY2UoaW90RGV2aWNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RldmljZURhdGFiYXNlLnVwZGF0ZShpb3REZXZpY2UudG9Kc29uKCkpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZXZpY2VNYW5hZ2VyO1xuIl0sImZpbGUiOiJkZXZpY2UvbWFuYWdlci9EZXZpY2VNYW5hZ2VyLmpzIn0=
