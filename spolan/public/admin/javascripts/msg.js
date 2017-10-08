var tareasModule = angular.module('allmsg', []);


tareasModule.factory('datosmsg', function ($http,$q) {

    var datosmsg={};
 //// controlado de llamado 
    datosmsg.getAllmsg = function (){

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/web/allobtenermsg')
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };




    datosmsg.actualizar = function (datomsg) {

        console.log(datomsg);

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarmsg/' + datomsg.id_msg, datomsg)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


/*

    datosmsg.getAllFojas = function (id) {
        return $http.post('/punto/obtenerFojas',id)
            .success(function (data) {
                angular.copy(data, datosmsg.tareas);
console.log(data);
                return datosmsg.tareas;
            })
    };





 datosmsg.getAllImagenes = function (tarea) {

    var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/punto/obtenerImagenes', tarea)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };



 datosmsg.getAllImagenesFoja = function (tarea) {

console.log(tarea);

    var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/punto/obtenerImagenesFoja', tarea)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };



datosmsg.getCategorias = function () {

        return $http.get('/punto/obtenercategoria')
            .success(function (data) {
                angular.copy(data, datosmsg.categorias);
console.log(data);
                return datosmsg.categorias;
            })
    };


    datosmsg.getCantones = function () {

        return $http.get('/punto/obtenercantones')
            .success(function (data) {
                angular.copy(data, datosmsg.cantones);
console.log(data);
                return datosmsg.cantones;
            })
    };



    datosmsg.getTipos = function () {

        return $http.get('/punto/obtenertipos')
            .success(function (data) {
                angular.copy(data, comun.tipos);
console.log(data);
                return comun.tipos;
            })
    };


    datosmsg.add = function (tarea) {

    var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/punto/registrarlugar', tarea)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };

 datosmsg.addImagenGaleria = function (tarea) {

    var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/punto/registrarImagen', tarea)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };

 datosmsg.addFoja = function (tarea) {

    var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/punto/registrarFoja', tarea)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


datosmsg.actualizar = function (tarea) {


console.log(tarea);

    var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/punto/modificarlugar/' + tarea.id_acto, tarea)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    

datosmsg.actualizarImagenes = function (tarea) {

    var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/punto/modificarImagenes/' + tarea.id_imagenes, tarea)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    datosmsg.addImagenes = function (imagen) {

    var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/punto/imagenes', imagen)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


  

    datosmsg.delet = function (tarea) {
        return $http.delete('/punto/eliminarlugar/' + tarea.id_acto)
            .success(function () {

                var indice = comun.tareas.indexOf(tarea);
                comun.tareas.splice(indice, 1);

            })

    };


    datosmsg.deletFoja = function (tarea) {
        return $http.delete('/punto/eliminarFoja/' + tarea.id_foja)
            .success(function () {

                var indice = comun.tareas.indexOf(tarea);
                comun.tareas.splice(indice, 1);

            })

    };



datosmsg.deletImagen = function (tarea) {
        return $http.delete('/punto/eliminarImagen/' + tarea.id_imagenes)
            .success(function () {


            })

    };

    
datosmsg.deletImagenFoja = function (tarea) {
        return $http.delete('/punto/eliminarImagenFoja/' + tarea.id_imagen)
            .success(function () {


            })

    };

    datosmsg.addImagen = function (imagen) {


        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/api/profile/editPhoto', imagen)
            .success(function (data) {

                console.log("rango edades "+data);

                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;
    };

*/

    return datosmsg;






});




tareasModule.controller('mostrarmsg', function ($scope, $location, datosmsg,$timeout) {
    console.log("si");

    datosmsg.getAllmsg().then(function (data) {

        $scope.listamsg=data;

    }).catch(function (err) {
        console.log("error");
    });




    $timeout(function(){

        console.log( $scope.listamsg);
        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }


        });
    }, 300, false);

    $scope.estados = [{nombre:"pendiente"} ,{nombre:"notificado"} ];


    $scope.actulizar = function (consulta) {

        console.log(consulta);

var objeto ={
    id_msg: consulta.id_msg,
    estado: consulta.estado_msg,
    id_informacion: consulta.id_informacion,
    msg: consulta.msg
   }
        datosmsg.actualizar(objeto ).then(function (data) {



        }).catch(function (err) {
            console.log("error");
        });

    };



    /*
   $scope.eliminar = function (tarea) {
      comun.delet(tarea);
console.log(tarea);
    };



    $scope.procesarObjeto = function (tarea) {
        comun.tarea = tarea;
        console.log(tarea);
      $location.path('/editarSitio');

    };

*/

});



tareasModule.controller('ctrlEditar', function ($scope, $location, comun,$http ,Upload) {
  
    $scope.lista=[];

  var obj={id_acto:comun.tarea.id_acto}
    comun.getAllImagenes(obj).then(function (data) {

               $scope.lista=data;

            }).catch(function (err) {
            console.log("error");
        });
  
   

 comun.getCategorias();
     $scope.categoria = comun.categorias;
comun.getCantones();
  $scope.canton = comun.cantones;

    comun.getTipos();
  $scope.tipo = comun.tipos;




$scope.tarea={};
     $scope.tarea.id_acto = comun.tarea.id_acto;
    $scope.tarea.ambito = comun.tarea.id_tipo_ambito;
     $scope.tarea.tipo = comun.tarea.id_tipo;
 $scope.tarea.canton = comun.tarea.id_canton;
$scope.tarea.nombrelugar = comun.tarea.nombre;
$scope.tarea.ficha = comun.tarea.ficha;
$scope.tarea.lat = comun.tarea.lat;
$scope.tarea.lon = comun.tarea.lon;
$scope.tarea.descripcion = comun.tarea.descripcion;
$scope.tarea.descripcioncorta = comun.tarea.c_descripcion;



console.log($scope.lista);


console.log($scope.tarea);






    $('#lightbox').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

        console.log(recipient);


        var $img = $(this).find('img'),
            src = recipient,
            alt = '...',
            css = {
                'maxWidth': $(window).width() - 100,
                'maxHeight': $(window).height() - 100
            };

        $(this).find('.close').addClass('hidden');
        $(this).find('img').attr('src', src);
        $(this).find('img').attr('alt', alt);
        $(this).find('img').css(css);




        $(this).find('.modal-dialog').css({'width': 850});
        $(this).find('.close').removeClass('hidden');



    });


 comun.getCategorias();
     $scope.categoria = comun.categorias;




    $scope.files=[];


    $scope.lista=[];

     $scope.openLightboxModal = function (index) {


     

        
       comun.deletImagen($scope.lista[index]);

    


        $scope.lista.splice(index, 1);
        console.log($scope.lista);
    };

     $scope.agregarDescripcion = function (index) {


     $scope.modal=index;

$scope.descripcionImagen= $scope.lista[index].descripcion;

        $('.bs-example-modal-lg').modal('show');

      
      
      
    };

    

     $scope.guardarDescripcion = function () {


       

       $scope.lista[$scope.modal].descripcion=$scope.descripcionImagen;
            console.log($scope.lista);

         $scope.descripcionImagen="";   
      
    };


 $scope.predeterminado = function (index) {


        console.log(index);
        
    $scope.tarea.imagen =  $scope.lista[index].url;
        console.log( $scope.tarea);

$scope.tarea.imagenes =  $scope.lista;
         


  

    };

    $scope.subirImagen = function (files) {


  console.log(files);


        var n = $scope.files.length;


        for (var i = 0; i < n; i++) {

            var objeto=$scope.files[i];

          $scope.upload(objeto);

        }


    };

 



    $scope.upload = function (file) {
        if (file){

           

            Upload.upload({
                url: '/api/profile/editPhoto',
                method: 'POST',
                file: file
            }).progress(function(evt){
                console.log("subiendo");
                 //progreso = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
               progreso1 = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
 
                 

            }).success(function(data){
                console.log(data);




 comun.addImagenes({
url: data,
           descripcion:"sin descripcion",
           acto:$scope.tarea.id_acto
                })
            .then(function (data) {

                $scope.lista.push(data[0]);
                console.log("ingreso imagen");
                 console.log(data[0]);

            }).catch(function (err) {
            console.log("error");
        });







               
              

            }).error(function(error){
                console.log(error);
            })
        }
    };





    $scope.Actualizar = function () {

     //$scope.tarea.geom=("SRID=32717;POINT("+$scope.tarea.lon+" "+$scope.tarea.lat+")");

console.log( $scope.tarea);
   var usuario=  JSON.parse(localStorage.getItem("usuario"));

        var obj = {
            id_acto:$scope.tarea.id_acto,
            geom: "SRID=32717;POINT(" + $scope.tarea.lon + " " + $scope.tarea.lat + ")",
            nombrelugar: $scope.tarea.nombrelugar,
            descripcion: $scope.tarea.descripcion,
            imagen: $scope.tarea.imagen,
            lon: $scope.tarea.lon,
            lat: $scope.tarea.lat,
            descripcioncorta: $scope.tarea.descripcioncorta,
            ambito: $scope.tarea.ambito,
            ficha: $scope.tarea.ficha,
             tipo: $scope.tarea.tipo,
              canton: $scope.tarea.canton,
              id_usuario:usuario.id_usuario

        };


 console.log(obj);

       comun.actualizar(obj).then(function (data) {
                
        
  console.log(data);
   console.log($scope.lista);




    var n = $scope.lista.length;


    for (var i = 0; i < n; i++) {
       console.log( $scope.lista[i]);
$scope.lista[i].acto=data[0].id_acto;
        comun.actualizarImagenes($scope.lista[i])
            .then(function (data) {

                console.log("ingreso imagen");

            }).catch(function (err) {
            console.log("error");
        });

    }
    


            }).catch(function (err) {
            console.log("error");
        });

        $scope.tarea.nombrelugar = '';
        $scope.tarea.descripcion = '';
        $scope.tarea.imagen = '';
         $scope.tarea.lon = '';
          $scope.tarea.lat = '';
           $scope.tarea.geom = '';
          




       
    $location.path('/sitios');



 

    };



});

tareasModule.controller('ctrlImagen', function ($scope, $location, comun,$http ,Upload) {

    $('i.glyphicon-trash').click(function(){
        var $this = $(this),
            c = $this.data('count');
        if (!c) c = 0;
        c++;
        $this.data('count',c);
        $('#'+this.id+'-bs3').html(c);
    });


    $('#lightbox').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

        console.log(recipient);


        var $img = $(this).find('img'),
            src = recipient,
            alt = '...',
            css = {
                'maxWidth': $(window).width() - 100,
                'maxHeight': $(window).height() - 100
            };

        $(this).find('.close').addClass('hidden');
        $(this).find('img').attr('src', src);
        $(this).find('img').attr('alt', alt);
        $(this).find('img').css(css);




        $(this).find('.modal-dialog').css({'width': 850});
        $(this).find('.close').removeClass('hidden');



    });


 comun.getCategorias();
     $scope.categoria = comun.categorias;
comun.getCantones();
  $scope.canton = comun.cantones;
comun.getTipos();
  $scope.tipo = comun.tipos;




  



    $scope.files=[];


    $scope.lista=[];

   



    
    $scope.openLightboxModal1 = function (index) {


        console.log($scope.files1);
        $scope.files1.splice(index, 1);
        console.log($scope.files1);
    };

    $scope.openLightboxModal = function (index) {


        console.log($scope.lista);
        $scope.lista.splice(index, 1);
        console.log($scope.lista);
    };

     $scope.agregarDescripcion = function (index) {


     $scope.modal=index;

        $('.bs-example-modal-lg').modal('show');

      
      
      
    };

    

     $scope.guardarDescripcion = function () {


       

       $scope.lista[$scope.modal].descripcion=$scope.descripcionImagen;
            console.log($scope.lista);

         $scope.descripcionImagen="";   
      
    };


    $scope.subirImagen = function (files) {


  console.log(files);


        var n = $scope.files.length;


        for (var i = 0; i < n; i++) {

            var objeto=$scope.files[i];

          $scope.upload(objeto);

        }


    };

 



    $scope.upload = function (file) {
        if (file){

           

            Upload.upload({
                url: '/api/profile/editPhoto',
                method: 'POST',
                file: file
            }).progress(function(evt){
                console.log("subiendo");
                 //progreso = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
               progreso1 = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
 
                 

            }).success(function(data){
                console.log(data);




                $scope.lista.push({
url: data,
           descripcion:"sin descripcion",
           acto:"acto"
                });



               
              

            }).error(function(error){
                console.log(error);
            })
        }
    };




 $scope.tarea = {};

   

 $scope.predeterminado = function (index) {


        console.log(index);
        
    $scope.tarea.imagen =  $scope.lista[index].url;
        console.log( $scope.tarea);

$scope.tarea.imagenes =  $scope.lista;
         


  

    };

    $scope.agregar = function () {

     //$scope.tarea.geom=("SRID=32717;POINT("+$scope.tarea.lon+" "+$scope.tarea.lat+")");

console.log( $scope.tarea);
   var usuario=  JSON.parse(localStorage.getItem("usuario"));

        var obj = {
            geom: "SRID=32717;POINT(" + $scope.tarea.lon + " " + $scope.tarea.lat + ")",
            nombrelugar: $scope.tarea.nombrelugar,
            descripcion: $scope.tarea.descripcion,
            imagen: $scope.tarea.imagen,
            lon: $scope.tarea.lon,
            lat: $scope.tarea.lat,
            descripcioncorta: $scope.tarea.descripcioncorta,
            ambito: $scope.tarea.ambito,
            ficha: $scope.tarea.ficha,
             tipo: $scope.tarea.tipo,
              canton: $scope.tarea.canton,
              id_usuario:usuario.id_usuario

        };


 console.log(obj);

       comun.add(obj).then(function (data) {
                
        
  console.log(data);
   console.log($scope.lista);




    var n = $scope.lista.length;


    for (var i = 0; i < n; i++) {
       console.log( $scope.lista[i]);
$scope.lista[i].acto=data[0].id_acto;
        comun.addImagenes($scope.lista[i])
            .then(function (data) {

                console.log("ingreso imagen");

            }).catch(function (err) {
            console.log("error");
        });

    }
    


            }).catch(function (err) {
            console.log("error");
        });

        $scope.tarea.nombrelugar = '';
        $scope.tarea.descripcion = '';
        $scope.tarea.imagen = '';
         $scope.tarea.lon = '';
          $scope.tarea.lat = '';
           $scope.tarea.geom = '';
          




       
    $location.path('/sitios');



 

    };


    

});





tareasModule.controller('ctrlGaleria', function ($scope, $location, comun,$http ,Upload,$q) {

console.log("galeria");

console.log(JSON.parse(localStorage.getItem("foja")));
var foja =JSON.parse(localStorage.getItem("foja"));




 var obj={id_foja:foja.id_foja}
 
    comun.getAllImagenesFoja(obj).then(function (data) {

               $scope.lista=data;

            }).catch(function (err) {
            console.log("error");
        });








  var progress = document.querySelector('.percent');


  
  

  






document.getElementById("files").onchange = function () {

      progress.style.width = '0%';
    progress.textContent = 'cargando......';
    

function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

    var reader = new FileReader();


//ver q no vale barra de carga 
 //reader.onprogress = updateProgress;

    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };


    reader.onload = function (e) {
  

        Jimp.read(e.target.result).then(function (lenna) {
            lenna.quality(88)                 // set JPEG quality
                 .getBase64(Jimp.AUTO, function (err, src) {
                     console.log("1");

                        progress.style.width = '100%';
      progress.textContent = 'Listo';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);


var imagen={
    img:src,
    name:$scope.codigo
}

     console.log("1");


upload(imagen).then(function (data) {

              console.log(data);
    var objeto={

url: data,
           codigo:$scope.codigo,
           id_foja:foja.id_foja
               
    };

comun.addImagenGaleria(objeto).then(function (data) {
                
        
  console.log(data);
 

            }).catch(function (err) {
            console.log("error");
        });
        

 
  $scope.lista.push({
url: data,
           codigo:$scope.codigo,
           id_foja:foja.id_foja
                });


 console.log( $scope.lista);

            }).catch(function (err) {
            console.log("error");
        });


                 });
                 
               

             
 


        });

       
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);

console.log(this.files[0]);

       




};




function upload(imagen){

console.log("upload");
console.log(imagen);

    var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/punto/img', imagen)
            .success(function (data) {


                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



}

 $('i.glyphicon-trash').click(function(){
        var $this = $(this),
            c = $this.data('count');
        if (!c) c = 0;
        c++;
        $this.data('count',c);
        $('#'+this.id+'-bs3').html(c);
    });


    $('#lightbox').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

        console.log(recipient);


        var $img = $(this).find('img'),
            src = recipient,
            alt = '...',
            css = {
                'maxWidth': $(window).width() - 100,
                'maxHeight': $(window).height() - 100
            };

        $(this).find('.close').addClass('hidden');
        $(this).find('img').attr('src', src);
        $(this).find('img').attr('alt', alt);
        $(this).find('img').css(css);




        $(this).find('.modal-dialog').css({'width': 850});
        $(this).find('.close').removeClass('hidden');



    });

 



    $scope.files=[];


    $scope.lista=[];

   



    
    $scope.openLightboxModal1 = function (index) {


        console.log($scope.files1);
        $scope.files1.splice(index, 1);
        console.log($scope.files1);
    };

    $scope.openLightboxModal = function (index) {


        console.log($scope.lista);
      
  comun.deletImagenFoja($scope.lista[index]);
  $scope.lista.splice(index, 1);



        console.log($scope.lista);
    };

   



 $scope.tarea = {};



    $scope.agregar = function () {

     //$scope.tarea.geom=("SRID=32717;POINT("+$scope.tarea.lon+" "+$scope.tarea.lat+")");

console.log( $scope.lista);

       
   $location.path('/fojas');



 

    };





});





tareasModule.controller('ctrlAgregarFoja', function ($scope, $location, comun) {


  var usuario= JSON.parse(localStorage.getItem("usuario"));
  
   




  


    $scope.agregar = function () {
      
      console.log($scope.tarea);

var obj1={
nombre:$scope.tarea.nombre,
descripcion:$scope.tarea.descripcion,
fecha:$scope.tarea.fecha,
codigo:$scope.tarea.codigo,
usuario:usuario.id_usuario


}

         comun.addFoja(obj1).then(function (data) {
                
        
  console.log(data);  


            }).catch(function (err) {
            console.log("error");
        });

        $scope.tarea.nombre = '';
        $scope.tarea.codigo = '';
        $scope.tarea.descripcion = '';
                $scope.tarea.fecha = '';
        

     $location.path('/fojas');

    };



});



tareasModule.controller('ctrlFojas', function ($scope, $location, comun,$timeout) {


var usuario=  JSON.parse(localStorage.getItem("usuario"));
var obj={id_usuario:usuario.id_usuario}
    comun.getAllFojas(obj);
     $scope.tareas = comun.tareas;



   $timeout(function(){

        console.log( $scope.tareas);
        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
            


        });
    }, 300, false);


  
    $scope.eliminar = function (tarea) {
       comun.deletFoja(tarea);
console.log(tarea);
    };



    $scope.procesarObjeto = function (tarea) {
   
   window.localStorage["foja"] = JSON.stringify(tarea);
      $location.path('/galeria');

    };



});


tareasModule.controller('ctrlImagenes', function ($scope, $location, comun, $timeout) {



    comun.getAllDescargas();
     $scope.tareas = comun.tareas;



   $timeout(function(){

        console.log( $scope.tareas);
        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
            


        });
    }, 300, false);



});

