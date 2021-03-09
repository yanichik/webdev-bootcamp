const mongoose = require('mongoose');
const Product = require('./product');

const Schema = mongoose.Schema;


const farmSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	city: {
		type: String
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}
	]
})
const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;