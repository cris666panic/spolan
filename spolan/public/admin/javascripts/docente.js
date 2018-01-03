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

        $http.put('/web/actulizarDocente/'+docente.id, docente)
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

            console.log(data);
       $scope.ldocentes = data;

        }).catch(function (err) {
            console.log("error");

        });



    $timeout(function(){
        console.log( $scope.ldocentes);
        $('#example1').dataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }


        });
    }, 300, false);



    $scope.editarDocente = function (docente) {

        window.localStorage["docente"]= JSON.stringify(docente);

        $location.path('/editarDocente');


    };



});


tareasModule.controller('ctrlRegistroDocente', function ($scope, $location, docente,estudiante,$timeout) {

//cambios de docencte

    $scope.guardardocente = function () {
        console.log( $scope.docente);

        ///guar estudiante
        var usuario= {nombre:$scope.docente.cedula,
            contrasenia:$scope.docente.cedula,
            idtipo:5 };

        estudiante.addusuario(usuario).then(function (data) {
            console.log(data);
            $scope.docente.id_usuario= data[0].id_usuario;
            $scope.docente.unido=$scope.docente.nombres+" "+$scope.docente.apellidos;
            //estudainte
            docente.add($scope.docente).then(function (data) {


                console.log(data);
            }).catch(function (err) {

                console.log(err);
            });


        }).catch(function (err) {

            console.log(err);
        });


    };

});



tareasModule.controller('ctrlEditarDocente', function ($scope, $location, docente) {



  $scope.docente = JSON.parse(localStorage.getItem("docente"));

console.log($scope.docente);



$scope.actulizarDocente =function () {


    docente.update($scope.docente).then(function (data) {


        console.log(data);
        $location.path('/docentes');

    }).catch(function (err) {

        console.log(err);
    });
}





});
