const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const Sequelize = require('sequelize')
const usuarios = require('../models/models_usuarios');
const bcrypt = require('bcrypt');
const UserRoles = require('../models/models_usuario_rol')
const Roles = require('../models/models_roles')
const usuario = require('../controllers/controllers_usuarios');
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

app.post("/",async function(req, res) {
  const { usuario, pass } = req.body
  if (!usuario || !pass) {
    res.status(401).send({
      error: "usuario y pass son requeridos."
    })
  } else {
    usuarios
    .findOne({
        // attributes: ['discoverySource'],
        where: {
          usuario: req.body.usuario
        },
        include: [{
            model: UserRoles,
        }]
    })
    .then(async (u) => {
        if(u != null && u.usuario_roles.length != 0){
        const roles = await Roles.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: (u.usuario_roles || []).map(ur => String(ur.idRol))
          }
        }
      })

      u.roles = roles
      u.jo = 1

      return Promise.resolve(u)
        }
    })
    .then(user => {
        if (!user) {
          res.status(401).send({
            error: "usuario o contraseña inválidos"
          });

          return;
        } else {
          const roles = user.roles
          bcrypt.compare(req.body.pass, user.pass, function (err, result) {
            if (result == true) {
              //res.send('login correcto');
              //return;
              
              const tokenData = { username: user, roles, ultimoLogin:new Date() };
              //const token = jwt.sign(tokenData, String(process.env.CLAVEJWT), {
                const token = jwt.sign(tokenData, String(config.CLAVEJWT), {
                expiresIn: 60 * 60 * 24 // expira en 24 horas
              });
                    
              res.status(200).send({ token });
              
            } else {
              res.status(401).send({
                error: "usuario o contraseña inválidos"
              });
            }
          });    
      };
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

    let result = usuario.enviarNuevaPass(req.body.usuario);
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
