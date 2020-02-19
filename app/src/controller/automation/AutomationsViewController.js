import getAutomationsManagerInstance from "../../manager/AutomationsManager";

class AutomationsViewController {

  /**
   * AutomationsViewController.
   * @param {AutomationsView} the view
   */
  constructor(automationsView) {
    this._automationsView = automationsView;
    this._automationsManager = getAutomationsManagerInstance();

    // bind
    this.initView = this.initView.bind(this);
  }

  /**
   * Initialize the view.
   */
  initView() {
    this._automationsManager.getAll()
    .then(automations => this._automationsView.showAutomations(automations))
    .catch(err => this._automationsView.showError(err));
  }
}

export default AutomationsViewController;
