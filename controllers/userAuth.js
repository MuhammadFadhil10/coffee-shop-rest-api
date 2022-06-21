import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

import {
	createAccessToken,
	createRefreshToken,
} from '../tokens/createToken.js';
import { createActivateToken } from '../tokens/createActivateToken.js';

import User from '../models/user.js';
import { Email } from '../models/sendEmail.js';

export const userRegister = async (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;
	const error = validationResult(req);

	if (!error.isEmpty()) {
		const errorMessage = error.array().map((msg) => msg.msg);
		return res.json({ status: 'error', message: errorMessage });
	}
	try {
		const hashedPassword = await bcrypt.hash(password, 12);
		const activateAccountToken = createActivateToken();
		await User.register(name, email, hashedPassword, activateAccountToken);
		Email.send(email, activateAccountToken);
		return res.status(200).json({
			status: 'success',
			message:
				'success create account! you have to activate your account before login, check your email inbox or spam and visit the link',
		});
	} catch (error) {
		throw new Error(error.message);
	}
};

export const activateAccount = async (req, res, next) => {
	const { activationToken } = req.params;
	const [user] = await User.checkActivationToken(activationToken);
	if (!user[0]) {
		return res.json({
			status: 'error',
			message: 'your token is not valid or expired!',
		});
	}
	await User.updateAuth(user[0].email);
	return res.json({ status: 'success', message: 'your account is active!' });
};

export const newActivationToken = async (req, res, next) => {
	const { email } = req.params;
	const [user] = await User.findByEmail(email);
	if (!user[0]) {
		return res.json({ status: 'error', message: 'You are not registered!' });
	}
	const [userActive] = await User.checkActivationToken(user[0].activate_token);
	if (user[0]) {
		return res.json({
			status: 'error',
			message: 'Your account already active, just login',
		});
	}
	const newActivationToken = createActivateToken();
	await User.newActivationToken(newActivationToken);
	Email.send(email, newActivationToken);
	return res.json({
		status: 'success',
		message: 'New link for activation token has been sent yo your email',
	});
};

export const userLogin = async (req, res, next) => {
	const { password, email } = req.body;
	const error = validationResult(req);
	const errorMessage = error.array().map((msg) => msg.msg);

	if (!error.isEmpty()) {
		return res.json({ status: 'error', message: errorMessage });
	}
	const [user] = await User.findByEmail(email);
	const isMatch = await bcrypt.compare(password, user[0].password);
	if (!isMatch) {
		return res.json({ status: 'error', message: 'email or password wrong' });
	}

	const userAccessToken = createAccessToken(user[0].user);
	const userRefreshToken = createRefreshToken(user[0].user_id);
	return res.json({
		status: 'success',
		message: 'Login success!',
		token: userAccessToken,
		refreshToken: userRefreshToken,
	});
};
