import express from 'express';

const router = express.Router();

import { getProducts } from '../controllers/admin.js';
import { addProducts } from '../controllers/product.js';

router.get('/products', getProducts);

router.post('/add-product', addProducts);

export default router;
