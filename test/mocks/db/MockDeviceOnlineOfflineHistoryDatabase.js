import DeviceOnlineOfflineHistoryDatabase from "../../../bin/db/DeviceOnlineOfflineHistoryDatabase";

class MockDeviceOnlineOfflineHistoryDatabase extends DeviceOnlineOfflineHistoryDatabase {

  static _instance = null;

  /**
   * @returns {MockDeviceOnlineOfflineHistoryDatabase} the instance.
   */
  static getInstance() {
    if (MockDeviceOnlineOfflineHistoryDatabase._instance === null) {
      MockDeviceOnlineOfflineHistoryDatabase._instance = new MockDeviceOnlineOfflineHistoryDatabase();
    }
    return MockDeviceOnlineOfflineHistoryDatabase._instance;
  }

  constructor() {
    super({ isTest: true, isLedger: true });
  }

}

export default MockDeviceOnlineOfflineHistoryDatabase;
