import { jsonGet } from "../http/client";
import Cache from "./cache/Cache";

let instance = null;

/**
 * Get the AutomationsManager instance.
 * @returns {AutomationsManager}
 */
const getAutomationsManagerInstance = () => {
  if (instance == null) instance = new AutomationsManager();
  return instance;
};

class AutomationsManager {

  constructor() {
    this._cache = new Cache("Automations");
  }

  /**
   * Get all of the automations.
   * @returns {Promise<any[]>} // TODO: type signature
   */
  getAll() {
    return this._cache.count()
    .then(count => {
      if (count > 0) {
        this._loadAll();
        return this._cache.getAll();
      }
      return this._loadAll();
    })
  }

  /**
   * Load and cache all automations.
   */
  _loadAll() {
    return jsonGet("/automation")
    .then(automations => {
      if (automations) {
        automations.forEach(automation => this._cache.insert(automation));
      }
      return automations;
    });
  }
}

export default getAutomationsManagerInstance;
export { AutomationsManager };
