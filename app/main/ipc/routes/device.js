//@ts-check
import IoTDevice from "../../../common/device/IoTDevice";
import ProcessManager from "../../manager/ProcessManager";
import Destination from "../../../common/ipc/Destination";
import Channel from "../../../common/ipc/Channel";

const processManager = ProcessManager.getInstance();

/**
 * Get All Devices.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, requestID: string, data?: { devices: IoTDevice[] } }} message
 */
const onGetAllDevices = (event, message) => {
  const { origin, destination } = message;
  switch (destination) {
    case Destination.device:
      _sendToDeviceProcess(Channel.DEVICE_GET_ALL_DEVICES, message);
      break;
    case Destination.renderer:
      _sendToRendererProcess(Channel.DEVICE_GET_ALL_DEVICES, message);
      break;
  }
}

/**
 * Get a device.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, requestID: string, data: { usn?: string, device?: IoTDevice} }} message
 */
const onGetDevice = (event, message) => {
  const { destination } = message;
  switch (destination) {
    case Destination.device:
      _sendToDeviceProcess(Channel.DEVICE_GET_DEVICE, message);
      break;
    case Destination.renderer:
      _sendToRendererProcess(Channel.DEVICE_GET_DEVICE, message);
      break;
    default:
      // TODO: handle
      break;
  }
}

/**
 *
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, requestID: string, data?: { devicesToBeConfigured: { _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }[] } }} message
 */
const onGetDevicesToBeConfigured = (event, message) => {
  const { destination } = message;
  switch (destination) {
    case Destination.device:
      _sendToDeviceProcess(Channel.DEVICE_GET_DEVICES_TO_CONFIGURE, message);
      break;
    case Destination.renderer:
      _sendToRendererProcess(Channel.DEVICE_GET_DEVICES_TO_CONFIGURE, message);
      break;
    default:
      // TODO: handle
      break;
  }
}

const onDeviceToBeConfiguredWentOffline = (event, message) => {
  const { destination } = message;
  switch (destination) {
    case Destination.device:
      _sendToDeviceProcess(Channel.DEVICE_DEVICE_TO_CONFIGURE_OFFLINE, message);
      break;
    case Destination.renderer:
      _sendToRendererProcess(Channel.DEVICE_DEVICE_TO_CONFIGURE_OFFLINE, message);
      break;
    default:
      // TODO: handle
      break;
  }
}

const onNewDeviceToBeConfigured = (event, message) => {
  const { destination } = message;
  switch (destination) {
    case Destination.device:
      _sendToDeviceProcess(Channel.DEVICE_NEW_DEVICE_TO_CONFIGURE, message);
      break;
    case Destination.renderer:
      _sendToRendererProcess(Channel.DEVICE_NEW_DEVICE_TO_CONFIGURE, message);
      break;
    default:
      // TODO: handle
      break;
  }
}

/**
 *
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, requestID: string, data: { device: IoTDevice} }} message
 */
const onUpdateDevice = (event, message) => {
  const { destination } = message;
  switch (destination) {
    case Destination.device:
      _sendToDeviceProcess(Channel.DEVICE_UPDATE_DEVICE, message);
      break;
    case Destination.renderer:
      _sendToRendererProcess(Channel.DEVICE_UPDATE_DEVICE, message);
      break;
    default:
      // TODO: handle
      break;
  }
}

const _sendToDeviceProcess = (channel, message) => {
  const deviceProcess = processManager.getDeviceProcess();
  if (deviceProcess) deviceProcess.webContents.send(channel, message);
}

const _sendToRendererProcess = (channel, message) => {
  const rendererProcess = processManager.getRendererProcess();
  if (rendererProcess) rendererProcess.webContents.send(channel, message);
}

export default {
  onGetAllDevices,
  onGetDevice,
  onGetDevicesToBeConfigured,
  onDeviceToBeConfiguredWentOffline,
  onNewDeviceToBeConfigured,
  onUpdateDevice
};
