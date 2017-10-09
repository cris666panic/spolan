angular.module('myAppMsg', [])

.controller('msg', function($scope, $http, $rootScope, $location){

console.log("dc");
	$scope.enviar = function () {
		
		console.log($scope.formulario);

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





	})

.controller('suscri', function($scope, $http, $rootScope, $location){

	console.log("dc");
	$scope.enviar = function () {

		console.log($scope.formulario);

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

			
			}, function errorCallback(response) {

				alert('error al realizar Ingreso');

			});

		}, function errorCallback(response) {

			alert('error al realizar Ingreso');

		});






	}





});










