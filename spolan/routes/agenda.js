
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
    id_informacion:req.body.id_informacion
  };





  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO agenda(estado, start, "backgroundColor", id_informacion,"end", "borderColor", evento,title) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [p.estado, p.start, p.backgroundColor, p.id_informacion, p.end, p.borderColor, p.evento,p.title]);


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























router.get('/obtenerIdLugar/:id', function (req, res) {
  var id = req.params.id;

  var client = new pg.Client(conString);
  client.connect();
  const results = [];
  var query = client.query('SELECT  tipo.nombre as tipo,institucion.nombre as institucion,ambito.nombre as ambito,acto.* FROM  acto INNER JOIN tipo ON acto.id_tipo= tipo.id_tipo INNER JOIN ambito ON acto.id_tipo_ambito= ambito.id_ambito INNER JOIN usuario ON acto.id_usuario= usuario.id_usuario INNER JOIN institucion ON usuario.id_institucion= institucion.id_institucion WHERE $1 = id_acto',
    [req.params.id]);
  // Stream results back one row at a time
  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
client.end();
console.log(results);
    return res.json(results);
  });
});



/* GET Postgres JSON data */

router.get('/casa', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  var query = client.query(casa1);
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    res.send(result.rows[0].row_to_json);
    res.end();
  });
});

router.get('/parroquias', function (req, res) {

  var client = new pg.Client(conString);
  client.connect();

  var query = client.query(parroquias);
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    res.send(result.rows[0].row_to_json);
    res.end();
  });
});

router.get('/casa/:id', function (req, res) {
  var id = req.params.id;
  var client = new pg.Client(conString);
  client.connect();

  var query = client.query(casa, [req.params.id]);
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    res.send(result.rows[0].row_to_json);
    res.end();
  });
});


router.post('/obtenerlugares', function (req, res) {

  console.log(req);

  var p = {

    id_usuario: req.body.id_usuario
  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * FROM acto WHERE id_usuario=$1',
    [p.id_usuario]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });

});


router.get('/obtenerFojasTodas', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT foja.id_foja,foja.nombre,foja.descripcion,foja.codigo,foja.fecha,foja.id_usuario,foja.estado,institucion.nombre as institucion FROM foja INNER JOIN usuario ON usuario.id_usuario= foja.id_usuario INNER JOIN institucion ON usuario.id_institucion= institucion.id_institucion');


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });

});



router.get('/obtenerDescargas', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT imagen.id_imagen, foja.nombre, imagen.codigo, imagen.url FROM imagen INNER JOIN foja ON imagen.id_foja= foja.id_foja');


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });

});



router.get('/obtenerTipos', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * FROM tipo');


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });

});



router.get('/obtenerInstituciones', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * FROM institucion');


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });

});


router.post('/obtenerFojas', function (req, res) {

  console.log(req);

  var p = {

    id_usuario: req.body.id_usuario
  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * FROM foja WHERE id_usuario=$1',
    [p.id_usuario]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });

});




router.post('/obtenerImagenes', function (req, res) {

  console.log(req);

  var p = {

    id_acto: req.body.id_acto
  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * FROM imagenes WHERE id_acto=$1',
    [p.id_acto]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});



router.post('/obtenerImagenesFoja', function (req, res) {

  console.log(req);

  var p = {

    id_foja: req.body.id_foja
  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('SELECT * FROM imagen WHERE id_foja=$1',
    [p.id_foja]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});


router.get('/obtenerlugares2', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  acto');

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });
});

router.get('/obtenerUsuarios', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  usuario');

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });
});


router.get('/obtenercategoria', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  ambito');

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });
});



router.get('/obtenercantones', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  canton');

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });
});



router.get('/obtenertipos', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  tipo');

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });
});



router.get('/obtenertiposUsuarios', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  tipo_usuario');

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });
});



router.get('/obtenertiposInstitucion', function (req, res) {


  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  institucion');

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });
});








router.post('/registrarlugar', function (req, res) {

  console.log(req);

  var p = {

    nombrelugar: req.body.nombrelugar,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    lon: req.body.lon,
    lat: req.body.lat,
    geom: req.body.geom,
    descripcioncorta: req.body.descripcioncorta,
    ambito: req.body.ambito,
    tipo: req.body.tipo,
    ficha: req.body.ficha,
    canton: req.body.canton,
    id_usuario:req.body.id_usuario,
    videos:req.body.videos

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO acto(nombre, descripcion, c_descripcion, ficha, id_tipo_ambito,id_canton, id_tipo, lat, lon, geom, imagen,id_usuario,videos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *',
    [p.nombrelugar, p.descripcion, p.descripcioncorta, p.ficha, p.ambito, p.canton, p.tipo, p.lat, p.lon, p.geom, p.imagen,p.id_usuario,p.videos]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});


router.post('/registrarImagen', function (req, res) {

  console.log(req);

  var p = {

    id_foja: req.body.id_foja,
    url: req.body.url,
    codigo: req.body.codigo
  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO imagen(id_foja, codigo, url) VALUES ($1,$2,$3) RETURNING *',
    [p.id_foja, p.codigo, p.url]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});



router.post('/registrarUsuario', function (req, res) {

  console.log(req);

  var p = {

    nombre: req.body.nombre,
    contrasenia: req.body.contrasenia,
    id_tipo: req.body.id_tipo,
    id_institucion: req.body.id_institucion,
    estado:"activo"

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO usuario(nombre, contrasenia, id_tipo, id_institucion,estado) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [p.nombre, p.contrasenia, p.id_tipo, p.id_institucion,p.estado]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});





router.post('/registrarTipo', function (req, res) {

  console.log(req);

  var p = {

    nombre: req.body.nombre,
    

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO tipo(nombre) VALUES ($1) RETURNING *',
    [p.nombre]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});





router.post('/registrarInst', function (req, res) {

  console.log(req);

  var p = {

    nombre: req.body.nombre,
    

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO institucion(nombre) VALUES ($1) RETURNING *',
    [p.nombre]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});




router.post('/registrarFoja', function (req, res) {

  console.log(req);

  var p = {

    nombre: req.body.nombre,
    codigo: req.body.codigo,
    descripcion: req.body.descripcion,
    fecha:req.body.fecha,
    usuario:req.body.usuario,
    estado:req.body.estado    

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO foja(nombre, descripcion, codigo, fecha,id_usuario,estado) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [p.nombre, p.descripcion, p.codigo, p.fecha,p.usuario,p.estado]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});



router.put('/modificarImagenes/:id', function (req, res) {
  var id = req.params.id;


  var p = {

    acto: req.body.acto,
    descripcion: req.body.descripcion,
    url: req.body.url
    

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('UPDATE imagenes  SET descripcion=$1, url=$2, id_acto=$3 WHERE id_imagenes=$4 ',
    [p.descripcion, p.url, p.acto,id]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});



router.put('/modificarTipo/:id', function (req, res) {
  var id = req.params.id;


  var p = {

    nombre: req.body.nombre
   
    

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('UPDATE tipo  SET nombre=$1 WHERE id_tipo=$2 ',
    [p.nombre,id]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});



router.put('/modificarInst/:id', function (req, res) {
  var id = req.params.id;


  var p = {

    nombre: req.body.nombre
   
    

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('UPDATE institucion  SET nombre=$1 WHERE id_institucion=$2 ',
    [p.nombre,id]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});

router.post('/imagenes', function (req, res) {

  console.log(req);

  var p = {

    acto: req.body.acto,
    descripcion: req.body.descripcion,
    url: req.body.url
    

  };



  var client = new pg.Client(conString);
  client.connect();

  const results = [];

  var query = client.query('INSERT INTO imagenes(descripcion, url, id_acto) VALUES ($1,$2,$3)  RETURNING * ',
    [p.descripcion, p.url, p.acto]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results);
  });




});



router.post('/login', function (req, res) {

  var data1 = {
    nombre: req.body.usuario,
    contrasenia: req.body.contrasenia

  };

  var client = new pg.Client(conString);
  client.connect();



  const results = [];

  var query = client.query('SELECT * FROM usuario  WHERE nombre=$1 and contrasenia=$2',
    [data1.nombre, data1.contrasenia]);

  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
client.end();
    return res.json(results[0]);
  });

});


router.get('/obtenerIdLugar/:id', function (req, res) {
  var id = req.params.id;

  var client = new pg.Client(conString);
  client.connect();


  const results = [];

  var query = client.query('SELECT  * FROM  persona WHERE $1 = id',
    [req.params.id]);
  // Stream results back one row at a time
  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
client.end();
    return res.json(results);
  });
});





router.put('/modificarUsuario/:id', function (req, res) {
var id=req.params.id;

 
  var p = { 
              
                nombre: req.body.nombre,
    id_tipo: req.body.id_tipo,
    id_institucion: req.body.id_institucion,
    contrasenia: req.body.contrasenia,
    estado:req.body.estado
            };   


    
   var client = new pg.Client(conString);
    client.connect();

    const results = [];



     var query = client.query('UPDATE usuario SET  nombre=$1, contrasenia=$2, id_tipo=$3, id_institucion=$4,estado=$6 WHERE $5 = id_usuario  RETURNING *',
   [p.nombre,p.contrasenia,p.id_tipo,p.id_institucion,id,p.estado]); 
           

 query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
    client.end();
      return res.json(results);
    });



  });





router.put('/modificarlugar/:id', function (req, res) {
var id=req.params.id;

 
  var p = { 
              
                nombrelugar: req.body.nombrelugar,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    lon: req.body.lon,
    lat: req.body.lat,
    geom: req.body.geom,
    descripcioncorta: req.body.descripcioncorta,
    ambito: req.body.ambito,
    tipo: req.body.tipo,
    ficha: req.body.ficha,
    canton: req.body.canton,
    id_usuario:req.body.id_usuario,
    videos:req.body.videos


            };   


    
   var client = new pg.Client(conString);
    client.connect();

    const results = [];



     var query = client.query('UPDATE acto SET nombre=$1, descripcion=$2, c_descripcion=$3, ficha=$4, id_tipo_ambito=$5, id_canton=$6, id_tipo=$7, lat=$8, lon=$9, geom=$10, imagen=$11, id_usuario=$12,videos=$14 WHERE $13 = id_acto  RETURNING *',
   [p.nombrelugar,p.descripcion,p.descripcioncorta,p.ficha,p.ambito,p.canton,p.tipo,p.lat,p.lon,p.geom,p.imagen,p.id_usuario,id,p.videos]); 
           

 query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
    client.end();
      return res.json(results);
    });



  });



router.delete('/eliminarImagenFoja/:id', function (req, res) {
  var id = req.params.id;



  var client = new pg.Client(conString);
  client.connect();

  const results = [];



  var query = client.query('DELETE FROM imagen WHERE $1 = id_imagen  RETURNING *',
    [id]);


  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
client.end();
    return res.json(results);
  });



});


router.delete('/eliminarImagen/:id', function (req, res) {
  var id = req.params.id;



  var client = new pg.Client(conString);
  client.connect();

  const results = [];



  var query = client.query('DELETE FROM imagenes WHERE $1 = id_imagenes  RETURNING *',
    [id]);


  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
client.end();
    return res.json(results);
  });



});


router.delete('/eliminarlugar/:id', function (req, res) {
  var id = req.params.id;



  var client = new pg.Client(conString);
  client.connect();

  const results = [];



  var query = client.query('DELETE FROM acto WHERE $1 = id_acto  RETURNING *',
    [id]);


  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
client.end();
    return res.json(results);
  });



});



router.delete('/eliminarFoja/:id', function (req, res) {
  var id = req.params.id;



  var client = new pg.Client(conString);
  client.connect();

  const results = [];



  var query = client.query('DELETE FROM foja WHERE $1 = id_foja  RETURNING *',
    [id]);


  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
client.end();
    return res.json(results);
  });



});


router.post('/prueba', function (req, res) {

  console.log(req.body.nombre);

  var p = {

    nombre: req.body.nombre,
    definicion: req.body.definicion


  };



  const client = new pg.Client(conString);
  client.connect();

  const results = [];

  const query = client.query('INSERT INTO prueba(nombre, definicion) VALUES ($1,$2) RETURNING *',
    [p.nombre, p.definicion]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
    client.end();
    return res.json(results);
  });




});



router.get('/prueba1', function (req, res) {







  const client = new pg.Client(conString);
  client.connect();

  const results = [];

  const query = client.query(parroquias);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
    client.end();
    return res.json(results);
  });




});



//de aqui el nuevo proyecto parte de bsucar id d ambito  y canton 


router.post('/cantonAmbito', function (req, res) {

  console.log(req.body.ambito);
  console.log(req.body.canton);

  var p = {

    ambito: req.body.ambito,
    canton: req.body.canton


  };



  const client = new pg.Client(conString);
  client.connect();

  const results = [];




  var query = client.query(anbicanto,
    [p.ambito, p.canton]);


  query.on('row', (row) => {
    results.push(row);
  });

  query.on('end', () => {
    client.end();



    return res.json(results[0].row_to_json);
  });




});





router.post('/img', function (req, res) {

 // console.log(req.body.img);

    var uploadDate = new Date().toISOString();
     uploadDate = uploadDate.replace(':','-');
      uploadDate = uploadDate.replace(':','-');


var buff = new Buffer(req.body.img
    .replace(/^data:image\/(jpeg);base64,/,''), 'base64');



var targetPath = path.join(__dirname, "../galeria/"  + uploadDate + req.body.name+".jpg");
    var savePath = "/galeria/"  + uploadDate + req.body.name+".jpg";

fs.writeFile(targetPath, buff, function (err) {



    console.log('done');

      res.json(savePath);
});



   
    
  
  





});




   

