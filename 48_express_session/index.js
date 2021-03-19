const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = {
	secret: 'countMyViews',
	resave: false, 
	saveUninitialized: false
};

app.use(session(sessionOptions))

// Access the session as req.session
app.get('/viewcounts', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.listen(3000, () => {
	console.log('Listening on port 3000');
})