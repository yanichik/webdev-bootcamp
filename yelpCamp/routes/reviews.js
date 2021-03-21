const express = require('express')
const router = express.Router({mergeParams: true});
const cookieParser = require('cookie-parser');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {campgroundSchema, reviewSchema} = require('../schemas');
const Campground = require('../models/campground');
const Review = require('../models/reviews');

const validateReview = (req, res, next) => {
	const {error} = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(item => item.message).join(',');
		throw new ExpressError(msg, 400);
	}
	next();
}

// Route template:
// /campgrounds/:id/reviews

router.put('', validateReview, catchAsync( async(req, res, next) => {
	const review = new Review(req.body.reviews)
	// console.log(review._id);
	await review.save();
	const campground = await Campground.findById(req.params.id);
	campground.reviews.push(review);
	await campground.save();
	req.flash('success', 'Thanks for reviewing us!');
	res.redirect(`/campgrounds/${req.params.id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
	const {id, reviewId} = req.params;
	await Campground.findByIdAndUpdate(id, {
		$pull: {
			reviews: reviewId
		}
	});
	await Review.findByIdAndDelete(reviewId);
	res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;