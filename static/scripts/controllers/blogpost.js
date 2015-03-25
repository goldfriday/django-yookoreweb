'use strict';

angular.module('yookoreApp').controller('BlogpostCtrl', function ($scope, blogPosts,userNameStore, $state) {
       
        var author = userNameStore.getuserName();
        console.log(author);
    // Retrieve all post
	$scope.blogposts = blogPosts.query();


	// Create a blogpost

	$scope.create = function() {
	    $scope.author = author;
	    $scope.location = 'Ranburg';
	    var blogpost = new blogPosts({
	        body: $scope.body,
	        author: $scope.author,
	        location: $scope.location,
	        title: $scope.title


	    });
	    blogpost.$save(function() {
	        $scope.blogposts.push($scope.blogpost);
	        $scope.blogpost = new blogPosts();
	        $state.reload();

	    })

	}

});
