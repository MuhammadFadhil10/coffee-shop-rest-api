import jwt from 'jsonwebtoken';

export const createAccessToken = (adminId) => {
	return jwt.sign({ adminId }, `${process.env.SECRET_ACCESS_TOKEN}`, {
		expiresIn: '1h',
	});
};

export const createRefreshToken = (adminId) => {
	return jwt.sign({ adminId }, `${process.env.SECRET_REFRESH_TOKEN}`, {
		expiresIn: '7d',
	});
};
