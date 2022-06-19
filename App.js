import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

import adminAuth from './routes/adminAuth.js';
import productRoutes from './routes/products.js';

app.use(bodyParser.json());
app.use(cors());

app.use(productRoutes);
app.use('/admin', adminAuth);

app.listen(process.env.PORT || 5000, () => console.log('server running..'));
