const {Sequelize, DataTypes} =  require('sequelize');
const sequelize = require('../config/database');

const Usuario =  sequelize.define('Usuario',{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bloqueado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      tableName: 'usuarios',
      timestamps: false
});

module.exports =  Usuario;