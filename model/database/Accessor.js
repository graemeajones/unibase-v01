class Accessor {
  constructor(model) {
    this.dbConn = model.dbConn;
    this.table = model.dbStructure.table;
    this.idField = model.dbStructure.idField;
    this.fields = model.dbStructure.fields;
    this.extendedTable = model.dbStructure.extendedTable;
    this.extendedFields = model.dbStructure.extendedFields;
    this.conformObjToRecord = model.dbConformance.objToRecord;
    this.conformRecordToObj = model.dbConformance.recordToObj;
  }

  // Helpers ---------------------------------------

  // Construct string from object with structure "SET field1=:field1, ..., fieldN=:fieldN "
  buildSetTemplate = (obj) => Object.keys(obj).reduce((prev, curr, index) => prev + `${curr}=:${curr}` + ((index === Object.keys(obj).length - 1) ? " " : ", "), "SET ");

  // Methods ---------------------------------------

  create = async (obj) => {
    const record = this.conformObjToRecord(obj);
    const sql = `INSERT INTO ${this.table} ${this.buildSetTemplate(record)}`;
    try {
      const status = await this.dbConn.query(sql, record);
      const {isSuccess, result, message } = await this.read(status[0].insertId);
      return isSuccess
        ? { isSuccess: true, result: this.conformRecordToObj(result), message: "Record successfully inserted" }
        : { isSuccess: false, result: null, message: `Failed to recover inserted record: ${message}` };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to insert record: ${error}` };
    }
  };

  read = async (id) => {
    const sql = `SELECT ${this.extendedFields} FROM ${this.extendedTable} WHERE ${this.idField}=${id}`;
    try {
      const [result] = await this.dbConn.query(sql);
      return result.length === 0
        ? { isSuccess: false, result: null, message: `Failed to recover record ${id}` }
        : { isSuccess: true, result: this.conformRecordToObj(result[0]), message: "Record successfully recovered" };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to recover record: ${error}` };
    }
  };

  update = async (id, obj) => {
    const record = this.conformObjToRecord(obj);
    const sql = `UPDATE ${this.table} ${this.buildSetTemplate(record)} WHERE ${this.idField}=${id}`;
    try {
      const status = await this.dbConn.query(sql, record);
      if (status[0].affectedRows === 0)
        return { isSuccess: false, result: null, message: `Failed to update record: no rows affected` };
      const { isSuccess, result, message } = await this.read(id); 
      return isSuccess
        ? { isSuccess: true, result: this.conformRecordToObj(result), message: "Record successfully updated" }
        : { isSuccess: false, result: null, message: `Failed to recover updated record: ${message}` };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to update record: ${error}` };
    }
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.table} WHERE ${this.idField}=${id}`;
    try {
      const status = await this.dbConn.query(sql);
      return status.affectedRows === 0
        ? { isSuccess: false, result: null, message: `Failed to delete record ${id}` }
        : { isSuccess: true, result: null, message: "Record successfully deleted" };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to delete record: ${error}` };
    }
  };

  list = async () => {
    const sql = `SELECT ${this.extendedFields} FROM ${this.extendedTable}`;
    try {
      const [result] = await this.dbConn.query(sql);
      return result.length === 0
        ? { isSuccess: false, result: null, message: "No records found" }
        : { isSuccess: true, result: result.map(this.conformRecordToObj), message: "Record successfully recovered" };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to recover records: ${error}` };
    }
  };

}

export default Accessor;
