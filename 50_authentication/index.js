const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('./models/user.js');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
// const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(express.urlencoded({extended: true}));
// app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/authLogin', {useNewUrlParser: true, useUnifiedTopology: true,
	useFindAndModify: false})
	.then(()=>{
		console.log('Mongoose Connected!');
	})
	.catch((err)=>{
		console.log('Something happened. See here:\n' + err);
	})

app.get('/register', (req, res) =>{
	res.render('register');
})

app.get('/login', (req, res) =>{
	res.render('login');
})

app.post('/logout', (req, res) =>{
	req.session.destroy();
	res.redirect('/login');
})

app.post('/register', async (req, res) => {
	const {username, password} = req.body;
	const hashedPw = await bcrypt.hash(password, 12);
	const newUser = new User({
		username,
		hashedPw
	})
	await newUser.save();
	req.session.user_id = newUser._id;
	res.send(newUser);
})

app.post('/login', async (req, res) => {
	const {username, password} = req.body;
	const user = await User.findOne({username});
	if (user) {
		const valid = await bcrypt.compare(password, user.hashedPw);
		if (valid) {
			req.session.user_id = user._id;
			res.send("Congrats, you're in!");
		}
		else {
			res.send("Incorrect. Try again.");
		}
	}
	else {
		res.send("Incorrect. Try again.");
	}
})

app.get('/secret', (req, res) =>{
	if (!req.session.user_id) {
		res.redirect('/login');
	}
	else {
		// res.send('Mother of all secrets!' + "; " + req.session.user_id);
		res.render('secret');
	}
})

app.listen(3000, ()=>{
	console.log("App running on port 3000!")
})