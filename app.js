const express =  require('express');
const login =  express();
const cors =  require('cors');
const jwtUtil = require('./utils/jwtUtil');
const autenticacionRutas = require('./routes/rutasAutenticacion');
const devAmbiente = require("./configurations.js");

//Configuración de variables de entorno
//dotenv.config();

//Middleware para usar JSON en peticiones
login.use(express.json());

//login.use(express.urlencoded({extended:false}));

//Middleware de CORS
login.use(cors());

//Ruta de autenticación
login.use('/api/autenticacion',autenticacionRutas);

//Rutas de inicio
login.get('/', (req, res) => {
    res.send('API de autentificación2');
});


login.get('/api/protected', (req, res) => {
    try {
      // Obtener el token de autenticación de los encabezados de la solicitud
      const token = req.headers.authorization.split(' ')[1];
  
      // Verificar y decodificar el token
      const decodedToken = jwtUtil.verifyToken(token);
  
      // Acceder a los datos decodificados del token
      const userId = decodedToken.userId;
  
      // Aquí puedes realizar acciones adicionales según los datos del usuario autenticado
      // Por ejemplo, buscar información adicional del usuario en la base de datos
  
      // Enviar respuesta exitosa
      res.status(200).json({ message: 'Ruta protegida accesible', userId });
    } catch (error) {
      console.error('Error al acceder a la ruta protegida:', error);
      res.status(401).json({ error: 'Acceso no autorizado' });
    }
  });


//Manejo de errores
login.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:'Error interno del servidor.'});
});

//iniciar el servidor
const port = process.env.PORT_API;
login.listen(port, () => {
    console.log(`servidor iniciado en http://localhost:${port}`);
});
