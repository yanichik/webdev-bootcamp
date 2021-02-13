const express = require('express');
const app = express();

// app.get('http://source.unsplash.com/collection/429524', async (req, res)=>{
// 	let arr = [];
// 	for (var i = 0; i < 50; i++) {
// 		await arr.push(req.protocol + '://' + req.get('host') + req.originalUrl);
// 		console.log(arr[i]);
// 	}
// 	// return arr;
// })

app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res)=>{
	res.redirect('http://source.unsplash.com/collection/429524');
})

// const imgs = getImages();

app.listen(3000, () => {
	console.log('Listening to YelpCamp on port 3000');
})