const Equipo = require('../models/equipo.model.js');

class EquipoService {
  async getEquipos() {
    return await Equipo.find().populate('pilotos');
  }

  async getEquipoById(id) {
    return await Equipo.findById(id).populate('pilotos');
  }

  async createEquipo(data) {
    const equipo = new Equipo(data);
    return await equipo.save();
  }

  async updateEquipo(id, data) {
    return await Equipo.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteEquipo(id) {
    return await Equipo.findByIdAndDelete(id);
  }
}

module.exports = new EquipoService();
