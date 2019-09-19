const express = require("express");
const app = express();
const dbConnection = require('../../config/dbConnection');


/**
 * @swagger
 * /api/usuarios/all:
 *   get:
 *     tags:
 *       - all
 *     description: Busca en Mysql a todos los beneficiarios
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
    
    const connect = dbConnection();

    connect.query("SELECT nombre, apellido, telefono FROM beneficiarios", function(err, result){
        console.log(result);
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
            }
            res.json({
            ok: true,
            result
        });    
    });
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
 *               type: integer
 *             fechaNac:
 *               type: string
 *             telefono:
 *               type: integer 
 *         required:
 *           - nombre
 *           - apellido
 *           - dni
 *           - fechaNac
 *     responses:
 *       200:
 *         description: Beneficiarios insertado en tabla Mysql con exito
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta api
 *       400:
 *         description: Ocurrio un error al guardar el beneficiarios en Mysql
 */

app.post("/alta", function(req, res) {

    var nom     = req.body.nombre;
    var ape     = req.body.apellido;
    var doc     = req.body.dni;
    var fecNac  = req.body.fechaNac;
    var tel     = req.body.telefono

    const connect = dbConnection();

    connect.query('INSERT INTO beneficiarios SET ?',{
        nombre: nom,
        apellido: ape,
        dni: doc,
        fechaNac: fecNac,
        telefono: tel
        }, function(err, result){
        
        console.log(result);
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
                });
            }
            res.json({
                ok: true,
                result
                });    
        });
});


module.exports = app;

