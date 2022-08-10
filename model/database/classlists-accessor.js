// Imports ---------------------------------------
import dbConn from './database.js';

// Model -----------------------------------------
const table = 'Modulemembers';
const idField = 'ModulememberID';
const mutableFields = [
  'ModulememberUserID',
  'ModulememberModuleID',
  'ModulememberOrder'
];
const fields = [idField, ...mutableFields];
const whereField = 'ModulememberModuleID';
const userFields = [
  'UserFirstname',
  'UserLastname',
  'UserEmail',
  'UserPassword',
  'UserRegistered',
  'UserUsertypeID',
  'UserLevel',
  'UserYearID',
  'UserImageURL'
];
const extendedTable = `((( ${table} LEFT JOIN Users ON ModulememberUserID=UserID )
    LEFT JOIN Years ON UserYearID=YearID )
    LEFT JOIN Usertypes ON UserUsertypeID=UsertypeID )`;
const extendedFields = [...fields, ...userFields];

// Conformance -----------------------------------
const conformObjToRecord = (obj) => obj;
const conformRecordToObj = (record) => { return { ...record, UserRegistered: record.UserRegistered ? true : false }; }

// Build accessor --------------------------------
const accessor = {};

// Construct string from object with structure "SET field1=:field1, ..., fieldN=:fieldN "
const buildSetTemplate = (obj) => Object.keys(obj).reduce((prev, curr, index) => prev + `${curr}=:${curr}` + ((index === Object.keys(obj).length - 1) ? " " : ", "), "SET ");

// Methods ---------------------------------------

accessor.create = async (obj) => {
  const record = conformObjToRecord(obj);
  const sql = `INSERT INTO ${table} ${buildSetTemplate(record)}`;
  try {
    const status = await dbConn.query(sql, record);
    const {isSuccess, result, message } = await read(status[0].insertId);
    return isSuccess
      ? { isSuccess: true, result: conformRecordToObj(result), message: "Record successfully inserted" }
      : { isSuccess: false, result: null, message: `Failed to recover inserted record: ${message}` };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to insert record: ${error}` };
  }
};

accessor.update = async (id, obj) => {
  const record = conformObjToRecord(obj);
  const sql = `UPDATE ${table} ${buildSetTemplate(record)} WHERE ${idField}=${id}`;
  try {
    const status = await dbConn.query(sql, record);
    if (status[0].affectedRows === 0)
      return { isSuccess: false, result: null, message: `Failed to update record: no rows affected` };
    const { isSuccess, result, message } = await read(id); 
    return isSuccess
      ? { isSuccess: true, result: conformRecordToObj(result), message: "Record successfully updated" }
      : { isSuccess: false, result: null, message: `Failed to recover updated record: ${message}` };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to update record: ${error}` };
  }
};

accessor.delete = async (id) => {
  const sql = `DELETE FROM ${table} WHERE ${idField}=${id}`;
  try {
    const status = await dbConn.query(sql);
    return status.affectedRows === 0
      ? { isSuccess: false, result: null, message: `Failed to delete record ${id}` }
      : { isSuccess: true, result: null, message: "Record successfully deleted" };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to delete record: ${error}` };
  }
};

accessor.read = async (id) => {
  let sql = `SELECT ${extendedFields} FROM ${extendedTable} WHERE ${whereField}=${id}`;
  try {
    const [result] = await dbConn.query(sql);
    return result.length === 0
      ? { isSuccess: false, result: null, message: "No records found" }
      : { isSuccess: true, result: result.map(conformRecordToObj), message: "Record successfully recovered" };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to recover records: ${error}` };
  }
};

export default accessor;
