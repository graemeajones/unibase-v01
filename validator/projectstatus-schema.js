// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  ProjectstatusID: joi.number().integer(),
  ProjectstatusName: joi.string().min(3)
});

const mutableKeys = [
  'ProjectstatusName'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
}).unknown(true);

export default { idSchema, createSchema, updateSchema };
