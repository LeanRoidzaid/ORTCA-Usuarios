const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');

const UsuRoles = sequelize.define('usuario_roles', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     idUsuario: Sequelize.INTEGER,  
     idRol: Sequelize.INTEGER,
     },{timestamps: false
  });
module.exports = UsuRoles; 