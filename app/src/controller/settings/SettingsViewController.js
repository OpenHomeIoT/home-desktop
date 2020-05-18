import getSettingsManagerInstance from "../../manager/SettingsManager";

// controller for the SettingsView
class SettingsViewController {

  /**
   * SettingsViewController.
   * @param {SettingsView} settingsView the SettingsView.
   */
  constructor(settingsView) {
    this._settingsView = settingsView;
    this._settingsManager = getSettingsManagerInstance();

    // binding
    this.initView = this.initView.bind(this);
  }

  /**
   * Initialize the view.
   * @param {string} id the id of the service.
   */
  initView(id) {
    this._settingsManager.getSettings()
    .then(settings => this._settingsView.showSettings(settings))
    .catch(err => this._settingsView.showError(err));
  }
}

export default SettingsViewController;
