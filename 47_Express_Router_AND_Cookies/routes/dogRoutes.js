const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

// router.use((req, res, next) => {
// 	if (req.query.isAdmin) {
// 		next();
// 	}
// 	res.send("Not an admin.");
// })

router.use(cookieParser('dogSecret'));

router.get('/', (req, res) => {
	// res.cookie('dog1', 'mike', {signed: true});
	// res.cookie('dog2', 'charlie');
	res.send('All Dogs');
})

router.get('/:id', (req, res) => {
	res.send(`Dog ID: ${req.params.id}`);
})

router.get('/:id/edit', (req, res) => {
	res.send(`Editing: ${req.params.id} Dog`);
})

module.exports = router;