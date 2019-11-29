import assert from "assert";

import SqlHelper from "../../../bin/db/helper/SqlHelper";
import DatabaseHelper from "../../../bin/db/helper/DatabaseHelper";

const TABLE_DEFINITION = {
  name: "TestTable",
  isLedger: false,
  primaryKey: "usn",
  fields: [
    { name: "usn", type: DatabaseHelper.TEXT },
    { name: "content", type: DatabaseHelper.BIGINT },
    { name: "online", type: DatabaseHelper.BOOLEAN },
    { name: "r", type: DatabaseHelper.REAL },
    { name: "b", type: DatabaseHelper.BLOB },
    { name: "i", type: DatabaseHelper.INT, autoincrement: true }
  ]
};

describe("SqlHelper Tests", () => {

  it("#generateCreateTableSql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateCreateTableSql(TABLE_DEFINITION);
    const expected = "CREATE TABLE IF NOT EXISTS TestTable (usn TEXT PRIMARY KEY,content BIGINT,online BOOLEAN,r REAL,b BLOB,i INTEGER AUTOINCREMENT)";
    assert.strictEqual(actual, expected, "The create table SQL was invalid.");
  });

  it("#generateDeleteByPrimaryKeySql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateDeleteByPrimaryKeySql(TABLE_DEFINITION);
    const expected = "DELETE FROM TestTable WHERE usn = $usn";
    assert.strictEqual(actual, expected, "The delete by primary key SQL was invalid.");
  });

  it("#generateGetAllSql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateGetAllSql(TABLE_DEFINITION);
    const expected = "SELECT * FROM TestTable";
    assert.strictEqual(actual, expected, "The get all SQL was invalid.");
  });

  it("#generateGetByPrimaryKeySql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateGetByPrimaryKeySql(TABLE_DEFINITION, "usn");
    const expected = "SELECT * FROM TestTable WHERE usn = $usn";
    assert.strictEqual(actual, expected, "The get by primary key SQL was invalid.");
  });

  it("#generateInsertSql(): Should return the correct SQL.", () => {
    const actual = SqlHelper.generateInsertSql(TABLE_DEFINITION);
    const expected = "INSERT INTO TestTable (usn,content,online,r,b,i) VALUES ($usn,$content,$online,$r,$b,$i)";
    assert.strictEqual(actual, expected, "The insert SQL was invalid.");
  });

  it("#generateUpdateByPrimaryKeySql(): Should return the correct SQL.", () => {
    const actual1 = SqlHelper.generateUpdateByPrimaryKeySql(TABLE_DEFINITION);
    const expected1 = "UPDATE TestTable SET usn = $usn,content = $content,online = $online,r = $r,b = $b WHERE usn = $usn";
    assert.strictEqual(actual1, expected1, "The update by primary key SQL was invalid.");

    const newDefinition = {};
    Object.assign(newDefinition, TABLE_DEFINITION);
    for (const field of newDefinition.fields) {
      if (field.name === "r") {
        field.autoincrement = true;
      }
    }
    const actual2 = SqlHelper.generateUpdateByPrimaryKeySql(newDefinition);
    const expected2 = "UPDATE TestTable SET usn = $usn,content = $content,online = $online,b = $b WHERE usn = $usn";
    assert.strictEqual(actual2, expected2, "The update by primary key SQL was invalid.");
  });
});