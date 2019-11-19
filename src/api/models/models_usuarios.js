const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');
//const bcrypt = require('bcrypt');
const Roles = require('./models_usuario_rol')

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

     /*

     Usuario.beforeCreate((usuarios, options) => {
         console.log("begoreCreate");
      return bcrypt.hash(usuarios.pass, 2)
      .then(hash => {
        console.log("hash");
          usuarios.pass = hash;
      })
      .catch(err => { 
          console.log("begoreCreateError: "+err);
          throw new Error(); 
      });

    });
*/

Usuario.hasMany(Roles, { foreignKey: 'idUsuario' });



//Roles.belongsTo(Usuario, {foreignKey: 'idUsuario'})

//Roles.find({ where: {''}, include: [User]})
module.exports = Usuario; 