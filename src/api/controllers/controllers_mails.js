var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = async function(usuario, asunto, texto){
    console.log("mail1");
// Definimos el transporter
    var transporter = await nodemailer.createTransport({
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
    console.log("mail2");
    // Definimos el email
    var mailOptions = await {
        from: "elaiss2019@gmail.com",
        to: usuario.mail,
        subject: asunto,
        text: texto
    };
    console.log("mail3");
    // Enviamos el email
    await transporter.sendMail(mailOptions);
    console.log("mail4");
};