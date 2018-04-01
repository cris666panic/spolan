var app = angular.module('chirpApp', ['ngSanitize','ui.select','multipleSelect','ngRoute', 'ngResource','ngStorage','curso']).run(function($http, $rootScope,$localStorage) {
  
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




app.config(function($routeProvider){
	$routeProvider
		//the timeline display



        .when('/cursos', { templateUrl: 'paginas/matricula.html',controller: ('ctrlCurso' )})

        .when('/matricula', { templateUrl: 'paginas/matricula1.html',controller: ('ctrlMatricula' )})



		.otherwise({ redirectTo: '/cursos' });
            



});

