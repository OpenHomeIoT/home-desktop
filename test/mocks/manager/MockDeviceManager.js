import DeviceManager from "../../../bin/manager/DeviceManager";
import MockDeviceDatabase from "../db/MockDeviceDatabase";

class MockDeviceManager extends DeviceManager {

  static _instance = null;

  /**
   * @returns {MockDeviceManager} the instance.
   */
  static getInstance() {
    if (MockDeviceManager._instance === null) {
      MockDeviceManager._instance = new MockDeviceManager();
    }
    return MockDeviceManager._instance;
  }

  constructor() {
    super(MockDeviceDatabase.getInstance());
  }

}

export default MockDeviceManager;
