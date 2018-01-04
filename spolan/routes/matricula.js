
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





router.post('/obtenerMatriculasEstudiante', function (req, res) {

    var data1 = {

        cedula: req.body.cedula
    };

    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT M.id,M.estado, E.cedula, E.nombres, E.apellidos ,C.horario,C.nombre,C.paralelo,P.unido,D.unido as docente\n' +
        '        FROM Matricula as M\n' +
        '        INNER JOIN estudiante as E ON M.id_estudiante=E.id\n' +
        '\tINNER JOIN curso as C ON M.id_curso=C.id\n' +
        '\tINNER JOIN periodo as P ON C.id_periodo=P.id\n' +
        '\tINNER JOIN docente as D ON C.id_docente=D.id\n' +
        '\n' +
        '         where E.cedula=$1',[data1.cedula]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.post('/obtenerNotasEstudiante', function (req, res) {

    var data1 = {

        matricula: req.body.matricula
    };

    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT id, id_matricula, nota1, nota2, nota3, nota_final\n' +
        '  FROM nota where id_matricula=$1',[data1.matricula]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.post('/obtenerAsistenciaEstudiante', function (req, res) {

    var data1 = {

        matricula: req.body.matricula
    };

    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query(' \n' +
        '  SELECT COUNT(id), estado \n' +
        '  FROM asistencia where id_matricula=$1\n' +
        ' GROUP BY estado ',[data1.matricula]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

// cambios