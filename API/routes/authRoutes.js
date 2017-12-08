const express = require('express');
const router = express.Router();
const passport = require('passport');
const keys = require('../config/keys');
const validate = require('../middleware/validate');
const mongoose = require('mongoose');
const crypto = require('crypto');
const rateLimit = require('../middleware/limiter');
const User = require('../models/User');

router.post(
	'/signup',
	rateLimit('signup'),
	validate.checkUserAndPass,
	validate.getIPAgent,
	passport.authenticate('local.signup', {
		failureRedirect: `${keys.redirectDomain}/api/auth/signup_error`
	}),
	(req, res) => {
		res.status(200).json({
			username: req.user.username,
			admin: req.user.admin,
			error: {}
		});
	}
);

router.get('/signup_error', (req, res) => {
	rateLimit('signup'),
		res.json({
			loggedIn: false,
			error: {
				message: req.flash('error')
			}
		});
});

router.post(
	'/login',
	rateLimit('signin'),
	validate.checkUserAndPass,
	validate.getIPAgent,
	passport.authenticate('local.signin', {
		failureFlash: 'Invalid username or password.',
		failureRedirect: `${keys.redirectDomain}/api/auth/login_error`
	}),
	(req, res) => {
		req.session.signInAttempts = 0;
		res.status(200).json({
			username: req.user.username,
			admin: req.user.admin,
			error: {}
		});
	}
);

router.get('/login_error', (req, res) => {
	req.session.signInAttempts += 1;
	res.json({
		loggedIn: false,
		error: {
			message: req.flash('error'),
			attempts: req.session.signInAttempts
		}
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	res.status(200).json({ loggedIn: false });
});

router.get('/current_user', validate.isLoggedIn, async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.user.id });
		res.status(200).json({
			username: user.username,
			admin: user.admin
		});
	} catch (err) {
		res.status(500);
	}
});

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

router.get(
	'/google/callback',
	validate.getIPAgent,
	passport.authenticate('google'),
	(req, res) => {
		res.redirect(`${keys.redirectDomain}/user/dashboard`);
	}
);

router.get(
	'/facebook',
	passport.authenticate('facebook', {
		scope: ['email']
	})
);
router.get(
	'/facebook/callback',
	passport.authenticate('facebook'),
	(req, res) => {
		res.redirect(`${keys.redirectDomain}/user/dashboard`);
	}
);

router.get('/twitter', passport.authenticate('twitter'));

router.get(
	'/twitter/callback',
	validate.getIPAgent,
	passport.authenticate('twitter', {
		failureRedirect: '/user/login'
	}),
	(req, res) => {
		res.redirect(`${keys.redirectDomain}/user/dashboard`);
	}
);

module.exports = router;
