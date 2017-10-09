/**
 * Created by xaipo on 8/21/2017.
 */

var express= require('express');
var router= express.Router();
var nodemailer = require('nodemailer');


var mail='dennyscoroneldc94@gmail.com';
var password='duke94jenny';

router.post('/sendMail',function(req,res) {


    console.log(req.body);


    //for
    var paginaWeb = "<h1>"+req.body.usuario+"</h1>"
    +"<h1>"+req.body.contrasenia+"</h1>";



// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: mail,
            pass: password
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: '"SPOLAN" <' + mail + '>', // sender address
        to: req.body.mail, // list of receivers
        subject: 'Acesso al blog', // Subject line
        text: 'Acesso al blog', // plain text body
        html: paginaWeb // html body
    };

// send mail with defined transport object

    //   console.log(mailOptions);
    transporter.sendMail(mailOptions, function(err, doc) {
        if(err) return next(err);
       // res.json(doc);


        res.send('enviado');
});




});




module.exports=router;