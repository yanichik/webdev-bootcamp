const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const userController = require('../controllers/userController');

const authenticateOptions = {
	// successRedirect: req.originalUrl || '/campgrounds',
	failureRedirect: '/login',
	failureFlash: true,
	successFlash: 'Welcome Back!'
}

router.route('/register')
	.get(catchAsync(userController.renderRegisterForm))
	.post(catchAsync(userController.register));

router.route('/login')
	.get(userController.renderLoginForm)
	.post(passport.authenticate('local', authenticateOptions), catchAsync(userController.login));

router.get('/logout', userController.logout);

module.exports = router;