const pgp = require('pg-promise')();
const db = pgp('postgres://username:password@localhost:5432/mydatabase');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');

// Registro de Usuario
exports.register = async (req, res) => {
    const { nit, email, contrasena, fecha_registro } = req.body;

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    if (!emailRegex.test(email)) throw 'Email is not supported from your domain.';
    if (contrasena.length < 6) throw 'Password must be at least 6 characters long.';

    const userExists = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists) throw 'User with same email already exists.';

    const hashedPassword = sha256(contrasena + process.env.SALT);
    const query = `
        INSERT INTO users (nit, email, contrasena, fecha_registro)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const newUser = await db.one(query, [nit, email, hashedPassword, fecha_registro]);

    res.json({
        message: `User [${newUser.nit}] registered successfully!`,
    });
};

// // Inicio de Sesión
// exports.login = async (req, res) => {
//     const { email, contrasena } = req.body;
//     const hashedPassword = sha256(contrasena + process.env.SALT);

//     const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1 AND contrasena = $2', [email, hashedPassword]);
//     if (!user) throw 'Email and Password did not match.';

//     const token = await jwt.sign({ id: user.id }, process.env.SECRET);

//     res.cookie('token', token, {
//         httpOnly: false,
//         sameSite: 'None',
//         secure: true,
//     });

//     res.json({
//         message: 'User logged in successfully!',
//         token,
//     });
// };

// // Cerrar Sesión
// exports.logout = async (req, res) => {
//     res.clearCookie('token');
//     res.clearCookie('ws');
//     res.redirect('/login');
// };


