// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  ModuleID: joi.number().integer(),
  ModuleName: joi.string().min(8),
  ModuleCode: joi.string().regex(/^\D{2}\d{4}$/),
  ModuleLevel: joi.number().integer().min(3).max(7),
  ModuleLeaderID: joi.number().integer().allow(null),
  ModuleYearID: joi.number().integer().allow(null),
  ModuleImageURL: joi.string().uri()
}).unknown(true);

const mutableKeys = [
  'ModuleName', 'ModuleCode', 'ModuleLevel', 'ModuleLeaderID', 'ModuleImageURL', 'ModuleYearID'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
});

export default { idSchema, createSchema, updateSchema };
