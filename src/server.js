require("./config/config");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Env Config
const config = require('./config/config');
process.env.CLAVEJWT = "123456";

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
**********  CONFIGURACION DE SWAGGER  **************
*/

//paquetes npm para que swagger funcione
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//la especificacion que figurara en la doc automatica
const swaggerDefinition = {
  info: {
    title: "REST API USUARIOS ELAISS",
    version: "1.0.0",
    description: "API USUARIOS - ELAISS"
  },
  host: "localhost:" + process.env.PORT,
  basePath: "/"
};

//donde va a "mirar" swagger para exponer la doc
const options = {
  swaggerDefinition,
  apis: ['./src/api/routers/*.js'],
  customCss: '.swagger-ui .topbar { display: none }'
};

//finalizacion de las configuraciones
const swaggerSpec = swaggerJsdoc(options);
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs-usuarios', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/*
**********  FIN CONFIGURACION DE SWAGGER  **************
*/
app.use("/api/usuarios/", require('./api/routers/routers_usuarios'));
app.use("/api/login/", require('./api/routers/routers_login'));
app.use("/api/roles/", require('./api/routers/routers_roles'));
app.use('/html', express.static('src/api/views'));

//ahora toma el puerto del archivo config/config.js
app.listen(config.PORT, function() {
  console.log(
    "Servidor express iniciado en el puerto " + config.PORT + "!"
    );
  });
  
//DEBO EXPORTAR app PARA LOS TEST EN MOCHA, solo para eso, por ahora queda comentado
module.exports = app;
