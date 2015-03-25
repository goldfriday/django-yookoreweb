'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.blogPosts
 * @description
 * # blogPosts
 * Factory in the yookoreApp.
 */
angular.module('yookoreApp').factory('blogPosts', ['$resource', 'BLOG_API_URL', 'userNameStore',function ($resource, BLOG_API_URL, userNameStore) {
    // var userName = userNameStore.getuserName();
    // var username = userNameStore.getuserName();
     

    // console.log(userName);


   //  console.log('username');
   //return $resource(BLOG_API_URL + '/api/status_updates/post/username/:id',null, { // Using Local Status Update API

   return $resource(BLOG_API_URL + '/api/blogposts/post/'+  userNameStore.getuserName() + '/ '+'/:id',{}, { // Using Patrick's Status  Update  API
    'update': {method:'PUT'}
   })
  }]);
