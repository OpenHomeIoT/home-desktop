"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _DeviceManager = _interopRequireDefault(require("../manager/DeviceManager"));

var _DeviceStatusManager = _interopRequireDefault(require("../manager/DeviceStatusManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WebsocketServer {
  /**
   * @returns {WebsocketServer}
   */
  static getInstance() {
    if (WebsocketServer._instance === null) {
      WebsocketServer._instance = new WebsocketServer(_DeviceManager.default.getInstance(), _DeviceStatusManager.default.getInstance());
    }

    return WebsocketServer._instance;
  }
  /**
   * 
   * @param {DeviceManager} deviceManager 
   * @param {DeviceStatusManager} deviceStatusManager 
   */


  constructor(deviceManager, deviceStatusManager) {
    this._deviceManager = deviceManager;
    this._deviceStatusManager = deviceStatusManager;
    this._connectedDevices = new Map();
    this._connectedSockets = new Map();
    this.setup = this.setup.bind(this);
    this._getSocketForDevice = this._getSocketForDevice.bind(this);
    this._handleDisconnect = this._handleDisconnect.bind(this);
    this._handleIdentification = this._handleIdentification.bind(this);
  }
  /**
   * Setup the websocket server.
   * @param httpServer the http server
   * @param {{port: number, pingInterval: number}} param1 the options
   */


  setup(httpServer, {
    port,
    pingInterval = 25000
  }) {
    const _this = this;

    this._io = (0, _socket.default)(httpServer, {
      pingInterval
    });
    this._port = port;

    this._io.on("connection", socket => {
      this._connectedSockets.set(socket.id, socket); // setup ws routes


      socket.on("identification", data => this._handleIdentification(_this, socket, data));
      socket.on("disconnect", () => this._handleDisconnect(_this, socket));
      console.log(`[WebsocketServer] Client connected. Socket ID: ${socket.id}`);
      socket.emit("identification"); // tell the socket to identify itself.
      // if the socket hasn't identified itself within 15 seconds, force disconnect.

      setTimeout(() => {
        if (!_this._connectedDevices.has(socket.id)) {
          console.log(`[WebsocketServer] Socket ${socket.id} failed to identify. Disconnecting.`);
          socket.disconnect();
        }
      }, 15000);
    });
  }
  /**
   * Check to see if a device is connected to the Hub.
   * @param {string} usn the device's usn
   * @returns true if connected, false if not.
   */


  isDeviceConnectedToWebsocketServer(usn) {
    return this._getSocketForDevice(usn) != null;
  }
  /**
   * Get the socket for a given device usn.
   * @param {string} usn the device's usn.
   * @returns the socket, if any. 
   */


  _getSocketForDevice(usn) {
    let socketID = null; //@ts-ignore

    for (const {
      id,
      deviceUSN
    } of this._connectedDevices.entries()) {
      if (deviceUSN === usn) {
        socketID = id;
        break;
      }
    }

    if (socketID == null) {
      return null;
    }

    return this._connectedSockets.get(socketID);
  }
  /**
   * Handle a disconnect from a socket.
   * @param {WebsocketServer} _this this.
   * @param {SocketIO.Socket} socket the socket.
   */


  _handleDisconnect(_this, socket) {
    const sid = socket.id; // remove the connected socket

    this._connectedSockets.delete(sid); // set the device as disconnected


    if (_this._connectedDevices.has(socket.id)) {
      const usn = _this._connectedDevices.get(socket.id);

      this._deviceStatusManager.setDeviceHasDisconnected(usn);
    }
  }
  /**
   * Handle socket identification.
   * @param {WebsocketServer} _this this.
   * @param {SocketIO.Socket} socket the socket.
   * @param {{ usn: string }} param0 the identification package.
   */


  _handleIdentification(_this, socket, {
    usn
  }) {
    _this._deviceManager.getDeviceByUsn(usn).then(iotDevice => {
      if (!iotDevice) {
        console.error("[WebsocketServer] Error! Client is connected to server but not found in SSDP!");
        setTimeout(() => {
          socket.emit("identification");
        }, 2000);
        return;
      }

      iotDevice.setConfiguredAsChild(true);

      _this._connectedDevices.set(socket.id, usn);

      _this._deviceManager.updateDevice(iotDevice);

      this._deviceStatusManager.setDeviceHasConnected(usn);

      console.log(`[WebsocketServer] ${usn} connected. Setting online.`);
    });
  }

}

_defineProperty(WebsocketServer, "_instance", null);

var _default = WebsocketServer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS93ZWJzb2NrZXQvV2Vic29ja2V0U2VydmVyLmpzIl0sIm5hbWVzIjpbIldlYnNvY2tldFNlcnZlciIsImdldEluc3RhbmNlIiwiX2luc3RhbmNlIiwiRGV2aWNlTWFuYWdlciIsIkRldmljZVN0YXR1c01hbmFnZXIiLCJjb25zdHJ1Y3RvciIsImRldmljZU1hbmFnZXIiLCJkZXZpY2VTdGF0dXNNYW5hZ2VyIiwiX2RldmljZU1hbmFnZXIiLCJfZGV2aWNlU3RhdHVzTWFuYWdlciIsIl9jb25uZWN0ZWREZXZpY2VzIiwiTWFwIiwiX2Nvbm5lY3RlZFNvY2tldHMiLCJzZXR1cCIsImJpbmQiLCJfZ2V0U29ja2V0Rm9yRGV2aWNlIiwiX2hhbmRsZURpc2Nvbm5lY3QiLCJfaGFuZGxlSWRlbnRpZmljYXRpb24iLCJodHRwU2VydmVyIiwicG9ydCIsInBpbmdJbnRlcnZhbCIsIl90aGlzIiwiX2lvIiwiX3BvcnQiLCJvbiIsInNvY2tldCIsInNldCIsImlkIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJlbWl0Iiwic2V0VGltZW91dCIsImhhcyIsImRpc2Nvbm5lY3QiLCJpc0RldmljZUNvbm5lY3RlZFRvV2Vic29ja2V0U2VydmVyIiwidXNuIiwic29ja2V0SUQiLCJkZXZpY2VVU04iLCJlbnRyaWVzIiwiZ2V0Iiwic2lkIiwiZGVsZXRlIiwic2V0RGV2aWNlSGFzRGlzY29ubmVjdGVkIiwiZ2V0RGV2aWNlQnlVc24iLCJ0aGVuIiwiaW90RGV2aWNlIiwiZXJyb3IiLCJzZXRDb25maWd1cmVkQXNDaGlsZCIsInVwZGF0ZURldmljZSIsInNldERldmljZUhhc0Nvbm5lY3RlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUVBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxlQUFOLENBQXNCO0FBSXBCOzs7QUFHQSxTQUFPQyxXQUFQLEdBQXFCO0FBQ25CLFFBQUlELGVBQWUsQ0FBQ0UsU0FBaEIsS0FBOEIsSUFBbEMsRUFBd0M7QUFDdENGLE1BQUFB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LGdCQUFaO0FBQWdDLFNBQXpDLEVBQTJDLElBQTNDLENBQVY7QUFDQTtBQUNEOztBQUNEZSxNQUFBQSxTQUFTLENBQUNFLG9CQUFWLENBQStCLElBQS9COztBQUNBM0IsTUFBQUEsS0FBSyxDQUFDWCxpQkFBTixDQUF3QmdCLEdBQXhCLENBQTRCRCxNQUFNLENBQUNFLEVBQW5DLEVBQXVDUyxHQUF2Qzs7QUFDQWYsTUFBQUEsS0FBSyxDQUFDYixjQUFOLENBQXFCeUMsWUFBckIsQ0FBa0NILFNBQWxDOztBQUNBLFdBQUtyQyxvQkFBTCxDQUEwQnlDLHFCQUExQixDQUFnRGQsR0FBaEQ7O0FBQ0FQLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLHFCQUFvQk0sR0FBSSw2QkFBckM7QUFDRCxLQVpEO0FBYUQ7O0FBL0htQjs7Z0JBQWhCcEMsZSxlQUVlLEk7O2VBZ0lOQSxlIiwic291cmNlc0NvbnRlbnQiOlsiLy9AdHMtY2hlY2tcbmltcG9ydCBpbyBmcm9tIFwic29ja2V0LmlvXCI7XG5cbmltcG9ydCBEZXZpY2VNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL0RldmljZU1hbmFnZXJcIjtcbmltcG9ydCBEZXZpY2VTdGF0dXNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL0RldmljZVN0YXR1c01hbmFnZXJcIjtcblxuY2xhc3MgV2Vic29ja2V0U2VydmVyIHtcblxuICBzdGF0aWMgX2luc3RhbmNlID0gbnVsbDtcblxuICAvKipcbiAgICogQHJldHVybnMge1dlYnNvY2tldFNlcnZlcn1cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAoV2Vic29ja2V0U2VydmVyLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgV2Vic29ja2V0U2VydmVyLl9pbnN0YW5jZSA9IG5ldyBXZWJzb2NrZXRTZXJ2ZXIoRGV2aWNlTWFuYWdlci5nZXRJbnN0YW5jZSgpLCBEZXZpY2VTdGF0dXNNYW5hZ2VyLmdldEluc3RhbmNlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gV2Vic29ja2V0U2VydmVyLl9pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtEZXZpY2VNYW5hZ2VyfSBkZXZpY2VNYW5hZ2VyIFxuICAgKiBAcGFyYW0ge0RldmljZVN0YXR1c01hbmFnZXJ9IGRldmljZVN0YXR1c01hbmFnZXIgXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkZXZpY2VNYW5hZ2VyLCBkZXZpY2VTdGF0dXNNYW5hZ2VyKSB7XG4gICAgdGhpcy5fZGV2aWNlTWFuYWdlciA9IGRldmljZU1hbmFnZXI7XG4gICAgdGhpcy5fZGV2aWNlU3RhdHVzTWFuYWdlciA9IGRldmljZVN0YXR1c01hbmFnZXI7XG5cbiAgICB0aGlzLl9jb25uZWN0ZWREZXZpY2VzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuX2Nvbm5lY3RlZFNvY2tldHMgPSBuZXcgTWFwKCk7XG5cbiAgICB0aGlzLnNldHVwID0gdGhpcy5zZXR1cC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2dldFNvY2tldEZvckRldmljZSA9IHRoaXMuX2dldFNvY2tldEZvckRldmljZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZURpc2Nvbm5lY3QgPSB0aGlzLl9oYW5kbGVEaXNjb25uZWN0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlSWRlbnRpZmljYXRpb24gPSB0aGlzLl9oYW5kbGVJZGVudGlmaWNhdGlvbi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIHRoZSB3ZWJzb2NrZXQgc2VydmVyLlxuICAgKiBAcGFyYW0gaHR0cFNlcnZlciB0aGUgaHR0cCBzZXJ2ZXJcbiAgICogQHBhcmFtIHt7cG9ydDogbnVtYmVyLCBwaW5nSW50ZXJ2YWw6IG51bWJlcn19IHBhcmFtMSB0aGUgb3B0aW9uc1xuICAgKi9cbiAgc2V0dXAoaHR0cFNlcnZlciwgeyBwb3J0LCBwaW5nSW50ZXJ2YWwgPSAyNTAwMCB9KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuX2lvID0gaW8oaHR0cFNlcnZlciwgeyBwaW5nSW50ZXJ2YWwgfSk7XG4gICAgdGhpcy5fcG9ydCA9IHBvcnQ7XG4gICAgdGhpcy5faW8ub24oXCJjb25uZWN0aW9uXCIsIChzb2NrZXQpID0+IHtcbiAgICAgIHRoaXMuX2Nvbm5lY3RlZFNvY2tldHMuc2V0KHNvY2tldC5pZCwgc29ja2V0KTtcbiAgICAgIC8vIHNldHVwIHdzIHJvdXRlc1xuICAgICAgc29ja2V0Lm9uKFwiaWRlbnRpZmljYXRpb25cIiwgKGRhdGEpID0+IHRoaXMuX2hhbmRsZUlkZW50aWZpY2F0aW9uKF90aGlzLCBzb2NrZXQsIGRhdGEpKTtcbiAgICAgIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKCkgPT4gdGhpcy5faGFuZGxlRGlzY29ubmVjdChfdGhpcywgc29ja2V0KSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKGBbV2Vic29ja2V0U2VydmVyXSBDbGllbnQgY29ubmVjdGVkLiBTb2NrZXQgSUQ6ICR7c29ja2V0LmlkfWApO1xuICAgICAgc29ja2V0LmVtaXQoXCJpZGVudGlmaWNhdGlvblwiKTsgLy8gdGVsbCB0aGUgc29ja2V0IHRvIGlkZW50aWZ5IGl0c2VsZi5cblxuICAgICAgLy8gaWYgdGhlIHNvY2tldCBoYXNuJ3QgaWRlbnRpZmllZCBpdHNlbGYgd2l0aGluIDE1IHNlY29uZHMsIGZvcmNlIGRpc2Nvbm5lY3QuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCFfdGhpcy5fY29ubmVjdGVkRGV2aWNlcy5oYXMoc29ja2V0LmlkKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBbV2Vic29ja2V0U2VydmVyXSBTb2NrZXQgJHtzb2NrZXQuaWR9IGZhaWxlZCB0byBpZGVudGlmeS4gRGlzY29ubmVjdGluZy5gKTtcbiAgICAgICAgICBzb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9LCAxNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIGEgZGV2aWNlIGlzIGNvbm5lY3RlZCB0byB0aGUgSHViLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNuIHRoZSBkZXZpY2UncyB1c25cbiAgICogQHJldHVybnMgdHJ1ZSBpZiBjb25uZWN0ZWQsIGZhbHNlIGlmIG5vdC5cbiAgICovXG4gIGlzRGV2aWNlQ29ubmVjdGVkVG9XZWJzb2NrZXRTZXJ2ZXIodXNuKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFNvY2tldEZvckRldmljZSh1c24pICE9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzb2NrZXQgZm9yIGEgZ2l2ZW4gZGV2aWNlIHVzbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVzbiB0aGUgZGV2aWNlJ3MgdXNuLlxuICAgKiBAcmV0dXJucyB0aGUgc29ja2V0LCBpZiBhbnkuIFxuICAgKi9cbiAgX2dldFNvY2tldEZvckRldmljZSh1c24pIHtcbiAgICBsZXQgc29ja2V0SUQgPSBudWxsO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGZvciAoY29uc3QgeyBpZCwgZGV2aWNlVVNOIH0gb2YgdGhpcy5fY29ubmVjdGVkRGV2aWNlcy5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChkZXZpY2VVU04gPT09IHVzbikge1xuICAgICAgICBzb2NrZXRJRCA9IGlkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvY2tldElEID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGVkU29ja2V0cy5nZXQoc29ja2V0SUQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBhIGRpc2Nvbm5lY3QgZnJvbSBhIHNvY2tldC5cbiAgICogQHBhcmFtIHtXZWJzb2NrZXRTZXJ2ZXJ9IF90aGlzIHRoaXMuXG4gICAqIEBwYXJhbSB7U29ja2V0SU8uU29ja2V0fSBzb2NrZXQgdGhlIHNvY2tldC5cbiAgICovXG4gIF9oYW5kbGVEaXNjb25uZWN0KF90aGlzLCBzb2NrZXQpIHtcbiAgICBjb25zdCBzaWQgPSBzb2NrZXQuaWQ7XG5cbiAgICAvLyByZW1vdmUgdGhlIGNvbm5lY3RlZCBzb2NrZXRcbiAgICB0aGlzLl9jb25uZWN0ZWRTb2NrZXRzLmRlbGV0ZShzaWQpO1xuXG4gICAgLy8gc2V0IHRoZSBkZXZpY2UgYXMgZGlzY29ubmVjdGVkXG4gICAgaWYgKF90aGlzLl9jb25uZWN0ZWREZXZpY2VzLmhhcyhzb2NrZXQuaWQpKSB7XG4gICAgICBjb25zdCB1c24gPSBfdGhpcy5fY29ubmVjdGVkRGV2aWNlcy5nZXQoc29ja2V0LmlkKTtcbiAgICAgIHRoaXMuX2RldmljZVN0YXR1c01hbmFnZXIuc2V0RGV2aWNlSGFzRGlzY29ubmVjdGVkKHVzbik7XG4gICAgfVxuICB9ICBcblxuICAvKipcbiAgICogSGFuZGxlIHNvY2tldCBpZGVudGlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtXZWJzb2NrZXRTZXJ2ZXJ9IF90aGlzIHRoaXMuXG4gICAqIEBwYXJhbSB7U29ja2V0SU8uU29ja2V0fSBzb2NrZXQgdGhlIHNvY2tldC5cbiAgICogQHBhcmFtIHt7IHVzbjogc3RyaW5nIH19IHBhcmFtMCB0aGUgaWRlbnRpZmljYXRpb24gcGFja2FnZS5cbiAgICovXG4gIF9oYW5kbGVJZGVudGlmaWNhdGlvbihfdGhpcywgc29ja2V0LCB7IHVzbiB9KSB7XG4gICAgX3RoaXMuX2RldmljZU1hbmFnZXIuZ2V0RGV2aWNlQnlVc24odXNuKVxuICAgIC50aGVuKGlvdERldmljZSA9PiB7XG4gICAgICBpZiAoIWlvdERldmljZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW1dlYnNvY2tldFNlcnZlcl0gRXJyb3IhIENsaWVudCBpcyBjb25uZWN0ZWQgdG8gc2VydmVyIGJ1dCBub3QgZm91bmQgaW4gU1NEUCFcIik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzb2NrZXQuZW1pdChcImlkZW50aWZpY2F0aW9uXCIpOyB9LCAyMDAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaW90RGV2aWNlLnNldENvbmZpZ3VyZWRBc0NoaWxkKHRydWUpO1xuICAgICAgX3RoaXMuX2Nvbm5lY3RlZERldmljZXMuc2V0KHNvY2tldC5pZCwgdXNuKTtcbiAgICAgIF90aGlzLl9kZXZpY2VNYW5hZ2VyLnVwZGF0ZURldmljZShpb3REZXZpY2UpO1xuICAgICAgdGhpcy5fZGV2aWNlU3RhdHVzTWFuYWdlci5zZXREZXZpY2VIYXNDb25uZWN0ZWQodXNuKTtcbiAgICAgIGNvbnNvbGUubG9nKGBbV2Vic29ja2V0U2VydmVyXSAke3Vzbn0gY29ubmVjdGVkLiBTZXR0aW5nIG9ubGluZS5gKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJzb2NrZXRTZXJ2ZXI7XG4iXSwiZmlsZSI6ImRldmljZS93ZWJzb2NrZXQvV2Vic29ja2V0U2VydmVyLmpzIn0=
