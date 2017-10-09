var app = angular.module('chirpApp', ['calendario','ngSanitize','ui.select','multipleSelect','allmsg','ngRoute', 'ngResource','ngStorage']).run(function($http, $rootScope,$localStorage) {
  
  // $rootScope.usuarioLog=  JSON.parse(localStorage.getItem("usuario"));
   
  //$rootScope.authenticated =  JSON.parse(localStorage.getItem("authenticated"));
  
  //$rootScope.current_user = $rootScope.usuarioLog.username;
   $rootScope.notificacion = 0;

  $rootScope.signout = function(){
    
	localStorage.clear();
     //  localStorage.removeItem('usuario');
	   //localStorage.removeItem('authenticated');
	 $http.get('/auth/signout');
       window.location = '../INICIO.html';
	

  };
});







app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'paginas/inicio.html'
		
		})
		        
          .when('/msg', { templateUrl: 'paginas/msg.html',controller: 'mostrarmsg' })
		.when('/pendiente', { templateUrl: 'paginas/pendiente.html',controller: 'mostrarpendiente' })
		.when('/notificado', { templateUrl: 'paginas/notificado.html',controller: 'mostrarnotificado' })
		
		.when('/suscriptores', { templateUrl: 'paginas/suscriptores.html',controller: 'mostrarsuscriptores' })
				.when('/notificadosuscriptores', { templateUrl: 'paginas/notificadosuscriptoress.html',controller: 'mostrarnotificadosuscriptores' })
		.when('/pendientesuscriptores', { templateUrl: 'paginas/pendientesuscriptoress.html',controller: 'mostrarpendientesuscriptores' })


		.when('/calendario', { templateUrl: 'paginas/calendario.html',controller: ('ctrlCalendario' )})
		

		




          .when('/Creditos', { templateUrl: 'paginas/Creditos.html'})

		.when('/editarSitio', { templateUrl:'paginas/editarSitio.html',controller: 'ctrlEditar' })

		
		.when('/agregarSitio', { templateUrl: 'paginas/agregarSitio.html',controller: ('ctrlImagen' )})

.when('/galeria', { templateUrl: 'paginas/galeria.html',controller: ('ctrlGaleria' )})



	

.when('/fojas', { templateUrl: 'paginas/fojas.html',controller: ('ctrlFojas' )})

.when('/imagenes', { templateUrl: 'paginas/imagenes.html',controller: ('ctrlImagenes' )})


		.otherwise({ redirectTo: '/' });
            
            
});

