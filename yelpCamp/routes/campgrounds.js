const express = require('express')
const router = express.Router();
const cookieParser = require('cookie-parser');
const catchAsync = require('../utils/catchAsync');
const {campgroundSchema} = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const isLoggedIn = require('../middleware');

const validateCampground = (req, res, next) => {
	const {error} = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(item => item.message).join(',');
		throw new ExpressError(msg, 400);
	}
	next();
}


// USING this path starter for all paths in this doc: app.use('/campgrounds', campgroundsRoutes);
router.get('/', catchAsync(async (req, res, next) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', {campgrounds});
}))

router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
	// Server-side validation OPTION 1: dataCheck.js - self-made
	// dataCheck customizes responses depending on the missing data from the client
	
	// dataCheck(req.body);

	// Server-side validation OPTION 2: Joi API - via NPM
	// see middleware inside the router.post call above (2nd parameter is the error middleware)

	const campground = new Campground(req.body);
	await campground.save();
	req.flash('success', 'Created a new Campground!');
	res.redirect(`campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync( async (req, res) => {
	const campground = await Campground.findById(req.params.id).populate('reviews');
	if (!campground) {
		req.flash('error', `Cannot find campground "${req.params.id}"`);
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/show', {campground});
}))

router.get('/:id/edit', isLoggedIn, async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	if (!campground) {
		req.flash('error', `Cannot find campground "${req.params.id}"`);
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/edit', {campground});
})

router.put('/:id', isLoggedIn, validateCampground, async (req, res) => {
	const {id} = req.params;
	console.log(req.body);
	// const {title, location} = req.body;
	// const campground = await Campground.findByIdAndUpdate(id, {title: title, location: location}, {new: true});
	const campground = await Campground.findByIdAndUpdate(id, req.body, {new: true});
	req.flash('success', `Successfully edited campground "${campground.title}"`);
	res.redirect(`/campgrounds/${id}`);
})

router.delete('/:id', isLoggedIn, async (req, res) => {
	const {id} = req.params;
	const deletedCampground = await Campground.findByIdAndDelete(id);
	req.flash('success', `Successfully deleted campground "${deletedCampground.title}"`);
	res.redirect(`/campgrounds`);
})

module.exports = router;




