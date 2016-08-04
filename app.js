var appRoot = __dirname;
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

//create web server
var app = express();
var server 
//connect to database
mongoose.connect('mongodb://localhost/article_database');

app.get('/', function(req, res) {
	res.send('Article API is running');
});

app.listen(3000, function() {
	console.log('App listening on port 3000');
});