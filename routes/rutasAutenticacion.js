const express =  require('express');
const ruta =  express.Router();
const autenticacionController = require('../controllers/autenticacionController');
const {verificarToken} = require('../middlewares/autenticacionMiddleware');
// 
// RUTAS DE CADA ACCIÓN
// 

//Ruta de registro
ruta.post('/registro', autenticacionController.register);

//Ruta de inicio de sesión
ruta.post('/login',autenticacionController.login);

//Ruta de cierre de sesión
ruta.post('/logout',verificarToken, autenticacionController.logout);


module.exports = ruta;