'use strict';

/**
 * @ngdoc function
 * @name yookoreApp.controller:StatusupdatelikeCtrl
 * @description
 * # StatusupdatelikeCtrl
 * Controller of the yookoreApp
 */
angular.module('yookoreApp')
  .controller('StatusupdatelikeCtrl', function ($scope, Likes, $rootScope, userNameStore, $http, $state) {

    //$scope.statusupdatelikes = Likes.query();
    $scope.statusupdatelike = new Likes();

    $scope.create = function(activity) {
      $scope.statusupdatelikes = [];
      console.log("id of item we're liking: " + $scope.activity.object.id);
      console.log(activity);

      // $scope.object_id = 'e041b0c0-c70f-11e4-a0bf-000c290119be';
      $scope.author  = 'ptchankuekofi2';

      var statusupdatelike = new Likes ({
        object_id : $scope.activity.object.id,
        author: userNameStore.getuserName()
      });


      $http.post('http://41.160.30.173:3002/api/content/' + $scope.activity.object.id +'/likes/', { object_id :$scope.activity.object.id, author: userNameStore.getuserName()})
        .success(function(data, status, headers){
          console.log("fetched data for: " + $scope.activity.object.id);
          console.log(data);
        }).error(function(error) {
          console.log("error could not fetch content");
        }).finally(function() {

        });

      statusupdatelike.$save(function (){
        $scope.statusupdatelikes.push($scope.statusupdatelike);
        $scope.statusupdatelike = new Likes();
        console.log("liked");
        $state.reload();
      });
    };
  });
