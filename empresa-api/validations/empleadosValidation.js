 const { body } = require('express-validator');

// Validación para POST (crear)
exports.validarEmpleado = [
  body('id').isInt({ min: 1000, max: 9999 }).withMessage('ID debe ser un número de 4 dígitos'),
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('sueldo').isNumeric().withMessage('El sueldo debe ser un número'),
  body('antiguedad').isInt({ min: 0 }).withMessage('La antigüedad debe ser un entero positivo'),
  body('puesto').notEmpty().withMessage('El puesto es obligatorio'),
];

// Validación para PUT (actualizar sin validar el ID)
exports.validarEmpleadoSinId = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('sueldo').isNumeric().withMessage('El sueldo debe ser un número'),
  body('antiguedad').isInt({ min: 0 }).withMessage('La antigüedad debe ser un entero positivo'),
  body('puesto').notEmpty().withMessage('El puesto es obligatorio'),
];


/*arreglo de validadores de express-validator que se utiliza para verificar que los datos enviados 
por el usuario en el body cumplan ciertos requisitos antes de llegar al controlador.

Cada línea es un middleware de validación encadenado que verifica un campo del body.

Si alguno de estos validadores falla, el middleware validar,   captura los errores y devuelve un JSON como este
{
  "ok": false,
  "errores": [
    {
      "msg": "El nombre es obligatorio",
      "param": "nombre",
      "location": "body"
    }
  ]
}

*/ 