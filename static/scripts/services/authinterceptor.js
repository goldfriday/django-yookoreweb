'use strict';

angular.module('yookoreApp').factory('authInterceptor', function (sessionId) {

     return {
       request: function(config) {
         var sessionid = sessionId.getsessionId();

         if(sessionid)
            config.headers.Authorization = 'Bearer' + sessionid;

         return config;

       },
       reponse: function(response) {
         return response;

       }

     };
   });
