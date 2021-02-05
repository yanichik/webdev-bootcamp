const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
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
	}
})
const Product = mongoose.model('Product', productSchema);
// console.dir(Product);
module.exports = Product;