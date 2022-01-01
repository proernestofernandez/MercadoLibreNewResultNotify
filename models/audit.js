var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var auditSchema = new Schema({
  type: { type: String },
  dateTime: { type: String },
  info: { type: String },
});

module.exports = mongoose.model('audit', auditSchema);