import SsdpManager from "../../../bin/manager/SsdpManager";
import MockDeviceManager from "./MockDeviceManager";
import MockDeviceStatusManager from "./MockDeviceStatusManager";
import MockWebsocketServer from "../MockWebsocketServer";

class MockSsdpManager extends SsdpManager {

  static _instance = null;

  /**
   * @returns {MockSsdpManager} the instance.
   */
  static getInstance() {
    if (MockSsdpManager._instance === null) {
      MockSsdpManager._instance = new MockSsdpManager();
    }
    return MockSsdpManager._instance;
  }

  constructor() {
    super(MockDeviceManager.getInstance(), MockDeviceStatusManager.getInstance(), MockWebsocketServer.getInstance());
  }

}

export default MockSsdpManager;
