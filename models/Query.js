var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var querySchema = new Schema({
  path:    { type: String, required: true },
  query:   { type: String, required: true },
//  parameters: {type: Map, of: mapSchema},
    parameters: {
    type: Map, // `socialHandles` is a key/value store for string keys
    of: String // Values must be strings
  },
  momento_creacion:  { type: String, required: true  },
  usuario_creacion:  { type: String, required: true  },
  periodicidad_hora:  { type: String, required: true }
});

module.exports = mongoose.model('Query', querySchema);