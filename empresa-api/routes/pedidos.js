const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');

router.get('/', controller.listarPedidos);
router.post('/', controller.generarPedido);
router.put('/:id', controller.actualizarPedido);

module.exports = router;