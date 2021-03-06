const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationsDemo', { // 'relationsDemo' is name of DB
	useNewUrlParser: true,
	useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to mongoDB!");
	})
	.catch(err => {
		console.log("Error connecting to mongoDB");
		console.log(err);
	})

const productSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	type: {
		type: String,
		enum: ['fruit', 'vegetable', 'other']
	},
	season: {
		type: String,
		enum: ['Summer', 'Fall', 'Winter', 'Spring', 'All']
	}
})

const farmSchema = new Schema({
	name: String,
	city: String,
	products: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
// 	{name: 'Little Cuties', type: 'fruit', season: 'Summer'},
// 	{name: 'Challah', type: 'other', season: 'All'},
// 	{name: 'Asparagus', type: 'vegetable', season: 'Winter'}
// ])

// const makeFarm = async () => {
// 	const farm = new Farm({
// 		name: "Old McDonald's",
// 		city: "San Diego, CA"
// 	})
// 	await farm.save();
// 	const apple = await Product.findOne({name: 'Little Cuties'});
// 	farm.products.push(apple);
// 	console.log(farm);
// }

// makeFarm();

// const addProduct = async() => {
// 	const farm = await Farm.findOne({name: "Old McDonald's"});
// 	const challah = await Product.findOne({name: 'Challah'});
// 	farm.products.push(challah);
// 	farm.save();
// 	console.log(farm);
// }

// addProduct();


