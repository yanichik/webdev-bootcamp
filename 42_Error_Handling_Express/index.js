const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const AppError = require('./AppError');

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

const categories = ['fruit', 'vegetable', 'dairy', 'baked goods'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

function catchAsync(fn) {
	return function(req, res, next){
		fn(req, res, next).catch(e => next(e));
	}
}

app.get('/products', catchAsync(async (req, res, next) =>{
	const {category} = req.query;
	if (category) {
		const products = await Product.find({category});
		if (!products || products.length == 0) {
			throw new AppError("Category not found.", 404);
		}
		res.render('products/index', {products, category});
	}
	else {
		const products = await Product.find({});
		res.render('products/index', {products, category: 'All'});	
	}
}));

app.get('/products/new', (req, res) =>{
	const product = req.body;
	res.render('products/new', {categories, product});
});

// Not working
app.post('/products', catchAsync(async (req, res, next) =>{
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect(`/products/${newProduct._id}`);

}));

app.delete('/products/:id', async (req, res, next) =>{
	const {id} = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	if (!deletedProduct) {
		return next(new AppError("Product not found.", 404));
	}
	res.redirect('/products');
})

app.get('/products/:id', catchAsync(async (req, res, next) =>{
	const {id} = req.params;
	const product = await Product.findById(id);
	if (!product) {
		throw new AppError("Product not found.", 404);
	}
	res.render('products/show', {product, categories});
}));

app.get('/products/:id/edit', async (req, res, next) =>{
	const {id} = req.params;
	const product = await Product.findById(id);
	if (!product) {
		return next(new AppError("Product not found.", 404));
	}
	res.render('products/edit', {product, categories});
});
app.put('/products/:id', catchAsync(async (req, res, next) => {
	const {id} = req.params;
	const editedProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
	res.redirect(`/products/${editedProduct._id }`);
}));

app.use((err, req, res, next) => {
	if (err.name === 'ValidationError') {
		console.log(err.name.type);
	}
	next(err);
})

app.use((err, req, res, next) => {
	const {status = 500, message = 'Something Went Wrong'} = err;
	// const {status, message} = err;
	res.status(status).send(message);
})

app.listen(3000, () => {
	console.log('App is ON!');
})




















