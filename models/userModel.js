// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

const User = sequelize.define('User', {
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true 
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = User;
