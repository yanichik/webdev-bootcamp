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
const reviewController = require('../controllers/reviewController');

// Route template:
// /campgrounds/:id/reviews
router.route('/')
	.get(reviewController.renderReviewsPage)
	.put(isLoggedIn, validateReview, catchAsync(reviewController.newReview));

router.route('/:reviewId')
	.get(reviewController.renderSingleReview)
	.delete(isLoggedIn, isReviewAuthor, catchAsync(reviewController.deleteReview));

module.exports = router;