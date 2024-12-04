const userModel = require('../users/userModels');

const authMethod = require('./authMethods');

exports.isAuth = async (req, res, next) => {

	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Phiên đăng nhập đã hết hạn!');
	}

	const user = await userModel.getUser(verified.payload.username);
	req.user = user;

	return next();
};
