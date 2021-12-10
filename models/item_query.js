var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var Item  = mongoose.model('item');

var item_querySchema = new Schema({
  item: { type: Schema.ObjectId, ref: "item" },
  query: { type: Schema.ObjectId, ref: "query" }, 
  user: { type: Schema.ObjectId, ref: "user" }
});

module.exports = mongoose.model('item_query', item_querySchema);