if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// require('dotenv').config();

// console.log(process.env.SECRET);
// console.log(process.env.API_KEY);

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Review = require('./models/reviews');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const dataCheck = require('./utils/dataCheck');
const Joi = require('joi');
const {campgroundSchema, reviewSchema} = require('./schemas');
const usersRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

// const dbURL = process.env.ATLAS_URL;
const dbURL = process.env.ATLAS_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

app.use(helmet());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://code.jquery.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/yanichik/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
	console.log('DB Connected!');
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const secret = process.env.SESSION_SECRET || 'notsomesecret';

const store = MongoStore.create({
	mongoUrl: dbURL,
	touchAfter: 24 * 60 * 60,	// 24hrs until next session update
	crypto: {
		secret
	}
})

store.on('error', ()=>{
	console.log("SESSION STORE ERROR: ", e);
})

const sessionConfig = {
	store,
	name: 'yelpCampSession',
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 3600 * 24 * 7,
		maxAge: 1000 * 3600 * 24 * 7
	}
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// define global values that are run at every request - have access to them inside static files
app.use( (req, res, next) => {
	// console.log(req.session);
	// Passport creates req.user to hold logged-in user's info (id + username + email)
	res.locals.loggedInUser = req.user;
	// console.log(req.user);
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	res.locals.url = req.originalUrl;
	next();
})

// app.use(morgan(':method :url :status :response-time ms'));
app.use(express.urlencoded({extended: true}));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

// routes middleware: location MUST BE AFTER all of the other required middleware for the routes to function
app.use('/', usersRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);

// app.get('/fakeUser', async (req, res, next) => {
// 	const user = new User({email: 'fakeUser@gmail.com', username: 'faker'});
// 	const newUser = await User.register(user, 'faky');
// 	res.send(newUser);
// })

app.get('/', (req, res) => {
	// res.send('Go YelpCamp!');
	res.render('home');
})

app.use((err, req, res, next) => {
	const {message = "Something went wrong. Go back and try again.", statusCode = 500 } = err;
	// res.status(statusCode).send(message);
	res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
	console.log('Listening to YelpCamp on port 3000');
})








