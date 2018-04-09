
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
        estado:req.body.estado,
        idSecretaria:req.body.idSecretaria
    };

    var client = new pg.Client(conString);
    client.connect();




    const results = [];

    var query = client.query('INSERT INTO matricula( id_estudiante, id_curso, estado,"idSecretaria") VALUES ($1,$2,$3,$4) RETURNING *',
        [data1.id_estudiante, data1.id_curso,data1.estado,data1.idSecretaria]);

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



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT M.id,M.estado, E.cedula, E.nombres, E.apellidos ,C.idioma,C.horario,C.nombre,C.paralelo,P.unido,D.unido as docente\n' +
        '        FROM Matricula as M\n' +
        '        INNER JOIN estudiante as E ON M.id_estudiante=E.id\n' +
        '\tINNER JOIN curso as C ON M.id_curso=C.id\n' +
        '\tINNER JOIN periodo as P ON C.id_periodo=P.id\n' +
        '\tINNER JOIN docente as D ON C.id_docente=D.id\n' +
        '\n');


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});





router.post('/obtenerMatriculasSecretaria', function (req, res) {



    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT M.id,M.estado, E.cedula, E.nombres, E.apellidos ,C.idioma,C.horario,C.nombre,C.paralelo,P.unido,D.unido as docente\n' +
        '        FROM Matricula as M\n' +
        '        INNER JOIN estudiante as E ON M.id_estudiante=E.id\n' +
        '\tINNER JOIN curso as C ON M.id_curso=C.id\n' +
        '\tINNER JOIN periodo as P ON C.id_periodo=P.id\n' +
        '\tINNER JOIN docente as D ON C.id_docente=D.id\n' +
        'where M."idSecretaria"=$1',[req.body.id_usuario]);


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
    console.log(id);

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





router.post('/obtenerMatriculasJustificacion', function (req, res) {

    var data1 = {

        cedula: req.body.cedula
    };

    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT M.id,M.estado, E.cedula, E.nombres, E.apellidos ,C.idioma,C.horario,C.nombre,C.paralelo,P.unido,D.unido as docente\n' +
        '        FROM Matricula as M\n' +
        '        INNER JOIN estudiante as E ON M.id_estudiante=E.id\n' +
        '\tINNER JOIN curso as C ON M.id_curso=C.id\n' +
        '\tINNER JOIN periodo as P ON C.id_periodo=P.id\n' +
        '\tINNER JOIN docente as D ON C.id_docente=D.id\n' +
        '\n'+
    'where E.cedula=$1',[req.body.cedula]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});





router.put('/actulizarNota/:id', function (req, res) {
    var id = req.params.id;

    console.log(req.body);

    var p = {

        nota1:req.body.nota1,
        nota2:req.body.nota2,
        nota3:req.body.nota3,
        nota_final:req.body.nota_final,
        situacion:req.body.situacion,
        letra:req.body.letra
    };

//conection

    var client = new pg.Client(conString);
    client.connect();

    const results = [];



    var query = client.query('UPDATE nota SET  nota1=$1, nota2=$2, nota3=$3, nota_final=$4,\n' +
        '        situacion=$5, letra=$6 where id=$7 RETURNING *',
        [p.nota1,p.nota2,p.nota3,p.nota_final,p.situacion,p.letra, id]);



    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});






router.put('/actualizarAsistencia/:id', function (req, res) {
    var id = req.params.id;

    console.log(req.body);

    var p = {

        estado:req.body.estado,
        observacion:req.body.observacion
    };

//conection
    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('UPDATE asistencia SET estado=$1, observacion=$2 where id=$3 RETURNING *',
        [p.estado,p.observacion, id]);



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

      estado:req.body.estado
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('UPDATE matricula SET  estado=$1 where id=$2 RETURNING *',
      [p.estado, id]);



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

    var query = client.query('SELECT M.id,M.estado, E.cedula, E.nombres, E.apellidos ,C.idioma,C.horario,C.nombre,C.paralelo,P.unido,D.unido as docente\n' +
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

    var query = client.query('SELECT *\n' +
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





router.post('/obtenerListadoAsistencia', function (req, res) {

    var data1 = {

        matricula: req.body.matricula
    };

    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query(' \n' +
        '  SELECT *  \n' +
        '  FROM asistencia where id_matricula=$1 and estado=$2\n',[data1.matricula,'Falta']);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

