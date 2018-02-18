/**
 * Created by xaipo on 8/21/2017.
 */

var express= require('express');
var router= express.Router();
var nodemailer = require('nodemailer');


var mail='spolaningles@gmail.com';
var password='soycomprador2017';

router.post('/sendMail',function(req,res) {


    console.log(req.body);


    //for
    var paginaWeb = "<html>\n" +
        "\t<head>\n" +
        "\t\t\n" +
        "\t\t<meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\" />\n" +
        "\t\t<style type=\"text/css\">\n" +
        "body{ margin:0px; padding:0px; width:100%; }\t\t\n" +
        "</style>\n" +
        "\t</head>\n" +
        "\t<body>\n" +
        "\t\t<table align=\"center\" bgcolor=\"#ebebeb\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding:0px; margin:0px;\" width=\"100%\">\n" +
        "\t\t\t<tbody>\n" +
        "\t\t\t\t<tr>\n" +
        "\t\t\t\t\t<td>\n" +
        "\t\t\t\t\t\t<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n" +
        "\t\t\t\t\t\t\t<tbody>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"20\" valign=\"top\"><img alt=\"\" src=\"images/top-shadow-basica.png\" style=\"display: block; width: 600px; height: 20px;\" /></td>\n" +
        "\t\t\t\t\t\t\t  </tr>\n" +
        "                              <tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"20\" valign=\"top\"><img alt=\"\" src=\"https://image.ibb.co/ehFi87/spolan.jpg\" style=\"display: block; width: 600px; height: 200px;\" /></td>\n" +
        "\t\t\t\t\t\t\t  </tr>\n" +
        "                              <tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td align=\"left\" bgcolor=\"#ffffff\" height=\"15\" valign=\"top\"><img alt=\"\" src=\"images/shadow-basica.png\" style=\"display: block; width: 600px; height: 15px;\" /></td>\n" +
        "\t\t\t\t\t\t\t  </tr>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td align=\"left\" bgcolor=\"#ffffff\" valign=\"top\" style=\"text-align:right;padding:0 20px;font-family:Arial, Helvetica, sans-serif;font-size:12px;\"></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "                            </tbody>\n" +
        "\t\t\t\t\t\t</table>\n" +
        "                        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" bgcolor=\"FFFFFF\">\n" +
        "\t\t\t\t\t\t\t<tbody>\n" +
        "                                <tr>\n" +
        "\t\t\t\t\t\t\t\t  <td width=\"240\" align=\"left\" valign=\"top\" ><img alt=\"\" src=\"https://image.ibb.co/nOB6a6/2.jpg\" style=\"display: block; width: 200px; height: 400px;margin:20px;\" /></td>\n" +
        "                                  <td width=\"360\" align=\"left\" valign=\"top\" style=\"font-family:Arial, Helvetica, sans-serif;padding-right:20px;\">\n" +
        "                                    <p   style=\"color:#AD1D24; font-size:20px;font-weight:bold;border-bottom:1px solid #AD1D24;padding-bottom:10px ; \"></p>  </p>\n" +
        "\t\t\t\t\t\t\t\t <H2   style=\"align-content:center; color:#AD1D24 ;\" > Acceso A Nuestro Blog Privado </H2>\n" +
        "\t\t\t\t\t\t\t\t\t\n" +
        "\t\t\t\t\t\t\t\t\t<p style=\"color:#AD1D24 \">Usuario</p>\n" +
        "\t\t\t\t\t\t\t\t  <p style=\"color:#DBAC1F  \"  >"+req.body.usuario+"  </p>\n" +
        "\t\t\t\t\t\t\t\t\t<p style=\"color:#AD1D24 \">Contraseña</p>\n" +
        "\t\t\t\t\t\t\t\t\t<p style=\"color:#DBAC1F  \"  > "+req.body.contrasenia+" </p>\n" +
        "\t\t\t\t\t\t\t\t  </td>\n" +
        "\t\t\t\t\t\t\t  </tr>\n" +
        "\t\t\t\t\t\t\t</tbody>\n" +
        "\t\t\t\t\t\t</table>\n" +
        "                        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n" +
        "\t\t\t\t\t\t\t<tbody>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td align=\"left\" valign=\"top\" bgcolor=\"AD1D24\" style=\"padding:18px 20px 10px 20px;color:#FFFFFF;font-family:Arial, Helvetica, sans-serif;font-weight:bold;font-size:14px;\"> Siguenos en facebook\n" +
        "                                    <a href=\"https://www.facebook.com/spolanidiomas/\"><img alt=\"\" src=\"https://image.ibb.co/kEyNhm/facebook.png\" style=\"display: block; width: 32px; height: 32px;float:right;margin-right:10px;margin-top:-8px;border:0;\" /></a>\t\t\t\t\t\t\t\t\t\t</td>\n" +
        "\t\t\t\t\t\t\t  </tr>\n" +
        "                                <tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"15\" valign=\"top\">\n" +
        "\t\t\t\t\t\t\t\t\t\t<img alt=\"\" src=\"images/shadow-basica.png\" style=\"display: block; width: 600px; height: 15px;\" /></td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "                                \n" +
        "\t\t\t\t\t\t\t</tbody>\n" +
        "\t\t\t\t\t\t</table>\n" +
        "\t\t\t      <br />\n" +
        "\t\t\t\t\t\t<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"176\" width=\"600\">\n" +
        "\t\t\t\t\t\t\t<tbody>\n" +
        "\t\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t\t<td style=\"display:block; padding-bottom:15px; font-size:12px; font-family:Helvetica, Arial, sans-serif; color:#777777;\" valign=\"top\">\n" +
        "\t\t\t\t\t\t\t\t\t\n" +
        "\t\t\t\t\t\t\t\t\t\t<div style=\"text-align: justify;\">\n" +
        "\t\t\t\t\t\t\t\t\t\t\tEste mensaje fue enviado a su email por ser suscriptor de SPOLAN y haber indicado expresamente que desea que le comuniquemos novedades y promociones. SPOLAN nunca le mandar&aacute; correos no solicitados ni con otros fines distintos&nbsp;al indicado.<br />\n" +
        "\t\t\t\t\t\t\t\t\t\t\t\n" +
        "\t\t\t\t\t\t\t\t\t\t\t<br />\n" +
        "\t\t\t\t\t\t\t\t\t\t\t<br />\n" +
        "\t\t\t\t\t\t\t\t\t\t\t&nbsp;</div>\n" +
        "\t\t\t\t\t\t\t\t\t\t\n" +
        "\t\t\t\t\t\t\t\t\t\t<br />\n" +
        "\t\t\t\t\t\t\t\t\t\t&nbsp;</td>\n" +
        "\t\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t</tbody>\n" +
        "\t\t\t\t\t\t</table>\n" +
        "\t\t\t\t\t</td>\n" +
        "\t\t\t\t</tr>\n" +
        "\t\t\t</tbody>\n" +
        "\t\t</table>\n" +
        "\t</body>\n" +
        "</html>"




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



router.post('/sendMail1',function(req,res) {


    console.log(req.body);






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
        subject: req.body.asunto, // Subject line
        text: req.body.asunto, // plain text body
        html: req.body.contenido // html body
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