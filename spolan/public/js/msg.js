angular.module('myAppMsg', [])

.controller('msg', function($scope, $http, $rootScope, $location){

console.log("dc");

	$scope.enviar = function () {
		
		console.log($scope.formulario);




        $http({
            method: 'POST',
            url: '/web/usuarioExiste',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                "usuario": $scope.formulario.email,


            }


        }).then(function successCallback(response) {
            console.log(response.data);



            if (response.data.length!==0){

                console.log("si");





                $http({
                    method: 'post',
                    url: '/web/registmsg',
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    },data:{
                        id_informacion: response.data[0].id_informacion,
                        msg: $scope.formulario.msg,
                        estado: "pendiente"

                    }

                }).then(function successCallback(respnse) {
                    console.log(response.data);
                    $scope.mensaje="pronto se contactaran para responder sus dudas";



                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });




            }
            else {

                console.log("no");




                var objeto = {
                    nombre: $scope.formulario.email,
                    contrasenia: "spolan" + $scope.formulario.nombre,
                    idtipo: 2
                };

                $http({
                    method: 'post',
                    url: '/web/registrarusaurio',
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    }
                    ,data:objeto

                }).then(function successCallback(response) {
                    console.log(response.data);

                    correo(response.data[0]);

                    $http({
                        method: 'post',
                        url: '/web/registrarinfo',
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        }
                        ,data:{

                            nombre: $scope.formulario.nombre,
                            apellido: $scope.formulario.apellido,
                            correo: $scope.formulario.email,
                            telefono: $scope.formulario.telefono,
                            id_usuario: response.data[0].id_usuario,
                            estado: "pendiente"
                        }

                    }).then(function successCallback(response) {
                        console.log(response.data);


                        $http({
                            method: 'post',
                            url: '/web/registmsg',
                            headers: {
                                // 'Content-Type': 'application/json',
                                //'Authorization': token
                            },data:{
                                id_informacion: response.data[0].id_informacion,
                                msg: $scope.formulario.msg,
                                estado: "pendiente"

                            }

                        }).then(function successCallback(respnse) {
                            console.log(response.data);




                        }, function errorCallback(response) {

                            alert('error al realizar Ingreso');

                        });



                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });

                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });







            }





        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });















	}


	function correo(objeto) {

		console.log(objeto);

		$http({
			method: 'POST',
			url: '/web/SendMail',
			headers: {
				'Content-Type': 'application/json',
				//'Authorization': token
			},
			data: {
				"mail": objeto.nombre,
				"usuario": objeto.nombre,
				"contrasenia": objeto.contrasena

			}



		}).then(function successCallback(response) {
			console.log(response.data);
            $scope.mensaje="se a enviado al correo electronico las credenciales para acceso al blog";
            window.location.assign("./msgcale.html");

		}, function errorCallback(response) {

			alert('error al realizar Ingreso');

		});

	}





})

.controller('suscri', function($scope, $http, $rootScope, $location){

	console.log("dc");
	$scope.enviar = function () {

        console.log($scope.formulario);


        $http({
            method: 'POST',
            url: '/web/usuarioExiste',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {

                "usuario": $scope.formulario.email,


            }


        }).then(function successCallback(response) {
            console.log(response.data);



            if (response.data.length!==0){

            	console.log("si");

            	$scope.mensaje="el correo electronico ya se encuentra registrado";



			}
            else {

                console.log("no");


                var objeto = {
                    nombre: $scope.formulario.email,
                    contrasenia: "spolan" + $scope.formulario.nombre,
                    idtipo: 2,
                }

                $http({
                    method: 'post',
                    url: '/web/registrarusaurio',
                    headers: {
                        // 'Content-Type': 'application/json',
                        //'Authorization': token
                    }
                    ,data:objeto

                }).then(function successCallback(response) {
                    console.log(response.data);
                    correo(response.data[0]);

                    $http({
                        method: 'post',
                        url: '/web/registrarinfo',
                        headers: {
                            // 'Content-Type': 'application/json',
                            //'Authorization': token
                        }
                        ,data:{

                            nombre: $scope.formulario.nombre,
                            apellido: $scope.formulario.apellido,
                            correo: $scope.formulario.email,
                            telefono: $scope.formulario.telefono,
                            id_usuario: response.data[0].id_usuario,
                            estado: "pendiente"
                        }

                    }).then(function successCallback(response) {
                        console.log(response.data);


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });

                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });









			}





        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });













    }



    function correo(objeto) {

        console.log(objeto);

        $http({
            method: 'POST',
            url: '/web/SendMail',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: {
                "mail": objeto.nombre,
                "usuario": objeto.nombre,
                "contrasenia": objeto.contrasena

            }



        }).then(function successCallback(response) {
            console.log(response.data);
            window.location.assign("./msgsus.html");



        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }



});










