import request from "request";

class DevicesSetupController {

  /**
   * Create a new DevicesSetupController.
   * @param {DevicesSetupView} devicesSetupView the DevicesSetupView
   */
  constructor(devicesSetupView) {
    this._view = devicesSetupView;

    // binding
    this._handleDeviceWentOffline = this._handleDeviceOnline.bind(this);
    this._handleDeviceOnline = this._handleDeviceOnline.bind(this);
    this._loadDevicesToBeSetup = this._loadDevicesToBeSetup.bind(this);

  }

  viewInitialized() {
    this._loadDevicesToBeSetup();
    // listen for devices that need to be configured
    // this._deviceMediator.listenForNewDeviceToBeConfigured(this._handleDeviceOnline);
    // listen for devices to be configured that go offline
    // this._deviceMediator.listenForDeviceToBeConfiguredWentOffline(this._handleDeviceOnline);
  }

  /**
   * Handle when a device that needs to be configured goes offline.
   * @param {{ _id: string, ssid: string, timeDiscovered: string, timeLastSeen: string }} device the device.
   */
  _handleDeviceWentOffline(device) {
    this._view.removeDeviceToBeConfigured(device);
  }

  /**
   * Handle a new device that needs to be configured.
   * @param {{ _id: string, ssid: string, timeDiscovered: string, timeLastSeen: string }} device the device.
   */
  _handleDeviceOnline(device) {
    this._view.newDeviceToBeConfigured(device);
  }

  _loadDevicesToBeSetup() {
    const hostname = "127.0.0.1";
    const port = 30027;
    request(`http://${hostname}:${port}/device/configurable`, (err, response, body) => {
      if (err) {
        alert(err);
        return;
      }
      const devices = JSON.parse(body);
      this._view.showDevicesToBeConfigured(devices);
    });
  }
}

export default DevicesSetupController;
