
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


router.post('/regestudiante', function (req, res) {

    console.log(req.body);

    var p = {
        id_usuario: req.body.id_usuario,
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        correo: req.body.correo,
        direccion: req.body.direccion,
        edad: req.body.edad
    };

//insertar
    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('INSERT INTO estudiante(cedula, nombres, apellidos, telefono, correo,direccion,edad, id_usuario)' +
        ' VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [p.cedula,p.nombres , p.apellidos, p.telefono, p.correo,p.direccion,p.edad, p.id_usuario]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});
});
///actulizar usuarioo

router.put('/actulizarusuario/:id', function (req, res) {
    var id = req.params.id;

    console.log(req.body);

    var p = {

        id_usuario: req.body.id_usuario,
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellido: req.body.apellidos,
        telefono: req.body.telefono,
        correo: req.body.correo,
        direccion: req.body.direccion,
        edad: req.body.edad
    };

//conection
    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('update estudiante set  cedula=$1, nombres=$2, apellidos=$3,  telefono=$4, correo=$5,direccion=$6,edad=$7,id_usuario=$8,  where  id=$9 RETURNING *',
        [p.cedula,p.nombres, p.apellido, p.telefono, p.correo,p.direccion,p.edad, p.id_usuario]);
    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});
});

//obtener todos



router.get('/allestudiantes', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT id, cedula, nombres, apellidos, telefono, correo,direccion,edad, id_usuario FROM estudiante  ');

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

//////////




