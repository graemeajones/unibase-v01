// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  UsertypeID: joi.number().integer(),
  UsertypeName: joi.string().min(1)
});

const mutableKeys = [
  'UsertypeName'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
}).unknown(true);

export default { idSchema, createSchema, updateSchema };
