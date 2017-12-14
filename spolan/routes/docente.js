
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




router.post('/addDocente', function (req, res) {

    var data1 = {
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos:req.body.apellidos,
        telefono:req.body.telefono,
        correo:req.body.correo,
        id_usuario:req.body.id_usuario
    };

    var client = new pg.Client(conString);
    client.connect();




    const results = [];

    var query = client.query('INSERT INTO docente(cedula, nombres, apellidos, telefono, correo, id_usuario) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [data1.cedula, data1.nombres,data1.apellidos, data1.telefono,data1.correo, data1.id_usuario]);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results[0]);
});

});


router.get('/obtenerDocentes', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * from docente');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});



//////////////////////actulizar


router.put('/actulizarDocente/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);

  var p = {

      cedula: req.body.cedula,
      nombres: req.body.nombres,
      apellidos:req.body.apellidos,
      telefono:req.body.telefono,
      correo:req.body.correo,
      id_usuario:req.body.id_usuario
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('UPDATE docente SET cedula=$1, nombres=$2, apellidos=$3, telefono=$4, correo=$5,id_usuario=$6 where id=$4 RETURNING *',
      [p.cedula, p.nombres, p.apellidos,p.telefono,p.correo,p.id_usuario, id]);



  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});




/////////eliminar


router.delete('/eliminarDocente/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);


//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('delete from docente  where id=$1 RETURNING *',
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


