const ROLES = require('../models/models_roles');
const USUARIOROL = require('../models/models_usuario_rol');

exports.listarRoles = function(){

    return ROLES.findAll({ 
        attributes: ['descripcion', 'Cod'] 
    });
};

exports.buscarRolesUsuario = function(idUsuario){
    return USUARIOROL.findAll({
        attributes: ['idRol'],
        where: {idUsuario: idUsuario}
    });
};

exports.asignarRoles = function(usuarioRol){
    var members = usuarioRol.idRol; 
    
    return USUARIOROL.sequelize.transaction(function (t) { 
        var promises = []; 
        for (var i = 0; i < usuarioRol.idRol.length; i++) {
            var newPromise = USUARIOROL.create({idUsuario: usuarioRol.idUsuario, idRol: members[i]}); 
            promises.push(newPromise); 
        }; 
    });
}

exports.quitarRol = function(usuarioRol){
    return USUARIOROL.destroy({
        where: {idUsuario: usuarioRol.idUsuario, 
                idRol: usuarioRol.idRol}
    })
}