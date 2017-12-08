var useragent = require('useragent');
useragent(true);

var moment = require('moment');
var requestIp = require('request-ip');

exports.checkUserAndPass = (req, res, next) => {
	req.checkBody({
		username: {
			notEmpty: true,
			matches: {
				options: [/^[a-z0-9_-]{4,20}$/i]
			},
			isLength: {
				options: [{ min: 4, max: 20 }],
				errorMessage: 'Username Must be between 4 and 20 characters'
			},
			errorMessage:
				'You must enter a valid username with 4-20 characters, no special characters allowed'
		}
	});
	req.checkBody({
		password: {
			notEmpty: true,
			matches: {
				options: [
					/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,]).{6,20}$/,
					req.body.confirm_password
				]
			},
			isLength: {
				options: [{ min: 6, max: 20 }],
				errorMessage: 'Password Must be between 6 and 20 characters'
			},
			errorMessage:
				'You must enter a valid password with between 6 and 20 characters, at least 1 capital, 1 number, and 1 special character'
		}
	});
	next();
};

exports.getIPAgent = (req, res, next) => {
	var agent = useragent.parse(req.headers['user-agent']);

	req.ipAgent = {
		date: moment(),
		ipaddress: req.clientIp,
		os: agent.os,
		device: agent.device,
		browser: agent.toAgent()
	};
	next();
};

exports.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(200).json({ loggedIn: false });
};

exports.notLoggedIn = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};
exports.isAdmin = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.admin) {
			return next();
		}
	}
	res.status(401).send('unauthorized');
};

exports.isAdminBool = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.admin) {
			return true;
		}
	}
	return false;
};
