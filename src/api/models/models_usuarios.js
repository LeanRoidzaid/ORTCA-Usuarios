const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('usuarios', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     nombre: Sequelize.STRING, 
     apellido: Sequelize.STRING,
     dni: Sequelize.STRING,
     mail: Sequelize.STRING,
     usuario: Sequelize.STRING,
     pass: Sequelize.STRING(255),
     fh_alta: Sequelize.DATE,
     fh_baja: Sequelize.DATE,
     idCentro: Sequelize.INTEGER,
     },{timestamps: false});

     Usuario.beforeCreate((usuarios, options) => {

      
      return bcrypt.hash(usuarios.pass, 2)
      .then(hash => {
          usuarios.pass = hash;
      })
      .catch(err => { 
          console.log(err);
          throw new Error(); 
      });
      
  });
   
module.exports = Usuario; 