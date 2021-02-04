const express = require('express');
const app = express();
const port = 3000
app.use(()=>{
	console.log('NEW REQUEST CAME IN!')
})

app.listen(port, ()=> {
	console.log('LISTENING ON PORT ' + port)
})