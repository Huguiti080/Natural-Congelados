const db = require('./conexion');

const Producto = {
  getAll: (callback) => {
    db.query('SELECT * FROM productos', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM productos WHERE id_producto = ?', [id], callback);
  },
  create: (producto, callback) => {
    db.query('INSERT INTO productos SET ?', [producto], callback);
  },
  update: (id, producto, callback) => {
    db.query('UPDATE productos SET ? WHERE id_producto = ?', [producto, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM productos WHERE id_producto = ?', [id], callback);
  }
};

module.exports = Producto;
