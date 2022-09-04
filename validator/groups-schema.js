// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  GroupID: joi.number().integer(),
  GroupName: joi.string().min(8),
  GroupProjectID: joi.number().integer().allow(null)
}).unknown(true);

const mutableKeys = [
  'GroupName', 'GroupProjectID'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
});

export default { idSchema, createSchema, updateSchema };
