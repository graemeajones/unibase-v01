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
  'UserID',
  'UserFirstname',
  'UserLastname',
  'UserEmail',
  'UserRegistered',
  'UserUsertypeID',
  'UserLevel',
  'UserYearID',
  'UserImageURL'
];
const extendedTable = `((( ${table} LEFT JOIN Users ON ModulememberUserID=UserID )
    LEFT JOIN Years ON UserYearID=YearID )
    LEFT JOIN Usertypes ON UserUsertypeID=UsertypeID )`;
const extendedFields = `${[...fields, ...userFields]},YearName AS UserYearName,UsertypeName AS UserUsertypeName`;

// Conformance -----------------------------------
// const conformObjToRecord = (obj) => obj;
const conformRecordToObj = (record) => { return { ...record, UserRegistered: record.UserRegistered ? true : false }; }

// Build accessor --------------------------------
const accessor = {};

// Methods ---------------------------------------

accessor.list = async (id) => {
  let sql = `SELECT ${extendedFields} FROM ${extendedTable} WHERE ${whereField}=${id} AND UsertypeName="Student"`;
  try {
    const [result] = await dbConn.query(sql);
    return result.length === 0
      ? { isSuccess: false, result: null, message: "No records found" }
      : { isSuccess: true, result: result.map(conformRecordToObj), message: "Records successfully recovered" };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to recover records: ${error}` };
  }
};

export default accessor;
