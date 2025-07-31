const db = require('./conexion');

const Pedido = {
  create: (data, callback) => {
    // CAMBIAR ESTA LÍNEA:
    const query = 'INSERT INTO pedidos (producto_id, fecha, cantidad, estado) VALUES (?, ?, ?, ?)';
    db.query(query, [data.producto_id, data.fecha, data.cantidad, data.estado], callback);
  },
  getAll: (callback) => {
    const query = 'SELECT * FROM pedidos';
    db.query(query, callback);
  },
  update: (id, data, callback) => {
    // CAMBIAR ESTA LÍNEA TAMBIÉN:
    const query = 'UPDATE pedidos SET estado = ?, cantidad = ? WHERE id_pedido = ?';
    db.query(query, [data.estado, data.cantidad, id], callback);
  }
};

module.exports = Pedido;