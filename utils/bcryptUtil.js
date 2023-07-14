const bcrypt = require('bcrypt');

// Generar hash de contraseña
exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword.toString();
  } catch (error) {
    throw new Error('Error al generar el hash de la contraseña');
  }
};

// Comparar contraseña con el hash almacenado
exports.comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error al comparar la contraseña');
  }
};