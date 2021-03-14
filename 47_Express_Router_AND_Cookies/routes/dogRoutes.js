const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('All Dogs');
})

router.get('/:id', (req, res) => {
	res.send(`Dog ID: ${req.params.id}`);
})

router.get('/:id/edit', (req, res) => {
	res.send(`Editing: ${req.params.id} Dog`);
})

module.exports = router;