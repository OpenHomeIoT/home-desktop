//@ts-check
import IoTDevice from "../../../common/device/IoTDevice";
import ProcessManager from "../../manager/ProcessManager";
import Destination from "../../../common/ipc/Destination";
import Channel from "../../../common/ipc/Channel";
import IpcHelper from "../../../common/ipc/IpcHelper";

const processManager = ProcessManager.getInstance();

/**
 * Get All Devices.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data?: { devices: IoTDevice[] } }} message
 */
const onGetAllDevices = (event, message) => {
  const { origin, destination } = message;
  switch (destination) {
    case Destination.device:
      const deviceProcess = processManager.getDeviceProcess();
      if (deviceProcess) {
        deviceProcess.webContents.send(Channel.DEVICE_GET_ALL_DEVICES, message);
      }
      break;
    case Destination.renderer:
      const rendererProcess = processManager.getRendererProcess();
      if (rendererProcess) {
        rendererProcess.webContents.send(Channel.DEVICE_GET_ALL_DEVICES, message);
      }
      break;
  }
}

/**
 * Get a device.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data: { usn?: string, device?: IoTDevice} }} message
 */
const onGetDevice = (event, message) => {
  const { destination } = message;
  switch (destination) {
    case Destination.device:
      const deviceProcess = processManager.getDeviceProcess();
      if (deviceProcess) deviceProcess.webContents.send(Channel.DEVICE_GET_DEVICE, message);
      break;
    case Destination.renderer:
      const rendererProcess = processManager.getRendererProcess();
      if (rendererProcess) rendererProcess.webContents.send(Channel.DEVICE_GET_DEVICE, message);
      break;
    default:
      // TODO: handle
      break;
  }
}

/**
 *
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data: { device: IoTDevice} }} message
 */
const onUpdateDevice = (event, message) => {
  const { destination } = message;
  switch (destination) {
    case Destination.device:
      const deviceProcess = processManager.getDeviceProcess();
      if (deviceProcess) deviceProcess.webContents.send(Channel.DEVICE_UPDATE_DEVICE, message);
      break;
    case Destination.renderer:
      const rendererProcess = processManager.getRendererProcess();
      if (rendererProcess) rendererProcess.webContents.send(Channel.DEVICE_UPDATE_DEVICE, message);
      break;
    default:
      // TODO: handle
      break;
  }
}

export default {
  onGetAllDevices,
  onGetDevice,
  onUpdateDevice
};
