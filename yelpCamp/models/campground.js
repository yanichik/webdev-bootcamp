const mongoose = require('mongoose')
const {Schema} = mongoose;
const Review = require('./reviews')
const User = require('./user')

const campSchema = new Schema({
	title: String,
	images: [
		{
		path: String,
		filename: String
		}
	],
	price: Number,
	description: String,
	location: String,
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	],
	author:
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
})

campSchema.post('findOneAndDelete', async function(camp){
	if (camp) {
		const res = await Review.deleteMany({
			_id: {
				$in: camp.reviews
			}
		})
		console.log(res);
	}
})

module.exports = mongoose.model('Campground', campSchema);