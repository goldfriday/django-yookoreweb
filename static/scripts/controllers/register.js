'use strict';

// This controller is responsible for account creation

angular.module('yookoreApp').controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.bgimg="/images/sa.jpg";
    $scope.submit = function  () {

        // var url = API_URL + 'auth/create-account';
        // var user = {
        //     title: $scope.title,
        //     username: $scope.username,
        //     firstname: $scope.firstname,
        //     lastname: $scope.lastname,
        //     email: $scope.email,
        //     cellphone: $scope.cellphone,
        //     password: $scope.password
            
        // };

    	auth.register($scope.firstname, $scope.lastname, $scope.title, $scope.username,  $scope.email, $scope.cellphone, $scope.password)
    	.success(function  (res) {
            console.log(res);
            // console.log(res.emails[0]["value"]);
            console.log(res.email);
            console.log(res.userName);
            var  username = res.userName;
    		alert('success', 'Account Created!', 'Welcome, ' + res.userName + '!');

    	})
    	.error(function  (err) {
    		alert('warning', 'Something Went wrong :(', err.message);
    	})
    }
  });

