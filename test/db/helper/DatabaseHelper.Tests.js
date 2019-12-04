import assert from "assert";
import DatabaseHelper from "../../../bin/db/helper/DatabaseHelper";

const TABLE_DEFINITION = {
  name: "TestTable",
  isLedger: false,
  primaryKey: "pk",
  fields: [
    { name: "usn", type: DatabaseHelper.TEXT, isPrimaryKey: true },
    { name: "content", type: DatabaseHelper.TEXT },
    { name: "timeDiscovered", type: DatabaseHelper.INT, includeInUpdate: false }, 
    { name: "timeLastSeen", type: DatabaseHelper.INT },
    { name: "b", type: DatabaseHelper.BOOLEAN }
  ]
};

describe("DatabaseHelper Tests", () => {

  it("#isValidInsertData(): Should return true for valid data.", () => {
    const actual = DatabaseHelper.isValidInsertData(TABLE_DEFINITION, { usn: "test", content: "test", timeDiscovered: 0, timeLastSeen: 0, b: true });
    assert.strictEqual(actual, true, "The insert data was not valid.");
  });

  it("#isValidInsertData(): Should return false for invalid data.", () => {
    const actual = DatabaseHelper.isValidInsertData(TABLE_DEFINITION, { usn: "test", content: 1, timeDiscovered: 0, timeLastSeen: 0, b: true });
    assert.strictEqual(actual, false, "The insert data was not valid.");
  });

  it("#isValidUpdateData(): Should return true for valid data.", () => {
    const data1 = {
      usn: "usn",
      content: "some content",
      timeLastSeen: 9123849,
      b: false
    };
    const data2 = {
      content: "updated content"
    };
    assert.strictEqual(DatabaseHelper.isValidUpdateData(TABLE_DEFINITION, data1), true, "data1 was not valid update data.");
    assert.strictEqual(DatabaseHelper.isValidUpdateData(TABLE_DEFINITION, data2), true, "data2 was not valid update data.");
  });

  it("#isValidUpdateData(): Should return false for data that contains a field that should not be included in update.", () => {
    const data1 = {
      usn: "usn",
      content: "some content",
      timeLastSeen: 9123849,
      b: false,
      timeDiscovered: 3
    };
    const data2 = {
      content: "updated content",
      timeDiscovered: 3
    };
    assert.strictEqual(DatabaseHelper.isValidUpdateData(TABLE_DEFINITION, data1), false, "data1 was valid update data.");
    assert.strictEqual(DatabaseHelper.isValidUpdateData(TABLE_DEFINITION, data2), false, "data2 was valid update data.");
  });

  it("#prepareDataForInsert(): Should return valid prepared data.", () => {
    const now = Date.now();
    const data = {
      usn: "usn",
      content: "some content",
      timeDiscovered: now,
      timeLastSeen: now,
      b: true
    };
    const expected = {
      $usn: "usn",
      $content: "some content",
      $timeDiscovered: now,
      $timeLastSeen: now,
      $b: true
    };
    assert.deepStrictEqual(DatabaseHelper.prepareDataForInsert(TABLE_DEFINITION, data), expected, "The prepared data was incorrect.");
  });

  it("#prepareDataForUpdate(): Should return valid prepared data.", () => {
    const now = Date.now();
    const data = {
      usn: "usn",
      content: "some content",
      timeDiscovered: now,
      timeLastSeen: now,
      b: true,
    };
    const expected = {
      $usn: "usn",
      $content: "some content",
      $timeLastSeen: now,
      $b: true,
    };
    assert.deepStrictEqual(DatabaseHelper.prepareDataForUpdate(TABLE_DEFINITION, data), expected, "The prepared data was incorrect.");
  });

  it("#_dataHasKeyOfName(): Should return true for data that contains a given key", () => {
    const data = { usn: "usn", content: "some content" };
    assert.strictEqual(DatabaseHelper._dataHasKeyOfName(data, "usn"), true, "The data did not contain a \"usn\" key");
    assert.strictEqual(DatabaseHelper._dataHasKeyOfName(data, "content"), true, "The data did not contain a \"content\" key");
  });

  it("#_dataHasKeyOfName(): Should return false for data that does not contain a given key", () => {
    const data = { usn: "usn", content: "some content" };
    assert.strictEqual(DatabaseHelper._dataHasKeyOfName(data, "test"), false, "The data did contain a \"test\" key");
    assert.strictEqual(DatabaseHelper._dataHasKeyOfName(data, "key"), false, "The data did contain a \"key\" key");
  });

  it("#_dataKeyOfNameIsOfType(): Should return true for a data value that is of the correct type.", () => {
    const data = {
      usn: "usn",
      content: "some content",
      timeDiscovered: Date.now(),
      bigInt: 0n,
      b: true,
      real: 0.01,
    };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("usn", DatabaseHelper.TEXT, data), true, "usn was not text.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("content", DatabaseHelper.TEXT, data), true, "content was not text.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("timeDiscovered", DatabaseHelper.INT, data), true, "timeDiscovered was not an int.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("bigInt", DatabaseHelper.BIGINT, data), true, "bigInt was not a bigint.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("b", DatabaseHelper.BOOLEAN, data), true, "b was not a boolean.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("real", DatabaseHelper.REAL, data), true, "real was not a real number.");
  });

  it("#_dataKeyOfNameIsOfType(): Should return false for a data value that is not of the correct type.", () => {
    const data = {
      usn: "usn",
      content: "some content",
      timeDiscovered: Date.now(),
      bigInt: 0n,
      b: true,
      real: 0.01,
    };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("usn", DatabaseHelper.INT, data), false, "usn was an int.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("content", DatabaseHelper.REAL, data), false, "content was a real number.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("timeDiscovered", DatabaseHelper.TEXT, data), false, "timeDiscovered was text.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("bigInt", DatabaseHelper.INT, data), false, "bigInt was an int.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("b", DatabaseHelper.INT, data), false, "b was an int.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfType("real", DatabaseHelper.BOOLEAN, data), false, "real was a boolean.");
  });

  it("#_dataKeyOfNameIsOfTypeBigInt(): Should return true for a data value that is of type bigint.", () => {
    const data = { usn: "usn", content: 9007199254740991n };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeBigInt("content", data), true, "Content was not of type bigint!");
  });

  it("#_dataKeyOfNameIsOfTypeBigInt(): Should return false for a data value that is not of type bigint.", () => {
    const data = { usn: "usn", content: 9007199254740991n };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeBigInt("usn", data), false, "usn was of type bigint!");
  });

  it("#_dataKeyOfNameIsOfTypeBoolean(): Should return true for a data value that is of type boolean.", () => {
    const data = { usn: "usn", content: true };
    const data2 = { usn: "usn2", content: false };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeBoolean("content", data), true, "data: content was not a boolean.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeBoolean("content", data2), true, "data2: content was not a boolean.");
  });

  it("#_dataKeyOfNameIsOfTypeBoolean(): Should return false for a data value that is not of type boolean.", () => {
    const data = { usn: "usn", content: true };
    const data2 = { usn: "usn2", content: false, test: 3 };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeBoolean("usn", data), false, "data: usn was a boolean.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeBoolean("test", data2), false, "data2: test was a boolean.");
  });

  it("#_dataKeyOfNameIsOfTypeInt(): Should return true for a data value that is of type int.", () => {
    const data = { usn: "usn", content: 3 };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("content", data), true, "content was not an int.");
  });

  it("#_dataKeyOfNameIsOfTypeInt(): Should return fakse  for a data value that is not of type int.", () => {
    const data = { usn: "usn", content: "test", content2: true, content3: 0.01 };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("usn", data), false, "usn was an int.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("content", data), false, "content was an int.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("content2", data), false, "content2 was an int.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("content3", data), false, "content3 was an int.");
  });

  it("#_dataKeyOfNameIsOfTypeReal(): Should return true for a data value that is of type real.", () => {
    const data = { usn: "usn", content: "test", content2: true, content3: 0.01 };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeReal("content3", data), true, "content3 was not a real number.");
  });

  it("#_dataKeyOfNameIsOfTypeReal(): Should return false for a data value that is not of type real.", () => {
    const data = { usn: "usn", content: "test", content2: true, content3: 0.01 };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("usn", data), false, "usn was a real number.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("content", data), false, "content was a real number.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeInt("content2", data), false, "content2 was a real number.");
  });

  it("#_dataKeyOfNameIsOfTypeText(): Should return true for a data value that is of type text.", () => {
    const data = { usn: "usn", content: "test", content2: true, content3: 0.01 };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeText("usn", data), true, "usn was not text.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeText("content", data), true, "usn was not text.");
  });

  it("#_dataKeyOfNameIsOfTypeText(): Should return false for a data value that is not of type text.", () => {
    const data = { usn: "usn", content: "test", content2: true, content3: 0.01 };
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeText("content2", data), false, "content2 was text.");
    assert.strictEqual(DatabaseHelper._dataKeyOfNameIsOfTypeText("content3", data), false, "content3 was not text.");
  });
});



