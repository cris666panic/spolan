angular.module('myApp', ['ngStorage'])

.controller('LoginController', function($scope, $http, $rootScope, $location,$localStorage){






    console.log("entro controlador login");



    $scope.login = function () {

console.log($scope.usuario);





        $http.post('/web/login', $scope.usuario).success(function (data) {

            console.log(data);






            if (data.id_tipo == "1") {

                console.log("opcion 1");

                var usuario={
                    id_usuario:data.id_usuario,
                    tipo:"informacion"
                }





                $http.post('/web/loginDatosUsuario', usuario).success(function (data) {

                    console.log(data);

                    window.localStorage["usuario"]= JSON.stringify(data);
                    window.localStorage["authenticated"]= true;
                    window.location ='admin/index.html';

                });






                var usuarioLog=  JSON.parse(localStorage.getItem("usuario"));
                console.log(usuarioLog);
            }


            console.log("datos usuario");


            if (data.id_tipo == "2") {


                var usuario={
                    id_usuario:data.id_usuario,
                    tipo:"informacion"
                }



                $http.post('/web/loginDatosUsuario', usuario).success(function (data) {

                    console.log(data);

                    window.localStorage["usuario"]= JSON.stringify(data);
                    window.localStorage["authenticated"]= true;
                    window.location ='blog.html';

                });






            }



            if (data.id_tipo == "3") {
                console.log("opcion 3");


                var usuario={

                    id_usuario:data.id_usuario,
                    tipo:"informacion"
                }


                $http.post('/web/loginDatosUsuario', usuario).success(function (data) {

                    console.log(data);

                    data.id_tipo=3;
                    window.localStorage["usuario"]= JSON.stringify(data);
                    window.localStorage["authenticated"]= true;
                    window.location ='blog.html';

                });




            }



            if (data.id_tipo == "5") {
                console.log("opcion 5");


                var usuario={

                    id_usuario:data.id_usuario,
                    tipo:"docente"
                }


                $http.post('/web/loginDatosUsuario', usuario).success(function (data) {

                    console.log(data);

                    data.id_tipo=3;
                    window.localStorage["usuario"]= JSON.stringify(data);
                    window.localStorage["authenticated"]= true;
                    window.location ='docente/index.html';

                });




            }



            if(data==""){




                $scope.mensaje = 'Usuario o contraseña invalidos';
                console.log("eeeroor");


            }





        });





	};





	});










