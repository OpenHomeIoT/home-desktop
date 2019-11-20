import SsdpManager from "../../../bin/manager/SsdpManager";
import MockDeviceManager from "./MockDeviceManager";
import MockDeviceStatusManager from "./MockDeviceStatusManager";
import MockWebsocketServer from "../MockWebsocketServer";

class MockSsdpManager extends SsdpManager {
  
  /**
   * 
   * @param {MockDeviceManager} mockDeviceManager 
   * @param {MockDeviceStatusManager} mockDeviceStatusManager 
   * @param {MockWebsocketServer} mockWebsocketServer 
   */
  constructor(mockDeviceManager, mockDeviceStatusManager, mockWebsocketServer) {
    super(mockDeviceManager, mockDeviceStatusManager, mockWebsocketServer);
  }

}

export default MockSsdpManager;
