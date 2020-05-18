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
   */
  initView() {
    this._settingsManager.getSettings()
    .then(settings => this._settingsView.showSettings(settings))
    .catch(err => this._settingsView.showError(err));
  }

  /**
   * Save the settings.
   * @param {object} settings the settings.
   */
  saveSettings(settings) {
    this._settingsManager.saveSettings(settings);
  }
}

export default SettingsViewController;
