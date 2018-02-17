var tareasModule = angular.module('curso', []);


tareasModule.factory('curso', function ($http,$q) {


    var curso = {};

    curso.getAllMatriculas = function (estudiante) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerMatriculasEstudiante',estudiante)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };



    curso.obtenerAsistenciaEstudiante = function (estudiante) {

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


    curso.obtenerNotasEstudiante = function (estudiante) {

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


    curso.add = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/addCurso',docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    curso.update = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarCurso/'+docente.id, docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };

    curso.delet = function (docente) {


        var defered = $q.defer();
        var promise = defered.promise;

        $http.delete('/web/eliminarCurso',+ docente.id)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };



    return curso;




});




tareasModule.controller('ctrlCurso', function ($scope, $location, curso,$timeout) {


    $timeout(function(){

        $('#datatable-responsive').DataTable(
            {
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }
            }
        );


    }, 500, false);

    var usuario=  JSON.parse(localStorage.getItem("usuario"));

    console.log(usuario);

    var objeto={
        cedula:usuario.cedula
    }


    curso.getAllMatriculas(objeto).then(function (data) {

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

        $location.path('/matricula');


    };



});


tareasModule.controller('ctrlMatricula', function ($scope, $location,curso,$timeout) {


    $scope.matricula=  JSON.parse(localStorage.getItem("matricula"));

    console.log( $scope.matricula);



var objeto={
    matricula:$scope.matricula.id
}


    curso.obtenerNotasEstudiante(objeto).then(function (data) {

        console.log(data);
      $scope.nota=data[0];

    }).catch(function (err) {
        console.log("error");

    });






    curso.obtenerAsistenciaEstudiante(objeto).then(function (data) {

        console.log(data);
        $scope.asistencia=data;

    }).catch(function (err) {
        console.log("error");
        //cambios

    });

});

