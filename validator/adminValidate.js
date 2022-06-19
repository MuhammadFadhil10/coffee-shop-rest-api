import { body } from 'express-validator';

export default class Validate {
	static email(fieldName) {
		return body(fieldName)
			.notEmpty()
			.withMessage('email required!')
			.isEmail()
			.withMessage('insert an valid email!');
	}
	static password(fieldName) {
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
}
