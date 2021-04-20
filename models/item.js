var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var itemSchema = new Schema({
  id_item:    { type: String },
  titulo:    { type: String },
  precio:  { type: String },
  unidad:  { type: String },
  link:  { type: String },
  lugar:   { type: String },
  fecha_fin:  { type: String }
});

module.exports = mongoose.model('item', itemSchema);