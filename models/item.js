var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

const item_categories = Object.freeze({
  CARS_MOTORCYCLES_VANS: 'cars, motorcycles and vans',
  HOUSES_APARTMENT: 'houses and apartment',
  THINGS: 'things'
});

var itemSchema = new Schema({
  id_item_ml:    { type: String },
  titulo:    { type: String },
  precio:  { type: String },
  unidad:  { type: String },
  condicion:  { type: String },
  link:  { type: String },
  lugar:   { type: String },
  fecha_fin:  { type: String },
  //item_category: {type: String, enum: Object.values(item_categories), required: true},
  item_category: {type: String},
  specific_item: {type: Object, required: true},
});

module.exports = mongoose.model('item', itemSchema);