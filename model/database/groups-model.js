// Imports ---------------------------------------
import dbConn from './database.js';

// Model -----------------------------------------
const dbStructure = {};
dbStructure.table = 'Groups';
dbStructure.idField = 'GroupID';
const mutableFields = [
  'GroupName',
  'GroupProjectID'
];
dbStructure.fields = [dbStructure.idField, ...mutableFields];
dbStructure.extendedTable = `(( ${dbStructure.table} LEFT JOIN Projects ON GroupProjectID=ProjectID ) LEFT JOIN Modules ON ProjectModuleID=ModuleID )`;
dbStructure.extendedFields = `${dbStructure.fields},ProjectName AS GroupProjectName,ModuleID AS GroupModuleID,CONCAT(ModuleCode," ",ModuleName) AS GroupModuleName`;

// Conformance -----------------------------------
const dbConformance = {};
const deleteUnwantedFields = (prevObj, currField) => { if(!mutableFields.includes(currField)) delete prevObj[currField]; return prevObj; };
dbConformance.objToRecord = (obj) => Object.keys(obj).reduce(deleteUnwantedFields, obj );
dbConformance.recordToObj = (record) => record;

export default { dbConn, dbStructure, dbConformance };
