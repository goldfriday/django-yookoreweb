'use strict';

/**
 * @ngdoc service
 * @name yookoreApp.sessionId
 * @description
 * # sessionId
 * Factory in the yookoreApp. This servcie stores the session id from The Identity Service
 */
angular.module('yookoreApp').factory('sessionId', function ($window) {
  var storage = $window.localStorage;
  var cachedsessionId;
  var usersessionId = 'usersessionId';
  var isAuthenticated = false;
var sessionId = {
  setsessionId: function(sessionid){
    cachedsessionId = sessionid;
    storage.setItem(usersessionId, sessionid);
    isAuthenticated = true;

  },
  getsessionId: function() {
    if (!cachedsessionId)
      cachedsessionId =storage.getItem(usersessionId);
    return cachedsessionId;
  },
  isAuthenticated: function(){
    return !!sessionId.getsessionId();
  },
  removesessionId: function (){
    cachedsessionId = null;
    storage.removeItem(usersessionId);
    isAuthenticated = false;
  }



  }
   return sessionId;


  });
