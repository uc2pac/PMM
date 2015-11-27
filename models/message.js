// message model
var async    = require('async'),
	mongoose = require('mongoose'),
    Schema 	 = mongoose.Schema;


var Message = new Schema({
  	date    : Date,
  	subject : String,
  	message : String,
  	user    : String
});

Message.statics.getMessages = function(username, date, callback) {
	var root = this;

	async.waterfall([
		function(callback) {
			root.find({user: username, date: date}, callback);
		},
		function(messages, callback) {
			if (messages) {
				callback(null, messages);
			} else {
				callback([]);
			}
		}
	], callback);
};

module.exports = mongoose.model('message', Message);