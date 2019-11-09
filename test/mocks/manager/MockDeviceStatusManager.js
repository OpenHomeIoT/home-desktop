import DeviceStatusManager from "../../../bin/manager/DeviceStatusManager";
import MockConnectionBufferDatabase from "../db/MockConnectionBufferDatabase";
import MockDeviceOnlineOfflineHistoryDatabase from "../db/MockDeviceOnlineOfflineHistoryDatabase";
import MockDeviceManager from "./MockDeviceManager";

class MockDeviceStatusManager extends DeviceStatusManager {

  static _instance = null;

  /**
   * @returns {MockDeviceStatusManager} the instance.
   */
  static getInstance() {
    if (MockDeviceStatusManager._instance === null) {
      MockDeviceStatusManager._instance = new MockDeviceStatusManager();
    }
    return MockDeviceStatusManager._instance;
  }

  constructor() {
    super(MockDeviceOnlineOfflineHistoryDatabase.getInstance(), MockConnectionBufferDatabase.getInstance(), MockDeviceManager.getInstance())
  }
}

export default MockDeviceStatusManager;
