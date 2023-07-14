const {Sequelize} = require('sequelize');
require("../configurations.js");

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_dialect = process.env.DB_DIALECT;



const conexion =  new Sequelize(
    db_name,
    db_user,
    db_password,
    {host:db_host,
    dialect:db_dialect}
);

conexion
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
console.log(`Conexión a la base de datos establecida correctamente. ${db_name}`);
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = conexion;


// const mysql =  require('mysql');

// //configuración de la base de datos

// const conexion = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'arriendo_canchas'
// });

// conexion.connect((err)=>{
//     if(err){
//         res.status(401).json({error:'Error en la conexión a la base de datos.'});
//         console.error('error en la base de datos',err);
//         return;
//     }
//     res.status(500).json({error:'Conexión exitosa.'});
//     console.log('Conexión exitosa');
// });

// module.exports = conexion;