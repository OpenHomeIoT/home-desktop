//@ts-check
import IoTDevice from "../../../common/device/IoTDevice";
import ProcessManager from "../../manager/ProcessManager";
import Destination from "../../../common/ipc/Destination";
import Channel from "../../../common/ipc/Channel";

const processManager = ProcessManager.getInstance();

/**
 * Get All Devices.
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data?: { devices: IoTDevice[] } }} data
 */
const onGetAllDevices = (event, data) => {
  const { origin, destination } = data;
  switch (destination) {
    case "device":
      const deviceProcess = processManager.getDeviceProcess();
      if (deviceProcess) {
        deviceProcess.webContents.send(Channel.DEVICE_GET_ALL_DEVICES, { origin, destination });
      }
      break;
    case "renderer":
      const rendererProcess = processManager.getRendererProcess();
      if (rendererProcess) {
        rendererProcess.webContents.send(Channel.DEVICE_GET_ALL_DEVICES, { origin, destination, data });
      }
      break;
  }
}

/**
 *
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data: { usn?: string, device?: IoTDevice} }} data
 */
const onGetDevice = (event, { origin, destination, data }) => {

}

/**
 *
 * @param {Electron.IpcMainEvent} event
 * @param {{ origin: string, destination: string, data: { device: IoTDevice} }} data
 */
const onUpdateDevice = (event, { origin, destination, data }) => {

}

export default {
  onGetAllDevices,
  onGetDevice,
  onUpdateDevice
};
