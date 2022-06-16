import express from 'express';

const router = express.Router();

import { getAllProducts, addProducts } from '../controllers/product.js';

router.get('/products', getAllProducts);

router.post('/add-product/:productName/:productPrice', addProducts);

export default router;
