const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
  fundado: {
    type: Number,
    required: true
  },
  pilotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piloto' }],
  
  puntos: { 
    type: Number,
     default: 0 
  }
});

const Equipo = mongoose.model('Equipo', equipoSchema);
module.exports = Equipo;
