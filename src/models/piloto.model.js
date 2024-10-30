const mongoose = require('mongoose');

const pilotoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  nacionalidad: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },

  puntos: { 
    type: Number,
    default: 0 
  }
});

const Piloto = mongoose.model('Piloto', pilotoSchema);
module.exports = Piloto;
