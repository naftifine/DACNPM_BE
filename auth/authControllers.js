const userModel = require('../users/userModels');
const authMethod = require('./authMethods');

const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
	const username = req.body.Username.toLowerCase();
	const user = await userModel.getUser(username);
	if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
	else {
		const hashPassword = bcrypt.hashSync(req.body.Passw, SALT_ROUNDS);
		const newUser = {
			username: username,
			password: hashPassword,
            cccd: req.body.cccd,
            DateOfBirth: req.body.dateofbirth,
            Fullname: req.body.fullname,
            PhoneNumber: req.body.phonenumber,
		};
		const createUser = await userModel.createUser(newUser);
		if (!createUser) {
			return res
				.status(400)
				.send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
		}
		return res.send({
			username,
		});
	}
};

exports.login = async (req, res) => {	
	const username = req.body.Username.toLowerCase();
	const password = req.body.Passw;
	if (!username || !password) {
		return res.status(400).send("Username and password are required.");
	}
	console.log('sacasdas)');
	const user = await userModel.getUser(username);
	if (!user) {
		return res.status(401).send('Tên đăng nhập không tồn tại.');
	}
	const isPasswordValid = bcrypt.compareSync(password, user.Passw);
	if (!isPasswordValid) {
		return res.status(401).send('Mật khẩu không chính xác.');
	}
	// else return res.status(200).send(user.Username);
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
		await userModel.updateRefreshToken(user.Username, refreshToken);
	} else {
		refreshToken = user.refresh_token;
	}
	return res.json({
		msg: 'Đăng nhập thành công.',
		accessToken,
		refreshToken,
		user,
	});
}


exports.refreshToken = async (req, res) => {
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('Không tìm thấy access token.');
	}

	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Không tìm thấy refresh token.');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

	const decoded = await authMethod.decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Access token không hợp lệ.');
	}

	const username = decoded.payload.username; 

	const user = await userModel.getUser(username);
	if (!user) {
		return res.status(401).send('User không tồn tại.');
	}

	if (refreshTokenFromBody !== user.refresh_token) {
		return res.status(400).send('Refresh token không hợp lệ.');
	}

	const dataForAccessToken = {
		username,
	};

	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Tạo access token không thành công, vui lòng thử lại.');
	}
	return res.json({
		accessToken,
	});
};