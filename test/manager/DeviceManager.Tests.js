import assert from "assert";
import MockDeviceDatabase from "../mocks/db/MockDeviceDatabase";
import IoTDevice from "../../bin/IoTDevice";
import MockDeviceManager from "../mocks/manager/MockDeviceManager";

const deviceDatabase = MockDeviceDatabase.getInstance();
const deviceManager = new MockDeviceManager(deviceDatabase);

const device1 = new IoTDevice("device1", "location1", "address1", ["service1"], false, 10, 10, "disconnected");
const device2 = new IoTDevice("device2", "location2", "address2", ["service2"], false, 10, 10, "disconnected");


describe("DeviceManager Tests.", () => {

  before((done) => {
    deviceDatabase.open().then(done).catch(done);
  });

  it("addDevice(): Should be able to add a device without error.", (done) => {
    const getDevice = () => deviceManager.getDeviceByUsn("device1");
    deviceManager.addDevice(device1).then(getDevice).then(device => done(device)).catch(done);
  });

  after(() => {
    deviceDatabase.close();
  })

});