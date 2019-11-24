const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const sequelize = require('../../config/dbConnection');
const usuarios = require('../models/models_usuarios');
const bcrypt = require('bcrypt');
const UserRoles = require('../models/models_usuario_rol')
const Roles = require('../models/models_roles')
const usuarioController = require('../controllers/controllers_usuarios');
const config = require('../../config/config');

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Login
 *     description: usuarios se logea y devuelve token con usuario y roles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             usuario:
 *               type: string 
 *             pass:
 *               type: string 
 *         required:
 *           - usuario
 *           - pass
 *     responses:
 *       200:
 *         description: ok
 *       401:
 *         description: Usuario invalido o clave incorrecta
 *
 */

app.post("/", async function(req, res) {
  //res.header("Access-Control-Allow-Origin", "*");
  console.log("login paso1");
  const { usuario, pass } = req.body

  //const passEncripts =  bcrypt.hashSync(pass, 2);

  try{
    console.log("login paso2");
    var user = await usuarioController.login(usuario,pass);
    console.log("Linea 51" + user);
    const passUsuario = user.pass;


   // var esok =  bcrypt.compareSync(passUsuario ,user.pass); 
    //var esok = await bcrypt.compare(passUsuario ,user.pass); 
    //console.log(esok);
      if (typeof user !== 'undefined') {

      console.log("Paso controller 3.0 "+passUsuario);     

      console.log("Paso controller 3"+user);

      var roles = user.usuario_roles;
      const tokenData = { username: user, roles, ultimoLogin:new Date() };

      const token =   jwt.sign(tokenData, String(config.CLAVEJWT), {
      expiresIn: 60 * 60 * 24 // expira en 24 horas
      });

      res.status(200).send({ token });
          return user;    
      }
      else{
        throw Error("Usuario invalido");
      } 

        

  }catch(error){
    console.log("login catch "+error);
    res.status(401).send({
      error: error
    });
  }
 




});

/**
 * @swagger
 * /api/login/recuperarPass:
 *   post:
 *     tags:
 *       - Recuperar Pass
 *     description: Se envia una pass provisoria por mail y el usuario debe volver a cambiarla
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: token 
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             usuario:
 *               type: string 
 *         required:
 *           - usuario
 *     responses:
 *       200:
 *         description: nueva pass enviada
 *       400:
 *         description: error recuparacion de pass
 *
 */

app.post("/recuperarPass",async function(req, res) {

    let result = usuarioController.enviarNuevaPass(req.body.usuario);
    result.then(mail => {
        console.log("se envio un mail al usuario: " + req.body.usuario);
        res.send("se envio un mail al usuario: " + req.body.usuario);
    }).catch(err => { 
      console.log(err);
      res.status(400).send("Usuario en incorrectos");
      throw err;
    });
});

module.exports = app;
