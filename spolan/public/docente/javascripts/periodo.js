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



});


tareasModule.controller('ctrlRegistroPeriodo', function ($scope, $location, periodo,estudiante,$timeout) {

    $('.datepicker').datepicker();
    $('.datepicker1').datepicker();

    $scope.guardarPeriodo = function () {
        console.log( $scope.periodo);

        var aux=document.getElementById('datepicker').value.toString();
        var vec=aux.split("T");




        var aux1=document.getElementById('datepicker1').value.toString();
        var vec1=aux1.split("T");




        var perido={
            inicio:vec[0],
            fin:vec1[0],
                 unido:$scope.periodo.unido
        }


            periodo.add(perido).then(function (data) {


                console.log(data);
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
