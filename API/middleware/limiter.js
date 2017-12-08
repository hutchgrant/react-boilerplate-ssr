var RateLimit = require('express-rate-limit');

function handler(req, res) {
	if (this.headers) {
		res.setHeader('Retry-After', Math.ceil(this.windowMs / 1000));
	}
	return res.status(200).json({
		error: {
			message: [this.message]
		}
	});
}

module.exports = type => {
	switch (type) {
		case 'signup':
			return new RateLimit({
				windowMs: 60 * 60 * 1000, // 1 hour window
				delayAfter: 3, // begin slowing down responses after the first request
				delayMs: 3 * 1000, // slow down subsequent responses by 3 seconds per request
				max: 10, // start blocking after 10 requests
				message:
					'Too many registration attempts, please try again after an hour',
				handler
			});
		case 'signin':
			return new RateLimit({
				windowMs: 60 * 60 * 1000, // 1 hour window
				delayAfter: 3,
				delayMs: 3 * 1000,
				max: 15,
				message:
					'Too many signin attempts, please try again after an hour',
				handler
			});
		default:
			return new RateLimit({
				windowMs: 60 * 60 * 1000, // 1 hour window
				delayAfter: 0,
				delayMs: 3 * 1000,
				max: 1000,
				message:
					'Too many API requests, please try again after an hour',
				handler
			});
	}
};
