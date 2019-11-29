"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xml2js = require("xml2js");

var _nodeSsdp = require("node-ssdp");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SsdpManager {
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
    this._ssdpClient = new _nodeSsdp.Client();
    this._ssdpServer = new _nodeSsdp.Server();
    this._timer = null;
    this._host = null;
    this._port = 80;

    this._ssdpClient.on("response", (headers, statusCode, rInfo) => this._handleSSDPSearchResponse(headers, statusCode, rInfo));

    this._ssdpServer.addUSN("urn:oshiot:device:hub:1-0");

    this._ssdpServer.on("advertise-alive", headers => this._handleAdvertiseAlive(headers));

    this._ssdpServer.on("advertise-bye", headers => this._handleAdvertiseBye(headers));

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
  }
  /**
   * 
   * @param {string} servicesLocation the http url to the description of services.
   * @returns {Promise<string[]>} a promise returning an array of services.
   */


  _loadServicesDescriptionForDevice(servicesLocation) {
    return new Promise((resolve, reject) => {
      request(servicesLocation, {
        method: "GET"
      }, (err, response, body) => {
        if (err) {
          reject(err);
          return;
        } // body is a plaintext string so we need to parse it


        (0, _xml2js.parseString)(body, (parseErr, result) => {
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

_defineProperty(SsdpManager, "_instance", null);

var _default = SsdpManager;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNzZHAvbWFuYWdlci9Tc2RwTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJTc2RwTWFuYWdlciIsImdldEluc3RhbmNlIiwiX2luc3RhbmNlIiwiY29uc3RydWN0b3IiLCJfc3NkcENsaWVudCIsIlNTRFBDbGllbnQiLCJfc3NkcFNlcnZlciIsIlNTRFBTZXJ2ZXIiLCJfdGltZXIiLCJfaG9zdCIsIl9wb3J0Iiwib24iLCJoZWFkZXJzIiwic3RhdHVzQ29kZSIsInJJbmZvIiwiX2hhbmRsZVNTRFBTZWFyY2hSZXNwb25zZSIsImFkZFVTTiIsIl9oYW5kbGVBZHZlcnRpc2VBbGl2ZSIsIl9oYW5kbGVBZHZlcnRpc2VCeWUiLCJzdGFydExpc3RlbmluZyIsImJpbmQiLCJzdG9wTGlzdGVuaW5nIiwiX2hhbmRsZVJlc3BvbnNlIiwic2V0SG9zdCIsImhvc3QiLCJzZXRQb3J0IiwicG9ydCIsIkVycm9yIiwic2V0SW50ZXJ2YWwiLCJfc3NkcFNlYXJjaCIsInN0YXJ0IiwiY2xlYXJJbnRlcnZhbCIsInN0b3AiLCJoZWFkZXIiLCJTVCIsImluZGV4T2YiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsIl8iLCJQcm9taXNlIiwicmVzb2x2ZSIsInVzbiIsIlVTTiIsImlwQWRkcmVzcyIsImFkZHJlc3MiLCJub3ciLCJEYXRlIiwiX2xvYWRTZXJ2aWNlc0Rlc2NyaXB0aW9uRm9yRGV2aWNlIiwic2VydmljZXNMb2NhdGlvbiIsInJlamVjdCIsInJlcXVlc3QiLCJtZXRob2QiLCJlcnIiLCJyZXNwb25zZSIsImJvZHkiLCJwYXJzZUVyciIsInJlc3VsdCIsInNlcnZpY2VzIiwiaSIsInJvb3QiLCJkZXZpY2UiLCJzZXJ2aWNlTGlzdCIsImxlbmd0aCIsInNlcnZpY2UiLCJzZXJ2aWNlVHlwZSIsInB1c2giLCJzZWFyY2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUtBLE1BQU1BLFdBQU4sQ0FBa0I7QUFJaEI7Ozs7QUFJQSxTQUFP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LEVBQVdDLE1BQVgsS0FBc0I7QUFDdEMsY0FBSUQsUUFBSixFQUFjO0FBQ1pOLFlBQUFBLE1BQU0sQ0FBQ0csR0FBRCxDQUFOO0FBQ0E7QUFDRDs7QUFDRCxnQkFBTUssUUFBUSxHQUFHLEVBQWpCOztBQUVBLGVBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsTUFBTSxDQUFDRyxJQUFQLENBQVlDLE1BQVosQ0FBbUIsQ0FBbkIsRUFBc0JDLFdBQXRCLENBQWtDQyxNQUF0RCxFQUE4REosQ0FBQyxFQUEvRCxFQUFtRTtBQUNqRSxrQkFBTUssT0FBTyxHQUFHUCxNQUFNLENBQUNHLElBQVAsQ0FBWUMsTUFBWixDQUFtQixDQUFuQixFQUFzQkMsV0FBdEIsQ0FBa0NILENBQWxDLEVBQXFDSyxPQUFyRDtBQUNBLGtCQUFNQyxXQUFXLEdBQUdELE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV0MsV0FBWCxDQUF1QixDQUF2QixDQUFwQjtBQUNBUCxZQUFBQSxRQUFRLENBQUNRLElBQVQsQ0FBY0QsV0FBZDtBQUNEOztBQUVEeEIsVUFBQUEsT0FBTyxDQUFDaUIsUUFBRCxDQUFQO0FBQ0QsU0FkRDtBQWVELE9BckJNLENBQVA7QUFzQkQsS0F2Qk0sQ0FBUDtBQXdCRDtBQUVEOzs7OztBQUdBOUIsRUFBQUEsV0FBVyxHQUFHO0FBQ1osU0FBS3pCLFdBQUwsQ0FBaUJnRSxNQUFqQixDQUF3Qiw0QkFBeEI7QUFDRDs7QUFsSmU7O2dCQUFacEUsVyxlQUVlLEk7O2VBbUpOQSxXIiwic291cmNlc0NvbnRlbnQiOlsiLy9AdHMtY2hlY2tcbmltcG9ydCB7IHBhcnNlU3RyaW5nIH0gZnJvbSBcInhtbDJqc1wiO1xuaW1wb3J0IHsgQ2xpZW50IGFzIFNTRFBDbGllbnQsIFNlcnZlciBhcyBTU0RQU2VydmVyLCBTc2RwSGVhZGVycyB9IGZyb20gXCJub2RlLXNzZHBcIjtcblxuXG5cblxuY2xhc3MgU3NkcE1hbmFnZXIge1xuXG4gIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFNTRFBNYW5hZ2VyIGluc3RhbmNlLlxuICAgKiBAcmV0dXJucyB7U3NkcE1hbmFnZXJ9IHRoZSBTU0RQTWFuYWdlciBpbnN0YW5jZS5cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAoU3NkcE1hbmFnZXIuX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgIFNzZHBNYW5hZ2VyLl9pbnN0YW5jZSA9IG5ldyBTc2RwTWFuYWdlcigpO1xuICAgIH1cbiAgICByZXR1cm4gU3NkcE1hbmFnZXIuX2luc3RhbmNlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc3NkcENsaWVudCA9IG5ldyBTU0RQQ2xpZW50KCk7XG4gICAgdGhpcy5fc3NkcFNlcnZlciA9IG5ldyBTU0RQU2VydmVyKCk7XG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2hvc3QgPSBudWxsO1xuICAgIHRoaXMuX3BvcnQgPSA4MDtcblxuICAgIHRoaXMuX3NzZHBDbGllbnQub24oXCJyZXNwb25zZVwiLCAoaGVhZGVycywgc3RhdHVzQ29kZSwgckluZm8pID0+IHRoaXMuX2hhbmRsZVNTRFBTZWFyY2hSZXNwb25zZShoZWFkZXJzLCBzdGF0dXNDb2RlLCBySW5mbykpO1xuICAgIHRoaXMuX3NzZHBTZXJ2ZXIuYWRkVVNOKFwidXJuOm9zaGlvdDpkZXZpY2U6aHViOjEtMFwiKTtcbiAgICB0aGlzLl9zc2RwU2VydmVyLm9uKFwiYWR2ZXJ0aXNlLWFsaXZlXCIsIChoZWFkZXJzKSA9PiB0aGlzLl9oYW5kbGVBZHZlcnRpc2VBbGl2ZShoZWFkZXJzKSk7XG4gICAgdGhpcy5fc3NkcFNlcnZlci5vbihcImFkdmVydGlzZS1ieWVcIiwgKGhlYWRlcnMpID0+IHRoaXMuX2hhbmRsZUFkdmVydGlzZUJ5ZShoZWFkZXJzKSk7XG5cbiAgICB0aGlzLnN0YXJ0TGlzdGVuaW5nID0gdGhpcy5zdGFydExpc3RlbmluZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcExpc3RlbmluZyA9IHRoaXMuc3RvcExpc3RlbmluZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZVJlc3BvbnNlID0gdGhpcy5faGFuZGxlU1NEUFNlYXJjaFJlc3BvbnNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlQWR2ZXJ0aXNlQWxpdmUgPSB0aGlzLl9oYW5kbGVBZHZlcnRpc2VBbGl2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUFkdmVydGlzZUJ5ZSA9IHRoaXMuX2hhbmRsZUFkdmVydGlzZUJ5ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaG9zdCBpcC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGhvc3QgdGhlIGhvc3QgSVAgb2YgdGhpcyBkZXZpY2UuIFxuICAgKi9cbiAgc2V0SG9zdChob3N0KSB7XG4gICAgdGhpcy5faG9zdCA9IGhvc3Q7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBwb3J0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gcG9ydCB0aGUgcG9ydC5cbiAgICovXG4gIHNldFBvcnQocG9ydCkge1xuICAgIHRoaXMuX3BvcnQgPSBwb3J0O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgRVNQODI2NiBjbGllbnQgU1NEUCBzaWduYXR1cmVzLlxuICAgKiBBbHNvIHN0YXJ0IGJyb2FkY2FzdGluZyBvd24gU1NEUCBzaWduYXR1cmUuXG4gICAqL1xuICBzdGFydExpc3RlbmluZygpIHtcbiAgICBpZiAoIXRoaXMuX2hvc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNldEhvc3QoKSBtdXN0IGJlIGNhbGxlZC5cIik7XG4gICAgfVxuICAgIHRoaXMuX3RpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5fc3NkcFNlYXJjaCgpLCAxMDAwMCk7XG4gICAgdGhpcy5fc3NkcFNlYXJjaCgpO1xuICAgIHRoaXMuX3NzZHBTZXJ2ZXIuc3RhcnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGxpc3RlbmluZyBmb3IgY2xpZW50IHNzZHAgc2lnbmF0dXJlcyBhbmQgc3RvcCBicm9hZGNhc3RpbmcuXG4gICAqL1xuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIGlmICh0aGlzLl90aW1lcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgfVxuICAgIHRoaXMuX3NzZHBTZXJ2ZXIuc3RvcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge1NzZHBIZWFkZXJzfSBoZWFkZXIgdGhlIHNzZHAgaGVhZGVycy4gXG4gICAqL1xuICBfaGFuZGxlQWR2ZXJ0aXNlQWxpdmUoaGVhZGVyKSB7XG4gICAgaWYgKGhlYWRlci5TVCAmJiBoZWFkZXIuU1QuaW5kZXhPZihcIm9zaGlvdFwiKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbU1NEUE1hbmFnZXJdIEFkdmVydGlzZSBBbGl2ZTogJHtKU09OLnN0cmluZ2lmeShoZWFkZXIpfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtTc2RwSGVhZGVyc30gaGVhZGVyIHRoZSBzc2RwIGhlYWRlcnMuIFxuICAgKi9cbiAgX2hhbmRsZUFkdmVydGlzZUJ5ZShoZWFkZXIpIHtcbiAgICBpZiAoaGVhZGVyLlNUICYmIGhlYWRlci5TVC5pbmRleE9mKFwib3NoaW90XCIpICE9PSAtMSkge1xuICAgICAgY29uc29sZS5sb2coYFtTU0RQTWFuYWdlcl0gQWR2ZXJ0aXNlIEJ5ZTogJHtKU09OLnN0cmluZ2lmeShoZWFkZXIpfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtTc2RwSGVhZGVyc30gaGVhZGVycyB0aGUgU3NkcEhlYWRlcnMuIFxuICAgKiBAcGFyYW0geyp9IF8gdW51c2VkXG4gICAqIEBwYXJhbSB7Kn0gckluZm8gdGhlIHJlbW90ZSBpbmZvcm1hdGlvblxuICAgKi9cbiAgX2hhbmRsZVNTRFBTZWFyY2hSZXNwb25zZShoZWFkZXJzLCBfLCBySW5mbykge1xuICAgIGlmICghaGVhZGVycy5TVCB8fCBoZWFkZXJzLlNULmluZGV4T2YoXCJvc2hpb3RcIikgPT09IC0xKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIGNvbnN0IHVzbiA9IGhlYWRlcnMuVVNOO1xuICAgIGNvbnN0IGlwQWRkcmVzcyA9IHJJbmZvLmFkZHJlc3M7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VydmljZXNMb2NhdGlvbiB0aGUgaHR0cCB1cmwgdG8gdGhlIGRlc2NyaXB0aW9uIG9mIHNlcnZpY2VzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmdbXT59IGEgcHJvbWlzZSByZXR1cm5pbmcgYW4gYXJyYXkgb2Ygc2VydmljZXMuXG4gICAqL1xuICBfbG9hZFNlcnZpY2VzRGVzY3JpcHRpb25Gb3JEZXZpY2Uoc2VydmljZXNMb2NhdGlvbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0KHNlcnZpY2VzTG9jYXRpb24sIHsgbWV0aG9kOiBcIkdFVFwiIH0sIChlcnIsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gYm9keSBpcyBhIHBsYWludGV4dCBzdHJpbmcgc28gd2UgbmVlZCB0byBwYXJzZSBpdFxuICAgICAgICBwYXJzZVN0cmluZyhib2R5LCAocGFyc2VFcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChwYXJzZUVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHNlcnZpY2VzID0gW107XG4gIFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0LnJvb3QuZGV2aWNlWzBdLnNlcnZpY2VMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gcmVzdWx0LnJvb3QuZGV2aWNlWzBdLnNlcnZpY2VMaXN0W2ldLnNlcnZpY2U7XG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlVHlwZSA9IHNlcnZpY2VbMF0uc2VydmljZVR5cGVbMF07XG4gICAgICAgICAgICBzZXJ2aWNlcy5wdXNoKHNlcnZpY2VUeXBlKTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIHJlc29sdmUoc2VydmljZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIFxuICAvKipcbiAgICogc2VhcmNoIGZvciBlc3A4MjY2IGRldmljZXMgb24gdGhlIG5ldHdvcmsuXG4gICAqL1xuICBfc3NkcFNlYXJjaCgpIHtcbiAgICB0aGlzLl9zc2RwQ2xpZW50LnNlYXJjaChcInVybjpvc2hpb3Q6ZGV2aWNlOndpZmk6MS0wXCIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNzZHBNYW5hZ2VyO1xuIl0sImZpbGUiOiJzc2RwL21hbmFnZXIvU3NkcE1hbmFnZXIuanMifQ==
