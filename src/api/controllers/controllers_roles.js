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

exports.asignarRoles = async function(usuarioRol){
    await USUARIOROL.destroy({where:{idUsuario:usuarioRol[0].idUsuario}});
    
    for(var usuario of usuarioRol)
        
     await USUARIOROL.create({idUsuario: usuario.idUsuario, idRol: usuario.idRol}); 
     
       
 
    return;
}

exports.quitarRol = function(usuarioRol){
    return USUARIOROL.destroy({
        where: {idUsuario: usuarioRol.idUsuario, 
                idRol: usuarioRol.idRol}
    })
}