var mongoose = require('mongoose');

var ClickbaitSchema = new mongoose.Schema({
	link: String,
	content: String,
	modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Clickbait', ClickbaitSchema);