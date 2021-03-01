const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const dataCheck = require('./utils/dataCheck');
const Joi = require('joi');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
	console.log('DB Connected!');
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(morgan(':method :url :status :response-time ms'));
app.use(express.urlencoded({extended: true}));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	// res.send('Go YelpCamp!');
	res.render('home');
})

app.get('/campgrounds', catchAsync(async (req, res, next) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', {campgrounds});
}))

app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
})

app.post('/campgrounds', catchAsync(async (req, res, next) => {
	dataCheck(req.body);
	// if (!req.body.title){
	// 	throw new ExpressError("Need to include campground title. Try again.", 400);
	// }

	// const campgroundSchema = Joi.object({
	// 	title: Joi.string().required(),
	// 	price: Joi.number().min(0).required(),
	// 	location: Joi.string().required(),
	// 	description: Joi.string().min(2).max(30).required(),
	// 	url: Joi.string().uri().required()
	// })
	// const {error} = campgroundSchema.validate(req.body);
	// console.log(typeof(error.details));
	const campground = new Campground(req.body);
	await campground.save();
	res.redirect(`campgrounds/${campground._id}`);
}))

app.get('/campgrounds/:id', async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	res.render('campgrounds/show', {campground});
})

app.get('/campgrounds/:id/edit', async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	res.render('campgrounds/edit', {campground});
})

app.put('/campgrounds/:id', async (req, res) => {
	const {id} = req.params;
	// const {title, location} = req.body;
	// const campground = await Campground.findByIdAndUpdate(id, {title: title, location: location}, {new: true});
	const campground = await Campground.findByIdAndUpdate(id, req.body, {new: true});
	res.redirect(`/campgrounds/${id}`);
})

app.delete('/campgrounds/:id', async (req, res) => {
	const {id} = req.params;
	await Campground.findByIdAndDelete(id);
	res.redirect(`/campgrounds`);
})

app.use((err, req, res, next) => {
	const {message = "Something went wrong. Go back and try again.", statusCode = 500 } = err;
	// res.status(statusCode).send(message);
	res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
	console.log('Listening to YelpCamp on port 3000');
})








