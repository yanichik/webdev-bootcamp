const mongoose = require('mongoose')
const {Schema} = mongoose;
const Review = require('./reviews')
const User = require('./user')

const imageSchema = new Schema({
	path: String,
	filename: String
})

imageSchema.virtual('thumb').get(function(){
	return this.path.replace('/upload', '/upload/w_250,h_250');
})

const opts = { toJSON: { virtuals: true } };
const campSchema = new Schema({
	title: String,
	images: [imageSchema],
	price: Number,
	description: String,
	location: String,
	geometry: {
		type: {
		  type: String,
		  enum: ['Point'],
		  required: true
		},
		coordinates: {
		  type: [Number],
		  required: true
		}
	},
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
}, opts)

campSchema.virtual('properties.popupText').get(function(){
	return `
		<a href="/campgrounds/${this._id}">
			<strong>${this.title}</strong>
		</a>
		<p>${this.location}</p>`;
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