import assert from "assert";

import SqlHelper from "../../../bin/db/helper/SqlHelper";
import DatabaseHelper from "../../../bin/db/helper/DatabaseHelper";

describe("SqlHelper Tests", () => {

  it("#generateCreateTableSql(): Should return the correct SQL.", () => {
    const fields = [
      { name: "usn", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "content", type: DatabaseHelper.BIGINT },
      { name: "online", type: DatabaseHelper.BOOLEAN },
      { name: "r", type: DatabaseHelper.REAL },
      { name: "b", type: DatabaseHelper.BLOB },
      { name: "i", type: DatabaseHelper.INT, autoincrement: true }
    ];
    const actual = SqlHelper.generateCreateTableSql("test", fields);
    const expected = "CREATE TABLE IF NOT EXISTS test (usn TEXT PRIMARY KEY,content BIGINT,online BOOLEAN,r REAL,b BLOB,i INTEGER AUTOINCREMENT)";
    assert.strictEqual(actual, expected, "The create table SQL was invalid.");
  });

  it("#generateDeleteByPrimaryKeySql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateDeleteByPrimaryKeySql("test", "usn");
    const expected = "DELETE FROM test WHERE usn = $usn";
    assert.strictEqual(actual, expected, "The delete by primary key SQL was invalid.");
  });

  it("#generateGetAllSql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateGetAllSql("test");
    const expected = "SELECT * FROM test";
    assert.strictEqual(actual, expected, "The get all SQL was invalid.");
  });

  it("#generateGetByPrimaryKeySql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateGetByPrimaryKeySql("test", "usn");
    const expected = "SELECT * FROM test WHERE usn = $usn";
    assert.strictEqual(actual, expected, "The get by primary key SQL was invalid.");
  });

  it("#generateInsertSql(): Should return the correct SQL.", () => {
    const fields = [
      { name: "usn", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "content", type: DatabaseHelper.BIGINT },
      { name: "online", type: DatabaseHelper.BOOLEAN },
      { name: "r", type: DatabaseHelper.REAL },
      { name: "b", type: DatabaseHelper.BLOB },
      { name: "i", type: DatabaseHelper.INT, autoincrement: true }
    ];
    const actual = SqlHelper.generateInsertSql("test", fields);
    const expected = "INSERT INTO test (usn,content,online,r,b,i) VALUES ($usn,$content,$online,$r,$b,$i)";
    assert.strictEqual(actual, expected, "The insert SQL was invalid.");
  });

  it("#generateUpdateByPrimaryKeySql(): Should return the correct SQL.", () => {
    const fields1 = [
      { name: "usn", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "content", type: DatabaseHelper.BIGINT },
      { name: "online", type: DatabaseHelper.BOOLEAN },
      { name: "r", type: DatabaseHelper.REAL },
      { name: "b", type: DatabaseHelper.BLOB },
      { name: "i", type: DatabaseHelper.INT, autoincrement: true }
    ];
    const actual1 = SqlHelper.generateUpdateByPrimaryKeySql("test", fields1, "usn");
    const expected1 = "UPDATE test SET usn = $usn,content = $content,online = $online,r = $r,b = $b WHERE usn = $usn";
    assert.strictEqual(actual1, expected1, "The update by primary key SQL was invalid.");

    const fields2 = [
      { name: "usn", type: DatabaseHelper.TEXT, isPrimaryKey: true },
      { name: "content", type: DatabaseHelper.BIGINT },
      { name: "online", type: DatabaseHelper.BOOLEAN },
      { name: "r", type: DatabaseHelper.REAL, includeInUpdate: false },
      { name: "b", type: DatabaseHelper.BLOB },
      { name: "i", type: DatabaseHelper.INT, autoincrement: true }
    ];
    const actual2 = SqlHelper.generateUpdateByPrimaryKeySql("test", fields2, "usn");
    const expected2 = "UPDATE test SET usn = $usn,content = $content,online = $online,b = $b WHERE usn = $usn";
    assert.strictEqual(actual2, expected2, "The update by primary key SQL was invalid.");
  });
});