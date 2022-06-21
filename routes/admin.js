import express from 'express';

const router = express.Router();

import { getProducts, addProduct } from '../controllers/admin.js';

router.get('/products', getProducts);

router.post('/add-product', addProduct);

export default router;
