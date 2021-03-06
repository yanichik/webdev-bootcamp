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

const tweetSchema = new Schema({
	text: String,
	views: Number,
	date: Date,
	user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const userSchema = new Schema({
	username: String,
	age: Number
})

const Tweet = mongoose.model('Tweet', tweetSchema);
const User = mongoose.model('User', userSchema);

const createUser = async () => {
	const johnny = new User({
		username: 'JohnnyBLately',
		age: 23
	})
	const res = await johnny.save();
	console.log(res);
}

const createTweets = async (id) => {
	const user = await User.findOne({id});
	Tweet.insertMany([
		{text: 'some like it hot', views: 34, date: '2020-02-23', user: id},
		{text: 'others are as cold as ice', views: 340, date: '2020-04-30', user: id}
	],
	(e, doc) => {
		if(e){ 
			return console.log(e)
		}
		else {
			console.log(doc);
		}
	})
}

const findTweets = async (id) => {
	const tweets = await Tweet.find({use: id}).populate('user')
	console.log(tweets);
}

// createUser();
// createTweets('6043d5a73d9e37e42197560d');
findTweets();








