const express = require("express");
const app = express();
const usuarios = require('../controllers/controllers_usuarios');
const  verificaRol  = require("../middlewares/varificaRolMiddleware");

/**
 * @swagger
 * /api/usuarios/all:
 *   get:
 *     tags:
 *       - Todos los usuarios
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

app.get("/all", verificaRol.esAdministradorMiddleware,function(req, res) {
    
    let result = usuarios.listarUsuarios()
    result.then(users => {
        console.log(users);
        res.send(users)
         
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
});

/**
 * @swagger
 * /api/usuarios/usuario:
 *   get:
 *     tags:
 *       - Buscar un usuario
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

app.get("/usuario", verificaRol.esAdministradorMiddleware,function(req, res) {
    
    let result = usuarios.buscarUsuario(req.body.usuario)
    result.then(users => {
        console.log(users);
        res.send(users)
         
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
    
});

/**
 * @swagger
 * /api/usuarios/alta:
 *   post:
 *     tags:
 *       - Alta usuario
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

app.post('/alta', verificaRol.esAdministradorMiddleware, function (req, res) {
    let result = usuarios.insertarUsuario(req.body)
    result.then(users => {
        console.log(users);
        res.send(users)
         
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error en el insert de usuario');
        throw err;
    })
})
    
/**
 * @swagger
 * /api/usuarios/actualizar:
 *   post:
 *     tags:
 *       - Actualizar usuario
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

app.post('/actualizar', verificaRol.esAdministradorMiddleware, function (req, res) {
    let result = usuarios.updateUsuario(req.body)
    result.then(users => {
        console.log(users);
        res.send(users)
         
    })
    .catch(err => { 
        console.log(err);
        res.status(400).send('Error en el update de usuario');
        throw err;
    })
})

module.exports = app;

