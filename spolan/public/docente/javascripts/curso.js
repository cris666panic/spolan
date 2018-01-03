var tareasModule = angular.module('curso', []);


tareasModule.factory('curso', function ($http,$q) {


    var curso = {};

    curso.getAll = function () {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/web/obtenerCursos')
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


    curso.getAll().then(function (data) {

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



    $scope.editarCurso = function (docente) {

        window.localStorage["curso"]= JSON.stringify(docente);

        $location.path('/editarCurso');


    };



});


tareasModule.controller('ctrlRegistroCurso', function ($scope, $location, docente,periodo,curso,$timeout) {



    docente.getAll().then(function (data) {


        console.log(data);
        $scope.docentes=data;
    }).catch(function (err) {

        console.log(err);
    });


    periodo.getAll().then(function (data) {

        $scope.periodos=data;
        console.log(data);
    }).catch(function (err) {

        console.log(err);
    });


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




            curso.add($scope.curso).then(function (data) {


                console.log(data);
            }).catch(function (err) {

                console.log(err);
            });



    };

});



tareasModule.controller('ctrlEditarCurso', function ($scope, $location, curso,docente,periodo) {



    docente.getAll().then(function (data) {


        console.log(data);
        $scope.docentes=data;
    }).catch(function (err) {

        console.log(err);
    });


    periodo.getAll().then(function (data) {

        $scope.periodos=data;
        console.log(data);
    }).catch(function (err) {

        console.log(err);
    });



  $scope.curso = JSON.parse(localStorage.getItem("curso"));

console.log($scope.curso);


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


$scope.actulizarCurso =function () {


    curso.update($scope.curso).then(function (data) {


        console.log(data);
        $location.path('/cursos');

    }).catch(function (err) {

        console.log(err);
    });
}





});
