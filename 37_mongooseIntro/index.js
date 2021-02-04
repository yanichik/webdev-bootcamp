const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', 
	{useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
			console.log("CONNECTED!!!")
		})
		.catch(err =>{
			console.log("OOOPS, Error!")
			console.log(err)
		})

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	score: {
		type: Number,
		required: true
	}, 
	rating: {
		type: String,
		required: true
	}
})

movieSchema.methods.changeScore = function(newScore){
	this.score = newScore;
	return this;
}

movieSchema.statics.resetScores = function(){
	return this.updateMany({}, {score: 0});
}

// in mongoose.model('Movie'), the 'Movie' is 
//converted to 'movies' (lowercase & plural) 
//and that is the name of the collection

const Movie = mongoose.model('Movie', movieSchema)
const miracle = new Movie({
	title: "Miracle on Ice",
	year: 2003,
	score: 9,
	rating: 'PG-13'
})

Movie.insertMany([
	{
		title: "Aladin",
		year: 1996,
		score: 9.5,
		rating: 'PG'
	},
	{
		title: "101 Dalmations",
		year: 1964,
		score: 8,
		rating: 'PG'
	},
	{
		title: "Armaggeden",
		year: 2005,
		score: 8.5,
		rating: 'R'
	},
	{
		title: "Blair Witch Project",
		year: 1999,
		score: 6,
		rating: 'Mature'
	}
])