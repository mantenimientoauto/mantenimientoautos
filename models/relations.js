const sequelize = require('../utils/database');
const Mantenimiento = require('./registros');
const Vehiculo = require('./modelVehicles');
const Usuario = require('./userModel');

// Asociar modelos
Vehiculo.hasMany(Mantenimiento, { foreignKey: 'vehiculo_placa', sourceKey: 'placa' });
Usuario.hasMany(Mantenimiento, { foreignKey: 'usuario_nit', sourceKey: 'nit' });
Mantenimiento.belongsTo(Vehiculo, { foreignKey: 'vehiculo_placa', targetKey: 'placa' });
Mantenimiento.belongsTo(Usuario, { foreignKey: 'usuario_nit', targetKey: 'nit' });

const models = {
  Mantenimiento,
  Vehiculo,
  Usuario
};

module.exports = models;
