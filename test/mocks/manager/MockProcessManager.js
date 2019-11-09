import ProcessManager from "../../../bin/manager/ProcessManager";

class MockProcessManager extends ProcessManager {

  static _instance = null;

  /**
   * @returns {MockProcessManager} the instance.
   */
  static getInstance() {
    if (MockProcessManager._instance === null) {
      MockProcessManager._instance = new MockProcessManager();
    }
    return MockProcessManager._instance;
  }

  constructor() {
    super();
  }

}

export default MockProcessManager;
