import { jsonGet } from "../http/client";
import Cache from "./cache/Cache";

let instance = null;
/**
 * Get the ServiceManager instance.
 * @returns {ServiceManager}
 */
const getServiceManagerInstance = () => {
  if (instance == null) instance = new ServiceManager();
  return instance;
};

class ServiceManager {

  constructor() {
    this._cache = new Cache("services");
  }

  /**
   * Get all of the services.
   * @returns {Promise<object[]>}
   */
  getAllServices() {
    return this._cache.getAll()
    .then(cachedServices => {
      if (cachedServices.length === 0) return this._loadAllServices();
      this._loadAllServices();
      return cachedServices;
    });
  }

  /**
   * Get a service by it's id.
   * @param {string} id the id of the service.
   * @returns {Promise<any>} // TODO: type signature
   */
  getService(id) {
    return this._cache.exists(id)
    .then(exists => (exists) ? this._cache.get(id) : this._loadService(id));
  }

  /**
   * Load and cache all services.
   * @returns {Promise<any[]>} // TODO: type signature
   */
  _loadAllServices() {
    return jsonGet("/service")
    .then(services => {
      if (services) {
        services.forEach(service => this._cache.insert(service));
      }
      return services;
    });
  }

  /**
   * Load and cache a service.
   * @param {string} id the id of the service.
   * @returns {Promise<any>} // TODO: type signature
   */
  _loadService(id) {
    return jsonGet(`/service/${id}`)
    .then(service => {
      this._cache.insert(service);
      return service;
    });
  }
}

export default getServiceManagerInstance;
export { ServiceManager };
