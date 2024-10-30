const Carrera = require('../models/carrera.model.js');

class CarreraService {
  async getCarreras() {
    return await Carrera.find().populate('resultados.piloto');
  }

  async getCarreraById(id) {
    return await Carrera.findById(id).populate('resultados.piloto');
  }

  async createCarrera(data) {
    const carrera = new Carrera(data);
    return await carrera.save();
  }

  async updateCarrera(id, data) {
    return await Carrera.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCarrera(id) {
    return await Carrera.findByIdAndDelete(id);
  }
}

module.exports = new CarreraService();
