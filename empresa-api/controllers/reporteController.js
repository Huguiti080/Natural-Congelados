const db = require('../models/conexion');

exports.ventasDiarias = (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ mensaje: 'Falta la fecha' });
  }

  const sql = `
    SELECT 
      COUNT(v.id_venta) AS total_ventas,
      IFNULL(SUM(v.total), 0) AS total_ingresos
    FROM ventas v
    WHERE DATE(v.fecha) = ?
  `;

  db.query(sql, [fecha], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.ventasPorCliente = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      c.nombre AS cliente,
      COUNT(v.id_venta) AS total_ventas,
      IFNULL(SUM(v.total), 0) AS total_ingresos
    FROM clientes c
    LEFT JOIN ventas v ON v.cliente_id = c.id_cliente
    WHERE c.id_cliente = ?
    GROUP BY c.id_cliente
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0] || { mensaje: 'Cliente sin ventas' });
  });
};

exports.ventasPorProducto = (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ mensaje: 'Faltan fechas' });
  }

  const sql = `
    SELECT 
      p.nombre AS producto,
      SUM(dv.cantidad) AS unidades_vendidas,
      SUM(dv.subtotal) AS ingreso_total,
      ROUND(SUM(dv.subtotal) / (
        SELECT SUM(dv2.subtotal)
        FROM detalle_ventas dv2
        JOIN ventas v2 ON dv2.venta_id = v2.id_venta
        WHERE v2.fecha BETWEEN ? AND ?
      ) * 100, 2) AS porcentaje
    FROM detalle_ventas dv
    JOIN productos p ON dv.producto_id = p.id_producto
    JOIN ventas v ON dv.venta_id = v.id_venta
    WHERE v.fecha BETWEEN ? AND ?
    GROUP BY p.id_producto
    ORDER BY ingreso_total DESC
  `;

  db.query(sql, [fechaInicio, fechaFin, fechaInicio, fechaFin], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};


exports.obtenerStockCritico = (req, res) => {
  const umbral = 5; // puedes hacerlo dinámico si gustas con req.query.umbral

  const sql = `
    SELECT id_producto, nombre, categoria, stock, precio, proveedor
    FROM productos
    WHERE stock < ?
  `;

  db.query(sql, [umbral], (err, results) => {
    if (err) {
      console.error('Error al obtener stock crítico:', err);
      return res.status(500).send({ error: 'Error al consultar productos con stock bajo' });
    }
    res.json(results);
  });
};
