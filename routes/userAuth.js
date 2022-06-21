import express from 'express';

import userValidate from '../validator/userValidate.js';
import {
	userRegister,
	userLogin,
	activateAccount,
	newActivationToken,
	forgotPassword,
	updatePassword,
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
router.post('/account/reset-password', forgotPassword);
router.post(
	'/account/update-password',
	userValidate.registerPassword('newPassword'),
	updatePassword
);

export default router;
