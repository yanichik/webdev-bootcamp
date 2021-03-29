const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next){
	if(!this.isModified('hashedPw')) return next();
	this.hashedPw = await bcrypt.hash(this.hashedPw, 12);
	console.log('Password modified');
	next();

})

module.exports = mongoose.model('User', userSchema);