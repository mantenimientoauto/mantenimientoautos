const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiclesController.js');

// Define la ruta GET para obtener todos los vehículos
router.get('/getAll', vehiculosController.obtenerTodos);
router.post('/createVehicule', vehiculosController.regitrarVehiculo);

module.exports = router;
