const Cliente = require('../models/cliente');

exports.getAll = (req, res) => {
  Cliente.getAll((err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  Cliente.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err);
    res.json(row[0]);
  });
};

exports.create = (req, res) => {
  Cliente.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId });
  });
};

exports.update = (req, res) => {
  Cliente.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.delete = (req, res) => {
  Cliente.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.historialCompras = (req, res) => {
  Cliente.getHistorialCompras(req.params.id, (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

exports.registrarInteraccion = (req, res) => {
  Cliente.addInteraccion(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId });
  });
};

exports.listarInteracciones = (req, res) => {
  Cliente.getInteracciones(req.params.id, (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};
