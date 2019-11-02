// TODO:  services need to be able to create their own databases

/**
 * 
 * @param {*} socket the shared socket.
 * @param {string} id the id of the switch.
 * @param {string} status the power status. "on" or "off" are acceptable values
 */
const commandChangeSwitchPowerStatus = (socket, id, status) => {
  if (!(status === "on" || status === "off")) {
    console.log(`[SwitchService] Unknown power status "${status}"`);
    return;
  }

  socket.emit("switch/update", { switch: id, power: status });
};

/** // TODO: create a "Shared" socket for service extensions with lesser permissions.
 * Get a switch by its id.
 * @param {*} socket the shared socket.
 * @param {string} id the id (name) of the switch.
 */
const commandGetByID = (socket, id) => {
  console.log(`[SwitchService] Executing GetByID: ${id}`);
  // TODO: socket.emit("")
};

/**
 * Get all switch ids.
 * @param {*} socket the shared socket.
 */
const commandGetIDs = (socket) => {
  console.log(`[SwitchService] Executing ListIDs`);
  socket.emit("getAllIDs");
  // TODO: finish
};

// TODO: finish routes
const routeGetByID = (socket, data) => {};
const routeGetAllIDs = (socket, data) => {};
const routeUpdate = (socket, data) => {};

export default {
  name: "oshiot:service:switch",
  friendlyName: "Switch",
  version: "oshiot:service:switch:1-0",
  routePrefix: "switch",
  // TODO: define access points for control from phone app/google home/what not
  consoleCommands: [
    // commands 
    { command: ["switch", "get-ids"], handler: commandGetIDs },
    { command: ["switch", "get", "<id>"], handler: commandGetByID },
    { command: ["switch", "power", "<id>", "<power>"], handler: commandChangeSwitchPowerStatus }
  ],
  routes: [
    {
      path: "getAllIDs",
      handler: routeGetAllIDs
    },
    { 
      path: "getByID",
      handler: routeGetByID
    },
    {
      path: "update",
      handler: routeUpdate
    }
  ],

  /**
   * Called when the service is loaded and should initialize.
   * @param {{ socket: *, }} param0 object containing the databases
   */
  onInitializeService: ({ socket,}) => {

  }
};