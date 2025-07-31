const Empleados = require('../models/empleadosModel');

exports.listar = (req, res) => {
  Empleados.getAll((err, results) => {
    if (err) return res.status(500).json({ ok: false, error: err });
    res.json({ ok: true, empleados: results });
  });
};


exports.obtener = (req, res) => {
  Empleados.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ ok: false, error: err });

    if (results.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Empleado no encontrado' });
    }

    res.json({ ok: true, empleado: results[0] });
  });
};


 

exports.crear = (req, res) => {
  Empleados.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ ok: false, error: err });
    res.status(201).json({ ok: true, mensaje: 'Empleado registrado correctamente' });
  });
};

exports.actualizar = (req, res) => {
  Empleados.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ ok: false, error: err });
    res.json({ ok: true, mensaje: 'Empleado actualizado correctamente' });
  });
};

 exports.eliminar = (req, res) => {
  Empleados.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ ok: false, error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Empleado no encontrado' });
    }

    res.json({ ok: true, mensaje: 'Empleado eliminado correctamente' });
  });
};