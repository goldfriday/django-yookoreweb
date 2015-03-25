'use strict';

/**
 * @ngdoc function
 * @name yookoreApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the yookoreApp
 */
angular.module('yookoreApp').controller('UserprofileCtrl', function ($scope, AUTH_API_URL, $http, userNameStore, $state) {

	 var username = userNameStore.getuserName(username);
     console.log(username + 'Injecting username into the API');



    
      var username = userNameStore.getuserName(username);
     console.log(username + 'Injecting username into the GET PROFILE API');
       $http.get('http://192.168.10.144:3000/auth/profile/'+ username).
       success(function(data){
        $scope.userprofile = data;
        console.log('retrieving user profile');
        console.log(data);

       }).
       error(function(res){
        console.log('could not retrieve profile information :)')
       })
 




	$scope.submit = function(data){

	 var username = userNameStore.getuserName(username);
     console.log(username + 'Injecting username into the API');


		$http.put(AUTH_API_URL + '/auth/profile/update?username='+username,{
			birthdate: $scope.birthdate,
    		gender: $scope.gender,
    		title: $scope.title,
    		interest: $scope.interest,
    		relationshipstatus: $scope.relationshipstatus,
    		timezone: $scope.timezone,
    		homecountry: $scope.homecountry,
    		imageurl:$scope.imageurl,
    		alternate_email:$scope.alternateemail,
    		religion:$scope.religion,
    		cellphone: $scope.cellphone,
    		biography: $scope.biography,
        lastname:$scope.lastname,
        firstname:$scope.firstname,
        middlename:$scope.middlename

		}).success(function(res){
			console.log('Successfuly updated profile');
      $state.go('userprofile');

		}).error(function(res){
			console.log('could not update profile')

		})
	};











  });
