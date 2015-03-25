'use strict';

/**
 * @ngdoc function
 * @name yookoreApp.controller:StatusupdatecommentCtrl
 * @description
 * # StatusupdatecommentCtrl
 * Controller of the yookoreApp
 */
angular.module('yookoreApp').controller('StatusupdatecommentCtrl', function ($scope,statusupdateComments, $http, userNameStore,$state) {


  $scope.statusupdatecomments = statusupdateComments.query();
  $scope.statusupdatecomment = new statusupdateComments();


  $scope.create = function(body) {

    console.log(body);

    $scope.statusupdatecomments = [];

    $scope.object_id = 'e041b0c0-c70f-11e4-a0bf-000c290119be';
    $scope.author  = 'ptchankuekofi2';

    var statusupdatecomment = new statusupdateComments ({
      object_id : $scope.object_id,
      author:$scope.author,
      body:$scope.body
    });

    $http.post('http://41.160.30.173:3002/api/content/' + $scope.activity.object.id +'/comments/', { object_id :$scope.activity.object.id, author: userNameStore.getuserName(), body: $scope.body})
      .success(function(data, status, headers){
        console.log("fetched data for: " + $scope.activity.object.id);
        console.log(data);
      }).error(function(error) {
        console.log("error could not fetch content");
      }).finally(function() {

      });

    statusupdatecomment.$save(function (){
      // $scope.statusupdatelikes = [];
      $scope.statusupdatecomments.push($scope.statusupdatecomment);
      $scope.statusupdatecomment = new statusupdateComments();
      $state.reload();
      console.log("liked");



      console.log("Commented");

    });
  };
});
