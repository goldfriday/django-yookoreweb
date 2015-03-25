'use strict';


angular.module('yookoreApp').factory('statusUpdates',[ '$resource','STATUS_API_URL','LOCAL_API_URL', 'userNameStore','$http',function ($resource, STATUS_API_URL, LOCAL_API_URL, userNameStore, $http) {
    // var userName = userNameStore.getuserName();
    
    
//var userName = 'miketyson';
    // console.log(userName);


   //  console.log('username');
   //return $resource(LOCAL_API_URL + '/api/status_updates/post/username/:id',null, { // Using Local Status Update API

   return $resource(STATUS_API_URL + '/api/status_updates/post/'+ userNameStore.getuserName() + '/ '+'/:id',null, { // Using Patrick's Status  Update  API
    'update': {method:'PUT'},
    'query': {method: 'GET', isArray: true }
   })
  }]);
