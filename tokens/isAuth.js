import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
	const token = req.get('Authorization').split(' ')[1];
	let decodeToken;
	try {
		decodeToken = jwt.verify(token, `${process.env.SECRET_ACCESS_TOKEN}`);
	} catch (error) {
		res
			.status(401)
			.json({ status: 'unauthorized', message: 'you are unauthorized' });
	}
	if (!decodeToken) {
		console.log('gagal');
		next();
	}
	next();
};
