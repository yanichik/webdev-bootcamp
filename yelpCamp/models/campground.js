const mongoose = require('mongoose')
const {Schema} = mongoose;
const Review = require('./reviews')

const campSchema = new Schema({
	title: String,
	image: String,
	price: Number,
	description: String,
	location: String,
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
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