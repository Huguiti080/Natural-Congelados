const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');
 

const { validarEmpleado, validarEmpleadoSinId } = require('../validations/empleadosValidation');

const { validationResult } = require('express-validator');

/*define un middleware llamado validar en Express, y se utiliza para capturar errores de validación generados por express-validator
 Es un filtro que intercepta la solicitud justo después de las validaciones. Si encuentra errores, detiene el flujo y devuelve esos errores al cliente.
*/


/*el middleware validar revisa si los datos que entran cumplen con los requisitos (como nombre no vacío, sueldo válido, etc). Si no pasan, se detiene todo ahí. Si sí pasan, la solicitud continúa al controlador que guarda en la base de datos*/

const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ ok: false, errores: errores.array() });
  }
  next(); /*Si no hay errores, llama a next() para continuar hacia el siguiente middleware o hacia el controlador 
  que maneja la petición (por ejemplo, crear o actualizar el empleado)*/ 
};

/*Un middleware actúa como una capa intermedia entre la solicitud del cliente y la lógica final que maneja esa solicitud*/

//definicion de rutas internas relativas
//Esta línea define el endpoint relativo /, y como ya está montado sobre /api/empleados, 
// entonces el endpoint completo se convierte en
// GET http://localhost:3000/api/empleado

router.get('/', empleadosController.listar);  //para consultar todo
router.get('/:id', empleadosController.obtener); //para consultar por id
router.post('/', validarEmpleado, validar, empleadosController.crear);//para dar de alta un registro
router.put('/:id', validarEmpleadoSinId, validar, empleadosController.actualizar);//para actualizar un registro por id
router.delete('/:id', empleadosController.eliminar);//para borrar un registro por id

module.exports = router;