
var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var config = require('../config.json');
var path = require('path');

var pg = require("pg");

var conString =  "postgres://postgres:"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;

module.exports = router;

//post insertat
//put actilizar
//get optener
//delet eliminar



router.get('/obtenermsg', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * from msg');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});
//////////////////////////////


router.get('/allobtenermsg', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT msg.id_msg, msg.id_informacion, msg.estado as estado_msg, informacion.nombre, informacion.telefono, informacion.correo,msg.msg, informacion.apellido FROM msg INNER JOIN informacion ON msg.id_informacion = informacion.id_informacion');

  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});

///////////////////////////////////////obtenert pendientes

router.get('/allobtenermsgpendiente', function (req, res) {

var client = new pg.Client(conString);
client.connect();

const results = [];

var query = client.query('SELECT msg.id_msg, msg.id_informacion, msg.estado as estado_msg, informacion.nombre, informacion.telefono, informacion.correo,msg.msg, informacion.apellido FROM msg INNER JOIN informacion ON msg.id_informacion = informacion.id_informacion where msg.estado = $1 ', ['pendiente']);

query.on('row', (row) => {
  results.push(row);
});

query.on('end', () => {
  client.end();
return res.json(results);
});

});





///////////////////////////////////////// notificados

router.get('/allobtenermsgnotificado', function (req, res) {

var client = new pg.Client(conString);
client.connect();

const results = [];

var query = client.query('SELECT msg.id_msg, msg.id_informacion, msg.estado as estado_msg, informacion.nombre, informacion.telefono, informacion.correo,msg.msg, informacion.apellido FROM msg INNER JOIN informacion ON msg.id_informacion = informacion.id_informacion where msg.estado = $1 ', ['notificado']);

query.on('row', (row) => {
  results.push(row);
});

query.on('end', () => {
  client.end();
return res.json(results);
});

});

///////////////////////////// ingresar

router.post('/registmsg', function (req, res) {

  console.log(req.body);

  var p = {
    id_informacion: req.body.id_informacion,
    msg: req.body.msg,
    estado: req.body.estado

  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO msg(id_informacion,msg,estado)' +
      ' VALUES ($1,$2,$3) RETURNING *',
      [p.id_informacion, p.msg, p.estado]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});


//////////////////////actulizar


router.put('/actulizarmsg/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);

  var p = {

    id_informacion: req.body.id_informacion,
    msg: req.body.msg,
    estado: req.body.estado
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('update msg set  id_informacion=$1, msg=$2, estado=$3 where  id_msg=$4 RETURNING *',
      [p.id_informacion, p.msg, p.estado,id]);
  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});
/////actulizar pendiente 




/////////eliminar


router.delete('/eliminamsg/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);


//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('delete from msg  id_msg=$1 RETURNING *',
      [id]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});


///////////////


