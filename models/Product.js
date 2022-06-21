import db from '../database/db.js';

export default class Product {
	static fetchAll(sort, page, show) {
		if (sort === 'price-lowest') {
			return db.execute(`SELECT * FROM products ORDER BY price ASC LIMIT 10 `);
		} else if (sort === 'price-highest') {
			return db.execute(`SELECT * FROM products ORDER BY price DESC LIMIT 10 `);
		}
		return db.execute(`SELECT * FROM products LIMIT 10`);
	}

	static sortProductAsc() {
		return db.execute(`SELECT * FROM products ORDER BY price ASC`);
	}

	static sortProductDesc() {
		return db.execute(`SELECT * FROM products ORDER BY price DESC`);
	}

	static searchProducts(value, letter, sort) {
		if (sort) {
			// sort value search
			if (value && sort === 'price-lowest') {
				return db.execute(
					`SELECT * FROM products WHERE name LIKE '%${value}%'
					 ORDER BY price ASC LIMIT 10`
				);
			} else if (value && sort === 'price-highest') {
				return db.execute(
					`SELECT * FROM products WHERE name LIKE '%${value}%'
					 ORDER BY price DESC LIMIT 10`
				);
			}
			// sort letter search
			if (letter && sort === 'price-lowest') {
				return db.execute(
					`SELECT * FROM products WHERE name LIKE '${letter}%'
					 ORDER BY price ASC LIMIT 10`
				);
			} else if (letter && sort === 'price-highest') {
				return db.execute(
					`SELECT * FROM products WHERE name LIKE '${letter}%'
					 ORDER BY price DESC LIMIT 10`
				);
			}
		} else {
			// if no sort query
			return value
				? db.execute(`SELECT * FROM products WHERE name LIKE '%${value}%'`)
				: db.execute(`SELECT * FROM products WHERE name LIKE '${letter}%'`);
		}
	}
	// static searchProductsLetter(letter, show) {
	// 	return db.execute(
	// 		`SELECT * FROM products WHERE name LIKE '${letter}%'${
	// 			page ? 'LIMIT ' + `${(show, page)}` : 'LIMIT ' + show
	// 		}`
	// 	);
	// }
}
