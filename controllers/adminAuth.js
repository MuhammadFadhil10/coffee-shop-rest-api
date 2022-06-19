import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

import { Admin } from '../models/admin.js';

export const adminRegister = async (req, res, next) => {
	const { email, password, confirmPassword } = req.body;
	const error = validationResult(req);

	if (!error.isEmpty()) {
		const errorMessage = error.array().map((msg) => msg.msg);
		return res.status(401).json({ status: 'error', message: errorMessage });
	}
	try {
		const hashedPassword = await bcrypt.hash(password, 12);
		const activateAccountToken = v4();
		await Admin.register(email, hashedPassword, activateAccountToken);

		return res
			.status(200)
			.json({ status: 'success', message: 'success create account!' });
	} catch (error) {
		error.status(500);
		throw new Error(error.message);
	}
};

export const activateAccount = async (req, res, next) => {
	const { activationToken } = req.params;
	const [admin] = await Admin.checkActivationToken(activationToken);
	if (!admin[0]) {
		return res
			.status(401)
			.json({
				status: 'error',
				message: 'your token is not valid or expired!',
			});
	}
};
