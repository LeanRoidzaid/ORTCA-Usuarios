const express = require("express");
const app = express();
const roles = require('../controllers/controllers_roles');
const  verificaRol  = require("../middlewares/verificaRolMiddleware");
const  verificaToken  = require("../middlewares/verificaTokenMiddleware");


/**
 * @swagger
 * /api/roles/all:
 *   get:
 *     tags:
 *       - Listar roles
 *     description: Busca en Mysql a todos los roles disponibles
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: token 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda de todos lo roles
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/all", verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware,function(req, res) {
    
    let result = roles.listarRoles()
    result.then(roles => {
        console.log(roles);
        res.send(roles)
         
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error al listar usuarios');
        throw err;
    })
});

/**
 * @swagger
 * /api/roles/asignarRoles:
 *   post:
 *     tags:
 *       - Asignar roles
 *     produces:
 *       - application/json
 *     consumes:
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

app.post('/asignarRoles', verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware,function (req, res) {
    let result = roles.asignarRoles(req.body)
    result.then(roles => {
       console.log(roles);
        res.send(roles)
         
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error al asignar roles');
        throw err;
    })
});
 
/**
 * @swagger
 * /api/roles/quitarRol:
 *   post:
 *     tags:
 *       - Quitar rol
 *     produces:
 *       - application/json
 *     consumes:
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

app.post('/quitarRol', verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware,function (req, res) {
    let result = roles.quitarRol(req.body)
    result.then(roles => {
       console.log(roles);
       res.send("Rol eliminado");
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error al quitar rol del usuario');
        throw err;
    })
});

module.exports = app;
