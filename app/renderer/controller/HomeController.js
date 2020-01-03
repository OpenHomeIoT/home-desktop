import request from "request";

class HomeController {

  /**
   * Create a new HomeController.
   * @param {HomeView} homeView the HomeView.
   */
  constructor(homeView) {
    this._homeView = homeView;

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
    const hostname = "127.0.0.1";
    const port = 30027;
    request(`http://${hostname}:${port}/device/internal/configurable`, (err, request, body) => {
      if (err) {
        // TODO: this._view.showError(err);
        alert(err);
        return;
      }
      alert(body);
      const devices = JSON.parse(body);
      this._homeView.showDevicesToBeConfigured(devices);
    });
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
