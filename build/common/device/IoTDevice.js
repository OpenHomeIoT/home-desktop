"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//@ts-check
class IoTDevice {
  /**
   * 
   * @param {String} usn 
   * @param {String} descriptionLocation 
   * @param {String} address 
   * @param {Array<String>} services 
   * @param {Boolean} configuredChild 
   * @param {number} lastSeen 
   * @param {number} discovered 
   * @param {string} connectionStatus 
   */
  constructor(usn, descriptionLocation, address, services, configuredChild, lastSeen, discovered, connectionStatus) {
    this._usn = usn;
    this._descriptionLocation = descriptionLocation;
    this._address = address;
    this._services = services;
    this._configuredChild = configuredChild;
    this._lastSeen = lastSeen;
    this._discovered = discovered;
    this._connectionStatus = connectionStatus; // binding

    this.toJson = this.toJson.bind(this);
    this.toString = this.toString.bind(this);
  }
  /**
   * Get the IP Address of the IoTDevice.
   * @returns {String} the IP Address of the IoTDevice.
   */


  getAddress() {
    return this._address;
  }
  /**
   * Get when the IoTDevice was discovered.
   * @returns {number} the time when the IoTDevice was 
   * discovered in milliseconds. 
   */


  getDiscovered() {
    return this._discovered;
  }
  /**
   * Get when the IoTDevice was last seen.
   * @returns {number} the time when the IoTDevice was
   * last seen in milliseconds.
   */


  getLastSeen() {
    return this._lastSeen;
  }
  /**
   * Get a list of services that this IoTDevice provides.
   * @returns {Array<String>} a list of services that this IoTDevice provides.
   */


  getServices() {
    return this._services;
  }
  /**
   * Get the SSDP description location.
   * @returns {String} the url to the SSDP description xml.
   */


  getSSDPDescriptionLocation() {
    return this._descriptionLocation;
  }
  /**
   * Get the IoTDevice's USN.
   * @returns {String} the IoTDevice's USN.
   */


  getUSN() {
    return this._usn;
  }
  /**
   * Get whether or not this IoTDevice is configured as a child
   * to this Hub.
   * @returns {Boolean} the configuration status.
   */


  isConfiguredChild() {
    return this._configuredChild;
  }
  /**
   * @returns {string} the connection status of the device to this Hub.
   */


  getConnectionStatus() {
    return this._connectionStatus;
  }
  /**
   * Set whether or not the IoTDevice has been configured by this
   * Hub aka "parent".
   * @param {Boolean} configured the configured value.
   */


  setConfiguredAsChild(configured) {
    this._configuredChild = configured;
  }
  /**
   * Set when this IoTDevice was last seen in milliseconds.
   * @param {number} lastSeen the time when this IoTDevice was last
   * seen in milliseconds.
   */


  setLastSeen(lastSeen) {
    this._lastSeen = lastSeen;
  }
  /**
   * Set the conneciton status for the device.
   * @param {string} status the connection status.
   */


  setConnectionStatus(status) {
    this._connectionStatus = status;
  }
  /**
   * Create a new IoTDevice from its JSON representation.
   * @param {{usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: number, timeLastSeen: number, timeDiscovered: number, connectionStatus: string }} json the JSON representation. 
   * @returns {IoTDevice|null} the IoTDevice or null if the json record was bad.
   */


  static fromJson(json) {
    if (json == null) {
      return null;
    }

    const {
      usn,
      ssdpDescriptionLocation,
      ipAddress,
      services,
      configuredAsChild,
      timeLastSeen,
      timeDiscovered,
      connectionStatus
    } = json;
    return new IoTDevice(usn, ssdpDescriptionLocation, ipAddress, JSON.parse(services), configuredAsChild === 1, timeLastSeen, timeDiscovered, connectionStatus);
  }
  /**
   * Convert the IoTDevice to its JSON representation.
   * @returns {{usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: boolean, timeLastSeen: number, timeDiscovered: number, connectionStatus: string }} the JSON representation.
   */


  toJson() {
    return {
      usn: this._usn,
      ssdpDescriptionLocation: this._descriptionLocation,
      ipAddress: this._address,
      services: JSON.stringify(this._services),
      configuredAsChild: this._configuredChild,
      timeLastSeen: this._lastSeen,
      timeDiscovered: this._discovered,
      connectionStatus: this._connectionStatus
    };
  }
  /**
   * Convert the IoTDevice to a String.
   * @returns {String} the String representation of an IoTDevice.
   */


  toString() {
    return `IoTDevice: { USN: ${this._usn}, Description: ${this._descriptionLocation}, Address: ${this._address}, Services: ${this._services}, ConfiguredAsChild: ${this._configuredChild}, LastSeen: ${this._lastSeen}, Discovered: ${this._discovered}, Connection Status: ${this._connectionStatus} }`;
  }

}

_defineProperty(IoTDevice, "Connected", "connected");

_defineProperty(IoTDevice, "Disconnected", "disconnected");

_defineProperty(IoTDevice, "Reconnecting", "reconnecting");

var _default = IoTDevice;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kZXZpY2UvSW9URGV2aWNlLmpzIl0sIm5hbWVzIjpbIklvVERldmljZSIsImNvbnN0cnVjdG9yIiwidXNuIiwiZGVzY3JpcHRpb25Mb2NhdGlvbiIsImFkZHJlc3MiLCJzZXJ2aWNlcyIsImNvbmZpZ3VyZWRDaGlsZCIsImxhc3RTZWVuIiwiZGlzY292ZXJlZCIsImNvbm5lY3Rpb25TdGF0dXMiLCJfdXNuIiwiX2Rlc2NyaXB0aW9uTG9jYXRpb24iLCJfYWRkcmVzcyIsIl9zZXJ2aWNlcyIsIl9jb25maWd1cmVkQ2hpbGQiLCJfbGFzdFNlZW4iLCJfZGlzY292ZXJlZCIsIl9jb25uZWN0aW9uU3RhdHVzIiwidG9Kc29uIiwiYmluZCIsInRvU3RyaW5nIiwiZ2V0QWRkcmVzcyIsImdldERpc2NvdmVyZWQiLCJnZXRMYXN0U2VlbiIsImdldFNlcnZpY2VzIiwiZ2V0U1NEUERlc2NyaXB0aW9uTG9jYXRpb24iLCJnZXRVU04iLCJpc0NvbmZpZ3VyZWRDaGlsZCIsImdldENvbm5lY3Rpb25TdGF0dXMiLCJzZXRDb25maWd1cmVkQXNDaGlsZCIsImNvbmZpZ3VyZWQiLCJzZXRMYXN0U2VlbiIsInNldENvbm5lY3Rpb25TdGF0dXMiLCJzdGF0dXMiLCJmcm9tSnNvbiIsImpzb24iLCJzc2RwRGVzY3JpcHRpb25Mb2NhdGlvbiIsImlwQWRkcmVzcyIsImNvbmZpZ3VyZWRBc0NoaWxkIiwidGltZUxhc3RTZWVuIiwidGltZURpc2NvdmVyZWQiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0EsTUFBTUEsU0FBTixDQUFnQjtBQU1kOzs7Ozs7Ozs7OztBQVdBQyxFQUFBQSxXQUFXLENBQUNDLEdBQUQsRUFDQ0MsbUJBREQsRUFFQ0MsT0FGRCxFQUdDQyxRQUhELEVBSUNDLGVBSkQsRUFLQ0MsUUFMRCxFQU1DQyxVQU5ELEVBT0NDLGdCQVBELEVBT21CO0FBQzVCLFNBQUtDLElBQUwsR0FBWVIsR0FB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QUt4QixTQU5kO0FBT0x5QixNQUFBQSxjQUFjLEVBQUUsS0FBS3hCLFdBUGhCO0FBUUxQLE1BQUFBLGdCQUFnQixFQUFFLEtBQUtRO0FBUmxCLEtBQVA7QUFVRDtBQUVEOzs7Ozs7QUFJQUcsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsV0FBUSxxQkFBb0IsS0FBS1YsSUFBSyxrQkFBaUIsS0FBS0Msb0JBQXFCLGNBQWEsS0FBS0MsUUFBUyxlQUFjLEtBQUtDLFNBQVUsd0JBQXVCLEtBQUtDLGdCQUFpQixlQUFjLEtBQUtDLFNBQVUsaUJBQWdCLEtBQUtDLFdBQVksd0JBQXVCLEtBQUtDLGlCQUFrQixJQUFsUztBQUNEOztBQWhMYTs7Z0JBQVZqQixTLGVBRWUsVzs7Z0JBRmZBLFMsa0JBR2tCLGM7O2dCQUhsQkEsUyxrQkFJa0IsYzs7ZUErS1RBLFMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0B0cy1jaGVja1xuY2xhc3MgSW9URGV2aWNlIHtcbiAgXG4gIHN0YXRpYyBDb25uZWN0ZWQgPSBcImNvbm5lY3RlZFwiO1xuICBzdGF0aWMgRGlzY29ubmVjdGVkID0gXCJkaXNjb25uZWN0ZWRcIjtcbiAgc3RhdGljIFJlY29ubmVjdGluZyA9IFwicmVjb25uZWN0aW5nXCI7XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXNuIFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGVzY3JpcHRpb25Mb2NhdGlvbiBcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gc2VydmljZXMgXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gY29uZmlndXJlZENoaWxkIFxuICAgKiBAcGFyYW0ge251bWJlcn0gbGFzdFNlZW4gXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkaXNjb3ZlcmVkIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29ubmVjdGlvblN0YXR1cyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHVzbiwgXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uTG9jYXRpb24sIFxuICAgICAgICAgICAgICBhZGRyZXNzLCBcbiAgICAgICAgICAgICAgc2VydmljZXMsIFxuICAgICAgICAgICAgICBjb25maWd1cmVkQ2hpbGQsIFxuICAgICAgICAgICAgICBsYXN0U2VlbiwgXG4gICAgICAgICAgICAgIGRpc2NvdmVyZWQsIFxuICAgICAgICAgICAgICBjb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgdGhpcy5fdXNuID0gdXNuO1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uTG9jYXRpb24gPSBkZXNjcmlwdGlvbkxvY2F0aW9uO1xuICAgIHRoaXMuX2FkZHJlc3MgPSBhZGRyZXNzO1xuICAgIHRoaXMuX3NlcnZpY2VzID0gc2VydmljZXM7XG4gICAgdGhpcy5fY29uZmlndXJlZENoaWxkID0gY29uZmlndXJlZENoaWxkO1xuICAgIHRoaXMuX2xhc3RTZWVuID0gbGFzdFNlZW47XG4gICAgdGhpcy5fZGlzY292ZXJlZCA9IGRpc2NvdmVyZWQ7XG4gICAgdGhpcy5fY29ubmVjdGlvblN0YXR1cyA9IGNvbm5lY3Rpb25TdGF0dXM7XG5cbiAgICAvLyBiaW5kaW5nXG4gICAgdGhpcy50b0pzb24gPSB0aGlzLnRvSnNvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG9TdHJpbmcgPSB0aGlzLnRvU3RyaW5nLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBJUCBBZGRyZXNzIG9mIHRoZSBJb1REZXZpY2UuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBJUCBBZGRyZXNzIG9mIHRoZSBJb1REZXZpY2UuXG4gICAqL1xuICBnZXRBZGRyZXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9hZGRyZXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB3aGVuIHRoZSBJb1REZXZpY2Ugd2FzIGRpc2NvdmVyZWQuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSB0aW1lIHdoZW4gdGhlIElvVERldmljZSB3YXMgXG4gICAqIGRpc2NvdmVyZWQgaW4gbWlsbGlzZWNvbmRzLiBcbiAgICovXG4gIGdldERpc2NvdmVyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2NvdmVyZWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHdoZW4gdGhlIElvVERldmljZSB3YXMgbGFzdCBzZWVuLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgdGltZSB3aGVuIHRoZSBJb1REZXZpY2Ugd2FzXG4gICAqIGxhc3Qgc2VlbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqL1xuICBnZXRMYXN0U2VlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzdFNlZW47XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgbGlzdCBvZiBzZXJ2aWNlcyB0aGF0IHRoaXMgSW9URGV2aWNlIHByb3ZpZGVzLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gYSBsaXN0IG9mIHNlcnZpY2VzIHRoYXQgdGhpcyBJb1REZXZpY2UgcHJvdmlkZXMuXG4gICAqL1xuICBnZXRTZXJ2aWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VydmljZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBTU0RQIGRlc2NyaXB0aW9uIGxvY2F0aW9uLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgdXJsIHRvIHRoZSBTU0RQIGRlc2NyaXB0aW9uIHhtbC5cbiAgICovXG4gIGdldFNTRFBEZXNjcmlwdGlvbkxvY2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbkxvY2F0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgSW9URGV2aWNlJ3MgVVNOLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgSW9URGV2aWNlJ3MgVVNOLlxuICAgKi9cbiAgZ2V0VVNOKCkge1xuICAgIHJldHVybiB0aGlzLl91c247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHdoZXRoZXIgb3Igbm90IHRoaXMgSW9URGV2aWNlIGlzIGNvbmZpZ3VyZWQgYXMgYSBjaGlsZFxuICAgKiB0byB0aGlzIEh1Yi5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBjb25maWd1cmF0aW9uIHN0YXR1cy5cbiAgICovXG4gIGlzQ29uZmlndXJlZENoaWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWd1cmVkQ2hpbGQ7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIGNvbm5lY3Rpb24gc3RhdHVzIG9mIHRoZSBkZXZpY2UgdG8gdGhpcyBIdWIuXG4gICAqL1xuICBnZXRDb25uZWN0aW9uU3RhdHVzKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0aW9uU3RhdHVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB3aGV0aGVyIG9yIG5vdCB0aGUgSW9URGV2aWNlIGhhcyBiZWVuIGNvbmZpZ3VyZWQgYnkgdGhpc1xuICAgKiBIdWIgYWthIFwicGFyZW50XCIuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gY29uZmlndXJlZCB0aGUgY29uZmlndXJlZCB2YWx1ZS5cbiAgICovXG4gIHNldENvbmZpZ3VyZWRBc0NoaWxkKGNvbmZpZ3VyZWQpIHtcbiAgICB0aGlzLl9jb25maWd1cmVkQ2hpbGQgPSBjb25maWd1cmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB3aGVuIHRoaXMgSW9URGV2aWNlIHdhcyBsYXN0IHNlZW4gaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGFzdFNlZW4gdGhlIHRpbWUgd2hlbiB0aGlzIElvVERldmljZSB3YXMgbGFzdFxuICAgKiBzZWVuIGluIG1pbGxpc2Vjb25kcy5cbiAgICovXG4gIHNldExhc3RTZWVuKGxhc3RTZWVuKSB7XG4gICAgdGhpcy5fbGFzdFNlZW4gPSBsYXN0U2VlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbm5lY2l0b24gc3RhdHVzIGZvciB0aGUgZGV2aWNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdHVzIHRoZSBjb25uZWN0aW9uIHN0YXR1cy5cbiAgICovXG4gIHNldENvbm5lY3Rpb25TdGF0dXMoc3RhdHVzKSB7XG4gICAgdGhpcy5fY29ubmVjdGlvblN0YXR1cyA9IHN0YXR1cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgSW9URGV2aWNlIGZyb20gaXRzIEpTT04gcmVwcmVzZW50YXRpb24uXG4gICAqIEBwYXJhbSB7e3Vzbjogc3RyaW5nLCBzc2RwRGVzY3JpcHRpb25Mb2NhdGlvbjogc3RyaW5nLCBpcEFkZHJlc3M6IHN0cmluZywgc2VydmljZXM6IHN0cmluZywgY29uZmlndXJlZEFzQ2hpbGQ6IG51bWJlciwgdGltZUxhc3RTZWVuOiBudW1iZXIsIHRpbWVEaXNjb3ZlcmVkOiBudW1iZXIsIGNvbm5lY3Rpb25TdGF0dXM6IHN0cmluZyB9fSBqc29uIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uLiBcbiAgICogQHJldHVybnMge0lvVERldmljZXxudWxsfSB0aGUgSW9URGV2aWNlIG9yIG51bGwgaWYgdGhlIGpzb24gcmVjb3JkIHdhcyBiYWQuXG4gICAqL1xuICBzdGF0aWMgZnJvbUpzb24oanNvbikge1xuICAgIGlmIChqc29uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICB1c24sXG4gICAgICBzc2RwRGVzY3JpcHRpb25Mb2NhdGlvbixcbiAgICAgIGlwQWRkcmVzcyxcbiAgICAgIHNlcnZpY2VzLFxuICAgICAgY29uZmlndXJlZEFzQ2hpbGQsXG4gICAgICB0aW1lTGFzdFNlZW4sIFxuICAgICAgdGltZURpc2NvdmVyZWQsXG4gICAgICBjb25uZWN0aW9uU3RhdHVzXG4gICAgfSA9IGpzb247XG4gICAgcmV0dXJuIG5ldyBJb1REZXZpY2UodXNuLCBzc2RwRGVzY3JpcHRpb25Mb2NhdGlvbiwgaXBBZGRyZXNzLCBKU09OLnBhcnNlKHNlcnZpY2VzKSwgY29uZmlndXJlZEFzQ2hpbGQgPT09IDEsIHRpbWVMYXN0U2VlbiwgdGltZURpc2NvdmVyZWQsIGNvbm5lY3Rpb25TdGF0dXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgdGhlIElvVERldmljZSB0byBpdHMgSlNPTiByZXByZXNlbnRhdGlvbi5cbiAgICogQHJldHVybnMge3t1c246IHN0cmluZywgc3NkcERlc2NyaXB0aW9uTG9jYXRpb246IHN0cmluZywgaXBBZGRyZXNzOiBzdHJpbmcsIHNlcnZpY2VzOiBzdHJpbmcsIGNvbmZpZ3VyZWRBc0NoaWxkOiBib29sZWFuLCB0aW1lTGFzdFNlZW46IG51bWJlciwgdGltZURpc2NvdmVyZWQ6IG51bWJlciwgY29ubmVjdGlvblN0YXR1czogc3RyaW5nIH19IHRoZSBKU09OIHJlcHJlc2VudGF0aW9uLlxuICAgKi9cbiAgdG9Kc29uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c246IHRoaXMuX3VzbixcbiAgICAgIHNzZHBEZXNjcmlwdGlvbkxvY2F0aW9uOiB0aGlzLl9kZXNjcmlwdGlvbkxvY2F0aW9uLFxuICAgICAgaXBBZGRyZXNzOiB0aGlzLl9hZGRyZXNzLFxuICAgICAgc2VydmljZXM6IEpTT04uc3RyaW5naWZ5KHRoaXMuX3NlcnZpY2VzKSxcbiAgICAgIGNvbmZpZ3VyZWRBc0NoaWxkOiB0aGlzLl9jb25maWd1cmVkQ2hpbGQsXG4gICAgICB0aW1lTGFzdFNlZW46IHRoaXMuX2xhc3RTZWVuLFxuICAgICAgdGltZURpc2NvdmVyZWQ6IHRoaXMuX2Rpc2NvdmVyZWQsXG4gICAgICBjb25uZWN0aW9uU3RhdHVzOiB0aGlzLl9jb25uZWN0aW9uU3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoZSBJb1REZXZpY2UgdG8gYSBTdHJpbmcuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYW4gSW9URGV2aWNlLlxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBJb1REZXZpY2U6IHsgVVNOOiAke3RoaXMuX3Vzbn0sIERlc2NyaXB0aW9uOiAke3RoaXMuX2Rlc2NyaXB0aW9uTG9jYXRpb259LCBBZGRyZXNzOiAke3RoaXMuX2FkZHJlc3N9LCBTZXJ2aWNlczogJHt0aGlzLl9zZXJ2aWNlc30sIENvbmZpZ3VyZWRBc0NoaWxkOiAke3RoaXMuX2NvbmZpZ3VyZWRDaGlsZH0sIExhc3RTZWVuOiAke3RoaXMuX2xhc3RTZWVufSwgRGlzY292ZXJlZDogJHt0aGlzLl9kaXNjb3ZlcmVkfSwgQ29ubmVjdGlvbiBTdGF0dXM6ICR7dGhpcy5fY29ubmVjdGlvblN0YXR1c30gfWA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW9URGV2aWNlOyJdLCJmaWxlIjoiY29tbW9uL2RldmljZS9Jb1REZXZpY2UuanMifQ==
