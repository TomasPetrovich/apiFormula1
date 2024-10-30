const equipoService = require('../services/equipo.services.js');

class EquipoController {
  async getEquipos(req, res) {
    try {
      const equipos = await equipoService.getEquipos();
      res.json(equipos);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getEquipoById(req, res) {
    try {
      const equipo = await equipoService.getEquipoById(req.params.id);
      res.json(equipo);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createEquipo(req, res) {
    try {
      const equipo = await equipoService.createEquipo(req.body);
      res.status(201).json(equipo);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateEquipo(req, res) {
    try {
      const equipo = await equipoService.updateEquipo(req.params.id, req.body);
      res.json(equipo);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteEquipo(req, res) {
    try {
      await equipoService.deleteEquipo(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new EquipoController();
