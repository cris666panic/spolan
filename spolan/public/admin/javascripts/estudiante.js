var tareasModule = angular.module('estudiante', []);


tareasModule.factory('estudiante', function ($http,$q) {


    var estudiante = {};

    estudiante.getAll = function () {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/web/allestudiantes')
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

        $http.put('/web/actulizarEstudiante/'+estudiante.id, estudiante)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };


    estudiante.addusuario = function (usuario) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/registrarusaurio',usuario)
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




tareasModule.controller('ctrlEstudiante', function ($scope, $location,estudiante,$timeout,correo) {

    $timeout(function(){

        $('#datatable-responsive').DataTable(
            {
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }
            }
        );


    }, 3000, false);

    estudiante.getAll().then(function (data) {

        console.log(data);
        $scope.lestudiante = data;

    }).catch(function (err) {
        console.log("error");

    });



    $timeout(function(){
        console.log( $scope.lestudiante);
        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }


        });
    }, 300, false);






    $scope.editarEstudiante = function (estudiante) {

        window.localStorage["estudiante"]= JSON.stringify(estudiante);

        $location.path('/editarEstudiante');

    };

    $scope.responder = function (estudiante) {
        window.localStorage["estudiante"]= JSON.stringify(estudiante);
        $location.path('/correoEstudiante');
    }


});


tareasModule.controller('ctrlRegistroEstudiante', function ($scope, $location, estudiante,$timeout) {


console.log('holaa');

    $scope.guadarestudiante = function () {
               console.log( $scope.estudiante);

         ///guar estudiante
var usuario= {nombre:$scope.estudiante.cedula,
    contrasenia:$scope.estudiante.cedula,
            idtipo:4 };

        estudiante.addusuario(usuario).then(function (data) {
            console.log(data);
            $scope.estudiante.id_usuario= data[0].id_usuario;
            //estudainte
            estudiante.add($scope.estudiante).then(function (data) {

                new PNotify({
                    title: 'Registro Estudiante Completado',
                    styling: 'bootstrap3'
                });
                console.log(data);
                $location.path('/estudiante');
            }).catch(function (err) {

                console.log(err);

            });


        }).catch(function (err) {

            console.log(err);
        });


            };

});

tareasModule.controller('ctrlEditarEstudiante', function ($scope, $location,estudiante) {





    $scope.estudiante = JSON.parse(localStorage.getItem("estudiante"));

    console.log($scope.estudiante);



    $scope.actulizarEstudiante =function () {


        estudiante.update($scope.estudiante).then(function (data) {


            console.log(data);
            $location.path('/estudiante');

        }).catch(function (err) {

            console.log(err);
        });
    }



});
