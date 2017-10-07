
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

  var query = client.query('SELECT * from informacion');


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
    estado: req.body.estado
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO informacion(nombre, apellido, correo, telefono, id_usuario,estado)' +
      ' VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [p.nombre, p.apellido, p.correo,p.telefono,p.id_usuario,p.estado]);


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


