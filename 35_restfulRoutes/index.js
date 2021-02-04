const express = require('express');
// var bodyParser = require('body-parser');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let comments = [
	{
		id: uuid(),
		username: "johnny",
		comment: "what a crock"
	},
	{
		id: uuid(),
		username: "sammy",
		comment: "actually, this is a great thing. you're off base"
	},
	{
		id: uuid(),
		username: "weird al",
		comment: "everything is sooooo weird man"
	}
	];

app.get('/comments/new', (req, res)=>{	
	res.render('comments/new');
});

app.post('/comments', (req, res)=>{
	const {username, comment} = req.body;
	comments.push({username, comment, id: uuid()});
	res.redirect('/comments');
	// res.send('Great Job!');
	// console.log(req.body);
});

app.get('/comments', (req, res)=>{
	res.render('comments/index', {comments});

});

app.get('/comments/:id', (req, res)=>{
	const {id} = req.params;
	const comment = comments.find(c => c.id === id);
	res.render('comments/show', {comment});
});

// PATCH via postman, NOT via HTML forms
app.patch('/comments/:id', (req, res)=>{
	const {id} = req.params;
	const newCommentText = req.body.comment;
	const oldComment = comments.find(c => c.id === id);
	oldComment.comment = newCommentText;
	// console.log(oldComment);
	// console.log(newComment);
	// res.send('Patched!' + newComment);
	res.redirect('/comments');

})
// PATCH via browser using METHOD-OVERRIDE
app.get('/comments/:id/edit', (req, res)=>{
	const {id} = req.params;
	const oldComment = comments.find(c => c.id === id);
	res.render('comments/edit', {oldComment});
});

app.delete('/comments/:id', (req, res) =>{
	const {id} = req.params;
	comments = comments.filter(c => c.id !== id);
	res.redirect('/comments');
});

app.get('/tacos', (req, res)=>{
	// const {meat, qty} = req.body;
	res.send('GET at /tacos');
});

app.post('/tacos', (req, res)=>{
	res.send('POST at /tacos');
	console.log(req.body);
});

app.listen(3000, ()=>{
	console.log('LISTENING ON PORT 3000');
});


/*RESTful Routes

GET 	/comments 		-> show all comments
POST 	/comments 		-> create new comments
GET 	/comments/:id	-> show specific comment with id
PATCH	/comments/:id	-> edit specific comment with id
DELETE	/comments/:id	-> delete specific comment with id
*/

