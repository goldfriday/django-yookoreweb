'use strict';

angular.module('yookoreApp').controller('LogoutCtrl', function ( $state, userNameStore, sessionId, $http, $scope, AUTH_API_URL, fullNameStore) {

  //
  var username = userNameStore.getuserName();
  var sessionid = sessionId.getsessionId();

  console.log(username + 'is logging out')
  console.log(sessionid + 'session is closed ')

  //


  $scope.logout = function (sessionid,username) {
    sessionId.removesessionId();
    userNameStore.removeuserName();

    fullNameStore.removefullName();
    $state.go('main');


  $scope.sessionid = sessionid;
  $scope.username = username;

  	//$http.post(AUTH_API_URL + '/auth/logout',{sessionid:$scope.sessionid, username:$scope.username}).success(function(data){
  	//	console.log('Logged out and session closed in authentication service');
      //
  	//}).error(function(err) {
  	//	console.log('could not log out')
  	//})

    window.onbeforeunload = function() {
      localStorage.removeItem(username);
      return '';
    };


  };


 console.log(sessionid + 'session id was posted back')
  //authToken.removeToken; // Remove Authtoken from the local storage
  //userNameStore.removeuserName; // Remove username from the local storage
 // sessionId.removesessionId; // Remove Sessionid from local storage


//   $state.go('main');
//   window.onbeforeunload = function() {
//   localStorage.removeItem(key);
//   return '';
//};



  });
