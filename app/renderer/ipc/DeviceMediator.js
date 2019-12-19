import uuid from "uuid/v4";
import Ipc from "../../common/ipc/render/Ipc"
import { Channel, Destination } from "../../common/ipc";

class DeviceMediator {

  static _instance = null;

  /**
   * Get the DeviceMediator instance.
   * @returns {DeviceMediator} the instance.
   */
  static getInstance() {
    if (DeviceMediator._instance == null) DeviceMediator._instance = new DeviceMediator();
    return DeviceMediator._instance;
  }

  /**
   * Create a new DeviceMediator.
   */
  constructor() {
    this._ipc = new Ipc(Destination.renderer);
    this._onNewDeviceToBeConfiguredListeners = [];
    this._onDeviceToBeConfiguredOfflineListeners = [];

    this._handleNewDeviceToBeConfigured = this._handleNewDeviceToBeConfigured.bind(this);
    this._handleDeviceToConfigureWentOffline = this._handleDeviceToConfigureWentOffline.bind(this);

    this._ipc.on(Channel.DEVICE_NEW_DEVICE_TO_CONFIGURE, this._handleNewDeviceToBeConfigured);
    this._ipc.on(Channel.DEVICE_DEVICE_TO_CONFIGURE_OFFLINE, this._handleDeviceToConfigureWentOffline);
  }

  /**
   *
   * @param {({ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }) => void} cb
   */
  clearNewDeviceToBeConfigureListener(cb) {
    this._onNewDeviceToBeConfiguredListeners.splice(this._onNewDeviceToBeConfiguredListeners.indexOf(cb), 1);
  }

  /**
   *
   * @param {({ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }) => void} cb
   */
  clearDeviceToBeConfiguredWentOfflineListener(cb) {
    this._onDeviceToBeConfiguredOfflineListeners.splice(this._onDeviceToBeConfiguredOfflineListeners.indexOf(cb), 1);
  }

  /**
   * Get all of the devices that need to be configured.
   */
  getAllDevicesToBeConfigured() {
    return new Promise((resolve, reject) => {
      const requestID = uuid();
      const _handleDevicesToBeConfigured = (message) => {
        if (message.requestID !== requestID) return;
        resolve(message.data);
      };
      this._ipc.on(Channel.DEVICE_GET_DEVICES_TO_CONFIGURE, _handleDevicesToBeConfigured);
      this._ipc.send(Channel.DEVICE_GET_DEVICES_TO_CONFIGURE, Destination.device, requestID, null);
    });
  }

  /**
   *
   * @param {({ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }) => void} cb
   */
  listenForNewDeviceToBeConfigured(cb) {
    this._onNewDeviceToBeConfiguredListeners.push(cb);
  }

  /**
   *
   * @param {({ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }) => void} cb
   */
  listenForDeviceToBeConfiguredWentOffline(cb) {
    this._onDeviceToBeConfiguredOfflineListeners.push(cb);
  }

  /**
   *
   * @param {{ origin: string, destination: string, requestID: string, data: { _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number} }} message
   */
  _handleDeviceToConfigureWentOffline(message) {
    this._onDeviceToBeConfiguredOfflineListeners.forEach(cb => cb(message.data));
  }

  /**
   *s
   * @param {{ origin: string, destination: string, requestID: string, data: { _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number } }} message
   */
  _handleNewDeviceToBeConfigured(message) {
    this._onNewDeviceToBeConfiguredListeners.forEach(cb => cb(message.data));
  }
}

export default DeviceMediator;
