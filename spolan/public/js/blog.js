angular.module('blogApp', [])

.controller('BlogController', function($scope, $http, $rootScope, $location,$timeout){


    var blog = this;
    blog.title = "AngularJS Blog App";

    blog.posts = {};

    $http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/110131/posts_1.json').success(function(data){
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

    blog.post = {};

    blog.addPost = function(){
        blog.post.createdOn = Date.now();
        blog.post.comments = [];
        blog.post.likes = 0;
        blog.posts.unshift(this.post);
        blog.tab = 0;
        blog.post ={};


    };



})




    .controller('CommentController', function($scope, $http, $rootScope, $location){



        this.comment = {};
        this.addComment = function(post) {
            console.log(post);

            this.comment.createdOn = Date.now();
            post.comments.push(this.comment);
            this.comment = {};

        }




        });











