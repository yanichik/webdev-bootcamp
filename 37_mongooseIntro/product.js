const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopApp',
	{useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
			console.log("CONNECTED")
		})
		.catch(err => {
			console.log("What a mistake: \n", err)
		})

const shopScheme = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	inventory: {
		type: Number,
		required: true
	}
})