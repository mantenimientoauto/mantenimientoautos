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

async function actualizarVehiculo(req, res) {
    try {
        const { placa } = req.params; // Obtiene la placa desde los parámetros de la URL
        const { equipo, modelo, serial_vin, linea, marca, dir_img } = req.body; // Desestructura los nuevos datos desde el cuerpo de la solicitud

        const resultado = await Vehiculo.update({
            equipo,
            modelo,
            serial_vin,
            linea,
            marca,
            dir_img
        }, {
            where: {
                placa: placa
            }
        });

        if (resultado[0] === 1) {
            res.status(200).json({ mensaje: 'Vehículo actualizado correctamente.' });
        } else {
            res.status(404).json({ error: 'No se encontró ningún vehículo con la placa especificada.' });
        }
    } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
        res.status(500).json({ error: 'Error al actualizar el vehículo' });
    }
}
// Función para eliminar un vehículo por su placa
async function eliminarVehiculo(req, res) {
    try {
        const { placa } = req.params; // Obtiene la placa desde los parámetros de la URL

        // Busca el vehículo por la placa y elimínalo
        const resultado = await Vehiculo.destroy({
            where: { placa }
        });

        if (resultado) {
            res.status(200).json({ mensaje: `Vehículo con placa ${placa} eliminado exitosamente` });
        } else {
            res.status(404).json({ mensaje: `Vehículo con placa ${placa} no encontrado` });
        }
    } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        res.status(500).json({ error: 'Error al eliminar el vehículo' });
    }
}

module.exports = {
    obtenerTodos,
    regitrarVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
};