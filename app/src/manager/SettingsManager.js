import { jsonGet, jsonPost } from "../http/client";

let instance = null;
/**
 * Get the SettingsManager instance.
 * @returns {SettingsManager}
 */
const getSettingsManagerInstance = () => {
  if (instance == null) instance = new SettingsManager();
  return instance;
};

class SettingsManager {

  constructor() {
    this._settings = null;

    this._loadAllSettings = this._loadAllSettings.bind(this);
  }

  /**
   * Get all of the settings.
   * @returns {Promise<object[]>}
   */
  getSettings() {
    if (!this._settings) {
      return this._loadAllSettings();
    }

    // TODO: implement proper caching
    this._loadAllSettings();
    return this._settings;
  }

  /**
   * Send the updated settings to the API for saving.
   * @param {object} settings the settings.
   * @returns {Promise<object>}
   */
  saveSettings(settings) {
    return jsonPost("/settings", settings);
  }

  /**
   * Load and cache all settings.
   * @returns {Promise<any[]>} // TODO: type signature
   */
  _loadAllSettings() {
    return jsonGet("/settings")
    .then(settings => {
      if (settings) {
        delete settings._id;
        delete settings.recordCreated;
        delete settings.recordUpdated;
        this._settings = settings;
      }
      return settings;
    });
  }
}

export default getSettingsManagerInstance;
export { SettingsManager };
