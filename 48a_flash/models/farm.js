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

farmSchema.post('findOneAndDelete', async function(farm) {
	if (farm.products.length) {
		// console.log('INSIDE IF');
		console.log(farm);
		const result = await Product.deleteMany({ _id: { $in: farm.products } })
		console.log(result);
	}
})

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;