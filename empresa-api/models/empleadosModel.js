const conexion = require('./conexion');

const Empleados = {
  getAll: (callback) => {
    conexion.query('SELECT * FROM empleados', callback);
  },
  getById: (id, callback) => {
    conexion.query('SELECT * FROM empleados WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    conexion.query('INSERT INTO empleados SET ?', data, callback);
  },
  update: (id, data, callback) => {
    conexion.query('UPDATE empleados SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
  conexion.query('DELETE FROM empleados WHERE id = ?', [id], (err, result) => {
    callback(err, result); // para acceder a result.affectedRows
  });
}
};

module.exports = Empleados;