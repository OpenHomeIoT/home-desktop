import assert from "assert";
import MockConnectionManager from "../mocks/manager/MockConnectionManager";
import MockConnectionBufferDatabase from "../mocks/db/MockConnectionBufferDatabase";
import MockDeviceManager from "../mocks/manager/MockDeviceManager";
import MockDeviceDatabase from "../mocks/db/MockDeviceDatabase";

const connectionBufferDatabase = MockConnectionBufferDatabase.getInstance();
const deviceDatabase = MockDeviceDatabase.getInstance();
const deviceManager = new MockDeviceManager(deviceDatabase);
const connectionManager = new MockConnectionManager(connectionBufferDatabase, deviceManager);

describe("ConnectionManager Tests", () => {
  it("", () => {
    
  });
});