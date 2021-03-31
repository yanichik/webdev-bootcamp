const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');

const authenticateOptions = {
	successRedirect: '/campgrounds',
	failureRedirect: '/login',
	failureFlash: true,
	successFlash: 'Welcome Back!'
}

router.get('/register', catchAsync(async(req, res, next) =>{
	res.render('users/register');
}));

router.post('/register', catchAsync(async(req, res) =>{
	try{
		const {username, email, password} = req.body;
		const user = await new User({email, username});
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (e)=>{
			if (e) {return next(e);}
			req.flash('success', 'Welcome to Yelp Camp!');
			res.redirect('/campgrounds');
		});
	} catch(e) {
		req.flash('error', e.message);
		res.redirect('/register');
	}
}));

router.get('/login', (req, res) => {
	res.render('users/login');
})

router.post('/login', passport.authenticate('local', authenticateOptions), catchAsync(async(req, res) =>{
}));

router.get('/logout', (req, res, next)=> {
	req.logout();
	req.flash('success', 'You are logged out!');
	res.redirect('/login');
})
module.exports = router;