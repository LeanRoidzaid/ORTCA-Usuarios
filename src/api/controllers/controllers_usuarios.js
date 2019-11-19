const config = require('../../config/config');
const USUARIOS = require('../models/models_usuarios');
const bcrypt = require('bcrypt');
const mails = require('../controllers/controllers_mails');
const UserRoles = require('../models/models_usuario_rol')

exports.buscarUsuario = async function(usuario){

    return await USUARIOS.findOne({
        where: {
            usuario: usuario.usuario}
        })
}
exports.login = async function(usuario,passParam){
    console.log("Paso controller 1");
    if (!usuario || !passParam) {
        throw (Error("Usuario y Password son campos obligatorios"))
    } else {
    var user= await USUARIOS.findOne({
          // attributes: ['discoverySource'],
          where: {
            usuario: usuario
            


          },
          include: [{
              model: UserRoles,
          }]
        });
        
   
    }
    console.log("User: "+ user.pass +" Param: "+passParam );
    var esok = await bcrypt.compareSync(passParam ,user.pass);
    console.log("esok: "+ esok );
    if(esok){
        return user;    
    }
    else{
        throw Error("Usuario invalido");
    }
    
  
}
exports.listarUsuarios = function(){
    return USUARIOS.findAll({ 
        attributes: ['id','nombre', 'apellido','dni','mail','usuario','fh_alta','fh_baja'] ,
        include: [{
            model: UserRoles//,
           // attributes: ['idRol'] 
        }]
    })
}

exports.updateUsuario = async function(usuario){
    return USUARIOS.update({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        mail: usuario.mail,
        usuario: usuario.usuario,
        fh_alta: usuario.fh_alta,
        fh_baja: usuario.fh_baja,
        idCentro: usuario.idCentro},
        {where: {id:usuario.id}}
)}

exports.updatePass = async function(usuario){
    const bcrypt = require('bcrypt');
    var asunto = "Envio de contrasena";
    var texto = "por favor ingrese con las seguientes credenciales usuario: "+usuario.usuario+" pass: " + usuario.pass;
    console.log("enviarNuevaPass 4");
    await mails.sendEmail(usuario, asunto, texto);
    var hash = await bcrypt.hashSync(usuario.pass, 2);
    return await USUARIOS.update({
        pass: hash},
        {where: {usuario:usuario.usuario}}
        );
    /*
    return bcrypt.hash(usuario.pass, 2)
    .then(hash => {
        return USUARIOS.update({
            pass: hash},
            {where: {usuario:usuario.usuario}}
            )
    })
    .catch(err => { 
        console.log(err);
        throw new Error(); 
    });
    */
}



exports.enviarNuevaPass = async function(usuario){
    console.log("enviarNuevaPass 1");

    
    let user = await  this.buscarUsuario(usuario);/*.then(user =>{
    

    }).catch(error =>{
        console.log(error);
    });

    */

   console.log("enviarNuevaPass 1.2");
  
   user.pass = generatePasswordRand(10,'alf');
   console.log("enviarNuevaPass 2");

   result = await this.updatePass(user);    
   console.log("enviarNuevaPass 3");

}

exports.insertarUsuario = async function(usuario){
    console.log("en el insert");
    //usuarios.pass=bcrypt.hash(usuario.pass, 2);
    try 
    {
        await USUARIOS.create({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni,
            mail: usuario.mail,
            usuario: usuario.usuario,
            pass: usuario.pass,
            fh_alta: usuario.fh_alta,
            fh_baja: usuario.fh_baja,
            idCentro: usuario.idCentro
           });
    }catch(error){
        console.log(error);
        throw Error("Error al insertar usuario" + error);
    }

       /*.then(function (USUARIOS) {
        if (USUARIOS) {
            console.log("Sequalize 1"+USUARIOS);
            await exports.enviarNuevaPass(usuario);

             return true;
        } else {
            console.log("error en insert"+USUARIOS);
            throw Error("Error al insertar usuario");
        }
    });*/
 //   exports.enviarNuevaPass(usuario);
    
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

