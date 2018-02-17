
var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var config = require('../config.json');
var path = require('path');

var pg = require("pg");

var conString =  "postgres://postgres:"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;

module.exports = router;


router.post('/addCurso', function (req, res) {

    var data1 = {

        id_docente: req.body.id_docente,
        horario: req.body.horario,
        estado:req.body.estado,
        nombre:req.body.nombre,
        paralelo:req.body.paralelo,
        id_periodo:req.body.id_periodo,
        idioma:req.body.idioma


    };

    var client = new pg.Client(conString);
    client.connect();




    const results = [];

    var query = client.query('INSERT INTO curso(id_docente, horario, estado, nombre, paralelo, id_periodo,idioma) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [data1.id_docente, data1.horario,data1.estado, data1.nombre,data1.paralelo, data1.id_periodo,data1.idioma]);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results[0]);
});

});






router.post('/obtenerCursosDocentes', function (req, res) {

    var data1 = {

        id_docente: req.body.id_docente
    };

    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT * FROM curso where id_docente=$1',[data1.id_docente]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});



});


router.get('/obtenerCursos', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT curso.id,curso.idioma, curso.id_docente, curso.horario, curso.estado, curso.nombre, curso.paralelo, curso.id_periodo,docente.unido as docente,periodo.unido as periodo\n' +
      '  FROM curso\n' +
      'INNER JOIN docente ON docente.id = curso.id_docente\n' +
      'INNER JOIN periodo ON periodo.id = curso.id_periodo');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});



//////////////////////actulizar


router.put('/actulizarCurso/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);

  var p = {

      id_docente: req.body.id_docente,
      horario: req.body.horario,
      estado:req.body.estado,
      nombre:req.body.nombre,
      paralelo:req.body.paralelo,
      id_periodo:req.body.id_periodo,
      idioma:req.body.idioma
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('UPDATE curso SET id_docente=$1, horario=$2, estado=$3, nombre=$4, paralelo=$5,id_periodo=$6,idioma=$7 where id=$8 RETURNING *',
      [p.id_docente, p.horario, p.estado,p.nombre,p.paralelo,p.id_periodo,p.idioma,id]);



  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});





router.put('/actulizarCursoEstado/:id', function (req, res) {
    var id = req.params.id;

    console.log(req.body);

    var p = {

        estado:req.body.estado
    };

//conection
    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('UPDATE curso SET estado=$1 where id=$2 RETURNING *',
        [ p.estado,id]);



    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

/////////eliminar


router.delete('/eliminarCurso/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);


//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('delete from curso  where id=$1 RETURNING *',
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


