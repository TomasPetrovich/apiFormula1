const pilotoService = require('../services/piloto.services.js');

class PilotoController {
  async getPilotos(req, res) {
    try {
      const pilotos = await pilotoService.getPilotos();
      res.json(pilotos);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getPilotoById(req, res) {
    try {
      const piloto = await pilotoService.getPilotoById(req.params.id);
      res.json(piloto);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createPiloto(req, res) {
    try {
      const piloto = await pilotoService.createPiloto(req.body);
      res.status(201).json(piloto);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updatePiloto(req, res) {
    try {
      const piloto = await pilotoService.updatePiloto(req.params.id, req.body);
      res.json(piloto);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deletePiloto(req, res) {
    try {
      await pilotoService.deletePiloto(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new PilotoController();
