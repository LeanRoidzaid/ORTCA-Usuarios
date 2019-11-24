const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');
const bcrypt = require('bcrypt');
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
     },{timestamps: false 
    }
     
     );
     Usuario.prototype.validPassword = function (password) {
      console.log("password: "+ password +" this.pass: "+this.pass );
      return bcrypt.compareSync(password, this.pass);}
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

Usuario.authenticate = async function(username, password) {

  const user = await Usuario.findOne({ where: { usuario:username } });

  // bcrypt is a one-way hashing algorithm that allows us to 
  // store strings on the database rather than the raw
  // passwords. Check out the docs for more detail
  console.log("password: " + password +" user.password: "+ user.pass);
  if (bcrypt.compareSync(password, user.pass)) {
    return true;
  }

  throw new Error('invalid password');
}



//Roles.belongsTo(Usuario, {foreignKey: 'idUsuario'})

//Roles.find({ where: {''}, include: [User]})
module.exports = Usuario; 