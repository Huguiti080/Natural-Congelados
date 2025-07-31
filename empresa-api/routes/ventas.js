const express = require('express');
const router = express.Router();
const controller = require('../controllers/ventaController');
const { generarNotaPdf, generarNotaExcel } = require('../controllers/ventaController');


router.post('/', controller.crearVenta);
router.get('/:id/nota/pdf', controller.generarNotaPdf);
router.get('/:id/nota/excel', controller.generarNotaExcel);

module.exports = router;
