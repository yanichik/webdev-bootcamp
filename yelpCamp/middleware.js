const Campground = require('./models/campground');
const Review = require('./models/reviews');
const catchAsync = require('./utils/catchAsync');
const {campgroundSchema, reviewSchema} = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) =>{
	if(!req.isAuthenticated()){
		req.session.intendedUrl = req.originalUrl;
		// console.log(req.session.intendedUrl);
		req.flash('error', 'Need to be logged in to access this page.');
		return res.redirect('/login');
	}
	return next();
}

// Authorization check to ensure campground changes can ONLY be made by author
// Needs to run AFTER isLoggedIn & validateCampground middleware
module.exports.isAuthorLoggedIn = catchAsync( async(req, res, next) =>{
	const {id} = req.params;
	const campground = await Campground.findById(id);
	if(!campground) {
		req.flash('error', 'We do not have a record of that campground. Would you like to create it?');
		return res.redirect('/campgrounds');
	}
	if(req.user._id && !campground.author.equals(req.user._id)){
		req.flash('error', 'You do not have access permission.');
		return res.redirect(`/campgrounds/${id}`);
	}
	return next();
})

// Authorization check to ensure review CAN ONLY BE DELETED by author
// Needs to run AFTER isLoggedIn
module.exports.isReviewAuthor = catchAsync( async(req, res, next) =>{
	const {id, reviewId} = req.params;
	const review = await Review.findById(reviewId);
	// console.log(review);
	if(!review) {
		req.flash('error', 'Cannot delete a non-existing review.');
		return res.redirect(`/campgrounds/${id}`);
	}
	if(req.user._id && !review.author.equals(req.user._id)){
		req.flash('error', 'You do not have permission to delete this review.');
		return res.redirect(`/campgrounds/${id}`);
	}
	return next();
})

// Validations defined & executed with Joi [separate from the campground schema defined in models]
// Validations ONLY for PUT/POST requests -> need req.body to be passed in
module.exports.validateCampground = (req, res, next) => {
	const {error} = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(item => item.message).join(',');
		throw new ExpressError(msg, 400);
	}
	next();
}

module.exports.validateReview = (req, res, next) => {
	const {error} = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(item => item.message).join(',');
		throw new ExpressError(msg, 400);
	}
	next();
}