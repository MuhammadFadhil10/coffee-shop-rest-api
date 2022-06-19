import express from 'express';

const router = express.Router();

import { adminRegister } from '../controllers/admin.js';

// POST
router.post('/register', adminRegister);

export default router;
