const USUARIOS = require('../models/models_usuarios');


exports.buscarUsuario = async function(usuario){

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

exports.updateUsuario = async function(usuario){
    const bcrypt = require('bcrypt');
    return bcrypt.hash(usuario.pass, 2)
    .then(hash => {
        return USUARIOS.update({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni,
            mail: usuario.mail,
            usuario: usuario.usuario,
            pass: hash,
            fh_alta: usuario.fh_alta,
            fh_baja: usuario.fh_baja,
            idCentro: usuario.idCentro},
            {where: {id:usuario.id}}
            )
        
    })
    .catch(err => { 
        console.log(err);
        throw new Error(); 
    });

}

exports.enviarNuevaPass = async function(usuario){
    const mails = require('../controllers/controllers_mails');
    
    let user = await this.buscarUsuario(usuario);
    const nuevaPass = generatePasswordRand(10,'alf');
    user.pass = nuevaPass;
    
    result = this.updateUsuario(user);    
    
    var asunto = "Recuparacion de contrasena";
    var texto = "por favor ingrese con la seguiente pass y vuelva a cambiarla por una nueva :" + nuevaPass;
    mails.sendEmail(user, asunto, texto);
    
}

function generatePasswordRand(length,type) {
    switch(type){
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    var pass = "";
    for (i=0; i < length; i++){
        if(type == 'rand'){
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        }else{
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        }
    }
    return pass;
}

