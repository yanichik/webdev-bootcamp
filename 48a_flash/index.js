const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const Farm = require('./models/farm');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const sessionOptions = { secret: 'notagreatsecret', resave: false, saveUninitialized: true};

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true,
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
app.use(session(sessionOptions));
app.use(flash());

// flash message middleware
app.use((req, res, next) => {
	res.locals.messages = req.flash('congratsNewProdSuccess');
	next();
})

// FARM ROUTES

app.get('/farms', async (req, res) =>{
	const farms = await Farm.find({});
	res.render('farms/index', {farms});
});

app.get('/farms/new', (req, res) =>{
	res.render('farms/new');
});

app.post('/farms', async (req, res) =>{
	const newFarm = new Farm(req.body);
	await newFarm.save();
	// res.redirect(`/farms/${newFarm._id}`);
	res.redirect(`/farms`);
});

app.get('/farms/:id', async (req, res) =>{
	const {id} = req.params;
	const farm = await Farm.findById(id).populate('products');
	res.render('farms/show', {farm});
});

app.post('/farms/:id', async (req, res) =>{
	const {id} = req.params;
	const farm = await Farm.findById(id);	
	const newFarmProduct = new Product(req.body);
	newFarmProduct.farm = id;
	// console.log(typeof(farm.products));
	farm.products.push(newFarmProduct);
	await newFarmProduct.save();
	await farm.save();
	// res.redirect(`/farms/${newFarm._id}`);
	req.flash('congratsNewProdSuccess', 'Great Job! You have added a new product.');
	res.redirect(`/farms/${id}`);
});

app.get('/farms/:id/edit', async (req, res) =>{
	const {id} = req.params;
	const farm = await Farm.findById(id);
	res.render('farms/edit', {farm});
});

app.put('/farms/:id', async (req, res) => {
	const {id} = req.params;
	console.log(req.body);
	const editedFarm = await Farm.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
	console.log(editedFarm);
	res.redirect(`/farms/${editedFarm._id }`);
})

app.get('/farms/:id/newFarmProduct', async (req, res) =>{
	const {id} = req.params;
	const farm = await Farm.findById(id);
	res.render('farms/newFarmProduct', {farm, categories});
});

app.delete('/farms/:id', async (req, res) =>{
	const {id} = req.params;
	const deletedFarm = await Farm.findByIdAndDelete(id);
	// console.log('Deleting ' + id)
	res.redirect('/farms');
})

// PRODUCT ROUTES

app.get('/products', async (req, res) =>{
	const {category} = req.query;
	if (category) {
		const products = await Product.find({category});
		res.render('products/index', {products, category});
	}
	else {
		const products = await Product.find({});
		res.render('products/index', {products, category: 'All'});	
	}
});

app.get('/products/new', async (req, res) =>{
	res.render('products/new', {categories});
});

app.post('/products', async (req, res) =>{
	const newProduct = new Product(req.body);
	await newProduct.save();
	req.flash('congratsNewProdSuccess', 'Great Job! You have added a new product.');
	res.redirect(`/products/${newProduct._id}`);
});

app.delete('/products/:id', async (req, res) =>{
	const {id} = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	res.redirect('/products');
})

app.get('/products/:id', async (req, res) =>{
	const {id} = req.params;
	try{
		const product = await Product.findById(id).populate('farm');
		const farm = await Farm.findById(product.farm._id);
		res.render('products/show', {product, categories, farm});
	}
	catch{
		const product = await Product.findById(id)
		product.FarmUnassigned = 'Unassigned. Back to Farms.'
		await product.save();
		const farm = {'name': product.farm, '_id': 'NA'}
		res.render('products/show', {product, categories, farm});
	}
});

app.get('/products/:id/edit', async (req, res) =>{
	const {id} = req.params;
	const product = await Product.findById(id);
	res.render('products/edit', {product, categories});
});

app.put('/products/:id', async (req, res) => {
	const {id} = req.params;
	const editedProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
	res.redirect(`/products/${editedProduct._id }`);
})

app.listen(3000, () => {
	console.log('App is ON!');
})