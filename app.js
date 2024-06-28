const express = require("express");
const app = express();
const sequelize = require('./utils/database.js');
const models = require('./models/relations.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use(require("cors")()); // Habilitar CORS para peticiones cruzadas

app.get("/", (req, res) => {
    res.send(`<h1>¡Hola usuario!</h1>`);
    console.log("Bienvenido al servidor de mantenimiento");
});

// Importar y usar el enrutador para '/user' y '/vehiculos'
app.use("/user", require("./routes/users.js"));
app.use("/vehiculos", require("./routes/vehiculos.js"));
app.use("/mantenimientos", require("./routes/registroMantenimiento.js"));

// Conectar a la base de datos y arrancar el servidor
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
