const mongoose = require('mongoose');
// const Farm = require('./farm');

const Schema = mongoose.Schema;


const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		min: 0,
		required: true
	},
	category: {
		type: String,
		enum: ['fruit', 'vegetable', 'dairy', 'baked goods'],
		required: true
	},
	farm: {
		type: Schema.Types.ObjectId,
		ref: 'Farm'
	}
})
const Product = mongoose.model('Product', productSchema);

module.exports = Product;