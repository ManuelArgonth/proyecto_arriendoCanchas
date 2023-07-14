const jwt = require('jsonwebtoken');
require("../configurations.js");

const secret = process.env.JWT_SECRET;

// Generar token JWT
exports.generateToken = (id) => {
  try {
    const token = jwt.sign({userId:id}, secret, { expiresIn: 60*60 });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Error al generar el token JWT');
  }
};

// Verificar token JWT
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Token JWT inválido');
  }
};