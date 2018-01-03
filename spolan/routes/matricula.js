
var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var config = require('../config.json');
var path = require('path');

var pg = require("pg");

var conString =  "postgres://postgres:"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;

module.exports = router;




router.post('/addMatricula', function (req, res) {



    var data1 = {
        id_estudiante: req.body.id_estudiante,
        id_curso: req.body.id_curso,
        estado:req.body.estado
    };

    var client = new pg.Client(conString);
    client.connect();




    const results = [];

    var query = client.query('INSERT INTO matricula( id_estudiante, id_curso, estado) VALUES ($1,$2,$3) RETURNING *',
        [data1.id_estudiante, data1.id_curso,data1.estado]);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results[0]);
});

});


router.get('/obtenerMatriculas', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * from matricula');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});






router.put('/actulizarMatricula/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);

  var p = {

      id_estudiante: req.body.id_estudiante,
      id_curso: req.body.id_curso,
      estado:req.body.estado
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('UPDATE matricula SET id_estudiante=$1, id_curso=$2, estado=$3 where id=$4 RETURNING *',
      [p.id_estudiante, p.id_curso, p.estado, id]);



  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});



router.delete('/eliminarMatricula/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);


//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('delete from matricula  where id=$1 RETURNING *',
      [id]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});




