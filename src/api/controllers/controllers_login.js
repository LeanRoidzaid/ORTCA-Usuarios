const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const dbConnection = require('../../config/dbConnection');
const usuarios = require('../models/models_usuarios');
const bcrypt = require('bcrypt');

app.post("/", async function(req, res) {
  usuarios.findOne({
  where: {
        usuario: req.body.usuario
        }
        })
    .then(user => {
        //console.log(users);
        //res.send(users);
        if (!user) {
          res.send('Incorrect user');
          //res.redirect('/');
          return;
       } else {
        
        bcrypt.compare(req.body.pass, user.pass, function (err, result) {
          
          if (result == true) {
            //res.send('login correcto');
            //return;
            
            var tokenData = { username: user,ultimoLogin:new Date() };
            var token = jwt.sign(tokenData, process.env.CLAVEJWT, {
              expiresIn: 60 * 60 * 24 // expira en 24 horas
            });
                  
            res.status(200).send({
              token
            });
          } else {
            res.status(401).send({
              error: "usuario o contraseña inválidos"
            });
            //res.send('Incorrect password ' + req.body.pass +' '+ user.pass + ' ' + result);
            //res.
            //res.redirect('/');
            //return;
          }
        });    
      };
    });
});

     
module.exports = app;
