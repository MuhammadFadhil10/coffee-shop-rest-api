import { v4 } from 'uuid';

import db from '../database/db.js';

export default class Product {
	static fetchAll() {
		return db.execute(`SELECT * FROM products`);
	}

	static addProduct(productName, productPrice) {
		return db.execute(`INSERT INTO products(id,name,price) VALUES(?,?,?)`, [
			v4(),
			productName,
			productPrice,
		]);
	}
}
