// seeds.js contains the data and therefore must be connected to mongo DB via mongoose

const mongoose = require('mongoose');
const Product = require('./models/product');
// console.dir(Product);

mongoose.connect('mongodb://localhost:27017/myShuk', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=>{
		console.log('Mongoose Connected!');
	})
	.catch((err)=>{
		console.log('Something happened. See here:\n' + err);
	})

const p = new Product({
	name: 'grapefruit',
	price: 3,
	category: 'fruit'
})

// p.save()
// 	.then(p => {
// 		console.log(p);
// 	})
// 	.catch((e) => {
// 		console.log('Error' + e);
// 	})

const shukProducts = [
	{
		name: 'grape',
		price: 2,
		category: 'fruit'
	},
	{
		name: 'lettuce',
		price: 4.53,
		category: 'vegetable'
	},
	{
		name: 'milk',
		price: 5,
		category: 'dairy'
	}
]

Product.insertMany(shukProducts)
	.then(res => {
		console.log(res)
	})
	.catch(e => {
		console.log('Error:\n' + e)
	})