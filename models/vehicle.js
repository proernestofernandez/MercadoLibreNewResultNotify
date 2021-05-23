var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var vehiculoSchema = new Schema({
  _id: { type: String, required: true },
  kilometros:  { type: Number },
  año:  { type: Number },
});

module.exports = mongoose.model('vehicle', vehiculoSchema);