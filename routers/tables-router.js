// Imports ---------------------------------------
import { Router } from 'express';
import accessor from '../model/database/tables-accessor.js';
import Controller from '../controller/Controller.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// Configure validator --------------------------
const validator = null;

// Configure controller --------------------------
const controller = new Controller(validator, accessor);

// List records for a particular module id
router.get('/', controller.list);

export default router;
