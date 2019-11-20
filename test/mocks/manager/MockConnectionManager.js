import ConnectionManager from "../../../bin/manager/ConnectionManager";
import MockConnectionBufferDatabase from "../db/MockConnectionBufferDatabase";
import MockDeviceManager from "./MockDeviceManager";

class MockConnectionManager extends ConnectionManager {

  /**
   * 
   * @param {MockConnectionBufferDatabase} mockConnectionBufferDatabase 
   * @param {MockDeviceManager} mockDeviceManager 
   */
  constructor(mockConnectionBufferDatabase, mockDeviceManager) {
    super(mockConnectionBufferDatabase, mockDeviceManager);
  }

}

export default MockConnectionManager;
