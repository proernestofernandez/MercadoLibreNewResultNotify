var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var loginToken = new Schema({
  token: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('logintoken', loginToken);