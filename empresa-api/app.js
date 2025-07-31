const express = require('express');
const app = express();
const cors = require('cors');
const empleadosRoutes = require('./routes/empleados');
const productosRoutes = require('./routes/productos');
const clientesRoutes = require('./routes/clientes');
const ventasRoutes = require('./routes/ventas');
const reportesRoutes = require('./routes/reportes');
const entradasRoutes = require('./routes/entradas');
const loginRoutes = require('./routes/login');
const pedidosRoutes = require('./routes/pedidos'); 



app.use(cors());
app.use(express.json());
//La ruta base /api/empleados se configura explícitamente  
//Todo lo que esté en el archivo routes/empleados.js se va a usar bajo la ruta /api/empleados
app.use('/api/empleados', empleadosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/entradas', entradasRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/pedidos', pedidosRoutes);




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});