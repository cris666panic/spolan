angular.module('blogApp', [])

.controller('BlogController', function($scope, $http, $rootScope, $location,$timeout){


    $rootScope.usuarioLog=  JSON.parse(localStorage.getItem("usuario"));

    $rootScope.authenticated =  JSON.parse(localStorage.getItem("authenticated"));


    console.log( $rootScope.usuarioLog, $rootScope.authenticated);


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
    blog.title = "AngularJS Blog App";

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

        blog.tab = setTab;




    };


    blog.isSelected = function(checkTab){
        return blog.tab === checkTab;
    };

    var usuario =  JSON.parse(localStorage.getItem("usuario"));




    this.comment = {};



    blog.post = {};
    blog.post.author=usuario.nombre+" "+usuario.apellido;


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

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });






        blog.post.createdOn = Date.now();
        blog.post.comments = [];
        blog.post.likes = 0;
        blog.posts.unshift(this.post);
        blog.tab = 0;
        blog.post ={};


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

        }




        });











