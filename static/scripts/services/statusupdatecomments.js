'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.statusupdateComments
 * @description
 * # statusupdateComments
 * Factory in the yookoreApp.
 */
angular.module('yookoreApp').factory('statusupdateComments',['$resource', 'STATUS_LIKE_API_URL', 'userNameStore', function ($resource, STATUS_LIKE_API_URL, userNameStore) {


    // var userName = userNameStore.getuserName();
    // var username = userNameStore.getuserName();
     var userName = 'ptchankue'
     var id = 'e041b0c0-c70f-11e4-a0bf-000c290119be'

    // console.log(userName);


   //  console.log('username');
   //return $resource(LOCAL_API_URL + '/api/status_updates/post/username/:id',null, { // Using Local Status Update API

  var Likes =  $resource('http://192.168.10.123:8000/api/content/' + id +'/comments/ '+'/:id',
    null, { // Using Patrick's Status  Update  API
    'update': {method:'PUT'},
     'query': {method: 'GET', isArray: true }
   })

  return Likes;

// return $resource(STATUS_API_URL + '/api/status_updates/post/'+ userName + '/ '+'/:id',{}, { // Using Patrick's Status  U



  }]);
