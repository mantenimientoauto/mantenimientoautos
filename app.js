require('dotenv').config();
const express = require("express");
const app= express();
const sequelize = require('./utils/database.js');

const port = process.env.PORT || 3000;

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
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

// Sincronizar modelos con la base de datos (opcional, crea tablas si no existen)
sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    // Aquí puedes comenzar a utilizar tus modelos Sequelize (por ejemplo, crear, leer, actualizar, borrar datos)
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });

app.listen(port, ()=>{
console.log(`el servidor esta escuchado en ${port}`);
});
