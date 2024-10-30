const mongoose = require('mongoose');

const temporadaSchema = new mongoose.Schema({
    año: { type: Number, required: true },
    carreras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carrera' }],  // Relación con Carrera
    pilotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piloto' }]    // Relación con Piloto
  });
  
  const Temporada = mongoose.model('Temporada', temporadaSchema);
  module.exports = Temporada;
  