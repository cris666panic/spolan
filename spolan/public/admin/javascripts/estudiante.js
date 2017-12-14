var tareasModule = angular.module('estudiante', []);


tareasModule.factory('estudiante', function ($http,$q) {


    var estudiante = {};

    estudiante.getAll = function () {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/web/allestudiante')
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };


    estudiante.add = function (estudiante) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/regestudiante',estudiante)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    estudiante.update = function (estudiante) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarusuario',+ estudiante.id, estudiante)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };






    return estudiante;




});




tareasModule.controller('ctrlEstudiante', function ($scope, $location, estudiante,$timeout) {


    estudiante.getAll().then(function (data) {


        }).catch(function (err) {


        });



    $timeout(function(){
        console.log( $scope.tareas);
        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }


        });
    }, 0, false);



    $scope.procesarObjeto = function (tarea) {
        comun.tarea = tarea;
        console.log(tarea);
      $location.path('/editarPaciente');

    };



});


tareasModule.controller('ctrlRegistroEstudiante', function ($scope, $location, estudiante,$timeout) {


console.log('holaa');






    $scope.guadarestudiante = function () {
               console.log( $scope.estudiante);

        estudiante.add($scope.estudiante).then(function (data) {

console.log(data);
        }).catch(function (err) {

            console.log(err);
        });



    };

});

tareasModule.controller('ctrlEditarDocente', function ($scope, $location, comun) {




});
