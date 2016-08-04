var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var articles = require('./routes/articles');
var mongoose = require('mongoose');
//connect to mongoDB
mongoose.connect('mongodb://localhost/todoApp', function(err) {
    if(err) {
        console.log('MongoDB connection error', err);
    } else {
         console.log('MongoDB connection successful');
    }
});

var app = express();
//config
app.use('/articles', articles);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
	console.log('App now listening on port 3000');
});