const db = require('./conexion');

const Venta = {
  crearVenta: (venta, detalles, callback) => {
    db.beginTransaction(err => {
      if (err) return callback(err);

      // Insertar venta
      db.query(
        'INSERT INTO ventas (cliente_id, total) VALUES (?, ?)',
        [venta.cliente_id, venta.total],
        (err, result) => {
          if (err) return db.rollback(() => callback(err));

          const ventaId = result.insertId;

          // Preparar detalle_ventas
          const detallesInsert = detalles.map(d => [
            ventaId,
            d.producto_id,
            d.cantidad,
            d.precio_unitario,
            d.subtotal
          ]);

          db.query(
            'INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ?',
            [detallesInsert],
            (err) => {
              if (err) return db.rollback(() => callback(err));

              db.commit(err => {
                if (err) return db.rollback(() => callback(err));
                callback(null, { ventaId });
              });
            }
          );
        }
      );
    });
  },

  obtenerReportePorProducto: (fechaInicio, fechaFin) => {
    return new Promise((resolve, reject) => {
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
        JOIN producto p ON dv.producto_id = p.id_producto
        JOIN ventas v ON dv.venta_id = v.id_venta
        WHERE v.fecha BETWEEN ? AND ?
        GROUP BY p.id_producto
        ORDER BY ingreso_total DESC
      `;

      db.query(sql, [fechaInicio, fechaFin, fechaInicio, fechaFin], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
};

module.exports = Venta;
