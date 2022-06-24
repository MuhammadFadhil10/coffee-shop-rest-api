import express from 'express';
import path from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import multer from 'multer';
import { v4 } from 'uuid';

const app = express();

import adminRoutes from './routes/admin.js';
import userAuthRoutes from './routes/userAuth.js';
import productRoutes from './routes/products.js';

app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
config();
app.use(
	cors({
		origin: `${process.env.ORIGIN}`,
	})
);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images');
	},
	filename: (req, file, cb) => {
		cb(null, v4() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

// const upload = multer({
// 	storage: storage,
// 	fileFilter: fileFilter,
// });

// multer
app.use(
	multer({
		storage: storage,
		fileFilter: fileFilter,
	}).single('image')
);

app.use(productRoutes);
app.use('/admin', adminRoutes);
app.use(userAuthRoutes);

app.listen(process.env.PORT || 5000, () => console.log('server running..'));
