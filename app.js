var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var clickbait = require('./routes/clickbait');
var mongoose = require('mongoose');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

//connect to mongoDB
mongoose.connect('mongodb://localhost/clickbait', function(err) {
    if(err) {
        console.log('MongoDB connection error', err);
    } else {
         console.log('MongoDB connection successful');
    }
});

var app = express();
//config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/clickbait', clickbait);

/*app.listen(3000, function() {
	console.log('App now listenin on port 3000');
});*/

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(3000, function() {
	console.log("http server listening on port 3000");
});
httpsServer.listen(8443, function() {
	console.log("https server listening on port 8843");
});