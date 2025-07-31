const db = require('../models/conexion');

// Crear una nueva entrada y aumentar el stock
exports.crearEntrada = (req, res) => {
  const { producto_id, cantidad, fecha_entrada, proveedor } = req.body;

  if (!producto_id || !cantidad || !fecha_entrada) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  // Insertar entrada
  const sqlEntrada = `
    INSERT INTO entradas (producto_id, cantidad, fecha_entrada, proveedor)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sqlEntrada, [producto_id, cantidad, fecha_entrada, proveedor], (err, result) => {
    if (err) {
      console.error('Error al insertar entrada:', err);
      return res.status(500).json({ error: 'Error al registrar la entrada' });
    }

    // Aumentar stock del producto
    const sqlStock = `
      UPDATE productos
      SET stock = stock + ?
      WHERE id_producto = ?
    `;

    db.query(sqlStock, [cantidad, producto_id], (err2) => {
      if (err2) {
        console.error('Error al actualizar stock:', err2);
        return res.status(500).json({ error: 'Entrada registrada pero fallo en actualización de stock' });
      }

      res.status(201).json({ mensaje: 'Entrada registrada y stock actualizado correctamente' });
    });
  });
};

// Obtener historial de entradas (opcionalmente se puede filtrar por producto)
exports.obtenerEntradas = (req, res) => {
  const sql = `
    SELECT e.id_entrada, e.producto_id, p.nombre AS producto, e.cantidad, e.fecha_entrada, e.proveedor
    FROM entradas e
    JOIN productos p ON e.producto_id = p.id_producto
    ORDER BY e.fecha_entrada DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar entradas:', err);
      return res.status(500).json({ error: 'Error al obtener historial de entradas' });
    }

    res.json(results);
  });
};
