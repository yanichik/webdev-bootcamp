const mongoose = require('mongoose');
const { Schema } = mongoose;

reviewSchema = new Schema ({
	text: String,
	rating: Number
})

module.exports = mongoose.model('Review', reviewSchema);