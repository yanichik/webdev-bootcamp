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

userSchema.statics.findAndValidate = async function(username, password, req){
	const user = await this.findOne({username});
	const isValid = await bcrypt.compare(password, user.hashedPw);
	if (isValid) {
		req.session.user_id = user._id;
		return user;
	}
	return false;
}

module.exports = mongoose.model('User', userSchema);