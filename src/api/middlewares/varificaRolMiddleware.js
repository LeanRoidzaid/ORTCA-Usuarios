exports.esMedicoMiddleware = async function(req, res, next) {
    const roles = require("../controllers/controllers_roles");
    
    let result = roles.buscarRolesUsuario(req.body.id);
    result.then(roles => {
       console.log(roles);
        var admin = false
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].idRol==1) {
                admin = true;
            };
        };
        if(!admin){
            return res
                .status(401)
                .json({ error: "Necesita ser un usuario médico para realizar esta acción" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error al buscar roles');
        throw err;
    })
    next();
};
  
exports.esAdministradorMiddleware = async function(req, res, next) {
    const roles = require("../controllers/controllers_roles");
    
    let result = roles.buscarRolesUsuario(req.body.id);
    result.then(roles => {
       console.log(roles);
        var admin = false
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].idRol==4) {
                admin = true;
            };
        };
        if(!admin){
            return res
                .status(401)
                .json({ error: "Necesita permisos de administrador" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error al buscar roles');
        throw err;
    })
    next();
};
