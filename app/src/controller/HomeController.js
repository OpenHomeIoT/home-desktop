import getDeviceManagerInstance from "../manager/DeviceManager";

class HomeController {

  /**
   * Create a new HomeController.
   * @param {HomeView} homeView the HomeView.
   */
  constructor(homeView) {
    this._homeView = homeView;
    this._deviceManager = getDeviceManagerInstance();
  }

  /**
   * Called when the HomeView is initialized.
   */
  viewInitialized() {
    this._loadHome();
    this._loadExternalDevices();
    this._loadOpenHomeIoTDevices();
  }

  /**
   * Load the home and show it on the view.
   */
  _loadHome() {
    // TODO: implement
  }

  /**
   * Load the devices that need to be configured to connect to the Hub.
   */
  _loadDevicesToBeSetup() {
    // this._deviceManager.getAllToBeConfigured()
    // .then(toBeConfigured => this._homeView.showDevicesToBeConfigured(toBeConfigured))
    // .catch(err => alert(err));
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
  _loadOpenHomeIoTDevices() {
    this._deviceManager.getAllOpenHomeIoTDevices()
    .then(iotDevices => this._homeView.showAllOpenHomeIoTDevices(iotDevices));
  }
}

export default HomeController;
