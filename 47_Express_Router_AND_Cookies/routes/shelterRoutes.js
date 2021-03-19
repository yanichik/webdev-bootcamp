const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser('dogSecret'));

router.get('/', (req, res) => {
	res.send('All Shelters');
})

router.get('/:id', (req, res) => {
	// const cookies = req.signedCookies;
	// const keys = Object.keys(cookies);
	// let dogString = '';
	// const allDogs = keys.forEach((key, index) =>{
	// 	dogString += `${key}: ${cookies[key]}`;
	// })
	// console.log(dogString);
	// res.send(`Shelter ${req.params.id} has ${dogString}`);
	const cookies = `${req.signedCookies.dog1} and ${req.cookies.dog2}`;
	res.send(cookies);
})

router.get('/:id/edit', (req, res) => {
	res.send(`Editing: ${req.params.id} Shelter`);
})

module.exports = router;