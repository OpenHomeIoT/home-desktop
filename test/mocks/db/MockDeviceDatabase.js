import DeviceDatabase from "../../../bin/db/DeviceDatabase";

class MockDeviceDatabase extends DeviceDatabase {

  static _instance = null;

  /**
   * @returns {MockDeviceDatabase} the instance.
   */
  static getInstance() {
    if (MockDeviceDatabase._instance === null) {
      MockDeviceDatabase._instance = new MockDeviceDatabase();
    }
    return MockDeviceDatabase._instance;
  }

  constructor() {
    super({ isTest: true });
  }
}

export default MockDeviceDatabase;
