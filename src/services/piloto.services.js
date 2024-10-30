const Piloto = require('../models/piloto.model.js');

class PilotoService {
  async getPilotos() {
    return await Piloto.find().populate('equipo');
  }

  async getPilotoById(id) {
    return await Piloto.findById(id).populate('equipo');
  }

  async createPiloto(data) {
    const piloto = new Piloto(data);
    return await piloto.save();
  }

  async updatePiloto(id, data) {
    return await Piloto.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePiloto(id) {
    return await Piloto.findByIdAndDelete(id);
  }
}

module.exports = new PilotoService();
