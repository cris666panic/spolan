
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



router.get('/obtenerinformacion', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});


router.get('/obtenerinformacionRio', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.ciudad=\'RIOBAMBA\'');


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

router.get('/obtenerinformacionCu', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.ciudad=\'CUMANDÁ\'');


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

///////////////////pendiente


router.get('/obtenerpendienteinfo', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.estado=$1 ', ['pendiente']);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});



router.get('/obtenerpendienteinfoRio', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.estado=$1 and informacion.ciudad=\'RIOBAMBA\' ', ['pendiente']);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerpendienteinfoCu', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.estado=$1 and informacion.ciudad=\'CUMANDÁ\'', ['pendiente']);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

/////////notificado

router.get('/obtenernotificadoinfo', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.estado=$1 ', ['notificado']);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});

router.get('/obtenernotificadoinfoRio', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.estado=$1 and informacion.ciudad=\'RIOBAMBA\'', ['notificado']);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

router.get('/obtenernotificadoinfoCu', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT informacion.* from informacion INNER JOIN usuario ON usuario.id_usuario = informacion.id_usuario where usuario.id_tipo=2 and informacion.estado=$1 and informacion.ciudad=\'CUMANDÁ\' ', ['notificado']);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});




///////////////////////////// ingresar

router.post('/registrarinfo', function (req, res) {

  console.log(req.body);

  var p = {

    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    telefono: req.body.telefono,
    id_usuario: req.body.id_usuario,
    estado: req.body.estado,
      ciudad:req.body.ciudad
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO informacion(nombre, apellido, correo, telefono, id_usuario,estado,ciudad)' +
      ' VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [p.nombre, p.apellido, p.correo,p.telefono,p.id_usuario,p.estado,p.ciudad]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});


//////////////////////actulizar


router.put('/actulizarinfo/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);

  var p = {

    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    telefono: req.body.telefono,
    id_usuario: req.body.id_usuario,
    estado: req.body.estado
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('update informacion set  nombre=$1, apellido=$2, correo=$3, telefono=$4, id_usuario=$5,estado=$6 where  id_informacion=$7 RETURNING *',
      [p.nombre, p.apellido, p.correo,p.telefono,p.id_usuario,p.estado,id]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});




/////////eliminar


router.delete('/eliminarusuario/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);


//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('delete from informacion  id_informacion=$1 RETURNING *',
      [id]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});


///////////


