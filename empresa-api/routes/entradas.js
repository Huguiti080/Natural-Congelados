const express = require('express');
const router = express.Router();
const { crearEntrada, obtenerEntradas } = require('../controllers/entradaController');

// Registrar nueva entrada
router.post('/', crearEntrada);

// Obtener historial de entradas
router.get('/', obtenerEntradas);

module.exports = router;
