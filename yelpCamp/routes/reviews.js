const express = require('express')
const router = express.Router({mergeParams: true});
const cookieParser = require('cookie-parser');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {campgroundSchema, reviewSchema} = require('../schemas');
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const User = require('../models/user')
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware');

// Route template:
// /campgrounds/:id/reviews

router.get('/', (req, res) => {
	// res.redirect('/campgrounds/' + req.params.id)
	res.send('/campgrounds/' + req.params.id);
})

router.get('/:reviewId', (req, res) => {
	res.redirect('/campgrounds/' + req.params.id)
	// res.send('/campgrounds/' + req.params.id);
	// res.send(req.params);
})

router.put('/', isLoggedIn, validateReview, catchAsync( async(req, res, next) => {
	const review = new Review({...req.body.reviews, author: req.user._id});
	await review.save();
	const reviewAuthor = await Review.findById(review._id);
	const campground = await Campground.findById(req.params.id);
	campground.reviews.push(review);
	await campground.save();
	req.flash('success', 'Thanks for reviewing us!');
	res.redirect(`/campgrounds/${req.params.id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
	const {id, reviewId} = req.params;
	await Campground.findByIdAndUpdate(id, {
		$pull: {
			reviews: reviewId
		}
	});
	await Review.findByIdAndDelete(reviewId);
	req.flash('success', 'Review deleted successfully');
	res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;