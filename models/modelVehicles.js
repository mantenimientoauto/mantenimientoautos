// Importar el módulo Sequelize y la conexión
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.js'); // Ajusta la ruta según tu estructura de archivos

// Definir el modelo de Vehiculo
const Vehiculo = sequelize.define('Vehiculo', {
    item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true // La placa debe ser única
    },
    equipo: {
        type: DataTypes.STRING(50)
    },
    modelo: {
        type: DataTypes.INTEGER
    },
    serial_vin: {
        type: DataTypes.STRING(50)
    },
    linea: {
        type: DataTypes.STRING(50)
    },
    marca: {
        type: DataTypes.STRING(50)
    }
}, {
    // Opciones del modelo
    tableName: 'vehiculos', // Nombre de la tabla en la base de datos
    timestamps: false // No necesitamos createdAt y updatedAt explícitamente
});

// Exportar el modelo para utilizarlo en otras partes de la aplicación
module.exports = Vehiculo;