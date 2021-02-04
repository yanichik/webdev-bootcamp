const express = require('express');
const app = express();
const port = 4000;

app.use(function(req, res, next) {
//     res.send('Hello World');
//     console.log('Requested');
//     console.log(listen);
    next();
})

app.get('/:something', (req, res)=>{
    console.log("you're 'something' is: " + req.params.something)
    const {something} = req.params
    res.send("You're up to something: " + `${something}`)
});
const listen = app.listen(port, function(){
    console.log('Listening on port ' + port);
});