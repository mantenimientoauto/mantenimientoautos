const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Asegúrate de que la ruta sea correcta

// Clave secreta para firmar el JWT
const secretKey = 'your_secret_key'; // Cambia esto a una clave secreta segura

// Controlador para registrar un usuario
exports.register = async (req, res) => {
  try {
    const { nit, contrasena } = req.body;

    const existingUser = await User.findOne({ where: { nit } });
    if (existingUser) {
      return res.status(400).json({ message: 'El NIT ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 12);
    const user = await User.create({
      nit,
      contrasena: hashedPassword,
      fecha_registro: new Date()
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message || error });
  }
};

// Controlador para iniciar sesión de un usuario
exports.login = async (req, res) => {
  try {
    const { nit, contrasena } = req.body;

    const user = await User.findOne({ where: { nit } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ nit: user.nit }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        nit: user.nit,
        fecha_registro: user.fecha_registro
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message || error });
  }
};

// Controlador para cerrar sesión de un usuario
exports.logout = (req, res) => {
  // Aquí podrías invalidar el token si estás usando una lista de tokens inválidos
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
