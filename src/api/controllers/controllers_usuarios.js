const USUARIOS = require('../models/models_usuarios');

exports.buscarUsuario = function(usuario){

    return USUARIOS.findOne({
        where: {
            usuario: usuario}
        })
}

exports.listarUsuarios = function(){
    return USUARIOS.findAll({ 
        attributes: ['nombre', 'apellido'] 
    })
}

exports.insertarUsuario = function(usuario){
    return USUARIOS.create({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        mail: usuario.mail,
        usuario: usuario.usuario,
        pass: usuario.pass,
        fh_alta: usuario.fh_alta,
        fh_baja: usuario.fh_baja,
        idCentro: usuario.idCentro
       })
}

exports.updateUsuario = function(usuario){
    return USUARIOS.update({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        mail: usuario.mail,
        usuario: usuario.usuario,
        pass: usuario.pass,
        fh_alta: usuario.fh_alta,
        fh_baja: usuario.fh_baja,
        idCentro: usuario.idCentro},
        {where: {id:usuario.id}}
        )
}