//@ts-check
import io from "socket.io";

import DeviceManager from "../manager/DeviceManager";
import DeviceStatusManager from "../manager/DeviceStatusManager";

class WebsocketServer {

  static _instance = null;

  /**
   * @returns {WebsocketServer}
   */
  static getInstance() {
    if (WebsocketServer._instance === null) {
      WebsocketServer._instance = new WebsocketServer(DeviceManager.getInstance(), DeviceStatusManager.getInstance());
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
  setup(httpServer, { port, pingInterval = 25000 }) {
    const _this = this;
    this._io = io(httpServer, { pingInterval });
    this._port = port;
    this._io.on("connection", (socket) => {
      this._connectedSockets.set(socket.id, socket);
      // setup ws routes
      socket.on("identification", (data) => this._handleIdentification(_this, socket, data));
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
    let socketID = null;
    //@ts-ignore
    for (const { id, deviceUSN } of this._connectedDevices.entries()) {
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
    const sid = socket.id;

    // remove the connected socket
    this._connectedSockets.delete(sid);

    // set the device as disconnected
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
  _handleIdentification(_this, socket, { usn }) {
    _this._deviceManager.getDeviceByUsn(usn)
    .then(iotDevice => {
      if (!iotDevice) {
        console.error("[WebsocketServer] Error! Client is connected to server but not found in SSDP!");
        setTimeout(() => { socket.emit("identification"); }, 2000);
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

export default WebsocketServer;
