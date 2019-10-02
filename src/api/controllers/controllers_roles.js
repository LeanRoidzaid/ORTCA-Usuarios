const express = require("express");
const app = express();
const dbConnection = require('../../config/dbConnection');
const roles = require('../models/models_roles');
const usuarioRol = require('../models/models_usuario_rol');

/**
 * @swagger
 * /api/roles/all:
 *   get:
 *     tags:
 *       - all
 *     description: Busca en Mysql a todos los roles disponibles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda de todos lo roles
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/all", function(req, res) {
    
    roles.findAll({ attributes: ['descripcion', 'Cod'] })
        .then(roles => {
            console.log(roles);
            res.send(roles);

         })
        .catch(err => {
            console.log(err);
            res.send(err);
         })
});

/**
 * @swagger
 * /api/roles/asignarRoles:
 *   post:
 *     tags:
 *       - asignarRoles
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             idUsuario:
 *               type: integer
 *             idRol:
 *               type: integer
 *         required:
 *           - idUsuario
 *           - idRol
 *     responses:
 *       200:
 *         description: Se asignan los roles al usuario
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta api
 *       400:
 *         description: Ocurrio un error al guardar el beneficiarios en Mysql
 */

app.post('/asignarRoles', function (req, res) {
    var members = req.body.idRol; 
    
    usuarioRol.sequelize.transaction(function (t) { 
        var promises = []; 
        for (var i = 0; i < req.body.idRol.length; i++) {
            var newPromise = usuarioRol.create({idUsuario: req.body.idUsuario, idRol: members[i]}); promises.push(newPromise); 
        }; 
        return Promise.all(promises).then(function(usuarioRol) { 
                var usuarioRolPromises = []; 
                for (var i = 0; i < usuarioRol.length; i++) { 
                    usuarioRolPromises.push(usuarioRol[i]); 
                } 
                return Promise.all(usuarioRolPromises); 
            }); 
        }).then(function (result) { 
            console.log(usuarioRol);
            res.send(usuarioRol); 
        }).catch(function (err) { 
            console.log(err);
            res.send(err);
    })
});  

/**
 * @swagger
 * /api/roles/quitarRol:
 *   post:
 *     tags:
 *       - quitarRol
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             idUsuario:
 *               type: integer
 *             idRol:
 *               type: integer
 *         required:
 *           - idUsuario
 *           - idRol
 *     responses:
 *       200:
 *         description: Se quita un rol a un usuario especifico
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta api
 *       400:
 *         description: Ocurrio un error al guardar el beneficiarios en Mysql
 */

app.post('/quitarRol', function (req, res) {
    return usuarioRol.destroy({
        where: {idUsuario: req.body.idUsuario, 
                idRol: req.body.idRol}
        }).then(function (result) { 
            console.log(usuarioRol);
            res.send(usuarioRol); 
        }).catch(function (err) { 
            console.log(err);
            res.send(err);
       });
   });

module.exports = app;
