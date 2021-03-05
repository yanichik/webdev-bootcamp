const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
		title: Joi.string().required(),
		price: Joi.number().min(0).required(),
		location: Joi.string().required(),
		description: Joi.string().min(2).max(100).required(),
		image: Joi.string().uri().required()
	})