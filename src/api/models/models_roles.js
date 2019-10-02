const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');

const Roles = sequelize.define('roles', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     descripcion: Sequelize.STRING, 
     Cod: Sequelize.INTEGER,
     },{timestamps: false
  });
module.exports = Roles; 