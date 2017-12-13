var config				= require('./config.json');


var express				= require('express');
var app					= express();

var serveStatic			= require('serve-static');

var bodyParser			= require('body-parser');

var multer				= require('multer');

var server				= require('http').Server(app);

var io					= require('socket.io')(server);

var massive				= require("massive");
var pg					= require ("pg");


var  cors = require('cors')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');

app.use(multipartMiddleware);

app.use(cors());




var handleError			= function(res) {
    return function(err){
		console.log(err)
		res.send(500,{error: err.message});
	}
}


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));


app.use(serveStatic('./public'));

app.listen(config.express.port);

//creacion servicio
var usuario = require('./routes/usuario');
var info = require('./routes/info');
var msg = require('./routes/msg');
var agenda = require('./routes/agenda');

//api
app.use('/web', usuario);
app.use('/web', info);
app.use('/web', msg);
app.use('/web', agenda);
app.use('/web', require('./routes/correo'));
app.use('/web', require('./routes/blog'));
app.use('/web', require('./routes/docente'));

