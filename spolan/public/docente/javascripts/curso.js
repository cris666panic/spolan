var tareasModule = angular.module('curso', []);


tareasModule.factory('curso', function ($http,$q) {


    var curso = {};

    curso.getAll = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerCursosDocentes',docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };


    curso.getAllEstudiante = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerEstudiantesMatriculados',docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };



    curso.addNotas = function (nota) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/addNotas',nota)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };



    curso.addAsistencia = function (asistencia) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/addAsistencia',asistencia)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    curso.update = function (matricula) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarMatricula/'+matricula.id_matricula, matricula)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };

    curso.updateCurso = function (curso) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarCursoEstado/'+curso.id, curso)
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
        id_docente:usuario.id
    }

    curso.getAll(objeto).then(function (data) {

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



    $scope.notas = function (curso) {

        window.localStorage["curso"]= JSON.stringify(curso);

        $location.path('/notas');


    };





    $scope.asistencia = function (curso) {

        window.localStorage["curso"]= JSON.stringify(curso);

        $location.path('/asistencia');


    };


});


tareasModule.controller('ctrlNotas', function ($scope, $location,curso,$timeout) {


    var nivel=  JSON.parse(localStorage.getItem("curso"));

    console.log(nivel);

    var objeto={
        id_curso:nivel.id
    }



    curso.getAllEstudiante(objeto).then(function (data) {


        console.log(data);
        $scope.estudiantes=data;
    }).catch(function (err) {

        console.log(err);
    });



$scope.notas=[];


    $scope.suma=function (index) {

        $scope.notas[index].nota4=($scope.notas[index].nota1+$scope.notas[index].nota2+$scope.notas[index].nota3)/3;

    }

$scope.guardar=function () {

    console.log($scope.notas);


for (var i=0;i< $scope.estudiantes.length;i++){


    console.log( $scope.estudiantes[i]);


    var objeto={

        id_matricula:  $scope.estudiantes[i].id,
        nota1: $scope.notas[i].nota1,
        nota2:$scope.notas[i].nota2,
        nota3:$scope.notas[i].nota3,
        nota_final:$scope.notas[i].nota4

    }




    curso.addNotas(objeto).then(function (data) {

        console.log("inser nota",data);



        var objet={
            id_matricula:data.id_matricula,
            estado:"Finalizado"

        }

        curso.update(objet).then(function (data1) {

            console.log("actulizar matricula",data1);



        }).catch(function (err) {

            console.log(err);
        });




    }).catch(function (err) {

        console.log(err);
    });




}


var objetcurso={

    id:nivel.id,
    estado:"inactivo"


}

    curso.updateCurso(objetcurso).then(function (data1) {



        $location.path('/cursos');

    }).catch(function (err) {

        console.log(err);
    });








}

});


tareasModule.controller('ctrlAsistencia', function ($scope, $location,curso,$timeout) {


    var nivel=  JSON.parse(localStorage.getItem("curso"));

    console.log(nivel);

    var objeto={
        id_curso:nivel.id
    }



    curso.getAllEstudiante(objeto).then(function (data) {


        console.log(data);
        $scope.estudiantes=data;
    }).catch(function (err) {

        console.log(err);
    });

    $scope.opciones=[
        {
            nombre:"Asistio"
        },
        {
            nombre:"Falta"
        },
        {
            nombre:"Atraso"
        }
    ];

    $scope.asistencia=[];



    $scope.guardar=function () {

        console.log($scope.asistencia);


        for (var i=0;i< $scope.estudiantes.length;i++){


            console.log( $scope.estudiantes[i]);


            var objeto={

                id_matricula: $scope.estudiantes[i].id,
                fecha: new Date(),
                estado:$scope.asistencia[i].estado,
                observacion:$scope.asistencia[i].observacion


            }



            curso.addAsistencia(objeto).then(function (data) {

                console.log("inser asistencia",data);

                $location.path('/cursos');


            }).catch(function (err) {

                console.log(err);
            });




        }




    }



});




