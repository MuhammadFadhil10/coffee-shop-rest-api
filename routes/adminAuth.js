import express from 'express';

const router = express.Router();

import adminValidate from '../validator/adminValidate.js';
import {
	adminRegister,
	activateAccount,
	adminLogin,
} from '../controllers/adminAuth.js';

// GET
router.get('/activation/:activationToken', activateAccount);

// POST
// router.post(
// 	'/register',
// 	adminValidate.registerEmail('email'),
// 	adminValidate.registerPassword('password'),
// 	adminValidate.confirmPassword('confirmPassword'),
// 	adminRegister
// );

router.post(
	'/login',
	adminValidate.loginEmail('email'),
	adminValidate.loginPassword('password'),
	adminLogin
);

export default router;
