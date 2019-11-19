exports.esAdministradorMiddleware = async function(req, res, next) {
    
    var admin = false;

    for (var i = 0; i < req.tokenDesencriptado.datostoken.roles.length; i++) {
        if (req.tokenDesencriptado.datostoken.roles[i].idRol==4) {
            admin = true;
        };
    };

    if(!admin){
        return res.status(401).json({ error: 'Debe se administrador para esta accion' });
    }


    next();
};
