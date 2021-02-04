const express = require('express');
const app = express();

app.use(req,res) = function() {
    console.log("NEW REQUEST")
    res.send("My Site is Running")
}

app.listen(3000, ()=>{
    
})