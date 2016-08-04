var express = require('express');
var bodyParser = require('body-parser');
var articles = require('./routes/articles');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoApp', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
         console.log('connection successful');
    }
});

var app = express();