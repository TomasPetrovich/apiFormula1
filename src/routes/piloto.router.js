const express = require('express');
const router = express.Router();
const pilotoController = require('../controllers/piloto.controller.js');

// Rutas CRUD
router.get('/', pilotoController.getPilotos);
router.get('/:id', pilotoController.getPilotoById);
router.post('/', pilotoController.createPiloto);
router.put('/:id', pilotoController.updatePiloto);
router.delete('/:id', pilotoController.deletePiloto);

module.exports = router;
