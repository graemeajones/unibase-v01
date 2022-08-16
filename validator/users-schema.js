// Imports ---------------------------------------
import joi from 'joi';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  UserID: joi.number().integer(),
  UserFirstname: joi.string().min(1),
  UserLastname: joi.string().min(1),
  UserEmail: joi.string().email(),
  UserPassword: joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
  UserRegistered: joi.boolean(),
  UserUsertypeID: joi.number().integer().allow(null),
  UserYearID: joi.number().integer().allow(null),
  UserLevel: joi.number().integer().min(3).max(7).allow(0),
  UserImageURL: joi.string().uri()
}).unknown(true);

const mutableKeys = [
  'UserFirstname', 'UserLastname', 'UserEmail', 'UserPassword', 'UserRegistered', 'UserUsertypeID', 'UserLevel', 'UserImageURL'
];

const createSchema = objSchema.and(...mutableKeys);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableKeys)
});

export default { idSchema, createSchema, updateSchema };
