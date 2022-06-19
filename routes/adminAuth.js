import express from 'express';

const router = express.Router();

import adminValidate from '../validator/adminValidate.js';
import { adminRegister, activateAccount } from '../controllers/adminAuth.js';

// GET
router.get('/activation/:activationToken', activateAccount);

// POST
router.post(
	'/register',
	adminValidate.email('email'),
	adminValidate.password('password'),
	adminValidate.confirmPassword('confirmPassword'),
	adminRegister
);

export default router;
