const bcrypt = require("bcryptjs");
const { layout } = require("../layout");
const { User } = require("../models");

// const signUp = (req, res) => {
// 	res.render("signup", {
// 		locals: {
// 			title: "Sign Up",
// 			message: "",
// 		},
// 		...layout,
// 	});
// };

const processSignUp = async (req, res) => {
	const { username, password, country, email } = req.body;
	console.log(username, password);
	if (username == '' || password == '') {
		console.log('username or password is blank', req.baseUrl);
		console.log("API: sending back 404");
		res.status(400).json({
			message: "Username or password is blank"
		});
	} else {
		const hash = bcrypt.hashSync(password, 10);
		try {
			const newUser = await User.create({
				username,
				hash,
				country,
				email,
			});
			console.log("API: user created successfully");
			res.status(200).json({
				message: "Success"
			});
	} catch (e) {
		console.log(e.name);
		if (e.name === "SequelizeUniqueConstraintError") {
			r}
			console.log("API: username already taken");
			res.status(400).json({
				message: "Username is already taken"
			});      
		}
	}
};

// const login = (req, res) => {
// 	res.render("login", {
// 		locals: {
// 			title: "Login",
// 			message: "",
// 		},
// 		...layout,
// 	});
// };

const processLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({
		where: {
			username
		}
	});
	if (user) {
		console.log('valid user...checking password');
		const isValid = bcrypt.compareSync(password, user.hash);
		if (isValid) {
			console.log('password is good!');
			req.session.user = {
			username,
			id: user.id
			};
			req.session.save(() => {
			console.log("API: login successful");
			res.status(200).json({
				message: "Login successful",
				id: user.id,
			});
			return;
			
			});

	} else {
		console.log('but password is wrong');
		console.log("API: invalid password for user");
		res.status(400).json({
			message: "Invalid username or password",
		});
		return;
		}
	} else {
		console.log('not a valid user');
		console.log("API: invalid username");
		res.status(400).json({
			message: "Invalid username or password",
		});
		return;
	}
};

const logout = (req, res) => {
	console.log('logging out...');
	req.session.destroy(() => {
		console.log("API: invalid username");
		res.status(200).json({
			message: "Logout successful",
		});
		return;
	});
};

const loginStatus = (req, res) => {
	console.log("API: checking login status");
	if (req.session.user) {
		res.status(200).json({
			status: "OK"
		});
	} else {
		res.status(400).json({
			status: "no active session"
		});
	}
};

module.exports = {
	// signUp,
	processSignUp,
	// login,
	processLogin,
	logout,
	loginStatus
};