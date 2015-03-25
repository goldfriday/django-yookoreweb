'use strict';


angular.module('yookoreApp').service('auth', function auth($http, AUTH_API_URL, LOCAL_API_URL, $state, userNameStore, sessionId,fullNameStore, AUTH_SESSION_ID, $cookies) {



    	this.login = function( username, password){
    		return $http.post( AUTH_API_URL + '/auth/login',{
    			username: username,
    			password: password,

    		}).success(function(res){
          sessionId.setsessionId(res.sessionid);
          userNameStore.setuserName(res.username);
          fullNameStore.setfullName(res.fullname);

          // setting a cookie
          $cookies['sessionid'] = res.sessionid;
          $cookies['username'] = res.username;


          console.log("session-set:" + $cookies['sessionid']);



          $state.go('activitystream');


        }).error(function(res){
          console.log('login was unsucessful');
        });
    	}

    	this.register = function( firstname, lastname, title, username, email, cellphone, password ){ // Using Authentication services
    	return $http.post( AUTH_API_URL + '/auth/create-account',{
     //    this.register = function(firstname, lastname, title, username, email, cellphone, password){
    	// return $http.post( LOCAL_API_URL + '/auth/create-account',{
    		firstname: firstname,
    		lastname: lastname,
    		title: title,
    		username: username,
    		email : email,
    		cellphone: cellphone,
    		password: password,


    	}).success(function(res){
          sessionId.setsessionId(AUTH_SESSION_ID);
          userNameStore.setuserName(res.userName);
          fullNameStore.setfullName(res.fullname);
          $state.go('activitystream');

      });
    }

  //getusersessionId: function(){
  //  $cookies['sessionid']);
  //
  //
  //}
  //
  //isAuthenticated: function(){
  //  return !! getsessionId();
  //},
});


