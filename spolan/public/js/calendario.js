angular.module('myAppCalendario', [])

.controller('calendario', function($scope, $http, $rootScope, $location,$timeout){


	$timeout(function () {

		$(".timepicker").timepicker({
			showInputs: false
		});

	}, 0, false);


	//Date picker
	$('#datepicker').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true
	});




console.log("calendario");
	$scope.enviar = function () {


		console.log($scope.formulario);



		var aux = document.getElementById('datepicker').value.toString();
		var vec = aux.split("T");


		console.log(vec[0]);

		var aux1 = document.getElementById('timepicker').value.toString();
		var vec1 = aux1.split(":");

		console.log(vec1);
		var vec3 = vec[0].split("/");

		console.log(vec3);
		var vec2 = vec1[1].split(" ");

		console.log(vec2);


		var hora;

		if (vec2[1] == "PM") {
			hora = ( parseInt(vec1[0]) + 12).toString();


		} else {
			hora = vec1[0];

		}

//revisar inervalso de tiempo






		var fecha1 = "" + vec3[2] + "-" + vec3[1] + "-" + vec3[0] + "T" + hora + ":" + vec2[0] + ":00";




//sumar 12 a las horas si es pm

		// formato de ingreso "2017-07-12T14:00:00-05:00"

		console.log(fecha1);



		var objeto = {
			nombre: $scope.formulario.email,
			contrasenia: "spolan" + $scope.formulario.nombre,
			idtipo: 2,
		}
		$http({
			method: 'post',
			url: 'http://localhost:3000/web/registrarusaurio',
			headers: {
				// 'Content-Type': 'application/json',
				//'Authorization': token
			}
			,data:objeto

		}).then(function successCallback(response) {
			console.log(response.data);

			$http({
				method: 'post',
				url: 'http://localhost:3000/web/registrarinfo',
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
					method: 'POST',
					url: '/web/registrarCalendario',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						title: "examen",
						evento: $scope.formulario,
						start: fecha1,
						end: fecha1,
						backgroundColor: "#00c0ef",
						borderColor: "#00c0ef",
						estado: "pendiente",
						id_informacion:response.data[0].id_informacion

					}


				}).then(function successCallback(response) {
					console.log(response.data);

				}, function errorCallback(response) {

				});


			}, function errorCallback(response) {

				alert('error al realizar Ingreso');

			});

		}, function errorCallback(response) {

			alert('error al realizar Ingreso');

		});


















	}

		/*
		var objeto = {
			nombre: $scope.formulario.email,
			contrasenia: "spolan" + $scope.formulario.nombre,
			idtipo: 2,
		}
		$http({
			method: 'post',
			url: 'http://localhost:3000/web/registrarusaurio',
			headers: {
				// 'Content-Type': 'application/json',
				//'Authorization': token
			}
			,data:objeto

		}).then(function successCallback(response) {
			console.log(response.data);

			$http({
				method: 'post',
				url: 'http://localhost:3000/web/registrarinfo',
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
					url: 'http://localhost:3000/web/registmsg',
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


*/


	});










