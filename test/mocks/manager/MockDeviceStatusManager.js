import DeviceStatusManager from "../../../bin/manager/DeviceStatusManager";
import MockConnectionBufferDatabase from "../db/MockConnectionBufferDatabase";
import MockDeviceOnlineOfflineHistoryDatabase from "../db/MockDeviceOnlineOfflineHistoryDatabase";
import MockDeviceManager from "./MockDeviceManager";

class MockDeviceStatusManager extends DeviceStatusManager {

  /**
   * 
   * @param {MockDeviceOnlineOfflineHistoryDatabase} mockDeviceOnlineOfflineHistoryDatabase 
   * @param {MockConnectionBufferDatabase} mockConnectionBufferDatabase 
   * @param {MockDeviceManager} mockDeviceManager 
   */
  constructor(mockDeviceOnlineOfflineHistoryDatabase, mockConnectionBufferDatabase, mockDeviceManager) {
    super(mockDeviceOnlineOfflineHistoryDatabase, mockConnectionBufferDatabase, mockDeviceManager);
  }
}

export default MockDeviceStatusManager;
