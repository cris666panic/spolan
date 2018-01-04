
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

    var query = client.query('SELECT M.id, E.id, E.cedula, E.nombres, E.apellidos \n' +
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


