const express = require('express');
const app = express();
require("./database.js")
const PORT = 8080;

const pilotoRoutes = require('./routes/piloto.router.js');
const equipoRoutes = require('./routes/equipo.router.js');
const carreraRoutes = require('./routes/carrera.router.js');
const temporadaRoutes = require('./routes/temporada.router.js');


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/pilotos', pilotoRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/carreras', carreraRoutes);
app.use('/api/temporadas', temporadaRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
