const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personApp', 
	{useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
			console.log('Connected!');
		})
		.catch((err) => {
			console.log('Something Happened: \n');
			console.log(err);
		})

const personSchema = new mongoose.Schema({
	first: {
		type: String,
		required: true
	},
	last: {
		type: String,
		required: true
	}
})

personSchema.pre('insertMany', async function(){
	console.log("You're about to insert MANY!!!" + '\n' +
		"But before you do that, here's what you have now:");
	this.find().then(p => console.log(p));
})

personSchema.post('insertMany', async function(){
	console.log("You just inserted MANY!!!" + '\n' +
		"NOW you have now this");
	this.find().then(p => console.log(p));
})

const Person = mongoose.model('Person', personSchema);