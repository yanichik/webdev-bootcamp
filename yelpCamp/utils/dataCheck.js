// dataCheck customizes responses depending on the missing data from the client

const ExpressError = require('./ExpressError');
const parameters = ['title', 'price', 'location', 'description', 'image'];
module.exports = (request) => {
	for (param of parameters){
		// console.log(request.param);
		if(!request[param]){
			throw new ExpressError(`Need to include campground ${param}. Try again.`, 400);
		}
	}
}