// Imports ---------------------------------------
import dbConn from './database.js';

// Build accessor --------------------------------
const accessor = {};

// Conformance -----------------------------------
const conformRecordToObj = (record) => Object.values(record)[0];

// Methods ---------------------------------------

accessor.list = async (id) => {
  let sql = `SHOW TABLES`;
  try {
    const [result] = await dbConn.query(sql);
    return result.length === 0
      ? { isSuccess: false, result: null, message: "No tables found" }
      : { isSuccess: true, result: result.map(conformRecordToObj), message: "Tables successfully recovered" };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to recover tables: ${error}` };
  }
};

export default accessor;
