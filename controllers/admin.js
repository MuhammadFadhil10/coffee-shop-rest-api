import { Admin } from '../models/admin.js';

export const getProducts = async (req, res, next) => {
	const [myProducts] = await Admin.getProducts();
	if (!myProducts[0]) {
		return res.json({
			status: 'not found',
			message: 'you have no products yet',
		});
	}
	return res.json({ status: 'success', products: myProducts[0] });
};

// export const addProduct = async (req, res, next) => {
// 	const { productName, productPrice } = req.body;
// 	console.log(req.file);

// 	try {
// 		await Admin.addProduct(productName, productPrice);
// 		return res
// 			.status(200)
// 			.json({ status: 'success', message: 'success add product' });
// 	} catch (error) {
// 		throw Error(error.message);
// 	}
// };
