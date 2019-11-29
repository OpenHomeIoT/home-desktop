import DeviceManager from "../../../bin/manager/DeviceManager";
import MockDeviceDatabase from "../db/MockDeviceDatabase";

class MockDeviceManager extends DeviceManager {

  /**
   * 
   * @param {MockDeviceDatabase} mockDeviceDatabase 
   */
  constructor(mockDeviceDatabase) {
    super(mockDeviceDatabase);
  }

}

export default MockDeviceManager;
