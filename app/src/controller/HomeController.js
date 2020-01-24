import DeviceMangager from "../manager/DeviceManager";

class HomeController {

  /**
   * Create a new HomeController.
   * @param {HomeView} homeView the HomeView.
   */
  constructor(homeView) {
    this._homeView = homeView;
    this._deviceManager = DeviceMangager.getInstance();

    this._handleNewDeviceToBeConfigured = this._handleNewDeviceToBeConfigured.bind(this);
    this._handleDeviceToBeConfiguredWentOffline = this._handleDeviceToBeConfiguredWentOffline.bind(this);
  }

  /**
   * Called when the HomeView is initialized.
   */
  viewInitialized() {
    this._loadHome();
    this._loadDevicesToBeSetup();
    this._loadExternalDevices();
    this._loadInternalDevices();

    // this._deviceMediator.listenForNewDeviceToBeConfigured(this._handleNewDeviceToBeConfigured);
    // this._deviceMediator.listenForDeviceToBeConfiguredWentOffline(this._handleDeviceToBeConfiguredWentOffline);
  }


  /**
   *
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }} device
   */
  _handleDeviceToBeConfiguredWentOffline = (device) => {
    this._homeView.removeDeviceToBeConfigured(device);
  }

  /**
   *
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }} device
   */
  _handleNewDeviceToBeConfigured = (device) => {
    this._homeView.showNewDeviceToBeConfigured(device);
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
  _loadInternalDevices() {
    // TODO: implement
  }
}

export default HomeController;
