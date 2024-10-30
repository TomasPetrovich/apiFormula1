const carreraService = require('../services/carrera.services.js');

class CarreraController {
  async getCarreras(req, res) {
    try {
      const carreras = await carreraService.getCarreras();
      res.json(carreras);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getCarreraById(req, res) {
    try {
      const carrera = await carreraService.getCarreraById(req.params.id);
      res.json(carrera);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createCarrera(req, res) {
    try {
      const carrera = await carreraService.createCarrera(req.body);
      res.status(201).json(carrera);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateCarrera(req, res) {
    try {
      const carrera = await carreraService.updateCarrera(req.params.id, req.body);
      res.json(carrera);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteCarrera(req, res) {
    try {
      await carreraService.deleteCarrera(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new CarreraController();
