export class Controller {
  constructor(validator, accessor) {
    this.validator = validator;
    this.accessor = accessor;
  }

  // Methods ---------------------------------------

  list = async (req, res) => {
    // Validate request
    // No validation required

    // Access data model
    const { isSuccess, result, message: accessorMessage } = await this.accessor.list();
    if(!isSuccess) return res.status(400).json({ message: accessorMessage });

    // Response to request
    res.json(result);
  };

  get = async (req, res) => {
    // Validate request
    const { isError, message: validatorMessage } = this.validator.validateID(req.params.id);
    if (isError) return res.status(400).json({ message: validatorMessage });

    // Access data model
    const { isSuccess, result, message: accessorMessage } = await this.accessor.read(req.params.id);
    if (!isSuccess) return res.status(404).json({ message: accessorMessage });
    
    // Response to request
    res.json(result);
  };

  post = async (req, res) => {
    // Validate request
    const { isError, message: validatorMessage } = this.validator.validateCreate(req.body);
    if (isError) return res.status(400).json({ message: validatorMessage });

    // Access data model
    const { isSuccess, result, message: accessorMessage } = await this.accessor.create(req.body);
    if (!isSuccess) return res.status(404).json({ message: accessorMessage });

    // Response to request
    res.json(result);
  };

  put = async (req, res) => {
    // Validate request
    const { isError, message: validatorMessage } = this.validator.validateUpdate({ id: req.params.id, obj: req.body });
    if (isError) return res.status(400).json({ message: validatorMessage });

    // Access data model
    const { isSuccess, result, message: accessorMessage } = await this.accessor.update(req.params.id, req.body);
    if (!isSuccess) return res.status(404).json({ message: accessorMessage });

    // Response to request
    res.json(result);
  };

  delete = async (req, res) => {
    // Validate request
    const { isError, message: validatorMessage } = this.validator.validateID(req.params.id);
    if (isError) return res.status(400).json({ message: validatorMessage });

    // Access data model
    const { isSuccess, message: accessorMessage } = await this.accessor.delete(req.params.id);
    if (!isSuccess) return res.status(404).json({ message: accessorMessage });

    // Response to request
    res.json({ message: accessorMessage });
  };

}

export default Controller;
