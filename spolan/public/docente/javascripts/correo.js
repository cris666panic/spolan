var citasModule = angular.module('correo', []);



citasModule.factory('correo', function ($http,$q) {

    var correo = {};



    correo.usuario = {};


    return correo;





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

citasModule.controller('ctrlCorreo1', function ($scope, $location,$timeout,datosmsg,$http,correo) {

    $scope.notificacion="";

  var usuario = correo.usuario;

  console.log(usuario);

    datosmsg.getusuarios().then(function (data) {

        $scope.listaCorreos=data;

    }).catch(function (err) {
        console.log("error");
    });



    $scope.enviar=function () {








            $http({
                method: 'POST',
                url: '/web/SendMail1',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {
                    "mail":    usuario.correo,
                    "asunto":    $scope.mensaje.asunto,
                    "contenido": $scope.mensaje.contenido

                }



            }).then(function successCallback(response) {
                console.log(response.data);

                $scope.notificacion="mensaje enviado";
            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });









    }



});


