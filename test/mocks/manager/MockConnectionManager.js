import ConnectionManager from "../../../bin/manager/ConnectionManager";
import MockConnectionBufferDatabase from "../db/MockConnectionBufferDatabase";
import MockDeviceManager from "./MockDeviceManager";

class MockConnectionManager extends ConnectionManager {

  static _instance = null;

  /**
   * @returns {MockConnectionManager} the instance.
   */
  static getInstance() {
    if (MockConnectionManager._instance === null) {
      MockConnectionManager._instance = new MockConnectionManager();
    }
    return MockConnectionManager._instance;
  }

  constructor() {
    super(MockConnectionBufferDatabase.getInstance(), MockDeviceManager.getInstance());
  }

}

export default MockConnectionManager;
