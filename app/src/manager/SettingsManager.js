import { jsonGet } from "../http/client";
import Cache from "./cache/Cache";

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
    this._cache = new Cache("settings");
  }

  /**
   * Get all of the settings.
   * @returns {Promise<object[]>}
   */
  getSettings() {
    return this._cache.getAll()
    .then(cachedSettings => {
      if (!cachedSettings) {
        return this._loadAllSettings()
      }
      this._loadAllSettings();
      return cachedSettings;
    });
  }

  /**
   * Load and cache all settings.
   * @returns {Promise<any[]>} // TODO: type signature
   */
  _loadAllSettings() {
    return jsonGet("/settings")
    .then(settings => {
      if (settings) {
        this._cache.insert(settings);
      }
      return settings;
    });
  }

  /**
   * Load and cache a service.
   * @param {string} id the id of the service.
   * @returns {Promise<any>} // TODO: type signature
   */
  _loadService(id) {
    return jsonGet(`/settings/${id}`)
    .then(service => {
      this._cache.insert(service);
      return service;
    });
  }
}

export default getSettingsManagerInstance;
export { SettingsManager };
