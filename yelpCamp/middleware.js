const isLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()){
		req.flash('error', 'Need to be logged in to access this page.');
		return res.redirect('/login');
	}
	next();
}

module.exports = isLoggedIn;