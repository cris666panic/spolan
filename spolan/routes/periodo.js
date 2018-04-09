
var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var config = require('../config.json');
var path = require('path');

var pg = require("pg");

var conString =  "postgres://postgres:"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;

module.exports = router;



router.post('/addPeriodo', function (req, res) {

    console.log(req.body);

    var p = {
        inicio: req.body.inicio,
        fin: req.body.fin,
        unido:req.body.unido,
        activacion:req.body.activacion,
        estado:req.body.estado,
        idSecretaria:req.body.idSecretaria

    };


    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('INSERT INTO periodo(inicio, fin,unido,activacion,estado,"idSecretaria")' +
        ' VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [p.inicio, p.fin,p.unido,p.activacion,p.estado,p.idSecretaria]);



    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});
});




router.get('/allperiodo', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT * FROM periodo where estado=$1 ',['activo']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});


router.post('/allperiodoSecretaria', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT * FROM periodo where estado=$1 and "idSecretaria"=$2 ',['activo',req.body.id_usuario]);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});





router.put('/actulizarPeriodo/:id', function (req, res) {
    var id = req.params.id;

    console.log(req.body);

    var p = {

        inicio: req.body.inicio,
        fin: req.body.fin,
        unido:req.body.unido,
        estado:req.body.estado
    };

//conection
    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('UPDATE periodo SET inicio=$1, fin=$2,unido=$3 ,estado=$4 where id=$5 RETURNING *',
        [p.inicio, p.fin, p.unido,p.estado, id]);



    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});




