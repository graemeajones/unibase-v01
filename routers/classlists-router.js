// Imports ---------------------------------------
import { Router } from 'express';
import Validator from '../validator/Validator.js';
import schema from '../validator/classlists-schema.js';
import accessor from '../model/database/classlists-accessor.js';
import Controller from '../controller/Controller.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// Configure validator --------------------------
const validator = new Validator(schema);

// Configure controller --------------------------
const controller = new Controller(validator, accessor);

// List all records
router.get('/', controller.list);

// Read specific record
router.get('/:id', controller.get);

// Create record
router.post('/', controller.post);

// Update specific record
router.put('/:id', controller.put);

// Delete specific record
router.delete('/:id', controller.delete);


export default router;
