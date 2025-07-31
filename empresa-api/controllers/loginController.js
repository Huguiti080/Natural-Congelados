const conexion = require('../models/conexion');

const login = (req, res) => {
  const { usuario, password } = req.body;

  // Validar que se proporcionen usuario y password
  if (!usuario || !password) {
    return res.status(400).json({
      error: 'Usuario y password son requeridos'
    });
  }

  // Consulta para buscar el usuario en la tabla usuarios, incluyendo el campo rol
  const query = 'SELECT id, usuario, password, rol FROM usuarios WHERE usuario = ?';
  
  conexion.query(query, [usuario], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({
        error: 'Error interno del servidor'
      });
    }

    // Si no se encontró el usuario
    if (results.length === 0) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    const user = results[0];

    // Verificar si la contraseña coincide
    if (user.password !== password) {
      return res.status(401).json({
        error: 'Contraseña incorrecta'
      });
    }

    // Login exitoso, devolver también el rol
    return res.status(200).json({
      mensaje: 'Login exitoso',
      id_usuario: user.id,
      rol: user.rol
    });
  });
};

module.exports = {
  login
}; 