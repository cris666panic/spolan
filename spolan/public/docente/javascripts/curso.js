var tareasModule = angular.module('curso', []);


tareasModule.factory('curso', function ($http,$q) {


    var curso = {};

    curso.getAll = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerCursosDocentesActivos',docente)
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


    curso.getAll1 = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/obtenerCursosDocentesInactivos',docente)
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


    $scope.ldocentes=[];

    curso.getAll(objeto).then(function (data) {

        console.log(data);

        console.log(new Date(Date.parse(data[0].fin)));
        console.log(new Date(Date.parse(data[0].activacion)));

        for (var i=0;i<data.length;i++){


            var objeto=data[i];


            objeto.fin=new Date(Date.parse(data[i].fin));
            objeto.activacion=new Date(Date.parse(data[i].activacion));



            $scope.ldocentes.push(objeto);

        }





    }).catch(function (err) {
        console.log("error");

    });




    $scope.fecha=new Date();

    console.log($scope.fecha);

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


tareasModule.controller('ctrlCurso1', function ($scope, $location, curso,$timeout) {


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


    $scope.ldocentes=[];

    curso.getAll1(objeto).then(function (data) {

            console.log(data);

console.log(new Date(Date.parse(data[0].fin)));
        console.log(new Date(Date.parse(data[0].activacion)));

for (var i=0;i<data.length;i++){


    var objeto=data[i];


       objeto.fin=new Date(Date.parse(data[i].fin));
    objeto.activacion=new Date(Date.parse(data[i].activacion));



    $scope.ldocentes.push(objeto);

}





        }).catch(function (err) {
            console.log("error");

        });




$scope.fecha=new Date();

console.log($scope.fecha);

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

        $scope.notas[index].nota4=Math.trunc(($scope.notas[index].nota1+$scope.notas[index].nota2+$scope.notas[index].nota3)/3);


        var objeto = {
            matricula: $scope.estudiantes[index].id
        }

        var atrasos = 0;
        var faltas = 0;


        curso.obtenerAsistenciaEstudiante(objeto).then(function (data) {
            console.log(data);


            atrasos = parseInt(data[2].count);
            faltas = parseInt(data[0].count);


            var total = faltas + Math.trunc(atrasos / 4);


            var ver = Math.trunc(total / 4);

            if (ver >= 1) {

                console.log(ver, total, atrasos);
                $scope.notas[index].situacion="Reprobado";


            } else {
                $scope.notas[index].situacion="Aprobado";

                console.log(ver, total, atrasos);

            }


        }).catch(function (err) {

            console.log(err);
        });




if ($scope.notas[index].nota4<80){

    $scope.notas[index].situacion="Reprobado";
    $scope.notas[index].letra="F";
}else {

    if ($scope.notas[index].nota4>=80&&$scope.notas[index].nota4<=84){

        $scope.notas[index].letra="C";
    }

    if ($scope.notas[index].nota4>=85&&$scope.notas[index].nota4<=89){

        $scope.notas[index].letra="B";
    }

    if ($scope.notas[index].nota4>=90&&$scope.notas[index].nota4<=100){

        $scope.notas[index].letra="A";
    }


}




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
        nota_final:$scope.notas[i].nota4,
        situacion:$scope.notas[i].situacion,
        letra:$scope.notas[i].letra

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




