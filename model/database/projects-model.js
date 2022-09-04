// Imports ---------------------------------------
import dbConn from './database.js';

// Model -----------------------------------------
const dbStructure = {};
dbStructure.table = 'Projects';
dbStructure.idField = 'ProjectID';
const mutableFields = [
  'ProjectName',
  'ProjectGroupsize',
  'ProjectStartdate',
  'ProjectProjectstatusID',
  'ProjectModuleID'
];
dbStructure.fields = [dbStructure.idField, ...mutableFields];
dbStructure.extendedTable = `(( ${dbStructure.table} LEFT JOIN Projectstatus ON ProjectProjectstatusID=ProjectstatusID ) LEFT JOIN Modules ON ProjectModuleID=ModuleID )`;
dbStructure.extendedFields = `${dbStructure.fields},ProjectstatusName AS ProjectProjectstatusName,CONCAT(ModuleCode," ",ModuleName) AS ProjectModuleName`;

// Conformance -----------------------------------
const dbConformance = {};
const deleteUnwantedFields = (prevObj, currField) => { if(!mutableFields.includes(currField)) delete prevObj[currField]; return prevObj; };
dbConformance.objToRecord = (obj) => Object.keys(obj).reduce(deleteUnwantedFields, obj);
dbConformance.recordToObj = (record) => record;

export default { dbConn, dbStructure, dbConformance };
