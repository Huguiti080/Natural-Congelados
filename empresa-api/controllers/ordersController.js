
// controllers/ordersController.js

const Pedido = require('../models/pedido');

// POST /api/pedidos
const generarPedido = (req, res) => {
  Pedido.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId });
  });
};

// GET /api/pedidos
const listarPedidos = (req, res) => {
  Pedido.getAll((err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

// PUT /api/pedidos/:id
const actualizarPedido = (req, res) => {
  Pedido.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

module.exports = {
  generarPedido,
  listarPedidos,
  actualizarPedido,
};
