var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Clickbait = require('../models/Clickbait.js');
//for url expanding
var request = require('request');
var Q = require('q');

//-------------------BEGIN RESFUL API-----------------//
// GET /clickbaits
router.get('/', function(req, res, next) {
	Clickbait.find(function(err, clickbaits) {
		if(err) {
			return next(err);
		}
		res.json(clickbaits);
	});
});

// POST /clickbait
router.post('/', function(req, res, next) {
	//Check if url is shortened before searching DB
	if(isShortened(req.body.link)) {
		console.log('Shortend url found. Expanding: ' + req.body.link);
		expand(req.body.link).then(function(expanded) {
			console.log('expand' + expanded);
			req.body.link = expanded;

			Clickbait.create(req.body, function(err, post) {
			if(err) {
					return next(err);
				}
				console.log("POST request made. Creating json entry in /clickbait:")
				console.log(req.body);
			});
		});
	} else { //do not need to expand url
		Clickbait.create(req.body, function(err, post) {
			if(err) {
				return next(err);
			}
			console.log("POST request made. Creating json entry in /clickbait:")
			console.log(req.body);
		});
	}
});

// GET /clickbait/:id (get an clickbait based on its id)
router.get('/:id', function(req, res, next) {
	console.log('Trying id search...');
	Clickbait.findById(req.params.id, function(err, post) {
		if(err) {
			return next();
		}
		res.json(post);
	});
});

// GET /clickbait/:link (get a clickbait based on its link)
router.get('/:link', function(req, res, next) {
	console.log('Trying link search...')
	//expand url before searching DB
	if(isShortened(req.params.link)) {
		console.log('Shortened url found. Expanding: ' + req.params.link);
		expand(req.params.link).then(function(expanded) {
			req.params.link = expanded;

			Clickbait.find({link: req.params.link}, function(err, post) {
				if(err) {
					return next();
				}
				console.log(post);
				res.json(post);
			});
		});
	} else { //do not need to expand url
		Clickbait.find({link: req.params.link}, function(err, post) {
			if(err) {
				return next();
			}
			console.log(post);
			res.json(post);
		});
	}
});

// PUT /clickbait/:id (update an clickbait based on its id)
router.put('/:id', function(req, res, next) {
	Clickbait.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
  });
});

// DELETE /clickbait (delete all clickbait) 
router.delete('/', function(req, res, next) {
	console.log('reached delete all');
	Clickbait.remove({}, function (err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
  });
});

// DELETE /clickbait/:id (delete an clickbait based on its id)
router.delete('/:id', function(req, res, next) {
	console.log('reached delete');
	Clickbait.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
  });
});
//-----------------END RESFUL API-----------------//

module.exports = router;

//-----------------BEGIN HELPER FUNCTIONS-----------------//
function expand(shortUrl) {
	var deferred = Q.defer();
    request( { method: "HEAD", url: shortUrl, followAllRedirects: true },
        function (error, response) {
            if (error) {
                deferred.reject(new Error(error));
            } else {
                deferred.resolve(response.request.href);
            }
        });
    return deferred.promise;
}
function isShortened(url) {
	var urlShorteners = ['goo.gl', '//t.co', 'bit.ly', 'lnkd.in', 'tinyurl', 'ow.ly', 'twitthis', 'qr.ae', 'bitly'];
	var shortened = false;
	for (var i = 0; i < urlShorteners.length; i++) {
		if(url.includes(urlShorteners[i])) {
			shortened = true;
			break;
		}
	}
	return shortened;
} 