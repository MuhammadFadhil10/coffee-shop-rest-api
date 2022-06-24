import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

const app = express();

import adminRoutes from './routes/admin.js';
import userAuthRoutes from './routes/userAuth.js';
import productRoutes from './routes/products.js';

app.use(bodyParser.json());
config();
app.use(
	cors({
		origin: `${process.env.ORIGIN}`,
	})
);

app.use(productRoutes);
app.use('/admin', adminRoutes);
app.use(userAuthRoutes);

app.listen(process.env.PORT || 5000, () => console.log('server running..'));
