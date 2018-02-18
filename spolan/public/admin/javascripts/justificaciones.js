var tareasModule = angular.module('justificaciones', []);


tareasModule.factory('justificaciones', function ($http,$q) {


    var justificaciones = {};

    justificaciones.getAll = function (objeto) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerMatriculasJustificacion',objeto)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };





    justificaciones.obtenerListadoAsistencia = function (objeto) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerListadoAsistencia',objeto)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };

    justificaciones.updateNota = function (matricula) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarNota/'+matricula.id, matricula)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };






    justificaciones.updateAsistencia = function (asistencia) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actualizarAsistencia/'+asistencia.id, asistencia)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };


    justificaciones.obtenerAsistenciaEstudiante = function (estudiante) {

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


    justificaciones.obtenerNotasEstudiante = function (estudiante) {

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




    justificaciones.add = function (docente) {

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


    justificaciones.update = function (docente) {

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

    justificaciones.delet = function (docente) {


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



    return justificaciones;




});




tareasModule.controller('ctrlJustificaciones', function ($scope, $location, justificaciones,$timeout) {


    $timeout(function(){

        $('#datatable-responsive').DataTable(
            {
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }
            }
        );


    }, 500, false);



    $scope.buscarCedula=function () {

        var objeto={
            cedula:$scope.cedula
        }
        justificaciones.getAll(objeto).then(function (data) {

            console.log(data);
            $scope.matriculas = data;

        }).catch(function (err) {
            console.log("error");

        });

    }





    $scope.notas = function (matricula) {

        window.localStorage["matricula"]= JSON.stringify(matricula);

        $location.path('/notas');


    };




    $scope.asistencia = function (matricula) {

        window.localStorage["matricula"]= JSON.stringify(matricula);

        $location.path('/asistencia');


    };



});




tareasModule.controller('ctrlNotas', function ($scope, $location,matricula,$timeout,justificaciones) {



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








    $scope.suma=function () {

        $scope.nota.nota_final=Math.trunc((parseInt($scope.nota.nota1)+parseInt($scope.nota.nota2)+parseInt($scope.nota.nota3))/3);


        var objeto = {
            matricula:$scope.matricula.id
        }

        var atrasos = 0;
        var faltas = 0;



        matricula.obtenerAsistenciaEstudiante(objeto).then(function (data) {
            console.log(data);


            atrasos = parseInt(data[2].count);
            faltas = parseInt(data[0].count);


            var total = faltas + Math.trunc(atrasos / 4);


            var ver = Math.trunc(total / 4);

            if (ver >= 1) {

                console.log(ver, total, atrasos);
                $scope.nota.situacion="Reprobado";


            } else {
                $scope.nota.situacion="Aprobado";

                console.log(ver, total, atrasos);

            }


        }).catch(function (err) {

            console.log(err);
        });




        if ($scope.nota.nota_final<80){

            $scope.nota.situacion="Reprobado";
            $scope.nota.letra="F";
        }else {

            if ($scope.nota.nota_final>=80&&$scope.nota.nota_final<=84){

                $scope.nota.letra="C";
            }

            if ($scope.nota.nota_final>=85&&$scope.nota.nota_final<=89){

                $scope.nota.letra="B";
            }

            if ($scope.nota.nota_final>=90&&$scope.nota.nota_final<=100){

                $scope.nota.letra="A";
            }


        }




    }




    $scope.guardar=function () {




            var objeto={
                id:$scope.nota.id,
                nota1: $scope.nota.nota1,
                nota2:$scope.nota.nota2,
                nota3:$scope.nota.nota3,
                nota_final:$scope.nota.nota_final,
                situacion:$scope.nota.situacion,
                letra:$scope.nota.letra

            }




            justificaciones.updateNota(objeto).then(function (data) {

                console.log("inser nota",data);

                $location.path('/justificaciones');

            }).catch(function (err) {

                console.log(err);
            });



    }






});




tareasModule.controller('ctrlAsistencia', function ($scope, $location,matricula,$timeout,justificaciones) {



    $scope.matricula=  JSON.parse(localStorage.getItem("matricula"));

    console.log( $scope.matricula);



    var objeto={
        matricula:$scope.matricula.id
    }


    justificaciones.obtenerListadoAsistencia(objeto).then(function (data) {

        console.log(data);
        $scope.asistencias=data;

    }).catch(function (err) {
        console.log("error");

    });


    $timeout(function(){

        $('#datatable-responsive').DataTable(
            {
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }
            }
        );


    }, 500, false);


    $scope.opciones=[
        {
            nombre:"Falta"
        },
        {
            nombre:"Justificado"
        }
    ];


    $scope.guardar = function (consulta) {

        console.log(consulta);



        justificaciones.updateAsistencia(consulta).then(function (data) {

            console.log(data);


        }).catch(function (err) {
            console.log("error");

        });

        $scope.asistencias.splice(consulta,1);

    }



});
