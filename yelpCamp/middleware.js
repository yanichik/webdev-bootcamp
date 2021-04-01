const isLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()){
		req.session.intendedUrl = req.originalUrl;
		// console.log(req.session.intendedUrl);
		req.flash('error', 'Need to be logged in to access this page.');
		return res.redirect('/login');
	}
	next();
}

module.exports = isLoggedIn;