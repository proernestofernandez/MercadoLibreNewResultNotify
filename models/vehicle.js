var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var vehiculoSchema = new Schema({
  _id: { type: String, required: true },
  id_ml_vehiculo:    { type: String },
  condicion:  { type: Number },
  kilometros:  { type: Number },
  año:  { type: Number },
  item: { type: Schema.ObjectId, ref: "item" } 
});

module.exports = mongoose.model('vehicle', vehiculoSchema);