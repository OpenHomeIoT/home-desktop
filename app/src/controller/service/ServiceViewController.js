import getServiceManagerInstance from "../../manager/ServiceManager";

// controller for the ServiceView
class ServiceViewController {

  /**
   * ServiceViewController.
   * @param {ServiceView} serviceView the ServiceView.
   */
  constructor(serviceView) {
    this._serviceView = serviceView;
    this._serviceManager = getServiceManagerInstance();

    // binding
    this.initView = this.initView.bind(this);
  }

  /**
   * Initialize the view.
   * @param {string} id the id of the service.
   */
  initView(id) {
    this._serviceManager.getService(id)
    .then(service => this._serviceView.showService(service))
    .catch(err => this._serviceView.showError(err));
  }
}

export default ServiceViewController;
