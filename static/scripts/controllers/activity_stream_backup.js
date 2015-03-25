'use strict';
angular.module('yookoreApp').controller('ActivityCtrl', function ($scope, Activities, ACTIVITY_API_URL, $http,usernname) {

	 
     var userName = 'borna2exl';
      // $http.get('api/activities.json').success(function(data){

      $http.get(ACTIVITY_API_URL + '/'+ userName +'/activities/').success(function(data){

     // $scope.activities = data.list;

		      // $http.get('api/activities.json').success(function(data) {
		      $scope.activities = [];
		      $scope.contents = [];
		      $scope.comments= []; 
		      angular.forEach(data, function(value,key) {
		        //$scope.activities.push(value);
		        
		        if(key == "list") {
		          //$scope.activities.push(value);
		          
		            angular.forEach(value, function(activity){
		              $scope.activities.push(activity);
		              $scope.contents.push(activity.object);
		              /*
		                angular.forEach(activity, function(value2, key2) {
		                    $scope.newKeys.push(key2);
		                })
		              */

		            });

		          
		        }
		        
		      });
		    


    }).error(function(err){
     // alert('warning',"Unable to get status", err.message);
     console.log('warning')
    })


      
	  //  $scope.activities = Activities.query();

	  // var retrieveActivities = function(){
	  // 	$scope.activities = Activities.query();
   //      // $scope.activities = data.li;
	  // };

	  // return retrieveActivities();
	

     
  });
