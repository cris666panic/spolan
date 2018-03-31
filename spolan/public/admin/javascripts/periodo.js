var tareasModule = angular.module('periodo', []);


tareasModule.factory('periodo', function ($http,$q) {


    var periodo = {};

    periodo.getAll = function () {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/web/allperiodo')
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;


    };


    periodo.add = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.post('/web/addPeriodo',docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;

    };


    periodo.update = function (docente) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.put('/web/actulizarPeriodo/'+docente.id, docente)
            .success(function (data) {
                defered.resolve(data);

            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;



    };




    periodo.delet = function (docente) {


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



    return periodo;




});




tareasModule.controller('ctrlPeriodo', function ($scope, $location, periodo,$timeout) {

    $timeout(function(){

        $('#datatable-responsive').DataTable(
            {
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }
            }
        );


    }, 500, false);

    periodo.getAll().then(function (data) {

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
    }, 500, false);



    $scope.editarPeriodo = function (docente) {

        window.localStorage["periodo"]= JSON.stringify(docente);

        $location.path('/editarPeriodo');


    };


    $scope.archivo=function (docente) {


        docente.estado="inactivo";

        periodo.update(docente).then(function (data) {

            console.log(data);

            periodo.getAll().then(function (data) {

                console.log(data);
                $scope.ldocentes = data;

            }).catch(function (err) {
                console.log("error");

            });

        }).catch(function (err) {
            console.log("error");

        });


    }



});


tareasModule.controller('ctrlRegistroPeriodo', function ($scope, $location, periodo,estudiante,$timeout) {

    $('.datepicker').datepicker();
    $('.datepicker1').datepicker();

    $scope.guardarPeriodo = function () {
        console.log( $scope.periodo);

        var aux=document.getElementById('datepicker').value.toString();





        var aux1=document.getElementById('datepicker1').value.toString();


//ver el calendario y restarle 5 el dia final



var days=-5;

            milisegundos=parseInt(35*24*60*60*1000);

            fecha=new Date(aux1);

            day=fecha.getDate();
            // el mes es devuelto entre 0 y 11
            month=fecha.getMonth()+1;
            year=fecha.getFullYear();

           console.log("Fecha actual: "+day+"/"+month+"/"+year);

            //Obtenemos los milisegundos desde media noche del 1/1/1970
            tiempo=fecha.getTime();
            //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
            milisegundos=parseInt(days*24*60*60*1000);
            //Modificamos la fecha actual
            total=fecha.setTime(tiempo+milisegundos);
            day=fecha.getDate();
            month=fecha.getMonth()+1;
            year=fecha.getFullYear();

            console.log("Fecha modificada: "+day+"/"+month+"/"+year);


            if (month<10){
                month="0"+month;
            }

        var vec1=aux1.split("T");

            console.log(vec1);

        var separadaos =vec1[0].split("/");

        console.log(separadaos);

var fin =separadaos[2]+"-"+separadaos[0]+"-"+separadaos[1];


var activacion =year+"-"+month+"-"+day;

        var perido={
            inicio:aux,
            fin:fin,
                 unido:$scope.periodo.unido,
            activacion:activacion,
            estado:"activo"
        }


            periodo.add(perido).then(function (data) {


                console.log(data);
                $location.path('/periodos');
            }).catch(function (err) {

                console.log(err);
            });


    };

});



    tareasModule.controller('ctrlEditarPeriodo', function ($scope, $location, periodo) {



  $scope.periodo = JSON.parse(localStorage.getItem("periodo"));

console.log($scope.periodo);

        $('.datepicker').datepicker();
        $('.datepicker1').datepicker();

$scope.actulizarPeriodo =function () {

    var aux=document.getElementById('datepicker').value.toString();
    var vec=aux.split("T");




    var aux1=document.getElementById('datepicker1').value.toString();
    var vec1=aux1.split("T");

    var perido={
        id:$scope.periodo.id,
        inicio:vec[0],
        fin:vec1[0],
        unido:$scope.periodo.unido
    }

    periodo.update(perido).then(function (data) {


        console.log(data);
        $location.path('/periodos');

    }).catch(function (err) {

        console.log(err);
    });
}





});
