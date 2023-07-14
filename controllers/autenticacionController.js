const Usuario =  require('../models/usuario');
const jwtUtil = require('../utils/jwtUtil');
const bcryptUtil = require('../utils/bcryptUtil');

const secret = process.env.JWT_SECRET;

//función registrar usuarios
exports.register = async (req,res) =>{ 
    try{
        //obtener datos desde el cuerpo de la solicitud
        const {nombre,email,password} = req.body;
        
        //Verificar si el usuario ya existe en la base de datos;
        const usuarioExistente =  await Usuario.findOne({
             where: { email } 
        });
        if(usuarioExistente){
            return res.status(400).json({error:'El correo electronico ya se encuentra registrado.'});
        }

        //generar el hash de la contraseña
        const hashedPassword =  await bcryptUtil.hashPassword(password);
        
        if(!hashedPassword){
            res.status(500).json({error:'Problemas al crear el hash de la contraseña.'});
        }
        res.status(200).json({message:'hash creado con exito!'});
        
        //creación del nuevo usuario
        const nuevoUsuario = await Usuario.create({nombre,email,password:hashedPassword});
        res.status(201).json({ message: 'Usuario registrado exitosamente', user: nuevoUsuario });
    }catch(error){
        console.error('Error al registrar usuario:', error);
        res.status(500).json({error:'Error en el servidor'});
    }
};

exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user =  await Usuario.findOne({
            where:{email}
        });
        console.log(user);
        if(!user){
            return res.status(401).json({error:'Credenciales no validas.'});
        }
        
        const validPassword = await bcryptUtil.comparePassword(password,user.password);
        if(!validPassword){
            return res.status(401).json({error:'Credenciales no validas.'});
        }
        
        //utizar función GenerateToken creada en util/jwtUtils
        const token = jwtUtil.generateToken(user.id);
        res.status(200).json({token})
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Problemas al iniciar sesión.'});;
    }

};

exports.logout = async (req, res) =>{
    //capturar el token
    const token = req.headers.authorization.split(' ')[1];

    try{
        if(!token){
            return res.status(401).json({error:'No se proporsiono un token.'});
        }
        // Verificar si el token está en la lista de tokens inválidos
        const tokenAnulado=  revokedTokens.has(token);
        if(tokenAnulado){
            return res.status(401).json({ error: 'Sesión cerrada. Inicia sesión nuevamente.' });
        }

        // Agregar el token a la lista de tokens inválidos o revocados (por ejemplo, utilizando un conjunto)
        revokedTokens.add(token);        
        res.status(200).json({message:'Sesión cerrada exitosamente'});
    }catch(error){

    }    
};
