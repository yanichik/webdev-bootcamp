const express = require('express')
const router = express.Router();
const cookieParser = require('cookie-parser');
const catchAsync = require('../utils/catchAsync');
const {campgroundSchema} = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {
	const {error} = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(item => item.message).join(',');
		throw new ExpressError(msg, 400);
	}
	next();
}

router.get('/', catchAsync(async (req, res, next) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', {campgrounds});
}))

router.get('/new', (req, res) => {
	res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
	// Server-side validation OPTION 1: dataCheck.js - self-made
	// dataCheck customizes responses depending on the missing data from the client
	
	// dataCheck(req.body);

	// Server-side validation OPTION 2: Joi API - via NPM
	// see middleware inside the router.post call above (2nd parameter is the error middleware)

	const campground = new Campground(req.body);
	await campground.save();
	res.redirect(`campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync( async (req, res) => {
	const campground = await Campground.findById(req.params.id).populate('reviews');
	res.render('campgrounds/show', {campground});
}))

router.get('/:id/edit', async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	res.render('campgrounds/edit', {campground});
})

router.put('/:id', validateCampground, async (req, res) => {
	const {id} = req.params;
	console.log(req.body);
	// const {title, location} = req.body;
	// const campground = await Campground.findByIdAndUpdate(id, {title: title, location: location}, {new: true});
	const campground = await Campground.findByIdAndUpdate(id, req.body, {new: true});
	res.redirect(`/campgrounds/${id}`);
})

router.delete('/:id', async (req, res) => {
	const {id} = req.params;
	await Campground.findByIdAndDelete(id);
	res.redirect(`/campgrounds`);
})

module.exports = router;




