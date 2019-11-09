import WebsocketServer from "../../bin/WebsocketServer";

class MockWebsocketServer extends WebsocketServer {

  static _instance = null;

  /**
   * @returns {MockWebsocketServer} the instance.
   */
  static getInstance() {
    if (MockWebsocketServer._instance === null) {
      MockWebsocketServer._instance = new MockWebsocketServer();
    }
    return MockWebsocketServer._instance;
  }

  constructor() {
    super(MockDeviceManager.getInstance(), MockDeviceStatusManager.getInstance());
  }

}

export default MockWebsocketServer;
