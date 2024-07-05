const Mantenimiento = require("../models/registros");
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database');

async function getAllRegiters(req, res){
    try {
        const registers = await Mantenimiento.findAll();
        res.status(200).json(registers);
    } catch (error) {
        console.error('Error al obtener los registros de mantenimiento:', error);
        res.status(500).json({ error: 'Error al obtener los registros de mantenimiento' });
    }
}

async function getAllRegistersByPlaca(req, res) {
    const { placa } = req.params;

    try {
        const registers = await Mantenimiento.findAll({
            where: {
                vehiculo_placa: placa
            }
        });

        if (registers.length > 0) {
            res.status(200).json(registers);
        } else {
            // No se encontraron registros, se devuelve un estado 204 (No Content)
            res.status(204).end();
        }
    } catch (error) {
        console.error(`Error al obtener los registros para la placa ${placa}:`, error);
        res.status(500).json({ error: `Error al obtener los registros para la placa ${placa}` });
    }
}


async function addRegister(req, res){
    const { detalles, vehiculo_placa, usuario_nit, estado, sugerencia, url_before, url_after,nombre, nom_tecnico } = req.body;

  
    try {
        const nuevoMantenimiento = await Mantenimiento.create({
            detalles,
            vehiculo_placa,
            usuario_nit,
            estado,
            sugerencia,
            url_before,
            url_after,
            nombre,
            nom_tecnico
        });
        res.status(201).json(nuevoMantenimiento);
    } catch (error) {
        console.error('Error al agregar el registro de mantenimiento:', error);
        res.status(500).json({ error: 'No se pudo agregar el registro de mantenimiento' });
    }
}


async function deleteRegisterById(req, res){
    try {
        const { id } = req.params; // Obtiene el id desde los parámetros de la URL

        // Busca el registro por el id y elimínalo
        const resultado = await Mantenimiento.destroy({
            where: { id }
        });

        if (resultado) {
            res.status(200).json({ mensaje: `Registro con id ${id} eliminado exitosamente` });
        } else {
            res.status(404).json({ mensaje: `Registro con id ${id} no encontrado` });
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
}

async function updateRegisterState(req, res) {
    const { id } = req.params;
    const {estado, sugerencia, url_before, url_after, nombre, nom_tecnico } = req.body;
    
    try {
        const register = await Mantenimiento.findByPk(id);
        if (register) {

            // Actualiza solo los campos que se pasen en el body
            if (estado !== undefined) register.estado = estado;
            if (sugerencia !== undefined) register.sugerencia = sugerencia;
            if (url_before !== undefined) register.url_before = url_before;
            if (url_after !== undefined) register.url_after = url_after;
            if (nombre !== undefined) register.nombre = nombre;
            if (nom_tecnico !== undefined) register.nom_tecnico = nom_tecnico;

            await register.save();
            res.status(200).json(register);
        } else {
            res.status(404).json({ message: `Registro con id ${id} no encontrado` });
        }
    } catch (error) {
        console.error('Error al actualizar el estado del registro:', error);
        res.status(500).json({ error: 'No se pudo actualizar el estado del registro' });
    }
}


async function countReportesPorPlaca(req, res) {
    try {
        const counts = await sequelize.query(`
            SELECT V.placa, COUNT(M.id) AS count
            FROM vehiculos V
            LEFT JOIN mantenimientos M ON V.placa = M.vehiculo_placa AND M.estado = false
            GROUP BY V.placa
            HAVING COUNT(M.id) > 0
        `, {
            type: QueryTypes.SELECT
        });

        res.status(200).json(counts);
    } catch (error) {
        console.error('Error al contar los reportes de mantenimiento por placa:', error);
        res.status(500).json({ error: 'Error al contar los reportes de mantenimiento por placa' });
    }
}



module.exports = {
    getAllRegiters,
    getAllRegistersByPlaca,
    addRegister,
    deleteRegisterById,
    updateRegisterState,
    countReportesPorPlaca
};
