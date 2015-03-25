'use strict';


angular.module('yookoreApp').controller('LoginCtrl', function ($scope, $cookies, auth) {
    $scope.submit = function() {
        auth.login($scope.username, $scope.password)
            .success(function (res) {
            	//console.log(res);
            	//console.log(res.username);

              console.log($cookies);
              console.log($cookies['_ga']);


            })
            .error(function(err) {

          })
    }
});

