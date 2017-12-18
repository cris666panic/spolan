var app = angular.module('chirpApp', ['ngCkeditor','correo','calendario','ngSanitize','ui.select','multipleSelect','allmsg','ngRoute', 'ngResource','ngStorage','docente','estudiante','curso']).run(function($http, $rootScope,$localStorage) {
  
   $rootScope.usuarioLog=  JSON.parse(localStorage.getItem("usuario"));
   
  $rootScope.authenticated =  JSON.parse(localStorage.getItem("authenticated"));
  
  $rootScope.current_user = $rootScope.usuarioLog.nombre;
   $rootScope.notificacion = 0;

  $rootScope.signout = function(){
    
	localStorage.clear();
     //  localStorage.removeItem('usuario');
	   //localStorage.removeItem('authenticated');
	 $http.get('/auth/signout');
       window.location = '../index.html';
	

  };
});

app.directive('ckEditor', function () {
	return {
		require: '?ngModel',
		link: function (scope, elm, attr, ngModel) {
			var ck = CKEDITOR.replace(elm[0]);
			if (!ngModel) return;
			ck.on('instanceReady', function () {
				ck.setData(ngModel.$viewValue);
			});
			function updateModel() {
				scope.$apply(function () {
					ngModel.$setViewValue(ck.getData());
				});
			}
			ck.on('change', updateModel);
			ck.on('key', updateModel);
			ck.on('dataReady', updateModel);

			ngModel.$render = function (value) {
				ck.setData(ngModel.$viewValue);
			};
		}
	};
});







app.config(function($routeProvider){
	$routeProvider
		//the timeline display


		.when('/', { templateUrl: 'paginas/suscriptores.html',controller: 'mostrarsuscriptores' })


		.when('/msg', { templateUrl: 'paginas/msg.html',controller: 'mostrarmsg' })
		.when('/pendiente', { templateUrl: 'paginas/pendiente.html',controller: 'mostrarpendiente' })
		.when('/notificado', { templateUrl: 'paginas/notificado.html',controller: 'mostrarnotificado' })
		
		.when('/suscriptores', { templateUrl: 'paginas/suscriptores.html',controller: 'mostrarsuscriptores' })
				.when('/notificadosuscriptores', { templateUrl: 'paginas/notificadosuscriptoress.html',controller: 'mostrarnotificadosuscriptores' })
		.when('/pendientesuscriptores', { templateUrl: 'paginas/pendientesuscriptoress.html',controller: 'mostrarpendientesuscriptores' })

        .when('/estudiante', { templateUrl: 'paginas/estudiante.html',controller: ('ctrlEstudiante' )})
		.when('/calendario', { templateUrl: 'paginas/calendario.html',controller: ('ctrlCalendario' )})


        .when('/registroE', { templateUrl: 'paginas/registroEstudiante.html',controller: ('ctrlRegistroEstudiante' )})

		.when('/correo', { templateUrl: 'paginas/correo.html',controller: ('ctrlCorreo' )})

        .when('/correo1', { templateUrl: 'paginas/correo1.html',controller: ('ctrlCorreo1' )})

        .when('/docentes', { templateUrl: 'paginas/docentes.html',controller: ('ctrlDocente' )})

        .when('/registroDocente', { templateUrl: 'paginas/registroDocente.html',controller: ('ctrlRegistroDocente' )})

        .when('/editarDocente', { templateUrl: 'paginas/editarDocente.html',controller: ('ctrlEditarDocente' )})

        .when('/editarEstudiante', { templateUrl: 'paginas/editarEstudiante.html',controller: ('ctrlEditarEstudiante' )})


        .when('/cursos', { templateUrl: 'paginas/cursos.html',controller: ('ctrlCurso' )})

        .when('/registroCurso', { templateUrl: 'paginas/registroCurso.html',controller: ('ctrlRegistroCurso' )})

		.otherwise({ redirectTo: '/' });
            


});

