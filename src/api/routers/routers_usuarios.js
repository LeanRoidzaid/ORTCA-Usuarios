const express = require("express");
const app = express();
const usuarios = require('../controllers/controllers_usuarios');
const  verificaRol  = require("../middlewares/verificaRolMiddleware");
const  verificaToken  = require("../middlewares/verificaTokenMiddleware");


/**
 * @swagger
 * /api/usuarios/all:
 *   get:
 *     tags:
 *       - listar usuarios
 *     description: Busca en Mysql a todos los usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: token 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/all", verificaToken.verificaTokenMiddleware,
    function(req, res) {
    
    var result = usuarios.listarUsuarios()
    result.then(users => {
        //console.log(users);
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
 *     description: Busca un usuario particualar en base a un dato.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: token 
 *         schema:
 *           type: string
 *       - in: query
 *         name: usuario 
 *         schema:
 *           type: string

 *     responses:
 *       200:
 *         description: devuelve json con la busqueda
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/usuario", verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware,
    function(req, res) {
    
    let result = usuarios.buscarUsuario(req.query.usuario)
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
 * /api/usuarios/usuarioToken:
 *   get:
 *     tags:
 *       - Ver usuario token
 *     description: devuelve el usuarios del token
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query    
 *         name: token
 *         schema:
 *           type: string
 *         required:
 *           - token
 *     responses:
 *       200:
 *         description: devuelve json con el usuarios
 *       400:
 *         description: devuelve json avisando del error
 *
 */
app.get('/usuarioToken', verificaToken.verificaTokenMiddleware, function(req, res){
    console.log(req.tokenDesencriptado.datostoken);
        res.json(req.tokenDesencriptado.datostoken);  
        
})

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
  *       - in: query
 *         name: token 
 *         schema:
 *           type: string
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
 *               format: date
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

app.post('/alta', verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware,
    async function (req, res) {
        console.log("alta1");
        console.log(req.body);
        try{
            console.log("altaAntes insert");
            /*
            usuarios.insertarUsuario(req.body).then(users => {
                ///console.log(req.body);
                console.log("alta2");
                console.log("user: "+users);
                res.send(users);
                
            })
            .catch(err => {
                console.log("alta3");
                console.log("Error"+err);
                res.status(400).send('Error en el insert de usuario' + err.message);
            })*/
            await usuarios.insertarUsuario(req.body);
            usuarios.enviarNuevaPass(req.body);
            res.send();
            /*
            result.then(users => {
                ///console.log(req.body);
                console.log("alta2");
                //console.log(users);
                res.send(users);
                
            })
            .catch(err => {
                console.log("alta3");
                console.log("Error"+err);
                res.status(400).send('Error en el insert de usuario' + err.message);
            })
            */
        }catch(error)
        {
            res.status(201).send();
            console.log("Router: "+error);
        }
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
 *       - in: query
 *         name: token 
 *         schema:
 *           type: string
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
 *               format: date
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

app.post('/actualizar', verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware, 
    function (req, res) {
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

app.post('/cambiarPass', verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware, 
    function (req, res) {
    let result = usuarios.updatePass(req.body)
    result.then(users => {
        console.log(users);
        res.send(users)
    })
    .catch(err => { 
        console.log(err);
        res.status(400).send('Error en al cambiar password');
        throw err;
    })
})

module.exports = app;

