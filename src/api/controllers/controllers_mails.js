var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(usuario, asunto, texto){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        //service: 'Gmail',
        auth: {
            user: 'elaiss2019@gmail.com',
            pass: 'itproyecto19'
        }
        
    });
    
    // Definimos el email
    var mailOptions = {
        from: "elaiss2019@gmail.com",
        to: usuario.mail,
        subject: asunto,
        text: texto
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("ERROR!!!!!!", error);
          } else {
            console.log('Email sent: ' + info.response);
          }
    });

};