// Imports ---------------------------------------
import records from './tableOfModules.js';

// Model -----------------------------------------
const idKey = 'ModuleID';
const mutableKeys = [
  'ModuleName', 'ModuleCode', 'ModuleLevel', 'ModuleLeaderID', 'ModuleImageURL'
];

export default { idKey, mutableKeys, records };
