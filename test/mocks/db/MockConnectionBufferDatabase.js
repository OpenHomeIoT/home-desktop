import ConnectionBufferDatabase from "../../../bin/db/ConnectionBufferDatabase";

class MockConnectionBufferDatabase extends ConnectionBufferDatabase {

  static _instance = null;

  /**
   * @returns {MockConnectionBufferDatabase} the instance.
   */
  static getInstance() {
    if (MockConnectionBufferDatabase._instance === null) {
      MockConnectionBufferDatabase._instance = new MockConnectionBufferDatabase();
    }
    return MockConnectionBufferDatabase._instance;
  }

  constructor() {
    super({ isTest: true })
  }

}

export default MockConnectionBufferDatabase;