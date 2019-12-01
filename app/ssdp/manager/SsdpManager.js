//@ts-check
import { ipcRenderer } from "electron";
import { parseString } from "xml2js";
import { Client as SSDPClient, Server as SSDPServer, SsdpHeaders } from "node-ssdp";
import request from "request";

import SsdpDeviceCache from "../database/SsdpDeviceCache";


class SsdpManager {

  static _instance = null;

  /**
   * Get the SSDPManager instance.
   * @returns {SsdpManager} the SSDPManager instance.
   */
  static getInstance() {
    if (SsdpManager._instance == null) {
      SsdpManager._instance = new SsdpManager();
    }
    return SsdpManager._instance;
  }

  constructor() {
    this._deviceCache = SsdpDeviceCache.getInstance();

    this._timer = null;

    this._ssdpClient = new SSDPClient();
    this._ssdpClient.on("response", (headers, statusCode, rInfo) => this._handleSSDPSearchResponse(headers, statusCode, rInfo));

    this._ssdpServer = new SSDPServer();
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
   * Start listening for ESP8266 client SSDP signatures.
   * Also start broadcasting own SSDP signature.
   */
  startListening() {
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
  async _handleSSDPSearchResponse(headers, _, rInfo) {
    if (!headers.ST) return;
    if (headers.ST === "urn:oshiot:device:hub:1-0") return;

    const usn = headers.USN;
    const ipAddress = rInfo.address;
    
    await this._deviceCache.get(usn)
    .then(device => {
      const now = Date.now();
      if (!device) {
        if (headers.ST.indexOf("urn:oshiot:device") !== -1) {
          this._log(JSON.stringify(headers));
        } else if (headers.ST.indexOf("roku") !== -1) {
          this._log(`Found Roku: ${headers.LOCATION}`);
        }
        return this._deviceCache.insert({
          _id: headers.USN, 
          usn: headers.USN,
          ipAddress: ipAddress,
          timeDiscovered: now,
          timeLastSeen: now,
          headers: JSON.stringify(headers),
          rendererIsAwareOfDevice: false
        });
      }
      this._log(`Updating device: ${usn}: ${ipAddress}`);
      device.timeLastSeen = now;
      device.headers = headers;
      device.ipAddress = ipAddress;
      return this._deviceCache.update(device);
    });
    // TODO: implement
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

  _log(message) {
    ipcRenderer.send("log", { sender: "ssdp", recipient: "main", message: `[SsdpManager] ${message}` });
  }
  
  /**
   * search for esp8266 devices on the network.
   */
  _ssdpSearch() {
    // this._ssdpClient.search("urn:oshiot:device:wifi:1-0");
    this._ssdpClient.search("ssdp:all");
  }
}

export default SsdpManager;
