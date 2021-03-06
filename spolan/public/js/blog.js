angular.module('blogApp', ['ngCkeditor','ngSanitize'])


.directive('ckEditor', function () {
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
})

.controller('BlogController', function($scope, $http, $rootScope, $location,$timeout){


    $rootScope.usuarioLog=  JSON.parse(localStorage.getItem("usuario"));

    $rootScope.authenticated =  JSON.parse(localStorage.getItem("authenticated"));




    console.log( $rootScope.usuarioLog, $rootScope.authenticated);


    $rootScope.author= $rootScope.usuarioLog.nombre+" "+$rootScope.usuarioLog.apellido;



    $scope.postEditar=function () {

       $scope.Editar=true;
        $scope.post1=false;

    }
    
    $scope.actualizar=function (objeto) {

        console.log(objeto);

        $http({

            method: 'PUT',
            url: '/web/updateBlog/'+objeto.id,

            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: objeto


        }).then(function successCallback(response) {

            console.log(response.data);
            location.reload();


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.eliminar=function (objeto) {


        console.log(objeto);




        $http({

            method: 'DELETE',
            url: '/web/eliminarBlog/'+objeto.id,

            headers: {
                // 'Content-Type': 'application/json',
                //'Authorization': token
            }
        }).then(function successCallback(response) {

            console.log(response.data);
            location.reload();


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }

    $rootScope.signout = function(){

        localStorage.clear();
        //  localStorage.removeItem('usuario');
        //localStorage.removeItem('authenticated');
     //   $http.get('/auth/signout');
        window.location = 'index.html';


    };



    $scope.addBlog=false;

    if ( $rootScope.usuarioLog.id_tipo==3){

        $scope.addBlog=true;

        console.log("tres");

    }



    var blog = this;
    blog.title = "ACADEMY SPOLAN BLOG ";

    blog.posts = {};


    $http.get('/web/obtenerBlog').success(function(data){


        blog.posts = data;

        console.log(data);
    });

    blog.tab = 'blog';

    blog.selectTab = function(setTab){
        console.log(setTab);

        console.log(blog.tab);
        console.log(blog.posts);

        $scope.btnEdicion=false;

        blog.tab = setTab;

        $scope.post1=true;


        if (setTab.author==$rootScope.author){

console.log("actiar bonoes de edicion");

$scope.btnEdicion=true;
            $scope.Editar=false;

        }



        if (setTab=="miBlog"){

            $scope.searchText= $rootScope.author;
            blog.tab =  "blog";


        }

        if (setTab=="blog"){

            $scope.searchText= "";



        }



    };


    blog.isSelected = function(checkTab){
        return blog.tab === checkTab;
    };




    $rootScope.usuario =  JSON.parse(localStorage.getItem("usuario"));


    this.comment = {};



    blog.post = {};
    blog.post.author=$rootScope.usuario.nombre+" "+$rootScope.usuario.apellido;


    blog.addPost = function(){

        console.log(blog.post);




        $http({
            method: 'POST',
            url: '/web/addBlog',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': token
            },
            data: blog.post



        }).then(function successCallback(response) {
            console.log(response.data);
            location.reload();

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        blog.post.createdOn = Date.now();
        blog.post.comments = [];
        blog.post.likes = 0;
        blog.posts.unshift(this.post);
        blog.tab = 0;
        blog.post ={};

        blog.post.author=$rootScope.usuario.nombre+" "+$rootScope.usuario.apellido;



    };



})




    .controller('CommentController', function($scope, $http, $rootScope, $location){




        var usuario =  JSON.parse(localStorage.getItem("usuario"));




        this.comment = {};

        this.comment.author=usuario.nombre+" "+usuario.apellido;

        this.addComment = function(post) {
            console.log(post);






            this.comment.createdOn = Date.now();
            post.comments.comments.push(this.comment);







            $http({

                method: 'PUT',
                url: '/web/actulizarBlog/'+post.id,

                headers: {
                    // 'Content-Type': 'application/json',
                    //'Authorization': token
                },
                data: {

                    comments: post.comments


                }


            }).then(function successCallback(response) {

                console.log(response.data);

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });






            this.comment = {};

            this.comment.author=usuario.nombre+" "+usuario.apellido;
        }




        });











