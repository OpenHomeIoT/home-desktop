//@ts-check
import { parseString } from "xml2js";
import { Client as SSDPClient, Server as SSDPServer, SsdpHeaders } from "node-ssdp";
import request from "request";

import DeviceManager from "./DeviceManager";
import DeviceStatusManager from "./DeviceStatusManager";

import IoTDevice from "../IoTDevice";
import WebsocketServer from "../WebsocketServer";


class SsdpManager {

  static _instance = null;

  /**
   * Get the SSDPManager instance.
   * @returns {SsdpManager} the SSDPManager instance.
   */
  static getInstance() {
    if (SsdpManager._instance == null) {
      SsdpManager._instance = new SsdpManager(DeviceManager.getInstance(), DeviceStatusManager.getInstance(), WebsocketServer.getInstance());
    }
    return SsdpManager._instance;
  }

  /**
   * 
   * @param {DeviceManager} deviceManager 
   * @param {DeviceStatusManager} deviceStatusManager 
   * @param {WebsocketServer} websocketServer 
   */
  constructor(deviceManager, deviceStatusManager, websocketServer) {
    this._deviceManager = deviceManager;
    this._deviceStatusManager = deviceStatusManager;
    this._websocketServer = websocketServer;

    this._ssdpClient = new SSDPClient();
    this._ssdpServer = new SSDPServer();
    this._timer = null;
    this._host = null;
    this._port = 80;

    this._ssdpClient.on("response", (headers, statusCode, rInfo) => this._handleSSDPSearchResponse(headers, statusCode, rInfo));
    this._ssdpServer.addUSN("urn:oshiot:device:hub:1-0");
    this._ssdpServer.on("advertise-alive", (headers) => this._handleAdvertiseAlive(headers));
    this._ssdpServer.on("advertise-bye", (headers) => this._handleAdvertiseBye(headers));

    this.startListening = this.startListening.bind(this);
    this.stopListening = this.stopListening.bind(this);
    this._handleResponse = this._handleSSDPSearchResponse.bind(this);
    this._handleAdvertiseAlive = this._handleAdvertiseAlive.bind(this);
    this._handleAdvertiseBye = this._handleAdvertiseBye.bind(this);
  }

  /**
   * Set the host ip.
   * @param {String} host the host IP of this device. 
   */
  setHost(host) {
    this._host = host;
  }

  /**
   * Set the port.
   * @param {number} port the port.
   */
  setPort(port) {
    this._port = port;
  }

  /**
   * Start listening for ESP8266 client SSDP signatures.
   * Also start broadcasting own SSDP signature.
   */
  startListening() {
    if (!this._host) {
      throw new Error("setHost() must be called.");
    }
    this._timer = setInterval(() => this._ssdpSearch(), 10000);
    this._ssdpSearch();
    this._ssdpServer.start();
  }

  /**
   * Stop listening for client ssdp signatures and stop broadcasting.
   */
  stopListening() {
    if (this._timer) {
      clearInterval(this._timer);
    }
    this._ssdpServer.stop();
  }

  /**
   * 
   * @param {SsdpHeaders} header the ssdp headers. 
   */
  _handleAdvertiseAlive(header) {
    if (header.ST && header.ST.indexOf("oshiot") !== -1) {
      console.log(`[SSDPManager] Advertise Alive: ${JSON.stringify(header)}`);
    }
  }

  /**
   * 
   * @param {SsdpHeaders} header the ssdp headers. 
   */
  _handleAdvertiseBye(header) {
    if (header.ST && header.ST.indexOf("oshiot") !== -1) {
      console.log(`[SSDPManager] Advertise Bye: ${JSON.stringify(header)}`);
    }
  }

  /**
   * 
   * @param {SsdpHeaders} headers the SsdpHeaders. 
   * @param {*} _ unused
   * @param {*} rInfo the remote information
   */
  _handleSSDPSearchResponse(headers, _, rInfo) {
    if (!headers.ST || headers.ST.indexOf("oshiot") === -1) {
      return Promise.resolve();
    }
    const usn = headers.USN;
    const ipAddress = rInfo.address;
    const now = Date.now();
    return this._deviceManager.getDeviceByUsn(usn)
    .then(iotDevice => {
      if (iotDevice == null) {
        return this._loadServicesDescriptionForDevice(headers.LOCATION)
        .then(serviceList => this._createNewDevice(usn, headers.LOCATION, ipAddress, serviceList))
        .catch(err => console.error(`[SsdpManager] Unable to add the device to the database. ${err}`));
      }
      iotDevice.setLastSeen(now);
      this._deviceManager.updateDevice(iotDevice);
      // verify with WebsocketServer that the device is actually connected. If not, make it connect.
      if ((!this._websocketServer.isDeviceConnectedToWebsocketServer(usn))) {
        return this._deviceStatusManager.isDeviceReconnecting(usn)
        .then(deviceIsReconnecting => {
          if (!deviceIsReconnecting) {
            console.log("[SsdpManager] Found device that wasn't connected to Hub. Attempting to reconnect.")
            return this._deviceStatusManager.setDeviceIsReconnecting(usn);
            // .then(() => this._deviceManager.configureDeviceAsChild(usn, this._host, this._port)); TODO: implement
          }
        });
      }
    });
  }

  /**
   * Create a new IoTDevice.
   * @param {string} usn the device's usn.
   * @param {string} ssdpDescriptionLocation the ssdp description location
   * @param {string[]} serviceList the service list
   * @returns {Promise<void>}
   */
  _createNewDevice(usn, ssdpDescriptionLocation, ipAddress, serviceList) {
    console.log(`[SsdpManager] Discovered a new device (${ipAddress}) with services: ${JSON.stringify(serviceList)}`);
    const now = Date.now();  
    const iotDevice = new IoTDevice(usn, ssdpDescriptionLocation, ipAddress, serviceList, false, now, now, IoTDevice.Disconnected);
    return this._deviceManager.addDevice(iotDevice);
  }

  /**
   * 
   * @param {string} servicesLocation the http url to the description of services.
   * @returns {Promise<string[]>} a promise returning an array of services.
   */
  _loadServicesDescriptionForDevice(servicesLocation) {
    return new Promise((resolve, reject) => {
      request(servicesLocation, { method: "GET" }, (err, response, body) => {
        if (err) {
          reject(err);
          return;
        }
        // body is a plaintext string so we need to parse it
        parseString(body, (parseErr, result) => {
          if (parseErr) {
            reject(err);
            return;
          }
          const services = [];
  
          for (let i = 0; i < result.root.device[0].serviceList.length; i++) {
            const service = result.root.device[0].serviceList[i].service;
            const serviceType = service[0].serviceType[0];
            services.push(serviceType);
          }
  
          resolve(services);
        });
      });
    });
  }
  
  /**
   * search for esp8266 devices on the network.
   */
  _ssdpSearch() {
    this._ssdpClient.search("urn:oshiot:device:wifi:1-0");
  }
}

export default SsdpManager;
