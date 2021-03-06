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

            if(i==($scope.listaCorreos.length-1)){

                $location.path('/suscriptores');
            }

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

usuario.estado="notificado";


        datosmsg.actualizarusuario(usuario ).then(function (data) {


        }).catch(function (err) {
            console.log("error");
        });



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

                $location.path('/suscriptores');

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });









    }



});

citasModule.controller('ctrlCorreoEstudiante', function ($scope, $location,$timeout,datosmsg,$http,correo,estudiante) {

    $scope.notificacion="";

    var usuario =   JSON.parse(localStorage.getItem("estudiante"));


var estudiantesCorreos=[];

    console.log(usuario);

    estudiante.getAll().then(function (data) {

        console.log(data);
        estudiantesCorreos = data;

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
              new PNotify({
                  title: 'Correo Enviado',
                //  text: 'Correo Enviado',
                  styling: 'bootstrap3'
              });
            $location.path('/estudiante');

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });









    }



    $scope.enviarTodos=function () {

        for (var i=0;i<estudiantesCorreos.length;i++){

            console.log(estudiantesCorreos[i]);

            $http({
                method: 'POST',
                url: '/web/SendMail1',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {
                    "mail":    estudiantesCorreos[i].correo,
                    "asunto":    $scope.mensaje.asunto,
                    "contenido": $scope.mensaje.contenido

                }



            }).then(function successCallback(response) {
                console.log(response.data);

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

            if(i==(estudiantesCorreos.length-1)){

                new PNotify({
                    title: 'Aviso',
                    text: 'Correos Enviados',
                    styling: 'bootstrap3'
                });


                $location.path('/estudiante');
            }

        }







    }



});


