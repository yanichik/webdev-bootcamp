const mongoose = require('mongoose');

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

const userSchema = new mongoose.Schema({
	first: String,
	last: String,
	addresses: [
		{
			_id: {id: false},
			street: String,
			city: String,
			state: String,
			country: String
		}
	]
})
const User = mongoose.model('User', userSchema);

const newUser = async () => {
	const u = new User({
		first: 'John',
		last: 'James',
		addresses: [
			{
				street: '123 First Street',
				city: 'San Francisco',
				state: 'CA',
				country: 'USA'
			}
		]
	})
	const res = await u.save();
	console.log(res);
}

const addAddress = async (id) => {
	const user = await User.findById(id);
	user.addresses.push({
		street: '450 6th Street',
		city: 'San Francisco',
		state: 'CA',
		country: 'USA'
	})
	const res = await user.save();
	console.log(res);
}

addAddress('6041c66312887b4666e98965');






