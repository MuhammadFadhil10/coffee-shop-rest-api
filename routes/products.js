import express from 'express';

const router = express.Router();

import {
	getAllProducts,
	addProducts,
	productsSort,
	searchProducts,
} from '../controllers/product.js';

// GET
// get all products
router.get('/products', getAllProducts);
// /products/search?value=asdaddsa
router.get(`/products/search`, searchProducts);

// POST
router.post('/add-product', addProducts);

export default router;
