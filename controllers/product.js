import Product from '../models/Product.js';
import { v4 } from 'uuid';

export const addProducts = async (req, res, next) => {
	const { productName, productPrice, productDesc } = req.body;
	const imageUrl =
		req.protocol +
		'://' +
		req.get('host') +
		'/' +
		req.file.path.replace('\\', '/').replace('\\', '/');

	await Product.createProduct(
		v4(),
		imageUrl,
		productName,
		productPrice,
		productDesc
	);

	return res
		.status(200)
		.json({ status: 'success', message: 'success add product!' });
};

export const getAllProducts = async (req, res, next) => {
	const { sort, page, show } = req.query;
	const [products] = await Product.fetchAll(sort, page, show);

	if (!products[0]) {
		return res.json({
			status: 'not found',
			message: 'Look like there is no product available:(',
		});
	}

	return res.status(200).json({
		status: 'success',
		totalProducts: products.length,
		result: products,
	});
};

export const productsSort = async (req, res, next) => {
	const sortBy = req.query.by;
	const { ascending, descending } = req.query;

	if ((sortBy && ascending) || (sortBy && descending)) {
		try {
			if (sortBy === 'price' && ascending) {
				const [products] = await Product.sortProductAsc();
				return res.json({ status: 'success', result: products });
			}
			const [products] = await Product.sortProductDesc();
			return res.json({ status: 'success', result: products });
		} catch (error) {
			throw new Error(error.message);
		}
	} else {
		return res.json({
			status: 'error',
			message: `you need url query parameter to sort products, 
				e.g /products/sort?by=price&descending=true`,
		});
	}
};

export const searchProducts = async (req, res, next) => {
	const { value, letter, sort } = req.query;
	let products;
	if ((!value && !letter) || (value && letter)) {
		return res.json({ status: 'error', message: 'query error' });
	}

	[products] = await Product.searchProducts(value, letter, sort);

	if (!products[0]) {
		return res
			.status(404)
			.json({ status: '404 not found!', message: 'cannot find product' });
	}
	return res.json({ status: 'success', result: products });
};
