const { Sequelize } = require('sequelize');

// Configuración de Sequelize con SSL habilitado
const sequelize = new Sequelize('bdmantenimientoauto', 'bdmantenimientoauto_user', 'L7CMRkl8HXe8I8ISbrVEdIg7AtbFmW5J', {
  host: 'dpg-cpqdch4s1f4s73cj168g-a.oregon-postgres.render.com',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Requerir SSL
      rejectUnauthorized: false // Deshabilitar la verificación de certificados (puede ser necesario en algunos entornos)
    }
  }
});

// Función para probar la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close(); // Cierra la conexión
  }
}

testConnection();