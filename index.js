
require('./redis');
const express = require('express');
const app = express();


// Serve Static files out of the public folder
app.use(express.static('/public'));

// Serve the Index.html when users access the root directory /
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});


