const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    circuito: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    resultados: [{
        piloto: { type: mongoose.Schema.Types.ObjectId, ref: 'Piloto' },
        posicion: { type: Number, required: true }
    }]
});

const Carrera = mongoose.model('Carrera', carreraSchema);
module.exports = Carrera;
