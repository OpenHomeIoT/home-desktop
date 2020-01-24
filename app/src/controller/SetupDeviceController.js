
class SetupDeviceController {

  /**
   * Create a new SetupDeviceController.
   * @param {SetupDeviceView} setupDeviceView the SetupDeviceView.
   */
  constructor(setupDeviceView) {
    this._view = setupDeviceView;
  }

  /**
   *
   * @param {string} deviceID the device ID.
   */
  viewInitialized(deviceID) {
    this._loadDeviceToSetup(deviceID);
    // 1. connect to the wifi network supplied to SetupDeviceView
    // 2. once connected, ask user for SSID & Passcode to their network
    // 3. send credentials securely (// TODO: implement the securely part) to the device.
    // 4. remote device respond with HTTP 200 if okay.
    // 5. remote device will shut down network.
    // 6. Hub should automatically connect (// TODO: verify this on all oses)
    // 7. Hub should wait for remote device to connect to Wifi.
    // 8. Hub should see the remote device's SSDP call.
    // 9. Hub should load the services of the device and store it in the database.
    // 10. Done

  }

  /**
   * Load the device from the database.
   * @param {string} deviceID the device ID.
   */
  _loadDeviceToSetup(deviceID) {

  }
}

export default SetupDeviceController;
