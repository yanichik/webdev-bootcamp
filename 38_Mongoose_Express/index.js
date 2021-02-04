const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/myShuk', {useNewUrlParser: true, useUnifiedTopology: true,
	useFindAndModify: false})
	.then(()=>{
		console.log('Mongoose Connected!');
	})
	.catch((err)=>{
		console.log('Something happened. See here:\n' + err);
	})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/products', async (req, res) =>{
	const products = await Product.find({});
	res.render('products/index', {products});
});

app.get('/products/new', async (req, res) =>{
	res.render('products/new');
});

app.post('/products', (req, res) =>{
	console.log(req.body);
	res.send('making product');
});

app.get('/products/:id', async (req, res) =>{
	const {id} = req.params;
	const product = await Product.findById(id);
	res.render('products/show', {product});
});
app.get('/products/:id/edit', async (req, res) =>{
	const {id} = req.params;
	const product = await Product.findById(id);
	res.render('products/edit', {product});
});
app.put('/products/:id', async (req, res) => {
	const {id} = req.params;
	const editedProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
	res.redirect(`/products/${editedProduct._id }`);
})

app.listen(3000, () => {
	console.log('App is ON!');
})