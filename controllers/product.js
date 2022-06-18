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
			message:
				'you need url query parameter to sort products, e.g /products/sort?by=price&descending=true',
		});
	}
};
