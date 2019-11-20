import assert from "assert";

import MockDeviceOnlineOfflineHistoryDatabase from "../mocks/db/MockDeviceOnlineOfflineHistoryDatabase";

describe("DeviceOnlineOfflineHistoryDatabase Tests", () => {
  it("open(): Should be able to open without fail.", (done) => {
    MockDeviceOnlineOfflineHistoryDatabase.getInstance().open().then(done).catch(done);
  });

  it("close(): Should be able to close without fail.", () => {
    MockDeviceOnlineOfflineHistoryDatabase.getInstance().close();
  });
});