
var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var config = require('../config.json');
var path = require('path');

var pg = require("pg");

var conString =  "postgres://postgres:"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;

module.exports = router;




router.post('/obtenerEstudiantesMatriculados', function (req, res) {

    var data1 = {

        id_curso: req.body.id_curso
    };

    var client = new pg.Client(conString);
    client.connect();



    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT M.id, E.cedula, E.nombres, E.apellidos \n' +
        'FROM Matricula as M\n' +
        'INNER JOIN estudiante as E ON M.id_estudiante=E.id where M.id_curso=$1',[data1.id_curso]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});




router.post('/addNotas', function (req, res) {

    var data1 = {
        id_matricula: req.body.id_matricula,
        nota1: req.body.nota1,
        nota2:req.body.nota2,
        nota3:req.body.nota3,
        nota_final:req.body.nota_final,
        situacion:req.body.situacion,
        letra:req.body.letra



    };

    var client = new pg.Client(conString);
    client.connect();


    const results = [];

    var query = client.query('INSERT INTO nota(id_matricula, nota1, nota2, nota3, nota_final,situacion,letra) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [data1.id_matricula, data1.nota1,data1.nota2, data1.nota3,data1.nota_final,data1.situacion,data1.letra]);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results[0]);
});

});



router.post('/addAsistencia', function (req, res) {

    var data1 = {
        id_matricula: req.body.id_matricula,
        fecha: req.body.fecha,
        estado:req.body.estado,
        observacion:req.body.observacion




    };

    var client = new pg.Client(conString);
    client.connect();


    const results = [];

    var query = client.query('INSERT INTO asistencia(id_matricula, fecha, estado, observacion) VALUES ($1,$2,$3,$4) RETURNING *',
        [data1.id_matricula, data1.fecha,data1.estado, data1.observacion]);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results[0]);
});

});