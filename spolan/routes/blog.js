
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



router.get('/obtenerBlog', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * from blog');


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});

});

///////////////////////////// ingresar

router.post('/addBlog', function (req, res) {

  console.log(req.body);

  var p = {

      author: req.body.author,
 body:{   body: req.body.body},
      comments: { comments: req.body.comments},
      createdOn:req.body.createdOn,
      image:req.body.image,
      likes:req.body.likes,
      title:req.body.title
    };



//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO blog(author, "createdOn", image, likes, title, body, comments) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [p.author, p.createdOn, p.image,p.likes,p.title,p.body,p.comments]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});


//////////////////////actulizar


router.put('/actulizarBlog/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);

  var p = {

      comments: req.body.comments
  };

//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];



  var query = client.query('update blog set comments=$1 where id=$2 RETURNING *',
      [p.comments, id]);


  query.on('row', (row) => {
    results.push(row);
});

  query.on('end', () => {
    client.end();
  return res.json(results);
});
});




/////////eliminar


router.delete('/eliminarusuario/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.body);


//conection
  var client = new pg.Client(conString);
  client.connect();

  const results = [];


  var query = client.query('delete from usuario  where id_usuario=$1 RETURNING *',
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


