const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
	title: Joi.string().required(),
	price: Joi.number().min(0).required(),
	location: Joi.string().required(),
	description: Joi.string().min(2).max(100).required(),
	// images: Joi.string().uri().required()
	deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
	reviews: Joi.object({
		text: Joi.string().required(),
		rating: Joi.number().min(1).max(5).required()	
	}).required()	
})