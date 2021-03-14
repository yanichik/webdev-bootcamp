const express = require('express');
const app = express();
const dogRoutes = require('./routes/dogRoutes');
const shelterRoutes = require('./routes/shelterRoutes');

app.use('/dogs', dogRoutes);
app.use('/shelters', shelterRoutes);

app.listen(3000, ()=>{
	console.log('Logged into port 3000.');
})
