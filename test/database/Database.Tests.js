import assert from "assert";
import fs from "fs";
import path from "path";

import Database from "../../bin/db/Database";

const TABLE_NAME = "DatabaseTestsTable";

/**
 * @returns {Database}
 */
const createDatabase = () => {
  const fields = [
    { name: "pk", type: "INTEGER", isPrimaryKey: true, autoincrement: true },
    { name: "content", type: "TEXT" }
  ];

  return new Database(TABLE_NAME, fields, { isTest: true });
}

/**
 * @returns {Database}
 */
const createMemoryDatabase = () => {
  const fields = [
    { name: "pk", type: "INTEGER", isPrimaryKey: true, autoincrement: true },
    { name: "content", type: "TEXT" }
  ];
  return new Database(TABLE_NAME, fields, { isMemoryDB: true })
}

const deleteTestDatabase = () => {
  const testDB= path.join(process.cwd(), "oshiot.test.db");
  if (fs.existsSync(testDB)) {
    fs.unlinkSync(testDB);
  }
}

describe("Database: Memory Database Tests", () => {
  it("open(): Should be able to open a memory database", (done) => {
    const db = createMemoryDatabase();
    db.open().then(() => db.close()).then(done).catch(done);
  });

  it("insert(): Should be able to insert a record into a database", (done) => {
    const db = createMemoryDatabase();
    const toInsert = { content: "test1" };
    const insertRecord = () => db.insert(toInsert);
    db.open()
    .then(insertRecord)
    .then(() => db.getAll())
    .then(records => {
      assert.strictEqual(records.length, 1, `There were ${records.length} records found, not 1.`);
    })
    .then(() => db.close())
    .then(done)
    .catch(done);
  });

  it("getAll(): Should have no records in the database.", (done) => {
    const db = createMemoryDatabase();
    db.getAll()
      .catch(err => done()); // we expect a failure
  });
});

describe("Database: File Database Tests", () => {

  it("open(): Should be able to open a file database", (done) => {
    const db = createDatabase();
    db.open().then(() => db.close()).then(done).catch(done);
  });

  it("insert(): Should be able to insert a record into a database", (done) => {
    // clear the old database
    deleteTestDatabase();
    const db = createDatabase();
    const toInsert = { content: "test1" };
    const insertRecord = () => db.insert(toInsert);
    db.open()
    .then(insertRecord)
    .then(() => db.getAll())
    .then(records => {
      assert.strictEqual(records.length, 1, `There were ${records.length} records found, not 1.`);
    })
    .then(() => db.close())
    .then(done)
    .catch(done);
  });
});

// TODO: finish tests for file and memory databases
// TODO: add tests for update()
// TODO: add tests for get()
// TODO: add tests for getAll()
// TODO: test ledger databases can only be written to, not updated or deleted.
