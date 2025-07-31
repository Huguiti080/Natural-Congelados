const Producto = require('../models/producto');

exports.getAll = (req, res) => {
  Producto.getAll((err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  Producto.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err);
    res.json(row[0]);
  });
};

exports.create = (req, res) => {
  Producto.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId });
  });
};

exports.update = (req, res) => {
  Producto.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.delete = (req, res) => {
  Producto.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
