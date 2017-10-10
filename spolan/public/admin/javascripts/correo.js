var citasModule = angular.module('correo', []);



citasModule.factory('correo', function ($http,$q) {







});




citasModule.controller('ctrlCorreo', function ($scope, $location,$timeout,datosmsg,$http) {

    


    datosmsg.getusuarios().then(function (data) {

       $scope.listaCorreos=data;

    }).catch(function (err) {
        console.log("error");
    });



    $scope.enviar=function () {


        for (var i=0;i<$scope.listaCorreos.length;i++){

            console.log($scope.listaCorreos[i]);



            $http({
                method: 'POST',
                url: '/web/SendMail1',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {
                    "mail":    $scope.listaCorreos[i].correo,
                    "asunto":    $scope.mensaje.asunto,
                    "contenido": $scope.mensaje.contenido

                }



            }).then(function successCallback(response) {
                console.log(response.data);

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

        }







    }



});




