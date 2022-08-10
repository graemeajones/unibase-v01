// Imports ---------------------------------------
import dbConn from './database.js';

// Model -----------------------------------------
const dbStructure = {};
dbStructure.table = 'Users';
dbStructure.idField = 'UserID';
const mutableFields = [
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
dbStructure.fields = [dbStructure.idField, ...mutableFields];
dbStructure.extendedTable = `(( ${dbStructure.table} LEFT JOIN Years ON UserYearID=YearID ) LEFT JOIN Usertypes ON UserUsertypeID=UsertypeID )`;
dbStructure.extendedFields = `${dbStructure.fields},YearName AS UserYearName,UsertypeName AS UserUsertypeName`;

// Conformance -----------------------------------
const dbConformance = {};
dbConformance.objToRecord = (obj) => obj;
dbConformance.recordToObj = (record) => { return { ...record, UserRegistered: record.UserRegistered ? true : false }; }

export default { dbConn, dbStructure, dbConformance };
