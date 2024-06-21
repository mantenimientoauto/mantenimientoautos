// Importa el modelo de usuario y la librería bcrypt para el manejo de contraseñas
const User = require('../models/userModel'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');

// Define y exporta el controlador para registrar un usuario
exports.register = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { nit, contrasena } = req.body;

    // Verificar si el NIT ya existe
    const existingUser = await User.findOne({ where: { nit } });

    if (existingUser) {
      return res.status(400).json({ message: 'El NIT ya está registrado' });
    }

    // Encripta la contraseña proporcionada
    const hashedPassword = await bcrypt.hash(contrasena, 12);

    // Crear un nuevo usuario con los datos proporcionados y la contraseña encriptada
    const user = await User.create({
      nit,
      contrasena: hashedPassword,
      fecha_registro: new Date()
    });

    // Responde con un estado 201 y un mensaje de éxito junto con los datos del usuario
    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error); // Log para depuración
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message || error });
  }
};

// Define y exporta el controlador para iniciar sesión de un usuario
exports.login = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { nit, contrasena } = req.body;

    // Busca un usuario en la base de datos que coincida con el NIT proporcionado
    const user = await User.findOne({ where: { nit } });

    // Si no se encuentra un usuario con el NIT proporcionado, responde con un estado 401 y un mensaje de error
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Compara la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

    // Si la contraseña es incorrecta, responde con un estado 401 y un mensaje de error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si la contraseña es correcta, responde con un estado 200 y un mensaje de éxito junto con los datos del usuario
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Log para depuración
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message || error });
  }
};

// Define y exporta el controlador para cerrar sesión de un usuario
exports.logout = (req, res) => {
  // Lógica de cierre de sesión (si se usa sesión o token, invalidar aquí)
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
