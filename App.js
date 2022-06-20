import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

import adminAuthRoutes from './routes/adminAuth.js';
import adminRoutes from './routes/admin.js';
import productRoutes from './routes/products.js';

app.use(bodyParser.json());
app.use(cors());

app.use(productRoutes);
app.use('/admin', adminAuthRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT || 5000, () => console.log('server running..'));
