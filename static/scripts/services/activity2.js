'use strict';


angular.module('yookoreApp').factory('Alctivities',['$resource','ACTIVITY_API_URL','$http','userNameStore', function ($resource, ACTIVITY_API_URL, $http, userNameStore) {
    // var userName = userNameStore.getuserName();
    // var username = userNameStore.getuserName();
     var userName = 'ptchankue';

    return $resource(ACTIVITY_API_URL + '/'+ userName +'/activities/:id',{}, { // Using Local Status Update API

   // return $resource(STATUS_API_URL + '/api/status_updates/post/'+ userName + '/ '+'/:id',{}, { // Using Patrick's Status  Update  API
    'update': {method:'PUT'},
    'query': {method: 'GET', isArray: true }
   });


  }]);
