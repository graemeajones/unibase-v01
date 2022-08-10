// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  YearID: joi.number().integer(),
  YearName: joi.string().regex(/^\d{4}-\d{2}$/)
});

const mutableKeys = [ 'YearName' ];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
}).unknown(true);

export default { idSchema, createSchema, updateSchema };
