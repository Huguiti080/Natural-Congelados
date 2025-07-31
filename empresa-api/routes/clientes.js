const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

// AGREGAR ESTAS RUTAS QUE FALTAN:
router.get('/:id/historial', controller.historialCompras);
router.post('/:id/interacciones', controller.registrarInteraccion);
router.get('/:id/interacciones', controller.listarInteracciones);

module.exports = router;