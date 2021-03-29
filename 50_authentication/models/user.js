const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username required to sign in.']
	},
	hashedPw: {
		type: String,
		required: [true, 'Password required to sign in.']
	}
})

module.exports = mongoose.model('User', userSchema);