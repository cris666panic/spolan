
var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var config = require('../config.json');
var path = require('path');

var pg = require("pg");

var conString =  "postgres://postgres:"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;

module.exports = router;




router.post('/registrarCalendario', function (req, res) {

 

  var p = {
    title:req.body.title,
    evento:req.body.evento,
    start:req.body.start,
    end:req.body.end,
    backgroundColor:req.body.backgroundColor,
    borderColor:req.body.borderColor,
    estado: req.body.estado,
    id_informacion:req.body.id_informacion,
      ciudad:req.body.ciudad
  };





  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO agenda(estado, start, "backgroundColor", id_informacion,"end", "borderColor", evento,title,ciudad) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
      [p.estado, p.start, p.backgroundColor, p.id_informacion, p.end, p.borderColor, p.evento,p.title,p.ciudad]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});




});




router.get('/obtenerCalendario', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * from agenda');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});


router.get('/obtenerCalendarioRio', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT * from agenda where ciudad=$1',['Riobamba']);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});


router.get('/obtenerCalendarioCu', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];

    var query = client.query('SELECT * from agenda where ciudad=$1',['Cumanda']);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});


router.put('/actulizarCalendario/:id', function (req, res) {
    var id = req.params.id;

    console.log(req.body);

    var p = {

        backgroundColor:req.body.backgroundColor,
        borderColor:req.body.borderColor,
        estado: req.body.estado

    };


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query(' UPDATE agenda  SET estado=$1, "backgroundColor"=$2,"borderColor"=$3 WHERE id_agenda=$4 RETURNING *',
        [p.estado, p.backgroundColor, p.borderColor, id]);


    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});





router.get('/obtenerCalendarioPendientes', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 ', ['pendiente']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});





router.get('/obtenerCalendarioPendientesRio', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['pendiente','Riobamba']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});


router.get('/obtenerCalendarioPendientesCu', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['pendiente','Cumanda']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerCalendarioOcupados', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 ', ['ocupado']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerCalendarioOcupadosRio', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['ocupado','Riobamba']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});




router.get('/obtenerCalendarioOcupadosCu', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['ocupado','Cumanda']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerCalendarioCancelado', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 ', ['cancelado']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerCalendarioCanceladoRio', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['cancelado','Riobamba']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerCalendarioCanceladoCu', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['cancelado','Cumanda']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerCalendarioCambio', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 ', ['cambio']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});



router.get('/obtenerCalendarioCambioRio', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['cambio','Riobamba']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});




router.get('/obtenerCalendarioCambioCu', function (req, res) {


    var client = new pg.Client(conString);
    client.connect();

    const results = [];


    var query = client.query('SELECT * from agenda where estado= $1 and ciudad=$2', ['cambio','Cumanda']);

    query.on('row', (row) => {
        results.push(row);
});

    query.on('end', () => {
        client.end();
    return res.json(results);
});

});

   

