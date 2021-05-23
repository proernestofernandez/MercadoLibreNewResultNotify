var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var Item  = mongoose.model('item');

var item_querySchema = new Schema({
  item: { type: Schema.ObjectId, ref: "item" },
  query: { type: Schema.ObjectId, ref: "query" }, 
  user: { type: Schema.ObjectId, ref: "user" }
});

item_querySchema.statics.findByItem = function (query_id, id_item_ml, user_id, callback) {
  var query = this.findOne({'query': query_id, 'user': user_id})
  //'_id': query_id
  //, 'usuario_creacion': user_nickname
  let itm;
  let lol = Item.findOne({'id_item_ml': id_item_ml}, function (error, itm) {
    if (itm !== null){
      query.where(
        {item: itm._id}
      ).exec(callback);
    }else {
      query.where(
        {item: null}
      ).exec(callback);
    }
    })


    console.log("itm");
    console.log(itm);
    if (lol !== 'undefined'){
      return query;
    }else{
      return null;  
    }
}

module.exports = mongoose.model('item_query', item_querySchema);