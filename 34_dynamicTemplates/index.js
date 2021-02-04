const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const redditData = require('./data.json');


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/',(req, res)=>{
	res.render('home.ejs');		//Don't need '.ejs'. It assumes that it's an ejs file due to app.set
});

app.get('/rand', (req, res)=>{
	let num = Math.floor(Math.random()*1000)+1;
	res.render('random.ejs', {rand: num});
})

app.get('/r/:subreddit', (req, res)=>{
	const {subreddit} = req.params;
	const data = redditData[subreddit];
	if(data) res.render('subreddit.ejs', data);
	else res.render('notfound.ejs', {subreddit});
})

app.get('/cats', (req, res)=>{
	const cats = ['Jake', 'Bones', 'Tunatune', 'Frisky'];
	res.render('cats.ejs', {cats});
})

app.listen(port, ()=>{
	console.log('LISTENING ON PORT ' + port + '\n' + Date());
}); 