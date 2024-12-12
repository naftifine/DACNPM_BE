const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const adminModel = require('./adminModels');
const authMethod = require('../auth/authMethods');

exports.login = async (req, res) => {	
	const username = req.body.username.toLowerCase();
	const password = req.body.password;
	if (!username || !password) {
		return res.status(400).send("Username and password are required.");
	}
	const user = await adminModel.getUser(username);
	if (!user) {
		return res.status(401).send('Tên đăng nhập không tồn tại.');
	}
	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).send('Mật khẩu không chính xác.');
	}
	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	
	const dataForAccessToken = {
		username: user.Username,
	};

	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.send('Đăng nhập không thành công, vui lòng thử lại.');
	}

	let refreshToken = randToken.generate(64);

	if (!user.refresh_token) {
		await adminModel.updateRefreshToken(user.username, refreshToken);
	} else {
		refreshToken = user.refresh_token;
	}
	return res.json({
		msg: 'Đăng nhập thành công.',
		accessToken,
		refreshToken,
	});
}