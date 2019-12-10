
class HomeController {

  /**
   * Create a new HomeController.
   * @param {HomeView} homeView the HomeView.
   */
  constructor(homeView) {
    this._homeView = homeView;
  }

  /**
   * Called when the HomeView is initialized.
   */
  viewInitialized() {
    this._loadHome();
    this._loadExternalDevices();
    this._loadInternalDevices();
  }

  /**
   * Load the home and show it on the view.
   */
  _loadHome() {
    // TODO: implement
  }

  /**
   * Load the external devices (Roku, etc) and show them on the view.
   */
  _loadExternalDevices() {
    // TODO: implement
  }

  /**
   * Load the Open Source Home IoT devices and show them on the view.
   */
  _loadInternalDevices() {
    // TODO: implement
  }
}

export default HomeController;
