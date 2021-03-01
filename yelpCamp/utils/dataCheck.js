const ExpressError = require('./ExpressError');
const parameters = ['title', 'price', 'location', 'description', 'url'];
module.exports = (request) => {
	for (param of parameters){
		// console.log(request.param);
		if(!request[param]){
			throw new ExpressError(`Need to include campground ${param}. Try again.`, 400);
		}
	}
}