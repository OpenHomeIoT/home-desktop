import getServiceManagerInstance from "../../manager/ServiceManager";

class ServicesViewController {

  /**
   * ServicesViewController.
   * @param {ServicesView} the ServicesView.
   */
  constructor(servicesView) {
    this._servicesView = servicesView;
    this._serviceManager = getServiceManagerInstance();
  }

  /**
   * Initialize the ServicesView.
   */
  initView() {
    this._serviceManager.getAllServices()
    .then(services => this._servicesView.showAllServices(services));
  }
}

export default ServicesViewController;
