require('dotenv').config();
const express = require("express");
const app= express();
const sequelize = require('./utils/database.js');

const port = process.env.PORT || 4000;

app.use(require("cors")()); // origenes cruzados

app.get("/",(req,res)=>{
    res.send(`<h1>hola usuario</h1>`)
    console.log("bienvenido al servidor de mantenimiento");
});

app.use("/user", require("./routes/users.js"));


// Conectarse a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
    // Sincronizar modelos con la base de datos (opcional, crea tablas si no existen)
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    // Iniciar el servidor una vez que todo esté listo
    app.listen(port, () => {
      console.log(`El servidor está escuchando en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
