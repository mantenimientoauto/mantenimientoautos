const { DataTypes } = require('sequelize');
const sequelize = require('./database.js'); // Asegúrate de que este camino sea correcto y que exportes sequelize correctamente

const Mantenimiento = sequelize.define('Mantenimiento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  detalles: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  vehiculo_placa: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  usuario_nit: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'mantenimientos',
  timestamps: false // No utilices createdAt y updatedAt automáticamente
});

module.exports = Mantenimiento;