const jwtUtil =  require('../utils/jwtUtil')
//require('dotenv').config();
require("../configurations.js");

//Middleware de verificación de token

exports.verificarToken = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
    
        //Verificar si el token existe
        if(!token){
            return res.status(401).json({error:'No se proporciono token de autorización.'});
        }
        
        //Verificar y decodificar el token
        const tokenVerificado = jwtUtil.verifyToken(token);
        req.userId =  tokenVerificado.userId;
         // Continuar con el siguiente middleware o controlador
        next();
        
        // jwt.verify(token, process.env.JWT_SECRET, (err, tokenDecodificado) =>{
        //     if(err){
        //         console.error('error al verificar el token',err);
        //         return res.status(500).json({error:'Error interno del servidor.'});
        //     }
        
        //     //Guardar el usuario decodificado en el objeto de la solicitud para su uso posterior
        //     req.userId =  tokenDecodificado.userId;
        //     next();
        // });
    } catch (error) {
        console.error('Error al verificar el token de autenticación',error);
        return res.status(500).json({error:'Error interno del servidor.'});
    }
};