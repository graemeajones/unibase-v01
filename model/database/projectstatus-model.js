// Imports ---------------------------------------
import dbConn from './database.js';

// Model -----------------------------------------
const dbStructure = {};
dbStructure.table = 'Projectstatus';
dbStructure.idField = 'ProjectstatusID';
const mutableFields = [
  'ProjectstatusName'
];
dbStructure.fields = [dbStructure.idField, ...mutableFields];
dbStructure.extendedTable = dbStructure.table;
dbStructure.extendedFields = dbStructure.fields;

// Conformance -----------------------------------
const dbConformance = {};
dbConformance.objToRecord = (obj) => obj;
dbConformance.recordToObj = (record) => record;

export default { dbConn, dbStructure, dbConformance };
