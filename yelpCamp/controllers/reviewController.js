const {campgroundSchema, reviewSchema} = require('../schemas');
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const User = require('../models/user')
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware');

module.exports.renderReviewsPage = (req, res) => {
	// res.redirect('/campgrounds/' + req.params.id)
	req.flash('error', 'Reviews page not yet available. Working on it ...');
	res.redirect('/campgrounds/');
}

module.exports.renderSingleReview = (req, res) => {
	// res.redirect('/campgrounds/' + req.params.id)
	// res.send('/campgrounds/' + req.params.id);
	// res.send(req.params);
	req.flash('error', "You can view all of this campground's reviews here.");
	req.flash('error', 'Single review page not yet available. Working on it ...')
	res.redirect(`/campgrounds/${req.params.id}`);
}

module.exports.newReview = async(req, res, next) => {
	const review = new Review({...req.body.reviews, author: req.user._id});
	await review.save();
	const reviewAuthor = await Review.findById(review._id);
	const campground = await Campground.findById(req.params.id);
	campground.reviews.push(review);
	await campground.save();
	req.flash('success', 'Thanks for reviewing us!');
	res.redirect(`/campgrounds/${req.params.id}`);
}

module.exports.deleteReview = async (req, res) => {
	const {id, reviewId} = req.params;
	await Campground.findByIdAndUpdate(id, {
		$pull: {
			reviews: reviewId
		}
	});
	await Review.findByIdAndDelete(reviewId);
	req.flash('success', 'Review deleted successfully');
	res.redirect(`/campgrounds/${id}`);
}