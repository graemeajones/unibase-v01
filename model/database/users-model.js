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
const deleteUnwantedFields = (prevObj, currField) => { if(!mutableFields.includes(currField)) delete prevObj[currField]; return prevObj; };
dbConformance.objToRecord = (obj) => Object.keys(obj).reduce(deleteUnwantedFields, obj );
dbConformance.recordToObj = (record) => { return { ...record, UserRegistered: record.UserRegistered ? true : false }; }

export default { dbConn, dbStructure, dbConformance };
