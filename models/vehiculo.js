var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var vehiculoSchema = new Schema({
  _id: { type: String, required: true },
  id_vehiculo:    { type: String },
  titulo:    { type: String },
  condicion:  { type: Number },
  kilometros:  { type: Number },
  año:  { type: Number },
  unidad:     { type: Number },
  precio:  { type: Date },
  link:  { type: Date },
  lugar:   { type: Number },
  fecha_fin:  { type: Number },
});

module.exports = mongoose.model('vehiculo', vehiculoSchema);