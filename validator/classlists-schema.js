// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  ModulememberID: joi.number().integer(),
  ModulememberUserID: joi.number().integer().allow(null),
  ModulememberModuleID: joi.number().integer().allow(null),
  ModulememberOrder: joi.number().integer().min(0)
}).unknown(true);

const mutableKeys = [
  'ModulememberUserID', 'ModulememberModuleID', 'ModulememberOrder'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
});

export default { idSchema, createSchema, updateSchema };
