'use strict';

/**
 * @ngdoc function
 * @name yookoreApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the yookoreApp
 */
angular.module('yookoreApp').controller('SearchCtrl', function ($scope, SEARCH_API_URL, $http) {


	   $scope.searchresult = [];

      $scope.submit = function(data){
        var query = "firstname:" + document.getElementById('firstname').value;//{$scope.firstname};
        $http.get(SEARCH_API_URL + '/info/users/_search?q=' + query).success(function(data) {
    			 console.log('...Searching')
           console.log(data.hits.hits)
           $scope.searchResults = data.hits.hits

    		}).error(function  (err) {
          alert('an error occurred')  
        });
      };


    //    var searchResults = function(){

    //    	 $http.get(SEARCH_API_URL + '/info/users/_search')
  		// 	.success(function(data) {

  	 //      	$scope.searchresults = data.hits.hits
      
  		// })
  		// .error(function  (err) {
  		
  		// });

  		// return searchResults;



    //    }


    //    	 $http.get(SEARCH_API_URL + '/info/users/_search')
  		// .success(function(res) {

  	
      
  		// })
  		// .error(function  (err) {
  		
  		// });




  });
