import WebsocketServer from "../../bin/WebsocketServer";

class MockWebsocketServer extends WebsocketServer {

  /**
   * 
   * @param {MockDeviceManager} mockDeviceManager 
   * @param {MockDeviceStatusManager} mockDeviceStatusManager 
   */
  constructor(mockDeviceManager, mockDeviceStatusManager) {
    super(mockDeviceManager, mockDeviceStatusManager);
  }
}

export default MockWebsocketServer;
