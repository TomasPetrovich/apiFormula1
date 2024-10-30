const temporadaService = require('../services/temporada.services.js');

class TemporadaController {
  async getTemporadas(req, res) {
    try {
      const temporadas = await temporadaService.getTemporadas();
      res.json(temporadas);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getTemporadaById(req, res) {
    try {
      const temporada = await temporadaService.getTemporadaById(req.params.id);
      res.json(temporada);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createTemporada(req, res) {
    try {
      const temporada = await temporadaService.createTemporada(req.body);
      res.status(201).json(temporada);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateTemporada(req, res) {
    try {
      const temporada = await temporadaService.updateTemporada(req.params.id, req.body);
      res.json(temporada);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteTemporada(req, res) {
    try {
      await temporadaService.deleteTemporada(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async simularCarrera(req, res) {
    try {
      const carrera = await temporadaService.simularCarrera(req.params.id);
      res.status(201).json(carrera);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async simularTemporada(req, res) {
    try {
      const { id: temporadaId } = req.params;
      const { pilotoIdFavorito } = req.body; // Recibir el piloto favorito desde el cuerpo de la solicitud
  
      const resultados = await temporadaService.simularTemporada(temporadaId, pilotoIdFavorito);
      res.status(201).json(resultados);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}  

module.exports = new TemporadaController();
