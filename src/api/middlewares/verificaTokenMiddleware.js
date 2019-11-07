const config = require('../../config/config')

exports.verificaTokenMiddleware = async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var jwt = require("jsonwebtoken");
    var token = req.query["token"];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Es necesario el token de autenticación" });
    }
  
    var resultado = await jwt.verify(token, String(process.env.CLAVEJWT), function(
      err,
      datostoken
    ) {
      if (err) {
        return res.status(401).json({ error: 'Token invalido, ingresar nuevamente a la aplicacion' });
      } else {
        req.tokenDesencriptado =  {datostoken};
      }
      next();
    });
  };
  