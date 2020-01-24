//@ts-check
class IoTDevice {
  
  static Connected = "connected";
  static Disconnected = "disconnected";
  static Reconnecting = "reconnecting";

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
  constructor(usn, 
              descriptionLocation, 
              address, 
              services, 
              configuredChild, 
              lastSeen, 
              discovered, 
              connectionStatus) {
    this._usn = usn;
    this._descriptionLocation = descriptionLocation;
    this._address = address;
    this._services = services;
    this._configuredChild = configuredChild;
    this._lastSeen = lastSeen;
    this._discovered = discovered;
    this._connectionStatus = connectionStatus;

    // binding
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
   * @param {{_id: string, usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: number, timeLastSeen: number, timeDiscovered: number, connectionStatus: string }} json the JSON representation. 
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
   * @returns {{ _id: string, usn: string, ssdpDescriptionLocation: string, ipAddress: string, services: string, configuredAsChild: boolean, timeLastSeen: number, timeDiscovered: number, connectionStatus: string }} the JSON representation.
   */
  toJson() {
    return {
      _id: this._usn,
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

export default IoTDevice;
