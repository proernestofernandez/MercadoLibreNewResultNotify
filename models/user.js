var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  nickname: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('user', usuarioSchema);