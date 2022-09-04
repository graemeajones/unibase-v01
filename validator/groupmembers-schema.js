// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  GroupmemberID: joi.number().integer(),
  GroupmemberUserID: joi.number().integer().allow(null),
  GroupmemberGroupID: joi.number().integer().allow(null)
}).unknown(true);

const mutableKeys = [
  'GroupmemberUserID', 'GroupmemberGroupID'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
});

export default { idSchema, createSchema, updateSchema };
