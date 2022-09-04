// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  ProjectID: joi.number().integer(),
  ProjectName: joi.string().min(8),
  ProjectGroupsize: joi.number().integer().min(2),
  ProjectStartdate: joi.date(), //.format("DD/MM/YYYY"),
  ProjectProjectstatusID: joi.number().integer().allow(null),
  ProjectModuleID: joi.number().integer().allow(null)
}).unknown(true);

const mutableKeys = [
  'ProjectName', 'ProjectGroupsize', 'ProjectStartdate', 'ProjectProjectstatusID', 'ProjectModuleID'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
});

export default { idSchema, createSchema, updateSchema };
