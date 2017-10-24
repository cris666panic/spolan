
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




router.post('/login', function (req, res) {

    var data1 = {
        nombre: req.body.usuario,
        contrasenia: req.body.contrasenia

    };

    var client = new pg.Client(conString);
    client.connect();



    const results = [];

    var query = client.query('SELECT * FROM usuario INNER JOIN informacion ON usuario.id_usuario = informacion.id_usuario WHERE usuario.nombre=$1 and usuario.contrasena=$2',
        [data1.nombre, data1.contrasenia]);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results[0]);
});

});



router.post('/usuarioExiste', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT * from usuario INNER JOIN informacion ON usuario.id_usuario = informacion.id_usuario where usuario.nombre=$1',[req.body.usuario]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});


router.get('/obtenerusuarios', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * from usuario');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});

///////////////////////////// ingresar

router.post('/registrarusaurio', function (req, res) {

  console.log(req.body);

  var p = {

    nombre: req.body.nombre,
    contrasenia: req.body.contrasenia,
    idtipo: req.body.idtipo,
    };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO usuario(nombre, contrasena, id_tipo) VALUES ($1,$2,$3) RETURNING *',
      [p.nombre, p.contrasenia, p.idtipo]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});


//////////////////////actulizar


router.put('/actulizarusuario/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);

  var p = {

    nombre: req.body.nombre,
    contrasenia: req.body.contrasenia,
    idtipo: req.body.idtipo,
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('update usuario set nombre=$1, contrasena=$2, id_tipo=$3 where id_usuario=$4 RETURNING *',
      [p.nombre, p.contrasenia, p.idtipo, id]);


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


  var query = client.query('delete from usuario  where id_usuario=$1 RETURNING *',
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


