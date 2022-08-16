// Imports ---------------------------------------
import dbConn from './database.js';

// Model -----------------------------------------
const dbStructure = {};
dbStructure.table = 'Modules';
dbStructure.idField = 'ModuleID';
const mutableFields = [
  'ModuleName',
  'ModuleCode',
  'ModuleLevel',
  'ModuleYearID',
  'ModuleLeaderID',
  'ModuleImageURL'
];
dbStructure.fields = [dbStructure.idField, ...mutableFields];
dbStructure.extendedTable = `(( ${dbStructure.table} LEFT JOIN Users ON ModuleLeaderID=UserID ) LEFT JOIN Years ON ModuleYearID=YearID )`;
dbStructure.extendedFields = `${dbStructure.fields},YearName AS ModuleYearName,CONCAT(UserFirstname," ",UserLastname) AS ModuleLeaderName`;

// Conformance -----------------------------------
const dbConformance = {};
const deleteUnwantedFields = (prevObj, currField) => { if(!mutableFields.includes(currField)) delete prevObj[currField]; return prevObj; };
dbConformance.objToRecord = (obj) => Object.keys(obj).reduce(deleteUnwantedFields, obj );
dbConformance.recordToObj = (record) => record;

export default { dbConn, dbStructure, dbConformance };
