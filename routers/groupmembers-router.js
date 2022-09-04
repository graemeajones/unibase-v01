// Imports ---------------------------------------
import { Router } from 'express';
import Validator from '../validator/Validator.js';
import schema from '../validator/groupmembers-schema.js';
import accessor from '../model/database/groupmembers-accessor.js';
import Controller from '../controller/Controller.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// Configure validator --------------------------
const validator = new Validator(schema);

// Configure controller --------------------------
const controller = new Controller(validator, accessor);

// List records for a particular module id
router.get('/:id', controller.listWithID);

export default router;
