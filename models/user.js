import db from '../database/db.js';

export default class User {
	static register(name, email, password, activateToken) {
		return db.execute(
			`INSERT INTO user(name,email,password,activate_token) VALUES(?,?,?,?)`,
			[name, email, password, activateToken]
		);
	}
	static findByEmail(email) {
		return db.execute(`SELECT * FROM user WHERE email = '${email}'`);
	}
	static checkActivationToken(activateToken) {
		return db.execute(
			`SELECT * FROM user where activate_token = '${activateToken}'`
		);
	}
	static newActivationToken(newToken) {
		return db.execute(`UPDATE user SET activate_token = '${newToken}'`);
	}
	static updateAuth(email) {
		return db.execute(
			`UPDATE user SET is_auth = ${true}, activate_token = default`
		);
	}
}
