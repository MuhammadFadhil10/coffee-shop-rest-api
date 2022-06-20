import jwt from 'jsonwebtoken';

export const createAccessToken = (adminId) => {
	return jwt.sign({ adminId }, `${process.env.ADMIN_SECRET_ACCESS_TOKEN}`, {
		expiresIn: '1h',
	});
};

export const createRefreshToken = (adminId) => {
	return jwt.sign({ adminId }, `${process.env.ADMIN_SECRET_REFRESH_TOKEN}`, {
		expiresIn: '7d',
	});
};
