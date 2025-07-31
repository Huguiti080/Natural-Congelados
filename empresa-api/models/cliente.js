const db = require('./conexion');

const Cliente = {
  getAll: (callback) => {
    db.query('SELECT * FROM clientes', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id], callback);
  },
  create: (cliente, callback) => {
    db.query('INSERT INTO clientes SET ?', [cliente], callback);
  },
  update: (id, cliente, callback) => {
    db.query('UPDATE clientes SET ? WHERE id_cliente = ?', [cliente, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM clientes WHERE id_cliente = ?', [id], callback);
  },

  // AGREGAR ESTOS MÉTODOS:
  getHistorialCompras: (clienteId, callback) => {
    const query = `
      SELECT v.id_venta, v.fecha, v.total, v.cliente_id,
             dv.producto_id, dv.cantidad, dv.precio_unitario, dv.subtotal,
             p.nombre as producto_nombre
      FROM ventas v 
      JOIN detalle_ventas dv ON v.id_venta = dv.venta_id 
      LEFT JOIN productos p ON dv.producto_id = p.id_producto
      WHERE v.cliente_id = ?
      ORDER BY v.fecha DESC
    `;
    db.query(query, [clienteId], callback);
  },
  
  addInteraccion: (clienteId, data, callback) => {
    const query = 'INSERT INTO interacciones (cliente_id, tipo, medio, descripcion, fecha) VALUES (?, ?, ?, ?, NOW())';
    db.query(query, [clienteId, data.tipo, data.medio, data.descripcion], callback);
  },
  
  getInteracciones: (clienteId, callback) => {
    const query = 'SELECT * FROM interacciones WHERE cliente_id = ? ORDER BY fecha DESC';
    db.query(query, [clienteId], callback);
  }

};


module.exports = Cliente;
