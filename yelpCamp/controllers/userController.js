const User = require('../models/user');

module.exports.renderRegisterForm = async(req, res, next) =>{
	res.render('users/register');
}

module.exports.register = async(req, res) =>{
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
}

module.exports.renderLoginForm = (req, res) => {
	res.render('users/login');
}

module.exports.login = async(req, res) =>{
	const intendedUrl = req.session.intendedUrl || '/campgrounds';
	delete req.session.intendedUrl;
	res.redirect(intendedUrl);
}

module.exports.logout = (req, res, next)=> {
	req.logout();
	req.flash('success', 'You are logged out!');
	res.redirect('/login');
}