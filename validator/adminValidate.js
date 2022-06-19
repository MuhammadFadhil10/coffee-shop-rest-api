import { body } from 'express-validator';

import { Admin } from '../models/admin.js';

export default class Validate {
	static registerEmail(fieldName) {
		return body(fieldName)
			.notEmpty()
			.withMessage('email required!')
			.isEmail()
			.withMessage('insert an valid email!')
			.custom(async (value) => {
				const [admin] = await Admin.findByEmail(value);
				if (admin[0]) {
					throw new Error('email already exist!');
				}
				return true;
			});
	}
	static registerPassword(fieldName) {
		return body(fieldName)
			.notEmpty()
			.withMessage('password required')
			.isLength({ min: 8 })
			.withMessage('password minimum 8 character!');
	}
	static confirmPassword(fieldName) {
		return body(fieldName).custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('confirm same password!');
			}
			return true;
		});
	}
	static loginEmail(fieldName) {
		return body(fieldName)
			.notEmpty()
			.withMessage('email required!')
			.isEmail()
			.withMessage('insert an valid email!')
			.custom(async (value) => {
				const [admin] = await Admin.findByEmail(value);
				if (!admin[0]) {
					throw new Error('email or password wrong!');
				}
				if (admin[0].is_auth === 0) {
					throw new Error(
						'your email is not verified, activate first in your inbox'
					);
				}
				return true;
			});
	}
	static loginPassword(fieldName) {
		return body(fieldName).notEmpty().withMessage('password required');
	}
}
