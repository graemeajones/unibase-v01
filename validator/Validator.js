class Validator {
  constructor(schema) {
    this.idSchema = schema.idSchema;
    this.createSchema = schema.createSchema;
    this.updateSchema = schema.updateSchema;
  }

  // Helpers ---------------------------------------
  reportErrors = (errors) => errors.details.map((detail) => detail.message);

  validate(schema, value) {
    const { error } = schema.validate(value, { abortEarly: false, escapeHtml: true });
    return error
      ? { isError: true, message: this.reportErrors(error) }
      : { isError: false, message: null };
  }

  // Methods ---------------------------------------
  validateID = (id) => this.validate(this.idSchema, id);
  validateCreate = (obj) => this.validate(this.createSchema, obj);
  validateUpdate = (obj) => this.validate(this.updateSchema, obj);

}

export default Validator;
