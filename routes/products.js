import express from 'express';

const router = express.Router();

import {
	getAllProducts,
	productsSort,
	searchProducts,
} from '../controllers/product.js';

import { isAuth } from '../tokens/isAuth.js';

// GET
// get all products
router.get('/products', getAllProducts);
// /products/search?value=asdaddsa
router.get(`/products/search`, searchProducts);

// POST

export default router;
