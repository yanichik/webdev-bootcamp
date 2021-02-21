const express = require('express');
const app = express();
const AppError = require('./AppError');

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
		// throw new Error('enter the password in your query');
		throw new AppError('enter the correct password in your query', 401);
	}
}
app.use(express.urlencoded({extended: true}));
app.get('/', auth, (req, res) => {
	res.send("I'm Here!");
})

app.get('/admin', (req, res) =>{
	throw new AppError("You're not an admin", 403);
})

app.use((err, req, res, next) => {
	const {message='something is wrong', status=500} = err;
	res.status(status).send("'" + message + "'" + ' Error at:' + '<p>' + err.stack.slice(message.length+15));
	// res.status(status).send(message + '<p>' + err.stack);
	next(err);
})

app.listen(3000, ()=>{
	console.log('Connected via port 3000');
})