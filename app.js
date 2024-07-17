const express = require("express");
const app = express();
const sequelize = require('./utils/database.js');

const cors = require('cors'); 
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://mantenimientoautosbackend.onrender.com','https://frontendmantenimiento.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send(`<h1>¡Hola usuario!</h1>`);
});

// Importar y usar el enrutador para '/user' y '/vehiculos'
app.use("/user", require("./routes/users.js"));
app.use("/vehiculos", require("./routes/vehiculos.js"));
app.use("/mantenimientos", require("./routes/registroMantenimiento.js"));

// Conectar a la base de datos y arrancar el servidor
sequelize.authenticate()
    .then(() => {
        return sequelize.sync({ force: false });
    })
    .then(() => {

        app.listen(port, () => {
            console.log(`El servidor está escuchando en el puerto: ${port}`);
        });

        // Mantener el servidor despierto
        keepServerAwake();
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

// Función para mantener el servidor despierto
const keepServerAwake = () => {
    setInterval(() => {
        const http = require('http');
        http.get(`http://localhost:${port}`, (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                null
            });
        }).on('error', (err) => {
            console.error('Error en la solicitud para mantener el servidor despierto:', err);
        });
    }, 20000); // Cada 5 minutos
};
