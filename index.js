const express = require('express'); // Importar express
const routerApi = require('./routes'); // Importar las rutas
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express(); // Asignar express a mi aplicación

// Cambia el puerto fijo por la variable de entorno
const port = process.env.PORT || 3000; // Usa el puerto asignado por Railway o 3000 por defecto

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi puerto ${port}`);
});
