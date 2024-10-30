const express = require('express');
const router = express.Router();
const temporadaController = require('../controllers/temporada.controller.js');

// Rutas CRUD
router.get('/', temporadaController.getTemporadas);
router.get('/:id', temporadaController.getTemporadaById);
router.post('/', temporadaController.createTemporada);
router.put('/:id', temporadaController.updateTemporada);
router.delete('/:id', temporadaController.deleteTemporada);
router.post('/:id/simular-carrera', temporadaController.simularCarrera);
router.post('/:id/simular-temporada', temporadaController.simularTemporada);


module.exports = router;
