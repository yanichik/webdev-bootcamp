const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('All Shelters');
})

router.get('/:id', (req, res) => {
	res.send(`Shelter ID: ${req.params.id}`);
})

router.get('/:id/edit', (req, res) => {
	res.send(`Editing: ${req.params.id} Shelter`);
})

module.exports = router;