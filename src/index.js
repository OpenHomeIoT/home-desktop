//@ts-check
import express from "express";
import helmet from "helmet";
import http from "http";

import CosnsoleManager from "./manager/ConsoleManager";
import SsdpManager from "./manager/SsdpManager";
import WebsocketServer from "./manager/WebsocketServer";

import DeviceLedgerDatabase from "./db/DeviceLedgerDatabase";
import DeviceOnlineHistoryDatabase from "./db/DeviceOnlineHistoryDatabase";
import ReconnectionBufferDatabase from "./db/ReconnectionBufferDatabase";
import ServiceLedgerDatabase from "./db/ServiceLedgerDatabase";
import ServiceVersionLedgerDatabase from "./db/ServiceVersionLedgerDatabase";

const ADDRESS = "10.1.1.3";
const PORT = 30021;

/**
 * Initialize the databases.
 * @returns {Promise<void>}
 */
function initializeDatabases() {
  return Promise.resolve()
  .then(() => DeviceLedgerDatabase.getInstance().open())
  .then(() => DeviceOnlineHistoryDatabase.getInstance().open())
  .then(() => ReconnectionBufferDatabase.getInstance().open())
  .then(() => ServiceLedgerDatabase.getInstance().open())
  .then(() => ServiceVersionLedgerDatabase.getInstance().open());
}

/**
 * Initialize the SsdpManager.
 * @returns {SsdpManager}
 */
function initializeSsdpManager() {
  const ssdpManager = SsdpManager.getInstance();
  ssdpManager.setHost(ADDRESS);
  ssdpManager.setPort(PORT);
  ssdpManager.startListening();
  return ssdpManager;
}

/**
 * Initialize the web server.
 * @returns {http.Server} 
 */
function initializeWebServer() {
  const app = express();
  app.use(helmet());
  return http.createServer(app);
}

(async () => {
  // Initialize the databases.

  try {
    await initializeDatabases();
  } catch (err) {
    console.error(`[Hub] Error opening databases: ${JSON.stringify(err)}`)
  }

  const httpServer = initializeWebServer();
  initializeSsdpManager();
  
  // setup the websocket server.
  const wsserver = WebsocketServer.getInstance();
  wsserver.setup(httpServer, { port: PORT, pingInterval: 15000 });
  
  // =================================================================== Main ===========================================
  // start server
  httpServer.listen(PORT, ADDRESS, async () => {    
    console.log(`[Hub] Hub listening on port ${PORT}`);
    
    // open up the console.
    CosnsoleManager.getInstance().initialize();
  });
})();


