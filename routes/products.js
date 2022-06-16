import express from 'express';

const router = express.Router();

import {
	getAllProducts,
	addProducts,
	productsSort,
} from '../controllers/product.js';

// GET
// get all products sort from cheap || expensive
router.get(`/products/sort`, productsSort);
// get all products
router.get('/products', getAllProducts);

// POST
router.post('/add-product/:productName/:productPrice', addProducts);

export default router;
