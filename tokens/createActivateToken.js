import User from '../models/user.js';
import { v4 } from 'uuid';

export const createActivateToken = (userEmail) => {
	const activateAccountToken = v4();
	return activateAccountToken;
};
