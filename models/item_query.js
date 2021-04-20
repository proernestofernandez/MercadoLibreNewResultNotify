var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var item_querySchema = new Schema({
  item: { type: Schema.ObjectId, ref: "item" },
  query: { type: Schema.ObjectId, ref: "query" } 
});

module.exports = mongoose.model('item_query', item_querySchema);