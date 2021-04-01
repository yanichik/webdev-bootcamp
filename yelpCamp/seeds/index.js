const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cities = require('./cities');
const seedHelpers = require('./seedHelpers');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');

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

const randomX = array => Math.floor(Math.random() * array.length);

const seedDB =  async () =>{
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 30) + 5;
		const camp = new Campground({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${descriptors[randomX(descriptors)]} ${places[randomX(places)]}`,
			image: 'http://source.unsplash.com/collection/429524',
			description: "Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Cumque, nostrum.",
			price,
			author: '6064f82e26b9a672962764d7'
		});
		await camp.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close();
})