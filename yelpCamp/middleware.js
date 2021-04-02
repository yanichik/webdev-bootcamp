const Campground = require('./models/campground');
const catchAsync = require('./utils/catchAsync');

const isLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()){
		req.session.intendedUrl = req.originalUrl;
		// console.log(req.session.intendedUrl);
		req.flash('error', 'Need to be logged in to access this page.');
		return res.redirect('/login');
	}
	next();
}

// Authorization check to ensure campground changes can ONLY be made by author
// Needs to run AFTER isLoggedIn & validateCampground middleware
const isAuthorLoggedIn = catchAsync(async (req, res, next) => {
	const {id} = req.params;
	const campground = await Campground.findById(id);
	if(!campground) {
		req.flash('error', 'We do not have a record of that campground. Would you like to create it?');
		return res.redirect('/campgrounds');
	}
	if(!campground.author.equals(req.user._id)){
		req.flash('error', 'You do not have access permission.');
		return res.redirect(`/campgrounds/${id}`);
	}
	next();
})

module.exports = isLoggedIn;
module.exports = isAuthorLoggedIn;