var tareasModule = angular.module('docente', []);


tareasModule.factory('docente', function ($http,$q) {


    var docente = {};

    docente.getAll = function () {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/web/obtenerDocentes')
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };


    docente.add = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/addDocente',docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    docente.update = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarDocente',+ docente.id, docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };

    docente.delet = function (docente) {


        var defered = $q.defer();
        var promise = defered.promise;

        $http.delete('/web/eliminarDocente',+ docente.id)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };


    return docente;




});




tareasModule.controller('ctrlDocente', function ($scope, $location, docente,$timeout) {


    docente.getAll().then(function (data) {

            console.log(data[0]);


        }).catch(function (err) {
            console.log("error");

        });



    $timeout(function(){
        console.log( $scope.tareas);
        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }


        });
    }, 0, false);





    $scope.eliminar = function (tarea) {
        comun.delet(tarea);

    };

    $scope.procesarObjeto = function (tarea) {
        comun.tarea = tarea;
        console.log(tarea);
      $location.path('/editarPaciente');

    };



});


tareasModule.controller('ctrlRegistroDocente', function ($scope, $location, docente,$timeout) {





});

tareasModule.controller('ctrlEditarDocente', function ($scope, $location, comun) {




});
