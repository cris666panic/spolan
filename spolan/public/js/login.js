angular.module('myApp', ['ngStorage'])

.controller('LoginController', function($scope, $http, $rootScope, $location,$localStorage){






    console.log("entro controlador login");



    $scope.login = function () {

console.log($scope.usuario);





        $http.post('/web/login', $scope.usuario).success(function (data) {

            console.log(data);






            if (data.id_tipo == "1") {

                console.log("opcion 1");
                //	 window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                window.localStorage["usuario"]= JSON.stringify(data);
                window.localStorage["authenticated"]= true;

                window.location ='admin/index.html';



                var usuarioLog=  JSON.parse(localStorage.getItem("usuario"));
                console.log(usuarioLog);
            }


            console.log("datos usuario");


            if (data.id_tipo == "2") {


                window.localStorage["usuario"]= JSON.stringify(data);
                window.localStorage["authenticated"]= true;

                window.location ='blog.html';



                var usuarioLog=  JSON.parse(localStorage.getItem("usuario"));
                console.log(usuarioLog);




            }



            if (data.id_tipo == "3") {
                console.log("opcion 3");

                window.localStorage["usuario"]= JSON.stringify(data);
                window.localStorage["authenticated"]= true;

                window.location ='blog.html';



                var usuarioLog=  JSON.parse(localStorage.getItem("usuario"));
                console.log(usuarioLog);



            }





            if(data==""){
                $scope.mensaje = 'Usuario o contraseña invalidos';
                console.log("eeeroor");


            }





        });




	};





	});










