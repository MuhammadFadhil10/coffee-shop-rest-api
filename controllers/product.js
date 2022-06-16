import Product from '../models/Product.js';

export const addProducts = async (req, res, next) => {
	const { productName, productPrice } = req.params;

	await Product.addProduct(productName, productPrice);

	return res
		.status(200)
		.json({ status: 'success', message: 'success add product!' });
};

export const getAllProducts = async (req, res, next) => {
	const [products] = await Product.fetchAll();

	if (!products[0]) {
		return res
			.status(404)
			.json({ status: 'not found', message: 'no products!' });
	}

	return res.status(200).json({ status: 'success', result: products });
};
