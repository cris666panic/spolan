
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


router.post('/regperiodo', function (req, res) {

    console.log(req.body);

    var p = {
        inicio: req.body.inicio,
        fin: req.body.fin,

    };

//insertar
    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('INSERT INTO periodo(inicio, fin)' +
        ' VALUES ($1,$2) RETURNING *',
        [p.inicio, p.fin]);



    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});
});
//obtener todos



router.get('/allperiodo', function (req, res) {

    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT * FROM periodo ');

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

//////////




