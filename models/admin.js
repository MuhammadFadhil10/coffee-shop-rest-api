import db from '../database/db.js';

export class Admin {
	static register(email, password, activateToken) {
		return db.execute(
			`INSERT INTO admin(email,password,activate_token) VALUES(?,?,?)`,
			[email, password, activateToken]
		);
	}
	static checkActivationToken(activateToken) {
		return db.execute(
			`SELECT * FROM admin where activate_token = '${activateToken}'`
		);
	}
}
