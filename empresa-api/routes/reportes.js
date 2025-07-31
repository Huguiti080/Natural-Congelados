// routes/reportes.js
const express = require('express');
const router = express.Router();

const {
  ventasDiarias,
  ventasPorCliente,
  ventasPorProducto,
  obtenerStockCritico
} = require('../controllers/reporteController'); // ✅ asegúrate que el nombre esté correcto

router.get('/ventas-diarias', ventasDiarias);
router.get('/ventas-cliente/:id', ventasPorCliente);
router.get('/ventas-producto', ventasPorProducto); // ✅ ya no causará error
router.get('/stock-critico', obtenerStockCritico);


module.exports = router;
