const express = require('express');
const app = express();
const dogRoutes = require('./routes/dogRoutes');

app.use('/dogs', dogRoutes);

app.listen(3000, ()=>{
	console.log('Logged into port 3000.');
})
