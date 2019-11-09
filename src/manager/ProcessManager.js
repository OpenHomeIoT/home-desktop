class ProcessManager {

  static _instance = null;

  /**
   * @returns {ProcessManager} the instance.
   */
  static getInstance() {
    if (ProcessManager._instance === null) {
      ProcessManager._instance = new ProcessManager();
    }
    return ProcessManager._instance;
  }

  constructor() {

  }

}

export default ProcessManager;
