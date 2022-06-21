import express from 'express';

import userValidate from '../validator/userValidate.js';
import {
	userRegister,
	userLogin,
	activateAccount,
	newActivationToken,
} from '../controllers/userAuth.js';

const router = express.Router();

// GET
router.get('/activation/:activationToken', activateAccount);

router.post(
	'/register',
	userValidate.registerName('name'),
	userValidate.registerEmail('email'),
	userValidate.registerPassword('password'),
	userValidate.confirmPassword('confirmPassword'),
	userRegister
);
router.post(
	'/login',
	userValidate.loginPassword('password'),
	userValidate.loginEmail('email'),
	userLogin
);
router.post('/activation/new-token/:email', newActivationToken);

export default router;
