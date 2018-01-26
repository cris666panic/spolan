var tareasModule = angular.module('matricula', []);


tareasModule.factory('matricula', function ($http,$q) {


    var matricula = {};

    matricula.getAll = function () {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/web/obtenerMatriculas')
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };



    matricula.obtenerAsistenciaEstudiante = function (estudiante) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerAsistenciaEstudiante',estudiante)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };


    matricula.obtenerNotasEstudiante = function (estudiante) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerNotasEstudiante',estudiante)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };




    matricula.add = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/addMatricula',docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    matricula.update = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarMatricula/'+docente.id, docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };

    matricula.delet = function (docente) {


        var defered = $q.defer();
        var promise = defered.promise;

        $http.delete('/web/eliminarMatricula',+ docente.id)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };



    return matricula;




});




tareasModule.controller('ctrlMatricula', function ($scope, $location, matricula,$timeout) {


    matricula.getAll().then(function (data) {

            console.log(data);
       $scope.matriculas = data;

        }).catch(function (err) {
            console.log("error");

        });



    $timeout(function(){

        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }


        });
    }, 300, false);



    $scope.verMas = function (matricula) {

        window.localStorage["matricula"]= JSON.stringify(matricula);

        $location.path('/matricula1');


    };



});


tareasModule.controller('ctrlRegistroMatricula', function ($scope, $location, matricula,$timeout) {

    var lista = [];
    var lista1 = [];

    $scope.cursos = [];

    $.getJSON('/web/obtenerCursos', function(data) {

        console.log(data);


        for (var i = 0; i < data.length; i++) {

            $scope.cursos.push({descripcion:data[i].idioma+" "+data[i].nombre + " " + data[i].paralelo+ " " + data[i].horario,data:data[i]});


        }
    });


    $.getJSON('/web/allestudiantes', function(data) {

        console.log(data);


        for (var i = 0; i < data.length; i++) {

            lista.push({nombres:data[i].nombres + " " + data[i].apellidos,data:data[i]});
            lista1.push(data[i].nombres + " " + data[i].apellidos);
            // console.log(lista1);

        }
    });

    $('#hero-demo').autoComplete({


        minChars: 1,
        source: function(term, suggest){
            term = term.toLowerCase();
            var choices = lista1;
            var suggestions = [];
            for (i=0;i<choices.length;i++)
                if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
            suggest(suggestions);
        }


    });



    $scope.guardarMatricula = function () {


        console.log("bsuquedanombre");


        console.log($scope.Opcion2,lista);


        function encontrarCerezas(fruta) {

            return fruta.nombres === $scope.Opcion2;
        }

        console.log(lista.find(encontrarCerezas));


        var resultado =lista.find(encontrarCerezas);


        console.log(resultado,$scope.curso);


        var matriculaData= {

            id_estudiante:resultado.data.id,
            id_curso:$scope.curso.data.id,
            estado:"En Curso"
        };

        console.log(matriculaData);


        matricula.add(matriculaData).then(function (data) {


            console.log(data);
            $location.path('/matricula');


        }).catch(function (err) {

            console.log(err);
        });

    };





});


tareasModule.controller('ctrlMatricula1', function ($scope, $location,matricula,$timeout) {



    $scope.matricula=  JSON.parse(localStorage.getItem("matricula"));

    console.log( $scope.matricula);



    var objeto={
        matricula:$scope.matricula.id
    }


    matricula.obtenerNotasEstudiante(objeto).then(function (data) {

        console.log(data);
        $scope.nota=data[0];

    }).catch(function (err) {
        console.log("error");

    });






    matricula.obtenerAsistenciaEstudiante(objeto).then(function (data) {

        console.log(data);
        $scope.asistencia=data;

    }).catch(function (err) {
        console.log("error");
        //cambios

    });

});
