import DeviceManager from "./DeviceManager";

const serverline = require("serverline");

class ConsoleManager {

  static _instance = null;

  /**
   * @returns {ConsoleManager}
   */
  static getInstance() {
    if (ConsoleManager._instance === null) {
      ConsoleManager._instance = new ConsoleManager();
    }
    return ConsoleManager._instance;
  }

  constructor() {
    serverline.init();
    serverline.setCompletion(["exit", "help", "list", "restart", "hard-reset", "co-sensor", "co2-sensor", "light", "irblaster", "switch"]);

    this._deviceManager = DeviceManager.getInstance();

    // binding
    this.initialize = this.initialize.bind(this);

    this._handleInput = this._handleInput.bind(this);
    this._handleIRBlasterCommands = this._handleIRBlasterCommands.bind(this);
    this._handleSwitchCommands = this._handleSwitchCommands.bind(this);
    this._handleTerminalInput = this._handleInput.bind(this);
    this._listAllDevices = this._listAllDevices.bind(this);
    this._listAllDevicesOfServiceType = this._listAllDevicesOfServiceType.bind(this);
    this._listAllDeviceUSNsOfServiceType = this._listAllDeviceUSNsOfServiceType.bind(this);
  }

  /**
   * Initialize the ConsoleManager.
   */
  initialize() {
    serverline.getRL().question("> ", this._handleInput);
  }

  /**
   * Handle any input in the terminal.
   * @param {string} input the terminal input.
   */
  _handleInput(input) {
    const cmds = input.split(" ");

    switch (cmds[0]) {
      case "exit":
        process.exit();
        break;
      case "help":
        ConsoleManager._showHelp();
        break;
      case "list":
        this._listAllDevices();
        break;
      case "restart":

        break;
      case "hard-reset":
        
        break;
      case "switch":
        this._handleSwitchCommands(cmds);
        break;
      case "irblaster":
        // handleIRBlasterCommands(cmds);
        break;
      default:
        break;
    }

    serverline.getRL().question("> ", this._handleInput);
  }

  /**
   * Handle commands for IR blasters.
   * @param {Array<String>} cmds the commands.
   */
  _handleIRBlasterCommands(cmds) {
    let uuid;
    let cmd;
    switch (cmds.length) {
      case 1:
        listAllDevicesOfServiceType(ServiceDescription.IRBLASTER);
        break;
      case 2:
        // irblaster help
        // irblaster list
        // irblaster list-ids
        cmd = cmds[1];
        if (cmd === "help") {
          // TODO: show help for ir blasters
        } else if (cmd === "list") {
          listAllDevicesOfServiceType(ServiceDescription.IRBLASTER);
        } else if (cmd === "list-ids") {
          listAllDeviceIDsOfServiceType(ServiceDescription.IRBLASTER);
        }
      default:
        break;
    }
  }

  /**
   * Handle commands for Switches.
   * @param {Array<String>} cmds the commands. 
   */
  _handleSwitchCommands(cmds) {
    let uuid;
    let switchName;
    let cmd;
    let attribute;
    let value;
    switch (cmds.length) {
      case 1:
        listAllDevicesOfServiceType(ServiceDescription.SWITCH);
        break;
      case 2:
        // switch help
        // switch list-ids
        // switch list
        cmd = cmds[1];
        if (cmd === "help") {
          // TODO: show switch help
        } else if (cmd === "list-ids") {
          listAllDeviceIDsOfServiceType(ServiceDescription.SWITCH);
        } else if (cmd === "list") {
          listAllDevicesOfServiceType(ServiceDescription.SWITCH);
        }
        break;
      case 5:
        // swtich uuid:xxxxxxxxxxxxx switchname get power  <-- get the switch's power status
        switchName = cmds[2];
        cmd = cmds[3];
        attribute = cmds[4];

        break;
      case 6:
        // switch uuid:xxxxxxxxxxxxx switchname set power on <-- set the switch on
        uuid = cmds[1];
        switchName = cmds[2];
        cmd = cmds[3];
        attribute = cmds[4];
        value = cmds[5];

        // TODO: check values above
        const socket = wsserver.getSocketForDevice(uuid);
        console.log(socket);
        if (cmd === "set") {
          socket.emit("switch/set", { switch: switchName, [attribute]: value });
        }
        break;
      default:
        // TODO: figure out error.
        console.error("Bad command");
        break;
    }
  }

  /**
   * List all of the devices.
   * @returns {Promise<void>} a promise.
   */
  _listAllDevices() {
    return this._deviceManager.getAllDevices()
      .then(devices => devices.forEach(device => console.log(device.toString())));
  }

  /**
   * List all devices with a given service type.
   */
  _listAllDevicesOfServiceType(serviceType) {
    return this._deviceManager.getAllDevices()
      .then(iotDevices => {
          iotDevices.filter(iotDevice => iotDevice.getServices().indexOf(serviceType) !== -1).forEach(iotDevice => {
          console.log(iotDevice);
        })
      });
  }

  /**
   * List all device ids of a given service type.
   * @param {String} serviceType the type of service.
   */
  _listAllDeviceUSNsOfServiceType(serviceType) {
    return this._deviceManager.getAllDevices()
      .then(iotDevices => {
        iotDevices.filter(iotDevice => iotDevice.getServices().indexOf(serviceType) !== -1).forEach(iotDevice => {
          console.log(`USN: ${iotDevice.getUSN()} IP Address: ${iotDevice.getAddress()} Online: ${iotDevice.isOnline()}`);
        });
      });
  }

  /**
   * Display help.
   */
  static _showHelp() {
    console.log("Available Commands: ");
    console.log("  exit - Shut down the Hub. Quits the process.");
    console.log("  list - List all devices connected to the Hub.");
    console.log("  restart - Restarts a device given by a UUID.");
    console.log("  hard-reset - Hard reset a device given by a UUID.");
    console.log();
    console.log("Device Commands:");
    console.log("  dustsensor - Access commands related to Dust sensors.")
    console.log("  irblaster - Access commands related to IR Blasters.");
    console.log("  light - Access commands related to Lights.");
    console.log("  switch - Access commands related to Switches.");
  }
}

export default ConsoleManager;
