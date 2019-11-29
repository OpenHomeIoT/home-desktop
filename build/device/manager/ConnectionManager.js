"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ConnectionBufferDatabase = _interopRequireDefault(require("../db/ConnectionBufferDatabase"));

var _DeviceManager = _interopRequireDefault(require("./DeviceManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ADDRESS = process.env.ADDRESS;
const PORT = process.env.PORT;

class ConnectionManager {
  /** 
   * @returns {ConnectionManager} the instance.
   */
  static getInstance() {
    if (ConnectionManager._instance === null) {
      ConnectionManager._instance = new ConnectionManager(_ConnectionBufferDatabase.default.getInstance(), _DeviceManager.default.getInstance());
    }

    return ConnectionManager._instance;
  }
  /**
   * 
   * @param {ConnectionBufferDatabase} connectionBufferDatabase 
   * @param {DeviceManager} deviceManager 
   */


  constructor(connectionBufferDatabase, deviceManager) {
    this._connectionBufferDatabase = connectionBufferDatabase;
    this._deviceManager = deviceManager; // TODO: binding

    this._checkForConnectionInfo = this._checkForConnectionEntries.bind(this);
  }
  /**
   * Initialize the connection manager and start looking for devices to connect.
   */


  initialize() {
    this._connectionTimer = setInterval(() => this._checkForConnectionEntries(), 20000);
  }
  /**
   * Set that a device has disconnected from the hub and needs to reconnect.
   * @param {string} usn the device's usn.
   * @returns {Promise<void>}
   */


  setDeviceHasDisconnected(usn) {
    this._deviceManager.getDeviceByUsn(usn).then(iotDevice => this._connectionBufferDatabase.insert({
      usn,
      timeAdded: Date.now(),
      ipAddress: iotDevice.getAddress()
    }));
  }
  /**
   * Check to see if there is any connection information in the database. If there is,
   * attempt to reconnect the device.
   * @returns {Promise<void>}
   */


  _checkForConnectionEntries() {
    this._connectionBufferDatabase.getAll().then(connections => {
      if (connections.length > 0) {
        return this._connectDevicesToHub(connections).then(() => this._setDevicesReconnecting(connections));
      }
    });
  }
  /**
   * Connect a device to this Hub.
   * @param {string} ipAddress the ip address of the device.
   * @returns {Promise<void>}
   */


  _connectDeviceToHub(ipAddress) {
    return new Promise((resolve, reject) => {
      const url = `http://${ipAddress}/config_parent`;
      const body = JSON.stringify({
        parent: {
          address: ADDRESS,
          port: PORT
        }
      });
      request(url, {
        method: "POST",
        body
      }, (err, response, body) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  _getDisconnectedDevicesThatAreNotReconnecting() {
    return this._deviceManager.getAllDevices() // TODO: do this filtering at the database level
    .then(iotDevices => {});
  }
  /**
   * Connnect devices to this Hub
   * @param {{ usn: string, timeAdded: number, ipAddress: string }[]} connectionInfos the connection info for the devices.
   * @returns {Promise<void>}
   */


  _connectDevicesToHub(connectionInfos) {
    // TODO: filter connectionInfos for devices whose connectionStatus is not "reconnecting"
    return Promise.all(map(({
      ipAddress
    }) => this._connectDeviceToHub(ipAddress)));
  }
  /**
   * 
   * @param {{ usn: string, timeAdded: number, ipAddress: string}[]} connectionInfos the connection info for the devices.
   */


  _setDevicesReconnecting(connectionInfos) {
    return Promise.all(connectionInfos.map(({
      usn
    }) => this._deviceManager.getDeviceByUsn(usn).then(iotDevice => {
      iotDevice.setConnectionStatus("reconnecting");
      return this._deviceManager.updateDevice(iotDevice.toJson());
    })));
  }

}

_defineProperty(ConnectionManager, "_instance", null);

var _default = ConnectionManager;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS9tYW5hZ2VyL0Nvbm5lY3Rpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkFERFJFU1MiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsIkNvbm5lY3Rpb25NYW5hZ2VyIiwiZ2V0SW5zdGFuY2UiLCJfaW5zdGFuY2UiLCJDb25uZWN0aW9uQnVmZmVyRGF0YWJhc2UiLCJEZXZpY2VNYW5hZ2VyIiwiY29uc3RydWN0b3IiLCJjb25uZWN0aW9uQnVmZmVyRGF0YWJhc2UiLCJkZXZpY2VNYW5hZ2VyIiwiX2Nvbm5lY3Rpb25CdWZmZXJEYXRhYmFzZSIsIl9kZXZpY2VNYW5hZ2VyIiwiX2NoZWNrRm9yQ29ubmVjdGlvbkluZm8iLCJfY2hlY2tGb3JDb25uZWN0aW9uRW50cmllcyIsImJpbmQiLCJpbml0aWFsaXplIiwiX2Nvbm5lY3Rpb25UaW1lciIsInNldEludGVydmFsIiwic2V0RGV2aWNlSGFzRGlzY29ubmVjdGVkIiwidXNuIiwiZ2V0RGV2aWNlQnlVc24iLCJ0aGVuIiwiaW90RGV2aWNlIiwiaW5zZXJ0IiwidGltZUFkZGVkIiwiRGF0ZSIsIm5vdyIsImlwQWRkcmVzcyIsImdldEFkZHJlc3MiLCJnZXRBbGwiLCJjb25uZWN0aW9ucyIsImxlbmd0aCIsIl9jb25uZWN0RGV2aWNlc1RvSHViIiwiX3NldERldmljZXNSZWNvbm5lY3RpbmciLCJfY29ubmVjdERldmljZVRvSHViIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ1cmwiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcmVudCIsImFkZHJlc3MiLCJwb3J0IiwicmVxdWVzdCIsIm1ldGhvZCIsImVyciIsInJlc3BvbnNlIiwiX2dldERpc2Nvbm5lY3RlZERldmljZXNUaGF0QXJlTm90UmVjb25uZWN0aW5nIiwiZ2V0QWxsRGV2aWNlcyIsImlvdERldmljZXMiLCJjb25uZWN0aW9uSW5mb3MiLCJhbGwiLCJtYXAiLCJzZXRDb25uZWN0aW9uU3RhdHVzIiwidXBkYXRlRGV2aWNl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LFdBQU8sS0FBS3RDLGNBQUwsQ0FBb0J1QyxhQUFwQixHQUFvQztBQUFwQyxLQUNON0IsSUFETSxDQUNEOEIsVUFBVSxJQUFJLENBRW5CLENBSE0sQ0FBUDtBQUlEO0FBRUQ7Ozs7Ozs7QUFLQW5CLEVBQUFBLG9CQUFvQixDQUFDb0IsZUFBRCxFQUFrQjtBQUNwQztBQUNBLFdBQU9qQixPQUFPLENBQUNrQixHQUFSLENBQVlDLEdBQUcsQ0FBQyxDQUFDO0FBQUUzQixNQUFBQTtBQUFGLEtBQUQsS0FBbUIsS0FBS08sbUJBQUwsQ0FBeUJQLFNBQXpCLENBQXBCLENBQWYsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBTSxFQUFBQSx1QkFBdUIsQ0FBQ21CLGVBQUQsRUFBa0I7QUFDdkMsV0FBT2pCLE9BQU8sQ0FBQ2tCLEdBQVIsQ0FBWUQsZUFBZSxDQUFDRSxHQUFoQixDQUFvQixDQUFDO0FBQUVuQyxNQUFBQTtBQUFGLEtBQUQsS0FBYSxLQUFLUixjQUFMLENBQW9CUyxjQUFwQixDQUFtQ0QsR0FBbkMsRUFBd0NFLElBQXhDLENBQTZDQyxTQUFTLElBQUk7QUFDNUdBLE1BQUFBLFNBQVMsQ0FBQ2lDLG1CQUFWLENBQThCLGNBQTlCO0FBQ0EsYUFBTyxLQUFLNUMsY0FBTCxDQUFvQjZDLFlBQXBCLENBQWlDbEMsU0FBUyxDQUFDbUMsTUFBVixFQUFqQyxDQUFQO0FBQ0QsS0FIbUQsQ0FBakMsQ0FBWixDQUFQO0FBSUQ7O0FBN0dxQjs7Z0JBQWxCdkQsaUIsZUFFZSxJOztlQThHTkEsaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlIGZyb20gXCIuLi9kYi9Db25uZWN0aW9uQnVmZmVyRGF0YWJhc2VcIjtcbmltcG9ydCBEZXZpY2VNYW5hZ2VyIGZyb20gXCIuL0RldmljZU1hbmFnZXJcIjtcblxuY29uc3QgQUREUkVTUyA9IHByb2Nlc3MuZW52LkFERFJFU1M7XG5jb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVDtcblxuY2xhc3MgQ29ubmVjdGlvbk1hbmFnZXIge1xuXG4gIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuXG4gIC8qKiBcbiAgICogQHJldHVybnMge0Nvbm5lY3Rpb25NYW5hZ2VyfSB0aGUgaW5zdGFuY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKENvbm5lY3Rpb25NYW5hZ2VyLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgQ29ubmVjdGlvbk1hbmFnZXIuX2luc3RhbmNlID0gbmV3IENvbm5lY3Rpb25NYW5hZ2VyKENvbm5lY3Rpb25CdWZmZXJEYXRhYmFzZS5nZXRJbnN0YW5jZSgpLCBEZXZpY2VNYW5hZ2VyLmdldEluc3RhbmNlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gQ29ubmVjdGlvbk1hbmFnZXIuX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge0Nvbm5lY3Rpb25CdWZmZXJEYXRhYmFzZX0gY29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlIFxuICAgKiBAcGFyYW0ge0RldmljZU1hbmFnZXJ9IGRldmljZU1hbmFnZXIgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uQnVmZmVyRGF0YWJhc2UsIGRldmljZU1hbmFnZXIpIHtcbiAgICB0aGlzLl9jb25uZWN0aW9uQnVmZmVyRGF0YWJhc2UgPSBjb25uZWN0aW9uQnVmZmVyRGF0YWJhc2U7XG4gICAgdGhpcy5fZGV2aWNlTWFuYWdlciA9IGRldmljZU1hbmFnZXJcblxuICAgIC8vIFRPRE86IGJpbmRpbmdcbiAgICB0aGlzLl9jaGVja0ZvckNvbm5lY3Rpb25JbmZvID0gdGhpcy5fY2hlY2tGb3JDb25uZWN0aW9uRW50cmllcy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGNvbm5lY3Rpb24gbWFuYWdlciBhbmQgc3RhcnQgbG9va2luZyBmb3IgZGV2aWNlcyB0byBjb25uZWN0LlxuICAgKi9cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9jb25uZWN0aW9uVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLl9jaGVja0ZvckNvbm5lY3Rpb25FbnRyaWVzKCksIDIwMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhhdCBhIGRldmljZSBoYXMgZGlzY29ubmVjdGVkIGZyb20gdGhlIGh1YiBhbmQgbmVlZHMgdG8gcmVjb25uZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNuIHRoZSBkZXZpY2UncyB1c24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgc2V0RGV2aWNlSGFzRGlzY29ubmVjdGVkKHVzbikge1xuICAgIHRoaXMuX2RldmljZU1hbmFnZXIuZ2V0RGV2aWNlQnlVc24odXNuKVxuICAgIC50aGVuKGlvdERldmljZSA9PiB0aGlzLl9jb25uZWN0aW9uQnVmZmVyRGF0YWJhc2UuaW5zZXJ0KHsgdXNuLCB0aW1lQWRkZWQ6IERhdGUubm93KCksIGlwQWRkcmVzczogaW90RGV2aWNlLmdldEFkZHJlc3MoKSB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFueSBjb25uZWN0aW9uIGluZm9ybWF0aW9uIGluIHRoZSBkYXRhYmFzZS4gSWYgdGhlcmUgaXMsXG4gICAqIGF0dGVtcHQgdG8gcmVjb25uZWN0IHRoZSBkZXZpY2UuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgX2NoZWNrRm9yQ29ubmVjdGlvbkVudHJpZXMoKSB7XG4gICAgdGhpcy5fY29ubmVjdGlvbkJ1ZmZlckRhdGFiYXNlLmdldEFsbCgpXG4gICAgLnRoZW4oY29ubmVjdGlvbnMgPT4ge1xuICAgICAgaWYgKGNvbm5lY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3REZXZpY2VzVG9IdWIoY29ubmVjdGlvbnMpXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldERldmljZXNSZWNvbm5lY3RpbmcoY29ubmVjdGlvbnMpKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3QgYSBkZXZpY2UgdG8gdGhpcyBIdWIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpcEFkZHJlc3MgdGhlIGlwIGFkZHJlc3Mgb2YgdGhlIGRldmljZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBfY29ubmVjdERldmljZVRvSHViKGlwQWRkcmVzcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBgaHR0cDovLyR7aXBBZGRyZXNzfS9jb25maWdfcGFyZW50YDtcbiAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHBhcmVudDoge1xuICAgICAgICAgIGFkZHJlc3M6IEFERFJFU1MsXG4gICAgICAgICAgcG9ydDogUE9SVFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3QodXJsLCB7IG1ldGhvZDogXCJQT1NUXCIsIGJvZHkgfSwgKGVyciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXREaXNjb25uZWN0ZWREZXZpY2VzVGhhdEFyZU5vdFJlY29ubmVjdGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGV2aWNlTWFuYWdlci5nZXRBbGxEZXZpY2VzKCkgLy8gVE9ETzogZG8gdGhpcyBmaWx0ZXJpbmcgYXQgdGhlIGRhdGFiYXNlIGxldmVsXG4gICAgLnRoZW4oaW90RGV2aWNlcyA9PiB7XG4gICAgXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29ubm5lY3QgZGV2aWNlcyB0byB0aGlzIEh1YlxuICAgKiBAcGFyYW0ge3sgdXNuOiBzdHJpbmcsIHRpbWVBZGRlZDogbnVtYmVyLCBpcEFkZHJlc3M6IHN0cmluZyB9W119IGNvbm5lY3Rpb25JbmZvcyB0aGUgY29ubmVjdGlvbiBpbmZvIGZvciB0aGUgZGV2aWNlcy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBfY29ubmVjdERldmljZXNUb0h1Yihjb25uZWN0aW9uSW5mb3MpIHtcbiAgICAvLyBUT0RPOiBmaWx0ZXIgY29ubmVjdGlvbkluZm9zIGZvciBkZXZpY2VzIHdob3NlIGNvbm5lY3Rpb25TdGF0dXMgaXMgbm90IFwicmVjb25uZWN0aW5nXCJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwobWFwKCh7IGlwQWRkcmVzcyB9KSA9PiB0aGlzLl9jb25uZWN0RGV2aWNlVG9IdWIoaXBBZGRyZXNzKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge3sgdXNuOiBzdHJpbmcsIHRpbWVBZGRlZDogbnVtYmVyLCBpcEFkZHJlc3M6IHN0cmluZ31bXX0gY29ubmVjdGlvbkluZm9zIHRoZSBjb25uZWN0aW9uIGluZm8gZm9yIHRoZSBkZXZpY2VzLlxuICAgKi9cbiAgX3NldERldmljZXNSZWNvbm5lY3RpbmcoY29ubmVjdGlvbkluZm9zKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGNvbm5lY3Rpb25JbmZvcy5tYXAoKHsgdXNuIH0pID0+IHRoaXMuX2RldmljZU1hbmFnZXIuZ2V0RGV2aWNlQnlVc24odXNuKS50aGVuKGlvdERldmljZSA9PiB7XG4gICAgICBpb3REZXZpY2Uuc2V0Q29ubmVjdGlvblN0YXR1cyhcInJlY29ubmVjdGluZ1wiKTtcbiAgICAgIHJldHVybiB0aGlzLl9kZXZpY2VNYW5hZ2VyLnVwZGF0ZURldmljZShpb3REZXZpY2UudG9Kc29uKCkpO1xuICAgIH0pKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29ubmVjdGlvbk1hbmFnZXI7XG4iXSwiZmlsZSI6ImRldmljZS9tYW5hZ2VyL0Nvbm5lY3Rpb25NYW5hZ2VyLmpzIn0=
