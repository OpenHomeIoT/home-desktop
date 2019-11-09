import assert from "assert";

import MockConnectionBufferDatabase from "../mocks/db/MockConnectionBufferDatabase";

describe("ConnectionBufferDatabase Tests", () => {
  it("open(): Should be able to open without fail.", (done) => {
    MockConnectionBufferDatabase.getInstance().open().then(done).catch(done);
  });

  it("close(): Should be able to close without fail.", () => {
    MockConnectionBufferDatabase.getInstance().close();
  });
});