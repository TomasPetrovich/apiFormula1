const express = require('express');
const router = express.Router();
const carreraController = require('../controllers/carrera.controller.js');

// Rutas CRUD
router.get('/', carreraController.getCarreras);
router.get('/:id', carreraController.getCarreraById);
router.post('/', carreraController.createCarrera);
router.put('/:id', carreraController.updateCarrera);
router.delete('/:id', carreraController.deleteCarrera);

module.exports = router;
