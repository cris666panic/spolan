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