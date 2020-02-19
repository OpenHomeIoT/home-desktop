import getServiceManagerInstance from "../../manager/ServiceManager";
import getAutomationsManagerInstance from "../../manager/AutomationsManager";

class CreateAutomationsViewController {

  /**
   * CreateAutomationsViewController.
   * @param {CreateAutomationsView} createAutomationsView the CreateAutomationsView
   */
  constructor(createAutomationsView) {
    this._view = createAutomationsView;
    this._automationsManager = getAutomationsManagerInstance();
    this._serviceManager = getServiceManagerInstance();

    // binding
    this.initView = this.initView.bind(this);
    this._loadServices = this._loadServices.bind(this);
  }

  /**
   * Initialize the view.
   */
  initView() {
    this._loadServices();
  }

  /**
   * Load the servies.
   */
  _loadServices() {
    // TODO: only show services that have triggers
    this._serviceManager.getAllServices()
    .then(services => services.filter(service => service.enabled))
    .then(services => this._view.showServices(services))
    .catch(err => this._view.showError(err));
  }
}

export default CreateAutomationsViewController;
