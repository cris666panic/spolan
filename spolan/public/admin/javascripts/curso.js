var tareasModule = angular.module('curso', []);


tareasModule.factory('curso', function ($http,$q) {


    var curso = {};

    curso.getAll = function () {

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


    curso.add = function (docente) {

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


    curso.update = function (docente) {

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

    curso.delet = function (docente) {


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



    return curso;




});




tareasModule.controller('ctrlCurso', function ($scope, $location, docente,$timeout) {


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


tareasModule.controller('ctrlRegistroCurso', function ($scope, $location, docente,estudiante,$timeout) {



    $scope.selectHorario =function (horario) {
        console.log(horario);
        $scope.curso.horario=horario;
        $scope.curso.estado="activo";

    }

    $scope.mAdvance=false;
    $scope.mSemi=false;
    $scope.mPres=false;



    $scope.modalidadCkec =function () {

        console.log($scope.modalidad);
        $scope.mAdvance=false;
        $scope.mSemi=false;
        $scope.mPres=false;


        if($scope.modalidad.presencial==true) {

            $scope.mPres=true;

        }
        if($scope.modalidad.semipresencial==true) {
            $scope.mSemi=true;
        }
        if($scope.modalidad.avanzado==true) {
            $scope.mAdvance=true;
        }




    }






    $scope.guardarCurso = function () {
        console.log( $scope.curso);

        /*
        ///guar estudiante
        var usuario= {nombre:$scope.docente.cedula,
            contrasenia:$scope.docente.cedula,
            idtipo:5 };

        estudiante.addusuario(usuario).then(function (data) {
            console.log(data);
            $scope.docente.id_usuario= data[0].id_usuario;
            //estudainte
            docente.add($scope.docente).then(function (data) {


                console.log(data);
            }).catch(function (err) {

                console.log(err);
            });


        }).catch(function (err) {

            console.log(err);
        });

*/
    };

});



tareasModule.controller('ctrlEditarCurso', function ($scope, $location, docente) {



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
