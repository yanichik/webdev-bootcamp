const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user')

reviewSchema = new Schema ({
	text: String,
	rating: Number,
	author:
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
})

module.exports = mongoose.model('Review', reviewSchema);