'use strict';

/**
 * @ngdoc function
 * @name yookoreApp.controller:FaststreamCtrl
 * @description
 * # FaststreamCtrl
 * Controller of the yookoreApp
 */
angular.module('yookoreApp').controller('FaststreamCtrl', function ($scope,$http, $stateParams, $templateCache,$rootScope, ACTIVITY_API_URL, userNameStore) {

    // $http.get('http://192.168.10.15:80/borna2exl/activities/flat/').success(function(data) {
    //   $scope.activities = [];
    //   $scope.activities = data.list;
         

    //   console.log($scope.activities.length);
    //   $scope.loadMore = function (){
    //   	var last = $scope.activities[$scope.activities.length - 1];
    //   	for(var i = 0; i <  ; i++ ){
    //   		 console.log($scope.activities.length);
    //   		$scope.activities.push(last + 1);
    //   	}
    //   };

    //   console.log('Pulling activity stream data');
      
    // });

  // $rootScope.objectidlike = "statblue";

   
   $scope.showType = function(activity){
   	return activity.object.hasOwnproperty('type')
   };





  function load(page) {
  	var params = {page: page},
  	isTerminal = $scope.pagination  &&
  	             $scope.pagination.current_page>= $scope.pagination.total_pages &&
  	             $scope.pagination.current_page <=1;

  	 if (!isTerminal) {
  	 	$scope.loading = true;
      // $http.get(ACTIVITY_API_URL + userNameStore.getuserName() + '/activities/flat' )
  	 	  $http.get(ACTIVITY_API_URL + userNameStore.getuserName() + '/activities/flat' ).success(function(data, status, headers){
  	 		$scope.pagination = angular.fromJson(headers('x-pagination'));
  	 		$scope.activities = $scope.activities || [];
        $scope.objects=[];
  	 		$scope.activities.push.apply($scope.activities, data.list);
        $rootScope.objectid = data.list;
         // angular.forEach(value, function(activity){
         //          $scope.activities.push(activity);
         //          $scope.objects.push(activity.id);
         //          };




         console.log(data.list[0].object.id);

         

  	 	})
  	 	 .finally(function() {
            // Flag loading as complete
            $scope.loading = false;
          });

  	 }           
  }

      // Register event handler
    $scope.$on('endlessScroll:next', function() {
      // Determine which page to load
      var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;

      // Load page
      load(page);
    });

    // Load initial page (first page or from query param)
    load($stateParams.page ? parseInt($stateParams.page, 10) : 1);

  });
