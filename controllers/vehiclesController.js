const Vehiculo = require('../models/modelVehicles.js');

async function obtenerTodos(req, res) {
    try {
        const vehiculos = await Vehiculo.findAll();
        res.status(200).json(vehiculos);
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        res.status(500).json({ error: 'Error al obtener los vehículos' });
    }
}

async function regitrarVehiculo(req, res) {
    try {
        // Obtener los datos del vehículo del cuerpo de la solicitud
        console.log(req.body);
        const { placa, equipo, modelo, serial_vin, linea, marca } = req.body;

        // Crear una nueva instancia de Vehiculo con los datos recibidos
        const nuevoVehiculo = await Vehiculo.create({
            placa,
            equipo,
            modelo,
            serial_vin,
            linea,
            marca
        });

        // Enviar respuesta con el vehículo creado
        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        console.error('Error al registrar el vehículo:', error);
        res.status(500).json({ error: 'Error al registrar el vehículo' });
    }
}

module.exports = {
    obtenerTodos,
    regitrarVehiculo
};