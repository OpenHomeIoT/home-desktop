import { jsonGet } from "../http/client";

let instance = null;
/**
 * Get the ServiceManager instance.
 * @returns {ServiceManager}
 */
const getServiceManagerInstance = () => {
  if (instance == null) instance = new ServiceManager();
  return instance;
};

// TODO: implement caching
class ServiceManager {

  /**
   * Get all of the services.
   * @returns {Promise<object[]>}
   */
  getAllServices() {
    return jsonGet("/service");
  }

  /**
   * Get a service by it's id.
   * @param {string} id the id of the service.
   */
  getService(id) {
    return jsonGet(`/service/${id}`);
  }
}

export default getServiceManagerInstance;
export { ServiceManager };
