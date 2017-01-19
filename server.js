var config = require('./config');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env.NODE_ENV

// create the express app
var app = express();

app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
})

app.use(express.static(path.join(__dirname, 'dist'))); //  "public" off of current is root

// kick of the app
var port = process.env.PORT || 5000;
app.listen(port);

console.log(`Node Env: ${process.env.NODE_ENV}`);
console.log(`server started on port: ${port}`);