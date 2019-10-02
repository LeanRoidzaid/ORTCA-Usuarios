const express = require("express");
const app = express();
const dbConnection = require('../../config/dbConnection');
const usuarios = require('../models/models_usuarios');

/**
 * @swagger
 * /api/usuarios/all:
 *   get:
 *     tags:
 *       - all
 *     description: Busca en Mysql a todos los usuario
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/all", function(req, res) {
    
    usuarios.findAll({ attributes: ['nombre', 'apellido'] })
        .then(users => {
            console.log(users);
            res.send(users);

         })
        .catch(err => {
            console.log(err);
            res.send(err);
         })
});

/**
 * @swagger
 * /api/usuarios/usuario:
 *   get:
 *     tags:
 *       - all
 *     description: Busca en Mysql los datos del usuario por el usuario
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/usuario", function(req, res) {
    
    usuarios.findAll({
        where: {
            usuario: req.body.usuario
        }
    })
        .then(users => {
            console.log(users);
            res.send(users);

         })
        .catch(err => {
            console.log(err);
            res.send(err);
         })
});

/**
 * @swagger
 * /api/usuarios/porDatos:
 *   get:
 *     tags:
 *       - all
 *     description: Busca en Mysql los datos del usuario por DNI, nombre, mail o por CAPS
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/porDatos", function(req, res) {
    
    usuarios.findAll({
        where: {
            $or:{nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni ,
            mail: req.body.mail,  
            usuario: req.body.usuario,
            pass: req.body.pass,
            fh_alta: req.body.fh_alta,
            fh_baja: req.body.fh_baja,
            idCentro: req.body.idCentro}
        }
    })
        .then(users => {
            console.log(users);
            res.send(users);

         })
        .catch(err => {
            console.log(err);
            res.send(err);
         })
});


/**
 * @swagger
 * /api/usuarios/alta:
 *   post:
 *     tags:
 *       - alta
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             nombre:
 *               type: string
 *             apellido:
 *               type: string
 *             dni:
 *               type: string
 *             mail:
 *               type: string
 *             usuario:
 *               type: string 
 *             pass:
 *               type: string 
 *             fh_alta:
 *               type: string
 *             fh_baja:
 *               type: string
 *             idCentro:
 *               type: integer
 *         required:
 *           - nombre
 *           - apellido
 *           - dni
 *           - mail
 *           - usuario
 *           - pass
 *           - fh_alta
 *           - fh_baja
 *           - id_centro
 *     responses:
 *       200:
 *         description: Beneficiarios insertado en tabla Mysql con exito
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta api
 *       400:
 *         description: Ocurrio un error al guardar el beneficiarios en Mysql
 */

app.post('/alta', function (request, response) {
    return usuarios.create({
     nombre: request.body.nombre,
     apellido: request.body.apellido,
     dni: request.body.dni,
     mail: request.body.mail,
     usuario: request.body.usuario,
     pass: request.body.pass,
     fh_alta: request.body.fh_alta,
     fh_baja: request.body.fh_baja,
     idCentro: request.body.idCentro
    }).then(function (users) {
        if (users) {
            response.send(users);
            console.log(users);
        } else {
            response.status(400).send('Error en el insert de usuario');
            console.log(err)
        }
    });
});

/**
 * @swagger
 * /api/usuarios/actualizar:
 *   post:
 *     tags:
 *       - update
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             nombre:
 *               type: string
 *             apellido:
 *               type: string
 *             dni:
 *               type: string
 *             mail:
 *               type: string
 *             usuario:
 *               type: string 
 *             pass:
 *               type: string 
 *             fh_alta:
 *               type: string
 *             fh_baja:
 *               type: string
 *             idCentro:
 *               type: integer
 *         required:
 *           - nombre
 *           - apellido
 *           - dni
 *           - mail
 *           - usuario
 *           - pass
 *           - fh_alta
 *           - fh_baja
 *           - id_centro 
 *     responses:
 *       200:
 *         description: Beneficiarios insertado en tabla Mysql con exito
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta api
 *       400:
 *         description: Ocurrio un error al guardar el beneficiarios en Mysql
 */

app.post('/actualizar', function (request, response) {
    return usuarios.update({
     nombre: request.body.nombre,
     apellido: request.body.apellido,
     dni: request.body.dni,
     mail: request.body.mail,
     usuario: request.body.usuario,
     pass: request.body.pass,
     fh_alta: request.body.fh_alta,
     fh_baja: request.body.fh_baja,
     idCentro: request.body.idCentro
    },{
        where:{
            id: request.body.id 
        }
    }).then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error en el insert de usuario');
        }
    });
});

module.exports = app;

