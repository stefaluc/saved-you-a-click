var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('../models/Article.js');

// begin RESTful API
// GET /articles
router.get('/', function(req, res, next) {
	Article.find(function(err, articles) {
		if(err) {
			return next(err);
		}
		res.json(articles);
	});
});

// POST /articles
router.post('/', function(req, res, next) {
	Article.create(req.body, function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});

// GET /articles/:id (get an article based on its id)
router.get('/:id', function(req, res, next) {
	Article.findById(req.params.id, function(err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
	});
});

// PUT /todos/:id (update an article based on its id)
router.put('/:id', function(req, res, next) {
	Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
  });
});

// DELETE /todos/:id (delete an article based on its id)
router.put('/:id', function(req, res, next) {
	Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if(err) {
			return next(err);
		}
		res.json(post);
  });
});

module.exports = router;