var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	id: Number,
	link: String,
	modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Article, ArticleSchema');