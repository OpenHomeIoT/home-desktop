const assert = require("assert");
import IoTDevice from "../bin/IoTDevice";

describe("IoTDevice Tests", () => {
  it("Should instantiate without error", () => {
    const iotDevice = new IoTDevice("usn", "descriptionLocation", "ipAddress", ["services"], true, 0, 0, "connected");
  });

  it("#fromJson(): Instantiating with fromJson() should return the correct values", () => {
    const iotDevice = IoTDevice.fromJson({ usn: "usn", ssdpDescriptionLocation: "location", ipAddress: "1.1.1.1", configuredAsChild: 1, timeLastSeen: 10, timeDiscovered: 10, connectionStatus: "connected", services: "[\"services\"]"});
    assert.strictEqual(iotDevice.getUSN(), "usn", "getUSN() did not return the correct value.");
    assert.strictEqual(iotDevice.getSSDPDescriptionLocation(), "location", "getSSDPDescriptionLocation() did not return the correct value.");
    assert.strictEqual(iotDevice.getAddress(), "1.1.1.1", "getAddress() did not return the correct value.");
    assert.strictEqual(iotDevice.isConfiguredChild(), true, "isConfiguredChild() did not return the correct value.");
    assert.strictEqual(iotDevice.getLastSeen(), 10, "getLastSeen() did not return the correct value.");
    assert.strictEqual(iotDevice.getDiscovered(), 10, "getDisovered() did not return the correct value.");
    assert.strictEqual(iotDevice.getConnectionStatus(), "connected", "getConnectionStatus() did not return the correct value.");
    assert.deepEqual(iotDevice.getServices(), ["services"], "getServices() did not return the correct value.");
  });

  it("#toJson(): Should return the correct values", () => {
    const iotDevice = new IoTDevice("usn", "descriptionLocation", "ipAddress", ["services"], true, 0, 0, "connected");
    const { usn, configuredAsChild, connectionStatus, ipAddress, services, ssdpDescriptionLocation, timeDiscovered, timeLastSeen } = iotDevice.toJson();
    assert.strictEqual(usn, "usn", "usn was incorrect.");
    assert.strictEqual(ssdpDescriptionLocation, "descriptionLocation", "ssdpDescriptionLocation was incorrect.");
    assert.strictEqual(configuredAsChild, true, "configuredAsChild was incorrect.");
    assert.strictEqual(connectionStatus, "connected", "connectionStatus was incorrect.");
    assert.strictEqual(ipAddress, "ipAddress", "ipAddress was incorrect.");
    assert.strictEqual(timeDiscovered, 0, "timeDiscovered was incorrect.");
    assert.strictEqual(timeLastSeen, 0, "timeLastSeen was incorrect.");
    assert.deepStrictEqual(services, "[\"services\"]", "services was incorrect.");
  });
});