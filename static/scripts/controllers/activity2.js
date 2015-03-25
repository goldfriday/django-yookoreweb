'use strict';
angular.module('yookoreApp').controller('Activity2Ctrl', function ($scope, Alctivities, ACTIVITY_API_URL, $http) {


          $scope.activities = Alctivities.query() 
    
     

     
  });