const express = require('express');
const app = express();

const middle = (req, res, next) => {
	console.log('Middle');
	next();
}

const auth = (req, res, next) => {
	const {pw} = req.query;
	if (pw === 'dingy') {
		next();
	}
	else {
		res.send('enter the password in your query')
	}
}

app.get('/', auth, (req, res) => {
	res.send("I'm Here!");
})



app.listen(3000, ()=>{
	console.log('Connected via port 3000');
})